import { NextResponse } from 'next/server';
import { getShopListings } from '@/utils/etsy';
import { Parser } from 'json2csv';

export async function GET() {
    try {
        // Get all listings from Etsy
        const listings = await getShopListings();

        // Transform listings into Pinterest catalog format
        const pinterestCatalog = listings.map(listing => ({
            id: listing.listing_id,
            title: listing.title,
            description: listing.description,
            link: `https://retrodraft.etsy.com/listing/${listing.listing_id}`,
            image_link: listing.images[0]?.url_fullxfull || '',
            price: `${listing.price.amount / listing.price.divisor} ${listing.price.currency_code}`,
            availability: 'in stock',
            item_group_id: listing.listing_id,
            product_type: 'Digital Download',
            google_product_category: 'Apparel & Accessories > Clothing > Shirts & Tops',
            additional_image_link: listing.images.slice(1).map(img => img.url_fullxfull).join(','),
            brand: 'RetroDraft',
            condition: 'new'
        }));

        // Convert to CSV
        const fields = [
            'id', 'title', 'description', 'link', 'image_link', 'price',
            'availability', 'item_group_id', 'product_type', 'google_product_category',
            'additional_image_link', 'brand', 'condition'
        ];

        const parser = new Parser({ fields });
        const csv = parser.parse(pinterestCatalog);

        // Return CSV file
        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="pinterest-catalog.csv"'
            }
        });
    } catch (error) {
        console.error('Error generating Pinterest catalog:', error);
        return NextResponse.json({ error: 'Failed to generate catalog' }, { status: 500 });
    }
} 