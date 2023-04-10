/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'icon-library.com',
        port: '',
        pathname: '/images/generic-user-icon/generic-user-icon-18.jpg',
      },
    ],
  }
}

module.exports = nextConfig
