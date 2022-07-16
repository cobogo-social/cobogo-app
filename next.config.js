module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'yt3.ggpht.com',
      'i.ytimg.com',
      'lh3.googleusercontent.com',
      'cobogo-app.s3.sa-east-1.amazonaws.com',
      `${process.env.COBOGO_AWS_BUCKET_PUBLIC_HOST}`,
    ],
  },
};
