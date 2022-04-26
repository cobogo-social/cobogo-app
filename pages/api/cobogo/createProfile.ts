import {
  createProfile,
  readAccountByAccountId,
  readChannelByAccount,
  readProfileByReferralCode,
} from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import referralCodeGenerator from 'referral-code-generator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  const { description, handle, categories, queryRef } = req.body;

  try {
    const referralCode = referralCodeGenerator.alphaNumeric('lowercase', 2, 2);

    const account = await readAccountByAccountId(session.user['sub'], session);
    const channel = await readChannelByAccount(account, session);
    const referral = await readProfileByReferralCode(queryRef, session);

    const response = await createProfile(
      description,
      handle,
      categories,
      account.id,
      channel.id,
      referral?.id,
      referralCode,
      session,
    );

    res.status(201).json({ status: 201, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
