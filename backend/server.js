import bodyParser from "body-parser";
import express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from "./routes/UserRoutes.js";
import dotenv from 'dotenv';
import followsRouter from "./routes/FollowsRoutes.js";
import postRouter from "./routes/PostRoutes.js";
import likeRouter from "./routes/LikeRoutes.js";
import sportRouter from "./routes/SportsRoutes.js";
import newsRouter from "./routes/NewsRoutes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // To enable CORS

const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:example@mongoDb:27017/dockerizingMernApplicationTestDB?authSource=admin';
// const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://andreonward:CPFn4cj0yy5pJRtP@cluster0.mnsvoey.mongodb.net/';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.use('/api/users', userRouter);
app.use('/api/follows', followsRouter);
app.use('/api/post', postRouter);
app.use('/api/like', likeRouter);
app.use('/api/sports', sportRouter);
app.use('/api/news', newsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
