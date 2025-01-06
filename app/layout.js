import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RetroDraft - Vintage Collectibles",
  description: "Discover unique vintage collectibles from RetroDraft",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold tracking-tighter">
                retrodraft
              </Link>
              <div className="space-x-4">
                <Link href="/" className="hover:text-sage-500">
                  Home
                </Link>
                <Link href="/about" className="hover:text-sage-500">
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
