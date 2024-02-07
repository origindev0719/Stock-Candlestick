import express from "express";
import asyncHandler from "express-async-handler";
import Follows from "../models/FollowsModel.js";
import User from "../models/UserModel.js";

const followsRouter = express.Router();

// FOLLOW USER
followsRouter.post(
  "/followTarget",
  asyncHandler(async (req, res) => {
    const { followerId, followedId } = req.body;

    // Check if the followerId and followedId are provided
    if (!followerId || !followedId) {
      res.status(400);
      throw new Error("Both followerId and followedId are required");
    }

    // Check if the user is trying to follow themselves
    if (followerId === followedId) {
      res.status(400);
      throw new Error("You cannot follow yourself");
    }

    // Check if the follow relationship already exists
    const existingFollow = await Follows.findOne({ followerId, followedId });
    if (existingFollow) {
      res.status(400);
      throw new Error("You are already following this user");
    }

    // Create a new follow relationship
    const newFollow = await Follows.create({
      followerId,
      followedId,
    });

    if (newFollow) {
      res.status(201).json({
        message: "Followed successfully",
        follow: newFollow,
      });
    } else {
      res.status(500);
      throw new Error("Failed to follow the user");
    }
  })
);

// UNFOLLOW USER
followsRouter.delete(
  "/unfollowTarget",
  asyncHandler(async (req, res) => {
    const { followerId, followedId } = req.body;

    // Check if the followerId and followedId are provided
    if (!followerId || !followedId) {
      res.status(400);
      throw new Error("Both followerId and followedId are required");
    }

    // Check if the user is trying to unfollow themselves
    if (followerId === followedId) {
      res.status(400);
      throw new Error("You cannot unfollow yourself");
    }

    // Find and delete the follow relationship
    const result = await Follows.deleteOne({ followerId, followedId });

    // Check if a document was actually deleted
    if (result.deletedCount === 0) {
      res.status(404);
      throw new Error("Follow relationship not found");
    }

    res.status(200).json({
      message: "Unfollowed successfully",
    });
  })
);

// GET USER FOLLOWERS
followsRouter.get(
  "/getTargetFollowers/:targetId",
  asyncHandler(async (req, res) => {
    const targetId = req.params.targetId;

    // Check if the targetId is provided
    if (!targetId) {
      res.status(400);
      throw new Error("Target ID is required");
    }

    // Retrieve the followers of the target user
    const followers = await Follows.find({ followedId: targetId });

    // If there are no followers, return an empty array
    if (!followers) {
      res.status(200).json([]);
      return;
    }

    // Extract the followerIds from the followers
    const followerIds = followers.map(follow => follow.followerId);

    res.status(200).json(followerIds);
  })
);

// GET USER FRIENDS DATA
followsRouter.get(
  "/getUserFriends/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
      res.status(400);
      throw new Error("Target ID is required");
    }

    // Retrieve the users that the specific user is following
    const followedUsers = await Follows.find({ followerId: userId });

    if (!followedUsers || followedUsers.length === 0) {
      res.status(200).json([]);
      return;
    }

    // Extract the followedIds and fetch user details
    const followedIds = followedUsers.map(follow => follow.followedId);
    const userDetails = await User.find({ _id: { $in: followedIds } }).select('name profileImg _id');

    res.status(200).json(userDetails);
  })
);

// GET FOLLOWED USERS
followsRouter.get(
  "/getFollowedUsers/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    // Check if the userId is provided
    if (!userId) {
      res.status(400);
      throw new Error("User ID is required");
    }

    // Retrieve the users that the specific user is following
    const followedUsers = await Follows.find({ followerId: userId });

    // If the user is not following anyone, return an empty array
    if (!followedUsers) {
      res.status(200).json([]);
      return;
    }

    // Extract the followedIds from the followed relationships
    const followedIds = followedUsers.map(follow => follow.followedId);

    res.status(200).json(followedIds);
  })
);

// GET USER FOLLOWERS
followsRouter.get(
  "/getUserFollowers/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    // Check if the userId is provided
    if (!userId) {
      res.status(400);
      throw new Error("User ID is required");
    }

    // Retrieve the users who are following the specific user
    const followers = await Follows.find({ followedId: userId });

    // If the user has no followers, return an empty array
    if (!followers) {
      res.status(200).json([]);
      return;
    }

    // Extract the followerIds from the follower relationships
    const followerIds = followers.map(follow => follow.followerId);

    res.status(200).json(followerIds);
  })
);

// Check if I am following another user
followsRouter.get(
  "/amIFollowing/:myUserId/:targetUserId",
  asyncHandler(async (req, res) => {
    const myUserId = req.params.myUserId;
    const targetUserId = req.params.targetUserId;

    const following = await Follows.findOne({ followerId: myUserId, followedId: targetUserId });

    res.status(200).json({ amIFollowing: !!following });
  })
);

// Check if I am followed by another user
followsRouter.get(
  "/amIFollowedBy/:myUserId/:targetUserId",
  asyncHandler(async (req, res) => {
    const myUserId = req.params.myUserId;
    const targetUserId = req.params.targetUserId;

    const followedBy = await Follows.findOne({ followerId: targetUserId, followedId: myUserId });

    res.status(200).json({ amIFollowedBy: !!followedBy });
  })
);

// Remove a follower
followsRouter.delete(
  "/removeFollower/:followerId",
  asyncHandler(async (req, res) => {
    const myUserId = req.user._id;
    const followerId = req.params.followerId;

    const removed = await Follows.findOneAndDelete({ followerId: followerId, followedId: myUserId });

    if (!removed) {
      res.status(404).json({ message: "Follower not found" });
      return;
    }

    res.status(200).json({ message: "Follower removed successfully" });
  })
);

export default followsRouter;
