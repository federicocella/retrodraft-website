export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="border rounded-lg overflow-hidden shadow-lg animate-pulse">
                        <div className="w-full h-64 bg-gray-200" />
                        <div className="p-4">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                            <div className="flex justify-between items-center">
                                <div className="h-6 bg-gray-200 rounded w-1/4" />
                                <div className="h-10 bg-gray-200 rounded w-1/3" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 