import youtubeApi from '../../../services/youtubeApi';

export default async function handler(req, res) {
  const { accessToken } = req.query;

  const response = await youtubeApi.get(
    `/search?part=snippet&forMine=true&maxResults=1&q=windows&type=video`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  res.status(200).json(response.data);
}
