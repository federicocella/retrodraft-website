import { getShopListings } from '@/utils/makecom';

export default async function sitemap() {
    const baseUrl = 'https://www.retrodraft.shop';

    // Get all products
    const products = await getShopListings();

    // Create product URLs
    const productUrls = products.map((product) => ({
        url: `${baseUrl}/product/${product.listing_id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    return [...staticPages, ...productUrls];
} 