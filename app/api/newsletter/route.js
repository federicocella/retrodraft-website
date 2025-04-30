import { NextResponse } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
            {
                method: 'POST',
                headers: {
                    Authorization: `apikey ${MAILCHIMP_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed',
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            if (data.title === 'Member Exists') {
                return NextResponse.json(
                    { message: 'You are already subscribed to our newsletter.' },
                    { status: 400 }
                );
            }
            throw new Error(data.detail || 'Failed to subscribe');
        }

        return NextResponse.json(
            { message: 'Successfully subscribed to newsletter!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { message: 'Failed to subscribe to newsletter. Please try again later.' },
            { status: 500 }
        );
    }
} 