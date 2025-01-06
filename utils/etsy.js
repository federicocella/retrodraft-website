import axios from 'axios';

const ETSY_API_BASE_URL = 'https://openapi.etsy.com/v3';

export async function getShopListings() {
    try {
        const response = await axios.get(`${ETSY_API_BASE_URL}/application/shops/${process.env.ETSY_SHOP_ID}/listings/active`, {
            headers: {
                'x-api-key': process.env.ETSY_API_KEY,
            },
            params: {
                limit: 100,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching Etsy listings:', error.response?.data || error);
        throw error;
    }
}

export async function getListingImages(listingId) {
    try {
        const response = await axios.get(`${ETSY_API_BASE_URL}/application/listings/${listingId}/images`, {
            headers: {
                'x-api-key': process.env.ETSY_API_KEY,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching listing images:', error.response?.data || error);
        throw error;
    }
} 