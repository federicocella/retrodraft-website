'use client';
import { useState } from 'react';
import Link from 'next/link';

function formatPrice(price) {
    if (!price?.amount || !price?.divisor) {
        return 'Price not available';
    }
    return `$${(price.amount / price.divisor).toFixed(2)}`;
}

export default function ProductCard({ product }) {
    const { title, description, price, images, url, listing_id } = product;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Only switch images if there are multiple images
    const handleMouseEnter = () => {
        if (images && images.length > 1) {
            const nextIndex = (currentImageIndex + 1) % images.length;
            setCurrentImageIndex(nextIndex);
        }
    };

    // Reset to first image when mouse leaves
    const handleMouseLeave = () => {
        setCurrentImageIndex(0);
    };

    return (
        <Link href={`/product/${listing_id}`}>
            <div
                className="bg-white overflow-hidden transition-all duration-300"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="w-full bg-gray-200 flex items-center justify-center rounded-md overflow-hidden relative aspect-square">
                    {images?.map((image, index) => (
                        <img
                            key={image.url_570xN}
                            src={image.url_570xN}
                            alt={`${title} - View ${index + 1}`}
                            className={`absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    ))}
                    {!images?.length && (
                        <span className="text-gray-400">Image not available</span>
                    )}
                </div>
                <div className="p-6 flex flex-col items-center justify-center">
                    <h3 className="text-sm md:text-base mb-1 text-center text-slate-900 line-clamp-3">{title}</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            {formatPrice(price)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
} 