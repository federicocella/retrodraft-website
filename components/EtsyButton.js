'use client';

import { useState, useEffect } from 'react';

export default function EtsyButton({ url, productName }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = () => {
        if (!mounted) return;

        const consent = JSON.parse(localStorage.getItem('cookieConsent') || '{"marketing":false}');
        if (consent.marketing && window.pintrk) {
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