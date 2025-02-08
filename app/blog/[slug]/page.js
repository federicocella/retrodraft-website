import { getBlogPostBySlug, getBlogPosts } from '@/utils/contentful';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

export const revalidate = 3600; // Revalidate every hour

const richTextOptions = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="mb-6">{children}</p>
        ),
        [BLOCKS.HEADING_1]: (node, children) => (
            <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        [BLOCKS.HEADING_2]: (node, children) => (
            <h2 className="text-2xl font-bold mb-3">{children}</h2>
        ),
        [BLOCKS.HEADING_3]: (node, children) => (
            <h3 className="text-xl font-bold mb-2">{children}</h3>
        ),
        [BLOCKS.UL_LIST]: (node, children) => (
            <ul className="list-disc pl-6 mb-6">{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (node, children) => (
            <ol className="list-decimal pl-6 mb-6">{children}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (node, children) => (
            <li className="mb-1">{children}</li>
        ),
        [BLOCKS.QUOTE]: (node, children) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-6">
                {children}
            </blockquote>
        ),
        [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { title, description, file } = node.data.target.fields;
            return (
                <div className="my-8">
                    <Image
                        src={`https:${file.url}`}
                        alt={description || title}
                        width={file.details.image.width}
                        height={file.details.image.height}
                        className="rounded-lg"
                    />
                    {description && (
                        <p className="text-sm text-gray-500 mt-2">{description}</p>
                    )}
                </div>
            );
        },
    },
    renderMark: {
        [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
        [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
        [MARKS.CODE]: (text) => (
            <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
                {text}
            </code>
        ),
    },
};

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | RetroDraft Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.featuredImage ? [`https:${post.featuredImage}`] : [],
        },
    };
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-8">
            <header className="max-w-5xl mx-auto mb-8">
                <h1 className="text-5xl leading-tight font-medium mb-4 tracking-tight text-slate-900">{post.title}</h1>
                <div className="flex items-center gap-4 text-slate-600 mb-6">
                    <time dateTime={post.publishedDate}>
                        {new Date(post.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    {/* {post.author && <span>By {post.author}</span>} */}
                </div>
                {post.featuredImage && (
                    <div className="relative aspect-video mb-8">
                        <Image
                            src={`https:${post.featuredImage}`}
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                )}
            </header>

            <div className="prose prose-lg text-lg max-w-3xl mx-auto">
                {documentToReactComponents(post.content, richTextOptions)}
            </div>
        </article>
    );
} 