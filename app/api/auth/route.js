import { NextResponse } from 'next/server';
import { generateCodeVerifier, generateCodeChallenge, generateState, authState } from '@/utils/auth';

export async function GET(request) {
    // Generate and store PKCE values
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const state = generateState();

    // Store for validation in callback
    authState.codeVerifier = codeVerifier;
    authState.state = state;

    const scopes = ['listings_r', 'shops_r'];
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.ETSY_API_KEY,
        redirect_uri: process.env.REDIRECT_URI || 'http://localhost:3001/api/auth/callback',
        scope: scopes.join(' '),
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
    });

    const authUrl = `https://www.etsy.com/oauth/connect?${params.toString()}`;
    return NextResponse.redirect(authUrl);
} 