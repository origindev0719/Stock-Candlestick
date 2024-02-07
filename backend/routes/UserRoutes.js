import express from "express";
import nodemailer from "nodemailer";
import twilio from "twilio";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import axios from "axios";
import AppleSignInRest from 'apple-sign-in-rest';
import protect from "../middleware/AuthMiddleware.js";
import Follows from "../models/FollowsModel.js";

const userRouter = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'elparlaydev@gmail.com',
    pass: 'bnai hdtm pucr yoat',
  },
});

const accountSid = "ACdc0316624c299389cc3a5ff1b3954088";
//const authToken = process.env.TWILIO_AUTH_TOKEN;
const authToken = 'd6f00a20e0d086b623858018e1310f38';
const verifySid = "VAa0b3f608fce2551c8c44126d2f41bd02";
const client = twilio(accountSid, authToken);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    // Check if user or username already exists
    const userExists = email ? await User.findOne({ email }) : null;
    const phoneExists = phone ? await User.findOne({ phone }) : null;
    const usernameExists = await User.findOne({ name });

    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    if (phoneExists) {
      return res.status(400).json({ message: "User with this phone already exists" });
    }

    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user but do not save yet
    const user = new User({
      name,
      email,
      phone,
      password,
      verificationCode,
    });

    // Sending Verification Code via Email or SMS
    try {
      if (email) {
        // Sending verification email
        const mailOptions = {
          from: 'elparlaydev@gmail.com',
          to: email,
          subject: 'Verification Code',
          text: `Your verification code is ${verificationCode}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent to: ' + email);
      } else if (phone) {
        // Sending verification SMS
        await client.messages.create({
          to: '+1' + phone,
          from: '+13464564904',
          body: `Your verification code is ${verificationCode}`,
        });
        console.log('SMS sent to: ' + phone);
      }

      // Save the user after successful email/SMS sending
      await user.save();

      res.status(201).json({
        id: user._id,
        name: user.name,
        profileImg: user.profileImg,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
      });
    } catch (error) {
      // If there's an error sending the email/SMS, do not save the user
      console.error('Error sending verification code:', error);
      res.status(500).json({ message: 'Error sending verification code' });
    }
  })
);

/*
import cron from 'node-cron';

// Schedule a job to run once a day to remove unverified users
cron.schedule('0 0 * * *', async () => {
  const expirationTime = 24 * 60 * 60 * 1000; // 24 hours
  const cutoffTime = new Date(Date.now() - expirationTime);
  await User.deleteMany({ isVerified: false, createdAt: { $lt: cutoffTime } });
  console.log('Cleaned up unverified users');
});

*/

// VERIFY
userRouter.post(
  "/verify",
  asyncHandler(async (req, res) => {
    const { email, phone, code } = req.body;

    let user;
    if (email !== null) user = await User.findOne({ email });
    if (phone !== null) user = await User.findOne({ phone });

    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.verificationCode === code) {
      user.isVerified = true;
      await user.save();

      res.json({
        id: user.id,
        name: user.name,
        profileImg: user.profileImg,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
        token: generateToken(user.id),
        interests: user.interests,
      });
    } else {
      res.status(400)
      throw new Error('Invalid verification code');
    }
  })
);

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password, phone, name } = req.body;

    const query = {};
    if (email) query.email = email;
    if (phone) query.phone = phone;
    if (name) query.name = name;

    const user = await User.findOne(query);

    if (user && !user.isVerified) return res.status(400).send('User not verified');
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user.id,
        name: user.name,
        profileImg: user.profileImg,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
        token: generateToken(user.id),
        createdAt: user.createdAt,
        interests: user.interests,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email, Phone or Password");
    }
  })
);

// Google Login/Register
userRouter.post('/google', asyncHandler(async (req, res) => {
  const { token } = req.body; // Get the token from the request body

  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { email, name } = response.data;

    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, register them
      user = await User.create({
        name,
        email,
        password: token, // Consider a more secure method of handling passwords
      });
    }

    // Return user data and token
    res.json({
      id: user.id,
      name: user.name,
      profileImg: user.profileImg,
      email: user.email,
      token: generateToken(user.id),
      interests: user.interests,
    });

  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).send(error.message);
  }
}));

// Facebook Login/Register
userRouter.post('/facebook', asyncHandler(async (req, res) => {
  const { userID, accessToken } = req.body; // Get userID and accessToken from the request body

  try {
    const response = await axios.get(`https://graph.facebook.com/${userID}?fields=id,name,email&access_token=${accessToken}`);
    const { email, name } = response.data;

    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, register them
      user = await User.create({
        name: response.data.name,
        email,
        password: accessToken,
      });
    }

    // Return user data and token
    res.json({
      id: user.id,
      name: user.name,
      profileImg: user.profileImg,
      email: user.email,
      token: generateToken(user.id),
      interests: user.interests,
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
}));

// APPLE REGISTER
userRouter.post('/apple-signin', async (req, res) => {
  try {
    const { code, redirectUri } = req.body;

    if (!code || !redirectUri) {
      return res.status(400).json({ error: 'Code and redirectUri are required' });
    }

    // Initialize AppleSignInRest with the Apple Client ID, Redirect URI, and Apple Private Key
    const appleSignIn = new AppleSignInRest({
      clientId: 'YOUR_APPLE_CLIENT_ID',
      teamId: 'YOUR_APPLE_TEAM_ID',
      keyId: 'YOUR_APPLE_KEY_ID',
      redirectUri: redirectUri,
      privateKey: 'YOUR_APPLE_PRIVATE_KEY'
    });

    // Get the Apple ID token and access token
    const { idToken, accessToken } = await appleSignIn.getAuthorizationToken(code);

    res.json({ idToken, accessToken });
  } catch (error) {
    console.error('Apple Sign In Error:', error);
    res.status(500).json({ error: 'Apple Sign In failed' });
  }
});

// GET SUGGESTED USERS
userRouter.get('/suggestedUsers', asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  // Find users the current user is already following
  const following = await Follows.find({ followerId: userId });
  const followingIds = following.map(follow => follow.followedId);

  // Find users that the current user is not following
  const suggestedUsers = await User.find({ _id: { $nin: [...followingIds, userId] } })
    .select('-password -verificationCode -isVerified -interests -createdAt -updatedAt')
    .limit(10);

  res.json(suggestedUsers);
}));

// GET USER DETAILS
userRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
        interests: user.interests,
        profileImg: user.profileImg,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE USER INTERESTS
userRouter.put(
  "/:id/interests",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      // Update the user's interests with the provided array
      user.interests = req.body.interests;

      // Save the updated user to the database
      const updatedUser = await user.save();

      res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isVerified: updatedUser.isVerified,
        interests: updatedUser.interests,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default userRouter;
