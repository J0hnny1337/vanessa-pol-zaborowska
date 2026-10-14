import { withPayload } from "@payloadcms/next/withPayload";

// Nagłówki bezpieczeństwa dla całej strony i panelu.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" }, // panel pokazuje podgląd strony w ramce z tego samego adresu
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }, // działa tylko po HTTPS
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // Zdjęcia z Vercel Blob (adres sklepu różni się dla każdego projektu).
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
export default withPayload(nextConfig);
