import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const { referral_code } = req.query;

  try {
    const response = await cobogoApi.get(
      `/api/profiles?filters[referral_code][$eq]=${referral_code}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
