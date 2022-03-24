import { getSession } from 'next-auth/react';
import referralCodeGenerator from 'referral-code-generator';

import { readAccountByEmail, readChannelByAccount, readProfileByReferralCode } from '../../../services/cobogoApi';
import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const session = await getSession({ req });

  const {
    description,
    handle,
    categories,
    ref
  } = req.body;

  try {
    const referralCode = referralCodeGenerator.alphaNumeric(
      'lowercase',
      2,
      2
    );

    const account = await readAccountByEmail(session.user.email);
    const channel = await readChannelByAccount(account);
    const referral = await readProfileByReferralCode(ref);

    const response = await cobogoApi.post('/api/profiles', {
      data: {
        description,
        handle,
        categories,
        account: account.id,
        channel: channel.id,
        referral: referral.id,
        referral_code: referralCode,
      },
    });

    res.status(201).json({ status: 201, data: response.data });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
