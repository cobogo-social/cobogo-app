import youtubeApi from '../../../services/youtubeApi';

export default async function handler(req, res) {
  const { accessToken, id } = req.query;

  try {
    const response = await youtubeApi.get(
      `/videos?part=snippet%2CcontentDetails`,
      {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
