import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const { email } = req.query;

  try {
    const response = await cobogoApi.get(
      `/api/accounts?filters[email][$eq]=${email}`,
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
