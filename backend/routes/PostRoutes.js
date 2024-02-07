import express from "express";
import asyncHandler from "express-async-handler";
import Post from "../models/PostModel.js";
import Follows from "../models/FollowsModel.js";
import createNewBuffer from "../utils/createNewBuffer.js";
import uploadFile from "../utils/uploadFile.js";
import fs from 'fs'
import multer from 'multer'
import path from 'path';
import sharp from 'sharp';
import User from "../models/UserModel.js";

const postRouter = express.Router();

const upload = multer({ dest: 'uploads/' })

// Create a post
postRouter.post(
  "/create",
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const { text, userId } = req.body;

    // Create a new post instance without the image
    let post = new Post({
      text,
      userId
    });

    // Save the post to generate an ID
    post = await post.save();

    try {
      if (req.file) {
        const file = req.file;
        const desiredWidth = 900; // Set your desired width
        const desiredHeight = 700; // Set your desired height

        // Read the image
        const inputBuffer = fs.readFileSync(file.path);

        // Get metadata of the image
        const metadata = await sharp(inputBuffer).metadata();

        let buffer = await sharp(file.path)
          .resize({
            width: desiredWidth,
            height: desiredHeight,
            fit: sharp.fit.contain,
            position: sharp.strategy.entropy
          })
          .toBuffer();       

        const extension = path.extname(file.originalname);
        const mimeType = file.mimetype;

        // Use the post ID for the image upload
        const imageUrl = await uploadFile({
          buffer,
          folderName: 'post_media',
          id: post._id, // Use the post ID here
          mimeType,
          extension,
          hasDate: true
        });

        // Update the post with the image URL
        post.image = imageUrl;
        await post.save();
      }

      res.status(201).json(post);
    } catch (error) {
      // Delete the post if there was an error uploading the image
      await Post.findByIdAndRemove(post._id);

      console.error('Error:', error.message);
      res.status(500).json({ message: 'Failed to create post: ' + error.message });
    } finally {
      // Delete the file after attempting to upload to S3
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
    }
  })
);

// Get a specific post by ID
postRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.json(post);
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  })
);

// Get all posts by a specific user
postRouter.get(
  "/user/:userId",
  asyncHandler(async (req, res) => {
    const posts = await Post.find({ userId: req.params.userId });

    if (posts) {
      res.json(posts);
    } else {
      res.status(404);
      throw new Error("No posts found for this user");
    }
  })
);

// Remove a post
postRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      await post.remove();
      res.json({ message: "Post removed" });
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  })
);

// Get feed posts
postRouter.get(
  "/feed/:userId",
  asyncHandler(async (req, res) => {
    try {
      const userId = req.params.userId;
      const page = parseInt(req.query.page) || 1; // Current page
      const limit = parseInt(req.query.limit) || 10; // Posts per page

      // Find all users that the current user is following
      const followedUsers = await Follows.find({ followerId: userId });
      const followedIds = followedUsers.map(follow => follow.followedId);

      // Include the user's own ID in the list
      followedIds.push(userId);

      // Find posts from these users
      const posts = await Post.find({
        userId: { $in: followedIds }
      })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 });

      // Manually populate user data
      const populatedPosts = await Promise.all(posts.map(async (post) => {
        const user = await User.findById(post.userId).select('name profileImg');
        return { ...post.toObject(), userId: user };
      }));

      res.json(populatedPosts);
    } catch (error) {
      res.status(500)
      console.error('Error:', error.message);
      throw new Error('Failed to fetch feed:', error);
    }
  })
);

const createPostMedia = async (post, media) => {
  try {
    const { buffer, extension, mimeType } = await createNewBuffer(media);
    const location = await uploadFile({
      buffer,
      folderName: 'post_media',
      id: post.id,
      mimeType,
      extension,
      hasDate: true
    });
    return location
  } catch ({ message }) {
    console.log('message', message)
    throw new Error(message);
  }
};

export default postRouter;
