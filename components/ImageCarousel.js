'use client';
import { useState } from 'react';

export default function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToIndex = (index) => {
        setCurrentIndex(index);
    };

    if (!images?.length) return null;

    return (
        <div className="relative w-full aspect-square">
            {/* Main Image */}
            <div className="relative w-full h-full">
                {images.map((image, index) => (
                    <img
                        key={image.url_570xN}
                        src={image.url_570xN}
                        alt={`Product view ${index + 1}`}
                        className={`absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                aria-label="Previous image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                aria-label="Next image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
} 