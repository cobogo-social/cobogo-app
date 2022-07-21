import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';
import referralCodeGenerator from 'referral-code-generator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const s3 = new S3({
      apiVersion: '2012-10-17',
      accessKeyId: process.env.COBOGO_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.COBOGO_AWS_SECRET_ACCESS_KEY,
      region: process.env.COBOGO_AWS_REGION,
    });

    const randomCode = await referralCodeGenerator.alphaNumeric(
      'lowercase',
      2,
      2,
    );

    const { fileName } = req.query;
    const fileNameString = Array.isArray(fileName) ? fileName[0] : fileName;
    const fileExtension = fileNameString.substring(
      fileNameString.lastIndexOf('.') + 1,
    );
    const post = await s3.createPresignedPost({
      Bucket: process.env.COBOGO_AWS_BUCKET,
      Fields: {
        key: `${req.query.prefix}/${randomCode}.${fileExtension}`,
        'Content-Type': req.query.fileType,
      },
      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 1, 10485760], // 1 KB - 10 MB
      ],
    });

    res.status(201).json({ status: 201, data: post });
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
    res.status(500).json({ status: 500, data: error });
  }
}
