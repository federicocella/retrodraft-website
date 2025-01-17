import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "RetroDraft - Vintage Collectibles",
  description: "Discover unique vintage collectibles from RetroDraft",
  metadataBase: new URL('https://www.retrodraft.shop'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
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
                <span style={{ fontFamily: 'Helvetica Neue, Inter, Arial, sans-serif' }} className="text-xl font-bold tracking-tighter cursor-pointer">
                  retrodraft
                </span>
              </Link>
              <div className="space-x-4">
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
