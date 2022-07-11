import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const s3 = new S3({
    apiVersion: '2012-10-17',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const post = s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET,
    Fields: {
      key: req.query.file,
      'Content-Type': req.query.fileType,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 10 MB
    ],
  });

  res.status(201).json({ status: 201, data: post });
}
