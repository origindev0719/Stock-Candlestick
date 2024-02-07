import s3 from './s3.js';
import dotenv from 'dotenv';

dotenv.config();

export default async ({
    buffer,
    folderName,
    id,
    mimeType,
    extension,
    hasDate = false
}) => {
    const config = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:
            `${folderName}/${id}` +
            (hasDate ? `-${Date.now()}` : '') +
            `${extension}`,
        ContentType: mimeType,
        ACL: 'public-read',
        Body: buffer
    };
    const uploadObjectPromise = s3.upload(config).promise();
    const data = await uploadObjectPromise;
    return data.Location;
};
