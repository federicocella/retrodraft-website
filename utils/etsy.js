import axios from 'axios';
import { sampleListings } from './mockData';

// Updated API base URL - Etsy's current API endpoint domain
const ETSY_API_BASE_URL = 'https://api.etsy.com/v3';

// HTML entity decoder helper function
function decodeHtmlEntities(text) {
    if (!text) return '';

    const entities = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#x27;': "'",
        '&#x2F;': '/',
        '&#x60;': '`',
        '&#x3D;': '='
    };

    // Replace numeric entities like &#39;
    text = text.replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCharCode(dec);
    });

    // Replace named entities like &amp;
    return text.replace(/&[a-z]+;/gi, (match) => {
        return entities[match] || match;
    });
}

// Cache object to store the listings and timestamp
let cache = {
    listings: null,
    timestamp: null
};

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

// Promise cache for request deduplication
let ongoingRequest = null;

export async function getShopListings() {
    // Always use fresh sample data in development if flag is set
    if (process.env.NODE_ENV === 'development' && process.env.USE_SAMPLE_DATA === 'true') {
        console.log('Using fresh sample data in development mode');
        return sampleListings;
    }

    // Check if we have valid cached data
    const now = Date.now();
    if (cache.listings && cache.timestamp && (now - cache.timestamp < CACHE_DURATION)) {
        console.log('Using cached listings data');
        return cache.listings;
    }

    try {
        // If there's already an ongoing request, wait for it instead of making a new one
        if (ongoingRequest) {
            console.log('Using ongoing request');
            return await ongoingRequest;
        }

        // Start a new request
        console.log('Fetching fresh listings data from Etsy API');
        ongoingRequest = fetchListingsFromEtsy();

        // Wait for the request and clear it from cache when done
        const listings = await ongoingRequest;
        ongoingRequest = null;

        return listings;
    } catch (error) {
        console.error('Error fetching listings from Etsy API:', error.response?.data || error);
        ongoingRequest = null;

        // Return cached data if available, even if expired
        if (cache.listings) {
            console.log('Returning expired cached data due to error');
            return cache.listings;
        }

        // Fall back to sample data if no cache is available
        console.log('Falling back to sample data');
        return sampleListings;
    }
}

async function fetchListingsFromEtsy() {
    // Fetch active listings from shop
    const response = await axios.get(`${ETSY_API_BASE_URL}/application/shops/${process.env.ETSY_SHOP_ID}/listings/active`, {
        headers: {
            'x-api-key': process.env.ETSY_API_KEY,
        },
        params: {
            limit: 100,
            includes: 'images',
        },
    });

    // Process the listings to match the expected format
    const processedListings = await Promise.all(
        response.data.results.map(async (listing) => {
            // Fetch listing images if not included in the response
            let images = [];
            if (!listing.images) {
                try {
                    const imagesResponse = await getListingImages(listing.listing_id);
                    images = imagesResponse;
                } catch (error) {
                    console.error(`Error fetching images for listing ${listing.listing_id}:`, error);
                    images = [];
                }
            } else {
                images = listing.images;
            }

            return {
                listing_id: listing.listing_id.toString(),
                title: decodeHtmlEntities(listing.title),
                description: decodeHtmlEntities(listing.description),
                price: {
                    amount: listing.price.amount,
                    divisor: listing.price.divisor,
                    currency_code: listing.price.currency_code
                },
                images: images.map(image => ({
                    listing_image_id: image.listing_image_id,
                    url_75x75: image.url_75x75,
                    url_170x135: image.url_170x135,
                    url_570xN: image.url_570xN,
                    url_fullxfull: image.url_fullxfull
                }))
            };
        })
    );

    // Update cache
    cache.listings = processedListings;
    cache.timestamp = Date.now();

    return processedListings;
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