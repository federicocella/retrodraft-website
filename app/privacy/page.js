import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | RetroDraft',
    description: 'Learn about how RetroDraft collects and uses your data.',
    alternates: {
        canonical: 'https://www.retrodraft.shop/privacy',
    },
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white py-12 pb-32">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-semibold mb-8">Privacy Policy</h1>

                <div className="prose max-w-none">
                    <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                        <p>
                            At RetroDraft, we take your privacy seriously. This Privacy Policy explains how we collect,
                            use, and protect your personal information when you visit our website.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                        <h3 className="text-xl font-medium mb-2">Cookies and Tracking Technologies</h3>
                        <p>We use the following types of cookies:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>
                                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website
                            </li>
                            <li>
                                <strong>Marketing Cookies:</strong> Used for Pinterest tracking to measure the effectiveness of our marketing campaigns
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                        <p>We use the collected information to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Improve our website and user experience</li>
                            <li>Analyze website traffic and usage patterns</li>
                            <li>Measure the effectiveness of our marketing campaigns</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Your Rights Under GDPR</h2>
                        <p>Under the General Data Protection Regulation (GDPR), you have the following rights:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Right to access your personal data</li>
                            <li>Right to rectification of inaccurate data</li>
                            <li>Right to erasure ("right to be forgotten")</li>
                            <li>Right to restrict processing</li>
                            <li>Right to data portability</li>
                            <li>Right to object to processing</li>
                            <li>Right to withdraw consent</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                        <p>We use the following third-party services:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>
                                <strong>Pinterest:</strong> For tracking marketing campaign effectiveness.
                                <a
                                    href="https://policy.pinterest.com/en/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sage-500 hover:text-sage-400 ml-1"
                                >
                                    View Pinterest's Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy or would like to exercise your rights,
                            please contact us at:
                        </p>
                        <p className="mt-2">
                            <a
                                href="mailto:privacy@retrodraft.shop"
                                className="text-sage-500 hover:text-sage-400"
                            >
                                privacy@retrodraft.shop
                            </a>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Cookie Management</h2>
                        <p>
                            You can manage your cookie preferences at any time by clicking the "Cookie Preferences"
                            button in the footer of our website.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
} 