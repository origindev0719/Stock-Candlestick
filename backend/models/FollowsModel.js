import mongoose from "mongoose";

const followsSchema = mongoose.Schema({
  followerId: {
    type: String,
    required: true,
  },
  followedId: {
    type: String,
    sparse: true, 
  },
},
{
  timestamps: true,
});

const Follows = mongoose.model("follows", followsSchema);

export default Follows;