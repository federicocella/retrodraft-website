export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',  // Protect API routes
                    '/_next/', // Protect Next.js system files
                    '/static/', // Protect static files if any
                ],
            },
        ],
        sitemap: 'https://www.retrodraft.shop/sitemap.xml', // We'll create this next
        host: 'https://www.retrodraft.shop',
    };
} 