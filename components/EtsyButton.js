'use client';

export default function EtsyButton({ url, productName }) {
    const handleClick = () => {
        if (window.pintrk) {
            window.pintrk('track', 'lead', {
                event_id: 'eventId0001',
                line_items: [
                    {
                        product_name: productName
                    }
                ]
            });
        }
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <button
            onClick={handleClick}
            className="inline-block bg-sage-500 text-white px-8 py-3 rounded-full hover:bg-sage-400 transition-colors mt-6"
        >
            View on Etsy
        </button>
    );
} 