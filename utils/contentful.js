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

        return response.items.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            slug: item.fields.slug,
            publishedDate: item.fields.publishedDate,
            content: item.fields.content,
            excerpt: item.fields.excerpt,
            featuredImage: item.fields.featuredImage?.fields?.file?.url,
            author: item.fields.author,
        }));
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
        return {
            id: post.sys.id,
            title: post.fields.title,
            slug: post.fields.slug,
            publishedDate: post.fields.publishedDate,
            content: post.fields.content,
            excerpt: post.fields.excerpt,
            featuredImage: post.fields.featuredImage?.fields?.file?.url,
            author: post.fields.author,
        };
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
} 