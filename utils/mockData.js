import sampleData from './sampledata.json';

// Helper function to convert image fields to our format
function convertImages(item) {
    const images = [];
    for (let i = 1; i <= 10; i++) {
        const imageUrl = item[`IMAGE${i}`];
        if (imageUrl) {
            images.push({ url_570xN: imageUrl });
        }
    }
    return images;
}

// Convert price to our format
function convertPrice(price) {
    return {
        amount: Math.round(price * 100),
        divisor: 100
    };
}

// Convert each listing to our format
export const sampleListings = sampleData.map((item, index) => ({
    listing_id: (1853476471 + index).toString(), // Maintain the same listing IDs we had before
    title: item.TITLE,
    description: item.DESCRIPTION,
    price: convertPrice(item.PRICE),
    images: convertImages(item)
})); 