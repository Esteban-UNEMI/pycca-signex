/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.PYCCA_STATIC_EXPORT === '1' ? { output: 'export', trailingSlash: true } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' }
    ]
  }
};

export default nextConfig;
