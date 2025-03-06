import { getBlogPosts } from '@/utils/contentful';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <article key={post.id} className="bg-white shadow-sm overflow-hidden border border-slate-200 shadow- hover:border-slate-300">
                        {post.featuredImage && (
                            <div className="relative h-48">
                                <Image
                                    src={`https:${post.featuredImage}`}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <h2 className="text-xl font-medium mb-2">
                                <Link href={`/blog/${post.slug}`} className="hover:text-sage-500">
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-block px-2 py-0.5 text-xs bg-sage-50 text-sage-800 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                                {/* {post.author && <span>By {post.author}</span>} */}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
} 