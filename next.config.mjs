/** @type {import('next').NextConfig} */
import dns from 'dns'
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
