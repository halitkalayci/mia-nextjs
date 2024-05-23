/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [{hostname:'res.cloudinary.com'}]
    },
    typescript:{
        ignoreBuildErrors:false
    }
};

export default nextConfig;
