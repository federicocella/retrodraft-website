import { getShopListings } from '@/utils/makecom';
import { getHomepageSections } from '@/utils/contentful';
import ProductCard from '@/components/ProductCard';
import SortControl from '@/components/SortControl';
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import Link from 'next/link';

// Revalidate weekly to conserve build minutes
export const revalidate = 604800;

// Metadata for SEO
export const metadata = {
  title: 'RetroDraft | Music, Maps, and Generative Art Prints',
  description: 'Discover unique vintage-style generative art prints, both digital and physical',
  alternates: {
    canonical: '/',
  },
};

const ITEMS_PER_PAGE = 8;

export default async function HomePage({ searchParams }) {
  const [products, sections] = await Promise.all([
    getShopListings(),
    getHomepageSections()
  ]);

  const { page, sort = 'newest' } = await searchParams;
  const currentPage = Number(page || 1);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'price-low':
        return (a.price.amount / a.price.divisor) - (b.price.amount / b.price.divisor);
      case 'price-high':
        return (b.price.amount / b.price.divisor) - (a.price.amount / a.price.divisor);
      case 'name':
        return a.title.localeCompare(b.title);
      case 'newest':
      default:
        // Keep original array order (newest first)
        return products.indexOf(a) - products.indexOf(b);
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  // Get products for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-sage-800">
        <div className="container mx-auto px-4 py-8 sm:py-6 md:py-8">
          <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden opacity-0 animate-fade-in">
            <Image
              src="/hero.jpg"
              alt="RetroDraft Hero"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw,
                     (max-width: 768px) 90vw,
                     (max-width: 1024px) 85vw,
                     80vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />
            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h1 className="opacity-0 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white tracking-tighter animate-fade-in-up">
                Welcome to RetroDraft
              </h1>
              <p className="opacity-0 text-xs sm:text-sm uppercase text-white font-bold tracking-widest animate-fade-in-up-delay">
                Discover unique vintage-style prints
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections from Contentful */}
      {sections.map((section) => (
        <div key={section.id} className="container mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-24">
          <div className="flex flex-col md:flex-row md:gap-16 lg:gap-32 items-center md:px-8 lg:px-24">
            <div className="relative aspect-[4/3] md:aspect-square w-full md:w-1/2 mb-4 md:mb-0 mx-auto">
              <Image
                src={`https:${section.image}`}
                alt={section.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 85vw, 50vw"
              />
            </div>
            <div className="space-y-6 w-full md:w-1/2 justify-items-center md:justify-items-start">
              <span className="text-sage-500 font-medium">{section.subtitle}</span>
              <h2 className="md:text-left text-center text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 font-medium">{section.title}</h2>
              <p className="text-base md:text-left text-center sm:text-lg text-slate-600">
                {section.description}
              </p>
              {section.ctaText && section.ctaLink && (
                <Link
                  href={section.ctaLink}
                  className="inline-block px-6 py-3 bg-sage-500 text-white rounded-full hover:bg-sage-600 transition-colors"
                >
                  {section.ctaText}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Title and Sort Controls */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium tracking-tight text-gray-900">
            All Products
          </h2>
          <SortControl currentSort={sort} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.listing_id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
