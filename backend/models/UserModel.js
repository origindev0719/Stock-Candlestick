import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    sparse: true, 
  },
  phone: {
    type: String,
    sparse: true, 
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profileImg: {
    type: String,
    default: 'https://el-parlay-bucket.s3.us-west-1.amazonaws.com/user_images/user_avatar.png',
  },
  interests: {
    type: [String], // This denotes an array of strings
    default: [],    // Default value is an empty array
  },
},
{
  timestamps: true,
});


// Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("user", userSchema);

export default User;