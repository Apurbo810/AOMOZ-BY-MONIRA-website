/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
=======
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
