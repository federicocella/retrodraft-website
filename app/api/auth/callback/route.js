import { NextResponse } from 'next/server';
import axios from 'axios';
import { authState } from '@/utils/auth';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // Validate state to prevent CSRF
    if (!state || state !== authState.state) {
        return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    try {
        const tokenResponse = await axios.post('https://api.etsy.com/v3/public/oauth/token', {
            grant_type: 'authorization_code',
            client_id: process.env.ETSY_API_KEY,
            redirect_uri: process.env.REDIRECT_URI || 'http://localhost:3001/api/auth/callback',
            code: code,
            code_verifier: authState.codeVerifier,
        });

        const { access_token, refresh_token } = tokenResponse.data;

        // In a production environment, you would want to securely store these tokens
        // For development, we'll store them in environment variables
        process.env.ETSY_ACCESS_TOKEN = access_token;
        process.env.ETSY_REFRESH_TOKEN = refresh_token;

        // Clear the auth state
        authState.codeVerifier = null;
        authState.state = null;

        return NextResponse.redirect('/products');
    } catch (error) {
        console.error('Error exchanging code for token:', error.response?.data || error);
        return NextResponse.json({
            error: 'Failed to exchange code for token',
            details: error.response?.data
        }, { status: 500 });
    }
} 