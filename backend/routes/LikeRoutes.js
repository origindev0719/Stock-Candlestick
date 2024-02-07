import express from "express";
import asyncHandler from "express-async-handler";
import Post from "../models/PostModel.js";
import Like from "../models/LikeModel.js";

const likeRouter = express.Router();

// Like a post
likeRouter.post(
  "/like/:postId",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const alreadyLiked = await Like.findOne({ postId, userId });

    if (alreadyLiked) {
      res.status(400);
      throw new Error("You've already liked this post");
    }

    const newLike = new Like({
      postId,
      userId
    });

    await newLike.save();

    // Increment the likes count in the Post model
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

    res.status(201).json({ message: "Liked successfully" });
  })
);

// Unlike a post
likeRouter.delete(
  "/unlike/:postId",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const like = await Like.findOneAndDelete({ postId, userId });

    if (!like) {
      res.status(400);
      throw new Error("You haven't liked this post yet");
    }

    // Decrement the likes count in the Post model
    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });

    res.status(200).json({ message: "Unliked successfully" });
  })
);

// Get likes for a post
likeRouter.get(
  "/likes/:postId",
  asyncHandler(async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.query.userId;  // Get userId from query string

      // Find all likes for the post
      const likes = await Like.find({ postId }).populate('userId', 'name');

      // Check if the user has liked the post
      const isLikedByUser = await Like.findOne({ postId, userId });

      // Respond with the total likes and the user's like status
      res.json({ totalLikes: likes.length, isLikedByUser });
    } catch (error) {
      res.status(500);
      throw new Error('Error fetching post likes and like status:', error);
    }
  })
);

// Is post liked
likeRouter.get(
  "/isLiked/:postId",
  asyncHandler(async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.query.userId;  // Get userId from query string

      // Find if the user has liked the post
      const like = await Like.findOne({ postId, userId });

      // Respond with true if the like exists, otherwise false
      res.json(like != null);
    } catch (error) {
      res.status(500);
      throw new Error('Error fetching post like status:', error);
    }
  })
);

export default likeRouter;
