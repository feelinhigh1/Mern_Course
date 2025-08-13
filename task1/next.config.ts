import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // rewrites: async function () {
  //   return [
  //     {
  //       source: "/login",
  //       destination: "/auth/login",
  //     },
  //     // {
  //     //   source: "/forgot-password",
  //     //   destination: "/auth/forgot-password",
  //     // },
  //   ];
  // },
};

export default nextConfig;
