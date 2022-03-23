import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const {
    description,
    handle,
    categories,
    account,
    channel_id,
    referral_code,
    referral_profile_id,
    channel,
  } = req.body;

  try {
    const response = await cobogoApi.post('/api/profiles', {
      data: {
        description,
        handle,
        categories,
        account,
        channel_id,
        referral_code,
        referral_profile_id,
        channel,
      },
    });

    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
