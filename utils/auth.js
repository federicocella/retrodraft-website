import crypto from 'crypto';

// Generate a random string for code verifier
export function generateCodeVerifier() {
    return crypto.randomBytes(32)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .substring(0, 128);
}

// Generate code challenge from verifier
export function generateCodeChallenge(verifier) {
    return crypto.createHash('sha256')
        .update(verifier)
        .digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

// Generate state parameter
export function generateState() {
    return crypto.randomBytes(16).toString('hex');
}

// Store auth state in memory (for development - use a proper storage in production)
export const authState = {
    codeVerifier: null,
    state: null,
}; 