'use client';

export default function SortControl({ currentSort }) {
    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm text-gray-600">
                Sort by:
            </label>
            <div className="relative">
                <select
                    id="sort"
                    name="sort"
                    className="appearance-none text-sm bg-slate-100 pr-8 pl-3 py-2.5 rounded-md focus:ring-sage-500 focus:border-sage-500"
                    defaultValue={currentSort}
                    onChange={(e) => {
                        const url = new URL(window.location.href);
                        url.searchParams.set('sort', e.target.value);
                        window.location.href = url.toString();
                    }}
                >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
} 