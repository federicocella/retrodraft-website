function formatPrice(price) {
    if (!price?.amount || !price?.divisor) {
        return 'Price not available';
    }
    return `$${(price.amount / price.divisor).toFixed(2)}`;
}

export default function ProductCard({ product }) {
    const { title, description, price, images, url } = product;

    return (
        <div className="bg-white border overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                {images?.[0]?.url_570xN ? (
                    <img
                        src={images[0].url_570xN}
                        alt={title}
                        className="w-full h-64 object-cover"
                    />
                ) : (
                    <span className="text-gray-400">Image not available</span>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-medium mb-3">{title}</h3>
                <p className="text-slate-500 mb-4 leading-snug text-sm">
                    {description ? description.substring(0, 300) + '...' : 'No description available'}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-900">
                        {formatPrice(price)}
                    </span>
                    {url ? (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                        >
                            View on Etsy
                        </a>
                    ) : (
                        <span className="text-gray-400">Link not available</span>
                    )}
                </div>
            </div>
        </div>
    );
} 