import { getShopListings } from '@/utils/makecom';
import { getBlogPosts } from '@/utils/contentful';

export default async function sitemap() {
    const baseUrl = 'https://www.retrodraft.shop';

    // Get all products
    const products = await getShopListings();

    // Get all blog posts
    const blogPosts = await getBlogPosts();

    // Create product URLs
    const productUrls = products.map((product) => ({
        url: `${baseUrl}/product/${product.listing_id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Create blog post URLs
    const blogUrls = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedDate),
        changeFrequency: 'monthly',
        priority: 0.7,
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
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ];

    return [...staticPages, ...productUrls, ...blogUrls];
} 