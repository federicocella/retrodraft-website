import { getShopListings } from '@/utils/makecom';
import ProductCard from '@/components/ProductCard';

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
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to RetroDraft</h1>
          <p className="text-xl text-gray-600 mb-8">Discover unique vintage-style prints</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.listing_id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
