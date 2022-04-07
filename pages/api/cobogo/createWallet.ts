import { createWallet } from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import referralCodeGenerator from 'referral-code-generator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { wallet } = req.body;

  try {
    const referralCode = await referralCodeGenerator.alphaNumeric(
      'lowercase',
      2,
      2,
    );

    const response = await createWallet(wallet, referralCode);

    res.status(201).json({ status: 201, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
