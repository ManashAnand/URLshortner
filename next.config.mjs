/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Wildcard to allow all domains
          port: '',
          pathname: '**', // Wildcard to allow all paths
        },
      ],
    },
  };
  
  export default nextConfig;
  