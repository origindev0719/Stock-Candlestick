import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false, 
  },
  video: {
    type: String,
    required: false, 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Post = mongoose.model("post", postSchema);

export default Post;
