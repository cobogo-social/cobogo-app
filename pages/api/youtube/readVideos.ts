import youtubeApi from '../../../services/youtubeApi';

export default async function handler(req, res) {
  const { accessToken, channelId, q } = req.query;

  const response = await youtubeApi.get(
    `/search?part=snippet&maxResults=25&type=video&videoDuration=short`,
    {
      params: {
        channelId: channelId,
        q: q,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  res.status(200).json(response.data);
}
