export default function PrivacyPage() {
    return (
        <div className="page-transition" style={{ paddingTop: '100px' }}>
            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ marginBottom: 'var(--space-xl)' }}>Privacy <span className="text-gradient">Policy</span></h1>
                    <p style={{ marginBottom: 'var(--space-xl)', color: 'var(--text-secondary)' }}>
                        Last updated: February 2026
                    </p>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>1. Information We Collect</h3>
                        <p style={{ marginBottom: 'var(--space-md)' }}>
                            We collect information you provide directly to us, such as when you:
                        </p>
                        <ul style={{ paddingLeft: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
                            <li>Create an account or request our services</li>
                            <li>Contact us via our website, email, or phone</li>
                            <li>Subscribe to our newsletter</li>
                            <li>Participate in surveys or promotions</li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>2. How We Use Your Information</h3>
                        <p style={{ marginBottom: 'var(--space-md)' }}>
                            We use the information we collect to:
                        </p>
                        <ul style={{ paddingLeft: 'var(--space-lg)' }}>
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Communicate with you about products, services, and events</li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>3. Information Sharing</h3>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties.
                            We may share your information only in the following circumstances:
                        </p>
                        <ul style={{ paddingLeft: 'var(--space-lg)', marginTop: 'var(--space-md)' }}>
                            <li>With your consent</li>
                            <li>To comply with legal obligations</li>
                            <li>To protect our rights and prevent fraud</li>
                            <li>With service providers who assist in our operations</li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>4. Data Security</h3>
                        <p>
                            We implement appropriate technical and organizational measures to protect
                            your personal information against unauthorized access, alteration, disclosure,
                            or destruction.
                        </p>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>5. Your Rights</h3>
                        <p style={{ marginBottom: 'var(--space-md)' }}>
                            You have the right to:
                        </p>
                        <ul style={{ paddingLeft: 'var(--space-lg)' }}>
                            <li>Access your personal information</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </div>

                    <div className="glass-card">
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>6. Contact Us</h3>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                            <br /><br />
                            <strong>Email:</strong> privacy@makemyportal.com<br />
                            <strong>Phone:</strong> +91 98765 43210
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
