/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/lotto',
        destination: 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber',
      },
    ];
  },
}

module.exports = nextConfig 