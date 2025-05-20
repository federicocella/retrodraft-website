'use client';

import { useEffect } from 'react';

export default function PinterestPageVisit() {
    useEffect(() => {
        if (window.pintrk) {
            window.pintrk('track', 'pagevisit', {
                event_id: 'eventId0001'
            });
        }
    }, []);

    return null;
} 