import { readProfilesByReferral } from '@services/cobogoApi';

export default async function handler(req, res) {
  const { referral } = req.query;

  try {
    const response = await readProfilesByReferral(referral);

    res.status(200).json({ status: 200, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
