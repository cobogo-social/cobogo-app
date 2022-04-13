import { createAccountToFan, readAccountByName } from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name } = req.body;

  try {
    const account = await readAccountByName(name);

    if (!account) {
      const response = await createAccountToFan(name);

      res.status(201).json({ status: 201, data: response });
    } else {
      res.status(200).json({ status: 200 });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
