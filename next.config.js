/** @type {import('next').NextConfig} */
const nextconfig = {
    reactStrictMode: true,
    experimental: { typedRoutes: true },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "Permissions-Policy", value: "microphone=()" }
                ]
            }
        ];
    }
};
module.exports = nextconfig;