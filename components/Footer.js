'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Thank you for subscribing!');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <footer className="bg-sage-800 text-white py-12 pb-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
                    {/* Newsletter Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-1">Let's stay in touch</h3>
                        <p className="mb-6">Subscribe to our newsletter for the latest updates and exclusive offers. We promise not to spam you.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-grow px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 transition-colors"
                            >
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                        {message && (
                            <p className={`mt-2 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message}
                            </p>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-blue-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="https://retrodraft.etsy.com" className="hover:text-blue-400 transition-colors">
                                    Etsy Shop
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-blue-400 transition-colors">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Retrodraft. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
} 