/** @type {import('next').NextConfig} */

// const path = require('path');
const rewrites = () => {
  return [
    {
      source: "/api/:path*",
      destination: "https://www.okx.com/api/:path*",
    },
    // {
    //   source: "/esin_edu_server/:path*",
    //   destination: "http://www.baimoedu.com/esin_edu_server/:path*",
    // },
  ];
};

const nextConfig = {
  rewrites,
  
};

export default nextConfig;
