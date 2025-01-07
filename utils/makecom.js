import axios from 'axios';
import { sampleListings } from './mockData';

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
    // Always use fresh sample data in development
    if (process.env.NODE_ENV === 'development') {
        console.log('Using fresh sample data in development mode');
        return sampleListings;
    }

    // Check feature flag
    if (process.env.ENABLE_ETSY_WEBHOOK !== 'true') {
        console.log('Etsy webhook disabled, using sample data');
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
        console.log('Fetching fresh listings data from webhook');
        ongoingRequest = fetchListings();

        // Wait for the request and clear it from cache when done
        const listings = await ongoingRequest;
        ongoingRequest = null;

        return listings;
    } catch (error) {
        console.error('Error fetching listings from make.com:', error.response?.data || error);
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

async function fetchListings() {
    const response = await axios.get(process.env.MAKECOM_WEBHOOK_URL);
    const listings = Array.isArray(response.data) ? response.data : [];

    // Update cache
    cache.listings = listings;
    cache.timestamp = Date.now();

    return listings;
} 