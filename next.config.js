const withNextIntl = require("next-intl/plugin")("./i18n/request.ts");

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: process.env.NODE_ENV === "development",
    fallbacks: {
        document: "/offline"
    },
    workboxOptions: {
        disableDevLogs: true,
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'google-fonts',
                    expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 }
                }
            },
            {
                urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'static-font-assets',
                    expiration: { maxEntries: 4, maxAgeSeconds: 7 * 24 * 60 * 60 }
                }
            },
            {
                urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'static-image-assets',
                    expiration: { maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 }
                }
            },
            {
                urlPattern: /\.(?:js)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'static-js-assets',
                    expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 }
                }
            },
            {
                urlPattern: /\.(?:css|less)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'static-style-assets',
                    expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 }
                }
            },
            {
                urlPattern: /\/api\/.*$/i,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'apis',
                    expiration: { maxEntries: 16, maxAgeSeconds: 24 * 60 * 60 },
                    networkTimeoutSeconds: 10
                }
            },
            {
                urlPattern: /.*/i,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'others',
                    expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
                    networkTimeoutSeconds: 10
                }
            }
        ]
    }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
    webpack: (config) => {
        config.module.rules.push({
            test: /\.map$/,
            use: "ignore-loader",
        });
        return config;
    },
};

// Bundle analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(withNextIntl(withPWA(nextConfig)));
