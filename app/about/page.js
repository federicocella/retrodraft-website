// Local Components
function SectionTitle({ children }) {
    return (
        <h2 className="text-2xl text-gray-900">
            {children}
        </h2>
    );
}

function Paragraph({ children }) {
    return (
        <p className="text-gray-700 leading-relaxed mb-4">
            {children}
        </p>
    );
}

export const metadata = {
    title: 'About RetroDraft | Vintage-Style Art Prints',
    description: 'Learn about RetroDraft and our collection of unique vintage-style prints.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-white">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-slate-900 tracking-tight">About RetroDraft</h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <div className="bg-white rounded-lg p-8 space-y-8">
                    <section className="space-y-4 mb-12">
                        <SectionTitle>Our Story</SectionTitle>
                        <Paragraph>
                            I'm Federico, and RetroDraft is my passion project. As a professional designer with a love for technology, music, and creativity, I wanted to create something that combines all the things I care about. It started as a small experiment—a way to merge vintage aesthetics and modern design—and turned into a bigger commitment. RetroDraft is where nostalgia meets artistry, inspired by the beats, maps, and visuals that have shaped me over the years.
                        </Paragraph>
                    </section>

                    <section className="space-y-4 mb-12">
                        <SectionTitle>Our Prints</SectionTitle>
                        <Paragraph>
                            Every print you see here is the result of a lot of thought, care, and effort. From bold city maps that capture the energy of graffiti to typography pieces inspired by the albums and sounds I love, each design is created to bring personality and meaning to your space. All of my prints are high-quality, with either 300 DPI at A1 size for incredible detail or infinitely scalable vector graphics, so they'll look amazing no matter how you display them.
                        </Paragraph>
                        <Paragraph>
                            What you don't see is the behind-the-scenes work that goes into every series. Every series takes weeks in order to make sure each design is high quality and prints perfectly. It's a labor of love, and I hope that care comes through in the final product.
                        </Paragraph>
                    </section>

                    <section className="space-y-4 mb-12">
                        <SectionTitle>Quality & Sustainability</SectionTitle>
                        <Paragraph>
                            I believe in creating things that not only look good but feel good to buy. That's why all of my prints are also available as high-resolution digital downloads.
                            You get the flexibility to choose your local printer, paper and framing style while helping to reduce shipping and waste.
                            It's a small step toward sustainability, and it means your artwork is as personal as you want it to be.
                        </Paragraph>
                    </section>

                    <section className="space-y-4 mb-12">
                        <SectionTitle>Where to Buy</SectionTitle>
                        <Paragraph>
                            For now, my prints are only available on Etsy. Etsy has been a great starting point, and it's where you'll find my full collection while I figure out the next steps for RetroDraft.
                            If you buy through the links on this website, I'll get back some of the Etsy fees so it would be very helpful!
                        </Paragraph>
                    </section>

                    <section className="mt-12 border-t border-cream-200 pt-8">
                        <a
                            href="https://retrodraft.etsy.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-sage-500 text-white px-8 py-3 rounded-full hover:bg-sage-400 transition-colors"
                        >
                            Visit Our Etsy Shop
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}