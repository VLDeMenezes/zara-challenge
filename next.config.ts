import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: {
    compilationMode: "annotation",
  },
};
module.exports = {
  images: {
    remotePatterns: [
      new URL(
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/**",
      ),
    ],
  },
};
export default nextConfig;
