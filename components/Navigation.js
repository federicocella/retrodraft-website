'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

function MobileNav({ isOpen, setIsOpen }) {
    return (
        <div
            className={`fixed inset-0 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out z-30`}
        >
            <div className="absolute inset-0 bg-white shadow-xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-xl">Menu</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="p-4">
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="text-lg py-2 hover:text-sage-500"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className="text-lg py-2 hover:text-sage-500"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="text-lg py-2 hover:text-sage-500"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default function Navigation() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <>
            <nav className="bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
                            <Image
                                src="/icon.svg"
                                alt="RetroDraft Logo"
                                width={24}
                                height={24}
                                className="w-6 h-6 cursor-pointer"
                            />
                            <span style={{ fontFamily: 'TT Norms Pro', fontWeight: 500 }} className="text-xl tracking-tighter cursor-pointer">
                                retrodraft
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            <Link href="/" className="hover:text-sage-500">
                                Home
                            </Link>
                            <Link href="/blog" className="hover:text-sage-500">
                                Blog
                            </Link>
                            <Link href="/about" className="hover:text-sage-500">
                                About
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMobileNavOpen(true)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} />
        </>
    );
} 