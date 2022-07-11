module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'yt3.ggpht.com',
      'i.ytimg.com',
      'lh3.googleusercontent.com',
      process.env.NEXT_PUBLIC_AWS_BUCKET_URL,
      'cobogo-app.s3.sa-east-1.amazonaws.com',
    ],
  },
};
