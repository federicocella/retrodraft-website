'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [mounted, setMounted] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [consent, setConsent] = useState({
        analytics: false,
        marketing: false
    });
    const [showPreferences, setShowPreferences] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check if user has already made a choice
        const savedConsent = localStorage.getItem('cookieConsent');
        if (savedConsent) {
            const parsedConsent = JSON.parse(savedConsent);
            setConsent(parsedConsent);
            // Load tracking scripts based on saved consent
            if (parsedConsent.marketing) {
                loadPinterestScript();
            }
            return;
        }
        // Only show banner for EU users
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const euCountries = [
                    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'CH'
                ];
                if (euCountries.includes(data.country_code)) {
                    setShowBanner(true);
                }
            })
            .catch(() => {
                // On error, default to showing the banner (safer for compliance)
                setShowBanner(true);
            });
    }, []);

    const loadPinterestScript = () => {
        if (window.pintrk) return;

        window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments));
        };
        window.pintrk.queue = [];
        window.pintrk.version = "3.0";

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://s.pinimg.com/ct/core.js";
        document.head.appendChild(script);

        window.pintrk('load', '2613537259960');
        window.pintrk('page');
    };

    const handleAcceptAll = () => {
        const newConsent = {
            analytics: true,
            marketing: true
        };
        setConsent(newConsent);
        localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
        setShowBanner(false);
        loadPinterestScript();
    };

    const handleAcceptSelected = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        setShowBanner(false);
        if (consent.marketing) {
            loadPinterestScript();
        }
    };

    const handleDecline = () => {
        const newConsent = {
            analytics: false,
            marketing: false
        };
        setConsent(newConsent);
        localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
        setShowBanner(false);
    };

    const handleDeclineAll = () => {
        const newConsent = {
            analytics: false,
            marketing: false
        };
        setConsent(newConsent);
        localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
        setShowBanner(false);
    };

    // Don't render anything until after hydration
    if (!mounted || !showBanner) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
                aria-hidden="true"
            />
            {/* Consent Box */}
            <div
                className="fixed bottom-8 right-8 z-50 max-w-md w-full bg-white rounded-lg shadow-2xl p-6 flex flex-col gap-4 border border-gray-200"
                role="dialog"
                aria-modal="true"
                aria-label="Cookie consent"
            >
                <div className="text-gray-900 text-base">
                    <p>
                        We use cookies to improve your experience, analyze site usage, and assist in our marketing efforts. Read our{' '}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900">Cookie Policy</a>.
                    </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                    <button
                        onClick={handleAcceptAll}
                        className="flex-1 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors font-semibold"
                    >
                        Accept all cookies
                    </button>
                    <button
                        onClick={handleDeclineAll}
                        className="flex-1 px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-100 transition-colors font-semibold"
                    >
                        Refuse all
                    </button>
                </div>
                <button
                    onClick={() => setShowPreferences(true)}
                    className="text-sm text-gray-700 underline hover:text-gray-900 self-start mt-1"
                >
                    Cookie settings
                </button>
                {showPreferences && (
                    <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
                        <h4 className="font-semibold mb-2">Cookie Preferences</h4>
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                id="analytics"
                                checked={consent.analytics}
                                onChange={() => setConsent((prev) => ({ ...prev, analytics: !prev.analytics }))}
                            />
                            <label htmlFor="analytics" className="text-gray-800">Allow analytics cookies</label>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                id="marketing"
                                checked={consent.marketing}
                                onChange={() => setConsent((prev) => ({ ...prev, marketing: !prev.marketing }))}
                            />
                            <label htmlFor="marketing" className="text-gray-800">Allow marketing cookies</label>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleAcceptSelected}
                                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors text-sm font-semibold"
                            >
                                Save preferences
                            </button>
                            <button
                                onClick={() => setShowPreferences(false)}
                                className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-100 transition-colors text-sm font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
} 