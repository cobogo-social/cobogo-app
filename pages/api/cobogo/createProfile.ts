import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const {
    description,
    handle,
    categories,
    account_email,
    channel_id,
    referral_code,
    referral_code_used,
  } = req.body;

  try {
    const response = await cobogoApi.post(
      '/api/profiles',
      {
        data: {
          description,
          handle,
          categories,
          account_email,
          channel_id,
          referral_code,
          referral_code_used,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
