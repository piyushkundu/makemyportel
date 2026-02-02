export default function TermsPage() {
    return (
        <div className="page-transition" style={{ paddingTop: '100px' }}>
            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ marginBottom: 'var(--space-xl)' }}>Terms of <span className="text-gradient">Service</span></h1>
                    <p style={{ marginBottom: 'var(--space-xl)', color: 'var(--text-secondary)' }}>
                        Last updated: February 2026
                    </p>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>1. Acceptance of Terms</h3>
                        <p>
                            By accessing and using MakeMyPortal&apos;s services, you agree to be bound by these
                            Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>2. Services</h3>
                        <p style={{ marginBottom: 'var(--space-md)' }}>
                            MakeMyPortal provides digital services including but not limited to:
                        </p>
                        <ul style={{ paddingLeft: 'var(--space-lg)' }}>
                            <li>Website development and design</li>
                            <li>Bot development and automation</li>
                            <li>Graphic design and branding</li>
                            <li>Video production and editing</li>
                            <li>Custom tools and platforms</li>
                            <li>Hosting assistance (optional add-on)</li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>3. Pricing and Payment</h3>
                        <ul style={{ paddingLeft: 'var(--space-lg)' }}>
                            <li>All prices are displayed in Indian Rupees (₹ INR)</li>
                            <li>Prices shown are starting prices and may vary based on requirements</li>
                            <li>A 50% advance payment is required to start most projects</li>
                            <li>Final payment is due upon project completion</li>
                            <li>Hosting charges are optional and depend on third-party providers</li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>4. Project Delivery</h3>
                        <p style={{ marginBottom: 'var(--space-md)' }}>
                            Delivery timelines vary based on project complexity:
                        </p>
                        <ul style={{ paddingLeft: 'var(--space-lg)' }}>
                            <li>Basic projects: 5-7 business days</li>
                            <li>Standard projects: 2-3 weeks</li>
                            <li>Complex projects: 4-6 weeks</li>
                        </ul>
                        <p style={{ marginTop: 'var(--space-md)' }}>
                            Timelines will be confirmed in writing before project commencement.
                        </p>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>5. Revisions</h3>
                        <p>
                            Each project includes a reasonable number of revisions as agreed upon in the project scope.
                            Additional revisions may incur extra charges. Major scope changes after project
                            commencement will be treated as new work.
                        </p>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>6. Intellectual Property</h3>
                        <p>
                            Upon full payment, you receive full ownership rights to the deliverables created
                            specifically for your project. We retain the right to showcase completed work in
                            our portfolio unless otherwise agreed in writing.
                        </p>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>7. Refund Policy</h3>
                        <p>
                            Refunds are handled on a case-by-case basis. Generally:
                        </p>
                        <ul style={{ paddingLeft: 'var(--space-lg)', marginTop: 'var(--space-md)' }}>
                            <li>Full refund if cancelled before work begins</li>
                            <li>Partial refund based on work completed</li>
                            <li>No refund after project delivery and approval</li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>8. Limitation of Liability</h3>
                        <p>
                            MakeMyPortal shall not be liable for any indirect, incidental, special, or
                            consequential damages resulting from the use or inability to use our services.
                        </p>
                    </div>

                    <div className="glass-card">
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>9. Contact</h3>
                        <p>
                            For questions about these Terms of Service, please contact us at:
                            <br /><br />
                            <strong>Email:</strong> legal@makemyportal.com<br />
                            <strong>Phone:</strong> +91 98765 43210
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
