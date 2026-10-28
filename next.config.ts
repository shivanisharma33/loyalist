import type { NextConfig } from "next";

const isPreview = process.env.VERCEL_ENV === "preview";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // /about served a duplicate of the company profile; consolidate on one canonical URL.
      { source: "/about", destination: "/about/company-profile", permanent: true },
      // The previous build advertised /index as the homepage canonical.
      { source: "/index", destination: "/", permanent: true },
    ];
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      {
        source: "/:path*",
        // Keep preview deployments out of search results; production stays indexable.
        headers: isPreview ? [...security, { key: "X-Robots-Tag", value: "noindex, nofollow" }] : security,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
