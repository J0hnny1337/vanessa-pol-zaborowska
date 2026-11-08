// Nagłówki bezpieczeństwa dla całej strony.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }, // działa tylko po HTTPS
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Dawna zakładka „Portrety” jest teraz „Obrazy na zamówienie”.
  async redirects() {
    return [{ source: "/portrety-energetyczne", destination: "/obrazy-na-zamowienie", permanent: true }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
export default nextConfig;
