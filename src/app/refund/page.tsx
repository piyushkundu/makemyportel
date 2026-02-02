import Link from 'next/link';

export default function RefundPage() {
    return (
        <div className="page-transition" style={{ paddingTop: '100px' }}>
            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ marginBottom: 'var(--space-xl)' }}>Refund <span className="text-gradient">Policy</span></h1>
                    <p style={{ marginBottom: 'var(--space-xl)', color: 'var(--text-secondary)' }}>
                        Last updated: February 2026
                    </p>

                    <div className="disclaimer" style={{ marginBottom: 'var(--space-xl)' }}>
                        💡 We strive to ensure complete customer satisfaction. Please read our refund policy carefully before making a purchase.
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>1. Eligibility for Refund</h3>
                        <p style={{ marginBottom: 'var(--space-md)' }}>
                            You may be eligible for a refund under the following circumstances:
                        </p>
                        <ul style={{ paddingLeft: 'var(--space-lg)' }}>
                            <li>Project cancelled before work begins: <strong>100% refund</strong></li>
                            <li>Project cancelled during initial phase: <strong>75% refund</strong></li>
                            <li>Project cancelled after 50% completion: <strong>25-50% refund</strong></li>
                            <li>Project delivered but not as per agreed scope: <strong>Case-by-case basis</strong></li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>2. Non-Refundable Cases</h3>
                        <p style={{ marginBottom: 'var(--space-md)' }}>
                            Refunds will NOT be provided in the following cases:
                        </p>
                        <ul style={{ paddingLeft: 'var(--space-lg)' }}>
                            <li>Project delivered as per agreed scope and approved by client</li>
                            <li>Client fails to provide required content or feedback within 30 days</li>
                            <li>Client requests changes beyond the original scope</li>
                            <li>Third-party service charges (hosting, domains, APIs)</li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>3. How to Request a Refund</h3>
                        <p style={{ marginBottom: 'var(--space-md)' }}>
                            To request a refund, please follow these steps:
                        </p>
                        <ol style={{ paddingLeft: 'var(--space-lg)' }}>
                            <li>Send an email to <strong>refund@makemyportal.com</strong></li>
                            <li>Include your project ID and reason for refund</li>
                            <li>Our team will review your request within 48 hours</li>
                            <li>If approved, refund will be processed within 7-10 business days</li>
                        </ol>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>4. Refund Processing</h3>
                        <p>
                            Approved refunds will be processed to the original payment method within
                            7-10 business days. Bank processing times may vary.
                        </p>
                    </div>

                    <div className="glass-card">
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>5. Contact Us</h3>
                        <p>
                            For refund-related queries, please contact us at:
                            <br /><br />
                            <strong>Email:</strong> refund@makemyportal.com<br />
                            <strong>Phone:</strong> +91 98765 43210
                        </p>
                    </div>

                    <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
                        <Link href="/contact" className="btn btn-primary">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
