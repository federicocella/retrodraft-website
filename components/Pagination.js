'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages, basePath = '/' }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage);
        router.push(`${basePath}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex justify-center items-center space-x-4 mt-12">
            <button
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={`px-4 py-2 flex items-center ${currentPage > 1
                    ? 'text-sage-500 hover:text-sage-600 cursor-pointer'
                    : 'text-gray-300 cursor-default pointer-events-none'
                    }`}
                aria-label="Go to previous page"
                aria-hidden={currentPage <= 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <div className="flex items-center space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-9 h-9 flex items-center justify-center rounded-full ${currentPage === i + 1
                            ? 'bg-sage-500 text-white'
                            : 'text-gray-900 hover:bg-sage-100'
                            }`}
                        aria-label={`Go to page ${i + 1}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <button
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={`px-4 py-2 flex items-center ${currentPage < totalPages
                    ? 'text-sage-500 hover:text-sage-600 cursor-pointer'
                    : 'text-gray-300 cursor-default pointer-events-none'
                    }`}
                aria-label="Go to next page"
                aria-hidden={currentPage >= totalPages}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
} 