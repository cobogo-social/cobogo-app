import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const { referral_profile_id } = req.query;

  try {
    const response = await cobogoApi.get(
      `/api/profiles?filters[referral_profile_id][$eq]=${referral_profile_id}`,
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
