/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/v0/b/mangluoitienphong-de378.appspot.com/o/**',
            },
        ],
    },
};

export default nextConfig;
