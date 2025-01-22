import "./globals.css";
import Navigation from "@/components/Navigation";
import Script from 'next/script';

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
  other: {
    'p:domain_verify': '0663ef8d25fc695097915b42dccfa4b7',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="825e4a55-c44f-4bec-815b-6c52afb71638"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
