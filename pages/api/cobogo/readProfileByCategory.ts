import { readProfilesByCategory } from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { categoryId } = req.query;

  try {
    const response = await readProfilesByCategory(categoryId);

    res.status(200).json({ status: 200, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
