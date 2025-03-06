import { createClient } from 'contentful';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getBlogPosts() {
    try {
        const response = await client.getEntries({
            content_type: 'shopifyBlogPage',
            order: '-fields.publishedDate',
        });

        return response.items.map((item) => {
            // Clean up the fallback URL if it exists
            const fallbackUrl = item.fields.featuredImageFallbackUrl?.startsWith('https:')
                ? item.fields.featuredImageFallbackUrl.replace('https:', '')
                : item.fields.featuredImageFallbackUrl;

            return {
                id: item.sys.id,
                title: item.fields.title,
                slug: item.fields.slug,
                publishedDate: item.fields.publishedDate,
                content: item.fields.content,
                excerpt: item.fields.excerpt,
                featuredImage: item.fields.featuredImage?.fields?.file?.url || fallbackUrl || null,
                author: item.fields.author,
                tags: item.fields.tags || [],
            };
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPostBySlug(slug) {
    try {
        const response = await client.getEntries({
            content_type: 'shopifyBlogPage',
            'fields.slug': slug,
            limit: 1,
        });

        if (!response.items.length) {
            return null;
        }

        const post = response.items[0];
        // Clean up the fallback URL if it exists
        const fallbackUrl = post.fields.featuredImageFallbackUrl?.startsWith('https:')
            ? post.fields.featuredImageFallbackUrl.replace('https:', '')
            : post.fields.featuredImageFallbackUrl;

        return {
            id: post.sys.id,
            title: post.fields.title,
            slug: post.fields.slug,
            publishedDate: post.fields.publishedDate,
            content: post.fields.content,
            excerpt: post.fields.excerpt,
            featuredImage: post.fields.featuredImage?.fields?.file?.url || fallbackUrl || null,
            author: post.fields.author,
            tags: post.fields.tags || [],
        };
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export async function getHomepageSections() {
    try {
        const response = await client.getEntries({
            content_type: 'homepageSection',
            order: 'fields.order',
        });

        return response.items.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            subtitle: item.fields.subtitle,
            description: item.fields.description?.content?.[0]?.content?.[0]?.value || item.fields.description || '',
            image: item.fields.image?.fields?.file?.url + '?w=1200&fm=webp&q=75',
            ctaText: item.fields.ctaText,
            ctaLink: item.fields.ctaLink,
            order: item.fields.order,
        }));
    } catch (error) {
        console.error('Error fetching homepage sections:', error);
        return [];
    }
} 