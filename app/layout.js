import "./globals.css";
import Navigation from "@/components/Navigation";
import Script from 'next/script';
import Footer from '@/components/Footer'
import PinterestPageVisit from '@/components/PinterestPageVisit'

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
        <script
          id="mcjs"
          dangerouslySetInnerHTML={{
            __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/70d19528dd38a3aaecd858e64/170402af0803a7fb692b3e24f.js");`
          }}
        />
        <Script
          id="pinterest-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(e){if(!window.pintrk){window.pintrk = function () {
              window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                n=window.pintrk;n.queue=[],n.version="3.0";var
                t=document.createElement("script");t.async=!0,t.src=e;var
                r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
              pintrk('load', '2613537259960');
              pintrk('page');
            `
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} alt=""
            src="https://ct.pinterest.com/v3/?event=init&tid=2613537259960&noscript=1" />
        </noscript>
      </head>
      <body className="antialiased">
        <PinterestPageVisit />
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
