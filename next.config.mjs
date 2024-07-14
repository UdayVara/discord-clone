/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname:"*"
        }]
    },
    env:{
        APP_URL:"http://localhost:3000",
        BACKEND_URL:"http://localhost:5000"
    },
    reactStrictMode:false
};

export default nextConfig;
