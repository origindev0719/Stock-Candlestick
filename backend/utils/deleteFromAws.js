import errorLogic from '../config/errors.js';
import { s3, isFalse } from './';
import Post from '../models/PostModel.js';

export default async image => {
    const key = image.split(process.env.AWS_BASE_KEY);
    const post = await Post.find({ image: image });
    if (post) {
        return null;
    }
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: {
            Objects: [
                {
                    Key: key[1]
                }
            ]
        }
    };
    const deleted = await s3.deleteObjects(params).promise();
    isFalse(deleted, errorLogic.FAILED_TO_DELETE);
};
