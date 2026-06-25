import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático: genera HTML/CSS/JS puro en /out → hosting gratis en Firebase
  output: "export",
  // /blog -> /blog/  y emite blog/index.html (rutas amigables en hosting estático)
  trailingSlash: true,
  // Sin servidor de optimización de imágenes (no hay backend en export estático)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
