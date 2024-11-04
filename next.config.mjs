const nextConfig = {
  reactStrictMode: true,
  reactStrictMode: true,
  transpilePackages: ['@mantine/core', '@mantine/hooks', '@mantine/notifications'],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { 
            key: "Access-Control-Allow-Credentials", 
            value: "true" 
          },
          { 
            key: "Access-Control-Allow-Origin", 
            value: "*" 
          },
          { 
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT" 
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
          }
        ]
      }
    ];
  },
};

export default nextConfig;