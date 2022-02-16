import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const { description, handle, categories, account_email } = req.body;

  try {
    const response = await cobogoApi.post(
      '/api/profiles',
      {
        data: {
          description,
          handle,
          categories,
          account_email,
        },
      },
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