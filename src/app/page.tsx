import Link from 'next/link';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import servicesData from '@/data/services.json';
import { HeroButtons, FloatingCardIcons, CategoryIcon } from '@/components/IconComponents';

export default function Home() {
  // Get featured services for homepage
  const featuredServices = servicesData.services.filter(s => s.featured && s.enabled).slice(0, 6);
  // Get services on sale (have discountPrice)
  const saleServices = servicesData.services.filter(s => s.discountPrice && s.enabled).slice(0, 4);
  const categories = servicesData.categories;

  // Category images from Unsplash - all unique (matching category IDs)
  const categoryImages: Record<string, string> = {
    websites: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
    bots: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    video: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
    tools: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop',
    hosting: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
  };

  // Hero image - unique
  const heroImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=500&fit=crop';

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-particles"></div>
          <div className="hero-gradient"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                #1 Digital Service Provider
              </div>
              <h1>
                Build Your <span className="text-gradient">Digital Empire</span> With Us
              </h1>
              <p className="hero-description">
                MakeMyPortal is your one-stop solution for websites, bots, branding, videos, and automation.
                We turn your ideas into reality with premium quality and transparent pricing.
              </p>
              <HeroButtons />

              {/* Quick Stats */}
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-value">32+</div>
                  <div className="stat-label">Services Available</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-value accent">500+</div>
                  <div className="stat-label">Happy Clients</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-value success">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hero-visual">
              <div className="hero-image-wrapper">
                <Image
                  src={heroImage}
                  alt="Digital Services"
                  width={600}
                  height={500}
                  className="hero-image"
                  priority
                />
                <FloatingCardIcons />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="trusted-section">
        <div className="container">
          <p className="trusted-text">Trusted by businesses across India</p>
          <div className="trusted-logos">
            {['Startups', 'Small Business', 'Enterprises', 'Agencies', 'Freelancers'].map((item, i) => (
              <div key={i} className="trusted-item">
                <span className="trusted-icon">✦</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Section - Before Services */}
      {saleServices.length > 0 && (
        <section className="section sale-section" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag sale-tag" style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', color: 'white' }}>🔥 Limited Time</span>
              <h2>Hot <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Deals</span></h2>
              <p>
                Grab these exclusive discounts before they're gone!
              </p>
            </div>

            <div className="price-grid">
              {saleServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  icon={categories.find(c => c.id === service.category)?.icon}
                />
              ))}
            </div>

            <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
              <Link href="/services" className="btn btn-primary btn-lg" style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>
                View All Deals 🔥
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Services Categories */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Services</span>
            <h2>What We <span className="text-gradient">Offer</span></h2>
            <p>
              From websites to automation, we provide everything you need to succeed in the digital world.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                href={`/services#${category.id}`}
                key={category.id}
                className="category-card"
              >
                <div className="category-image">
                  <Image
                    src={categoryImages[category.id] || categoryImages.hosting}
                    alt={category.name}
                    width={400}
                    height={200}
                    className="category-img"
                  />
                  <div className="category-overlay"></div>
                </div>
                <div className="category-content">
                  <div className="category-icon-badge">
                    <CategoryIcon categoryId={category.id} size={24} />
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="category-link">
                    Explore <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Most Popular</span>
            <h2>Popular <span className="text-gradient">Services</span></h2>
            <p>
              Our most requested services with transparent pricing in ₹ INR.
            </p>
          </div>

          <div className="price-grid">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                icon={categories.find(c => c.id === service.category)?.icon}
              />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
            <Link href="/services" className="btn btn-primary btn-lg">
              View All Services
            </Link>
          </div>

          {/* Pricing Disclaimer */}
          <div className="disclaimer" style={{ marginTop: 'var(--space-2xl)' }}>
            💡 <strong>Note:</strong> Prices shown are starting prices and may vary based on specific requirements.
            All prices are in Indian Rupees (₹ INR). Contact us for a custom quote.
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Us?</span>
            <h2>Why Choose <span className="text-gradient">MakeMyPortal</span></h2>
          </div>

          <div className="features-grid">
            {[
              { icon: '💎', title: 'Premium Quality', desc: 'High-quality work that stands out from the crowd', color: 'primary' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden costs, clear pricing in ₹ INR', color: 'accent' },
              { icon: '🚀', title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality', color: 'success' },
              { icon: '🛡️', title: 'Reliable Support', desc: '24/7 support for all your queries', color: 'primary' },
            ].map((item, i) => (
              <div key={i} className={`feature-card feature-${item.color}`}>
                <div className="feature-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h2>Simple <span className="text-gradient">Process</span></h2>
          </div>

          <div className="process-grid">
            {[
              { step: '01', title: 'Share Your Idea', desc: 'Tell us what you need', icon: '💡' },
              { step: '02', title: 'Get a Quote', desc: 'Receive transparent pricing', icon: '📋' },
              { step: '03', title: 'We Build It', desc: 'Our experts create your solution', icon: '⚙️' },
              { step: '04', title: 'Launch & Support', desc: 'Go live with ongoing support', icon: '🚀' },
            ].map((item, i) => (
              <div key={i} className="process-card">
                <div className="process-step">{item.step}</div>
                <div className="process-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                {i < 3 && <div className="process-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2>What Our <span className="text-gradient">Clients Say</span></h2>
          </div>

          <div className="testimonials-grid">
            {[
              { name: 'Rahul Sharma', role: 'Startup Founder', text: 'Amazing service! Got my website done in just 3 days. Highly recommended.', rating: 5 },
              { name: 'Priya Patel', role: 'Business Owner', text: 'The WhatsApp bot they built increased my sales by 40%. Great work!', rating: 5 },
              { name: 'Amit Kumar', role: 'Agency Owner', text: 'Professional team, transparent pricing, and excellent support. Will work again!', rating: 5 },
            ].map((item, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-rating">
                  {'⭐'.repeat(item.rating)}
                </div>
                <p className="testimonial-text">&ldquo;{item.text}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="author-name">{item.name}</div>
                    <div className="author-role">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting Notice */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="hosting-card">
            <div className="hosting-icon">☁️</div>
            <h3>About Hosting</h3>
            <p>
              We build websites and digital products. <strong>We do not own a hosting platform.</strong>
              <br /><br />
              Hosting is an optional paid add-on, provided only if you request it.
              You can choose self-hosting or hosting through our assistance.
            </p>
            <div className="disclaimer warning">
              ⚠️ Hosting charges are optional and depend on third-party providers.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>
              Get in touch with us today and let&apos;s bring your vision to life.
              We&apos;re here to help you succeed in the digital world.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-cta-primary">
                <span>📩</span> Request Service
              </Link>
              <Link href="/contact?type=quote" className="btn btn-cta-outline">
                <span>💰</span> Get Custom Price
              </Link>
              <Link href="/contact?type=expert" className="btn btn-cta-ghost">
                <span>👨‍💼</span> Talk to Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
