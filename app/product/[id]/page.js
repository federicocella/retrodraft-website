import { getShopListings } from '@/utils/etsy';
import ImageCarousel from '@/components/ImageCarousel';
import Link from 'next/link';
import Script from 'next/script';

// Generate static pages at build time
export async function generateStaticParams() {
    const products = await getShopListings();
    return products.map((product) => ({
        id: product.listing_id.toString(),
    }));
}

// Generate metadata for each product page
export async function generateMetadata({ params }) {
    const product = await getProduct(params);

    if (!product) {
        return {
            title: 'Product Not Found | RetroDraft',
            description: 'The requested product could not be found.',
        };
    }

    return {
        title: `${product.title} | RetroDraft`,
        description: product.description.slice(0, 155) + '...',
        alternates: {
            canonical: `/product/${product.listing_id}`,
        },
    };
}

// Revalidate weekly to match homepage
export const revalidate = 604800;

async function getProduct(params) {
    const products = await getShopListings();
    const { id } = await params;
    return products.find(product => product.listing_id.toString() === id.toString());
}

export default async function ProductPage({ params }) {
    const product = await getProduct(params);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium text-gray-900 mb-4">Product not found</h1>
                    <Link href="/" className="text-sage-500 hover:text-sage-400">
                        Return to homepage
                    </Link>
                </div>
            </div>
        );
    }

    const etsyUrl = `https://retrodraft.etsy.com/listing/${product.listing_id}`;

    // Structured data for search engines
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": product.images[0]?.url_570xN,
        "offers": {
            "@type": "Offer",
            "price": ((product.price?.amount || 0) / (product.price?.divisor || 100)).toFixed(2),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": etsyUrl,
            "seller": {
                "@type": "Organization",
                "name": "RetroDraft",
                "sameAs": "https://retrodraft.etsy.com"
            }
        },
        "brand": {
            "@type": "Brand",
            "name": "RetroDraft"
        },
        "additionalProperty": [{
            "@type": "PropertyValue",
            "name": "marketplace",
            "value": "Etsy"
        }]
    };

    return (
        <>
            <Script id="product-jsonld" type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </Script>
            <div className="min-h-screen bg-white py-12">
                <div className="container mx-auto px-4">
                    {/* Back Button */}
                    <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Products
                    </Link>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Image Carousel */}
                        <div className="w-full max-w-xl mx-auto">
                            <ImageCarousel images={product.images} />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <h1 className="text-3xl font-medium">{product.title}</h1>
                            <p className="text-xl font-semibold text-gray-800">
                                ${((product.price?.amount || 0) / (product.price?.divisor || 100)).toFixed(2)}
                            </p>
                            <div className="prose max-w-none">
                                <p className="text-gray-800 whitespace-pre-wrap">{product.description}</p>
                            </div>
                            <a
                                href={etsyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-sage-500 text-white px-8 py-3 rounded-full hover:bg-sage-400 transition-colors mt-6"
                            >
                                View on Etsy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 