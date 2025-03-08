export default async function sitemap() {
    const baseUrl = 'https://www.retrodraft.shop';

    try {
        // Get all products
        const products = await getShopListings();
        const blogPosts = await getBlogPosts();

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
            {
                url: `${baseUrl}/blog`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.9,
            },
        ];

        // Product URLs
        const productUrls = products.map((product) => ({
            url: `${baseUrl}/product/${product.listing_id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

        // Blog URLs
        const blogUrls = blogPosts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.publishedDate),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));

        return [...staticPages, ...productUrls, ...blogUrls];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return staticPages;
    }
} 