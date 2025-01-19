import { getShopListings } from '@/utils/makecom';
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
  const products = await getShopListings();
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
