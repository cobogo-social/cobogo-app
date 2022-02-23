import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const { referral_code_used } = req.query;

  try {
    const response = await cobogoApi.get(
      `/api/profiles?filters[referral_code_used][$eq]=${referral_code_used}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
