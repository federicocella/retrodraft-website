# Etsy API Integration Setup

This document outlines how to set up the direct Etsy API integration for the RetroDraft website.

## Environment Variables

Add the following environment variables to your `.env` file:

```
# Etsy API Configuration
ETSY_API_KEY=your_etsy_keystring
ETSY_SHARED_SECRET=your_etsy_shared_secret
ETSY_SHOP_ID=your_etsy_shop_id

# Development Settings (optional)
USE_SAMPLE_DATA=true  # Set to true to use sample data in development
```

## How to Get Your Etsy Credentials

1. Go to [Etsy Developer Portal](https://www.etsy.com/developers)
2. Sign in with your Etsy account
3. Navigate to "Your Apps" and create a new app or use an existing one
4. From your app settings, you'll find:
   - Keystring (ETSY_API_KEY)
   - Shared Secret (ETSY_SHARED_SECRET)
5. Your shop ID can be found in your shop's URL or in your shop settings

## Testing the Integration

To test that the integration is working:

1. Make sure your environment variables are set
2. Run the development server: `npm run dev`
3. The homepage should display products fetched directly from your Etsy shop

## Troubleshooting

- If you're having issues with the API in development, set `USE_SAMPLE_DATA=true` to fall back to sample data
- Check the console logs for any error messages related to the Etsy API
- Verify that your API key has the necessary permissions (should have read access to your shop listings)
- Ensure your shop ID is correct 