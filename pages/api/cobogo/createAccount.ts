import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const { name, email, image } = req.body;

  try {
    const response = await cobogoApi.post(
      '/api/accounts',
      {
        data: {
          name: name,
          email: email,
          image: image,
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
