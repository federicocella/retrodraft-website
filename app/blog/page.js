import { getBlogPosts } from '@/utils/contentful';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/components/Pagination';

export const revalidate = 3600; // Revalidate every hour

// Number of blog posts per page
const POSTS_PER_PAGE = 9;

export const metadata = {
    title: "RetroDraft's Blog | Vintage Collectibles",
    description: "Read about vintage collectibles, art prints, and more on RetroDraft's blog.",
    alternates: {
        canonical: 'https://www.retrodraft.shop/blog',
    },
};

export default async function BlogPage({ searchParams }) {
    const posts = await getBlogPosts();

    // Get the current page from URL parameters
    const { page } = await searchParams;
    const currentPage = Number(page || 1);

    // Calculate total pages and posts for current page
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, endIndex);

    return (<div>
        <div className="bg-sage-800 h-72 flex justify-end flex-col">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold mb-3 text-white">Retrodraft's Blog</h1>
            </div>
        </div>
        <div className="container mx-auto px-4 py-8 pt-16 pb-24">

            {/* Blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts.map((post) => (
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
                            <Link href={`/blog/${post.slug}`} className="text-sage-500 hover:text-sage-400 font-medium">Read the post</Link>
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

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/blog"
                />
            )}
        </div>
    </div >
    );
} 