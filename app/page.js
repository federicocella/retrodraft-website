import { getShopListings } from '@/utils/makecom';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

// Revalidate weekly to conserve build minutes
export const revalidate = 604800;

// Metadata for SEO
export const metadata = {
  title: 'RetroDraft | Music, Maps, and Generative Art Prints',
  description: 'Discover unique vintage-style prints',
};

export default async function HomePage() {
  const products = await getShopListings();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-sage-800">
        <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden opacity-0 animate-fade-in">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.listing_id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
