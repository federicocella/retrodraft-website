import axios from 'axios';

// Sample data for development
const sampleListings = [
    {
        listing_id: 1853543963,
        title: "Tokyo Map Art Poster, Urban Spray Effect",
        description: "Discover the mesmerizing streets of Tokyo with this artsy urban map poster.",
        price: { amount: 829, divisor: 100 },
        url: "https://www.etsy.com/listing/1853543963/tokyo-map-art-poster-urban-spray-effect",
        images: [{ url_570xN: "https://i.etsystatic.com/53569848/r/il/4db451/6591699487/il_570xN.6591699487_7ju9.jpg" }]
    },
    {
        listing_id: 1853532515,
        title: "Seoul Urban Design Map Art Poster",
        description: "Explore the vibrant and dynamic city of Seoul with this artsy map poster.",
        price: { amount: 829, divisor: 100 },
        url: "https://www.etsy.com/listing/1853532515/seoul-urban-design-map-art-poster",
        images: [{ url_570xN: "https://i.etsystatic.com/53569848/r/il/51f377/6543603660/il_570xN.6543603660_31lt.jpg" }]
    },
    {
        listing_id: 1839325214,
        title: "Amsterdam Urban Map Art Print",
        description: "Dive into the vibrant streets of Amsterdam with this artistic map.",
        price: { amount: 829, divisor: 100 },
        url: "https://www.etsy.com/listing/1839325214/amsterdam-urban-map-art-print-spray",
        images: [{ url_570xN: "https://i.etsystatic.com/53569848/r/il/0984e2/6591630801/il_570xN.6591630801_27uu.jpg" }]
    },
    {
        listing_id: 1853476471,
        title: "Buenos Aires Map Art Poster",
        description: "Explore the vibrant streets of Buenos Aires with this digital map poster.",
        price: { amount: 829, divisor: 100 },
        url: "https://www.etsy.com/listing/1853476471/buenos-aires-map-art-poster-urban-city",
        images: [{ url_570xN: "https://i.etsystatic.com/53569848/r/il/3e551d/6543310958/il_570xN.6543310958_78fg.jpg" }]
    }
];

export async function getShopListings() {
    try {
        // For development, return sample data instead of making API call
        return sampleListings;
    } catch (error) {
        console.error('Error fetching listings:', error);
        return [];
    }
} 