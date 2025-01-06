import axios from 'axios';

// Sample data for development
const sampleListings = [
    {
        listing_id: 1853543963,
        title: "Tokyo Map Art Poster, Urban Spray Effect",
        description: "Discover the mesmerizing streets of Tokyo with this artsy urban map poster.",
        price: { amount: 829, divisor: 100 },
        url: "https://www.etsy.com/listing/1853543963/tokyo-map-art-poster-urban-spray-effect",
        images: [
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/4db451/6591699487/il_570xN.6591699487_7ju9.jpg" },
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/45938a/6591699567/il_570xN.6591699567_nfaw.jpg" },
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/821279/6543582050/il_570xN.6543582050_g0mf.jpg" }
        ]
    },
    {
        listing_id: 1853532515,
        title: "Seoul Urban Design Map Art Poster",
        description: "Explore the vibrant and dynamic city of Seoul with this artsy map poster.",
        price: { amount: 829, divisor: 100 },
        url: "https://www.etsy.com/listing/1853532515/seoul-urban-design-map-art-poster",
        images: [
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/51f377/6543603660/il_570xN.6543603660_31lt.jpg" },
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/996e99/6543541206/il_570xN.6543541206_q8o8.jpg" },
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/6f2e79/6591658405/il_570xN.6591658405_maje.jpg" }
        ]
    },
    {
        listing_id: 1839325214,
        title: "Amsterdam Urban Map Art Print",
        description: "Dive into the vibrant streets of Amsterdam with this artistic map.",
        price: { amount: 829, divisor: 100 },
        url: "https://www.etsy.com/listing/1839325214/amsterdam-urban-map-art-print-spray",
        images: [
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/0984e2/6591630801/il_570xN.6591630801_27uu.jpg" },
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/5b65d2/6543512476/il_570xN.6543512476_i8fb.jpg" },
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/b20fb0/6543512470/il_570xN.6543512470_8dbv.jpg" }
        ]
    },
    {
        listing_id: 1853476471,
        title: "Buenos Aires Map Art Poster",
        description: "Explore the vibrant streets of Buenos Aires with this digital map poster.",
        price: { amount: 829, divisor: 100 },
        url: "https://www.etsy.com/listing/1853476471/buenos-aires-map-art-poster-urban-city",
        images: [
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/3e551d/6543310958/il_570xN.6543310958_78fg.jpg" },
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/21b357/6543297888/il_570xN.6543297888_ikta.jpg" },
            { url_570xN: "https://i.etsystatic.com/53569848/r/il/767ba3/6543297894/il_570xN.6543297894_79k8.jpg" }
        ]
    }
];

// Cache object to store the listings and timestamp
let cache = {
    listings: null,
    timestamp: null
};

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

export async function getShopListings() {
    // Use sample data in development
    if (process.env.NODE_ENV === 'development') {
        console.log('Using sample data in development');
        return sampleListings;
    }

    // Check if we have valid cached data
    const now = Date.now();
    if (cache.listings && cache.timestamp && (now - cache.timestamp < CACHE_DURATION)) {
        console.log('Using cached listings data');
        return cache.listings;
    }

    // Fetch new data if cache is invalid or expired
    try {
        console.log('Fetching fresh listings data from webhook');
        const response = await axios.get(process.env.MAKECOM_WEBHOOK_URL);
        const listings = Array.isArray(response.data) ? response.data : [];

        // Update cache
        cache.listings = listings;
        cache.timestamp = now;

        return listings;
    } catch (error) {
        console.error('Error fetching listings from make.com:', error.response?.data || error);
        // Return cached data if available, even if expired
        if (cache.listings) {
            console.log('Returning expired cached data due to error');
            return cache.listings;
        }
        return [];
    }
} 