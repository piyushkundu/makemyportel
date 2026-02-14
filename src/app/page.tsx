'use client';

import Link from 'next/link';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import servicesData from '@/data/services.json';
import { HeroButtons, FloatingCardIcons, CategoryIcon } from '@/components/IconComponents';
import EditableText from '@/components/EditableText';

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

  // Why Choose Us features
  const features = [
    { icon: '💎', title: 'Premium Quality', desc: 'High-quality work that stands out from the crowd', color: 'primary' },
    { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden costs, clear pricing in ₹ INR', color: 'accent' },
    { icon: '🚀', title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality', color: 'success' },
    { icon: '🛡️', title: 'Reliable Support', desc: '24/7 support for all your queries', color: 'primary' },
  ];

  // Process steps
  const processSteps = [
    { step: '01', title: 'Share Your Idea', desc: 'Tell us what you need', icon: '💡' },
    { step: '02', title: 'Get a Quote', desc: 'Receive transparent pricing', icon: '📋' },
    { step: '03', title: 'We Build It', desc: 'Our experts create your solution', icon: '⚙️' },
    { step: '04', title: 'Launch & Support', desc: 'Go live with ongoing support', icon: '🚀' },
  ];

  // Testimonials
  const testimonials = [
    { name: 'Rahul Sharma', role: 'Startup Founder', text: 'Amazing service! Got my website done in just 3 days. Highly recommended.', rating: 5 },
    { name: 'Priya Patel', role: 'Business Owner', text: 'The WhatsApp bot they built increased my sales by 40%. Great work!', rating: 5 },
    { name: 'Amit Kumar', role: 'Agency Owner', text: 'Professional team, transparent pricing, and excellent support. Will work again!', rating: 5 },
  ];

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
                <EditableText contentId="hero_badge" defaultValue="#1 Digital Service Provider" />
              </div>
              <h1>
                <EditableText contentId="hero_title_1" defaultValue="Build Your" tag="span" />{' '}
                <span className="text-gradient">
                  <EditableText contentId="hero_title_highlight" defaultValue="Digital Empire" tag="span" />
                </span>{' '}
                <EditableText contentId="hero_title_2" defaultValue="With Us" tag="span" />
              </h1>
              <EditableText
                contentId="hero_description"
                defaultValue="MakeMyPortal is your one-stop solution for websites, bots, branding, videos, and automation. We turn your ideas into reality with premium quality and transparent pricing."
                tag="p"
                className="hero-description"
              />
              <HeroButtons />

              {/* Quick Stats */}
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-value">
                    <EditableText contentId="stat_services" defaultValue="32+" />
                  </div>
                  <div className="stat-label">
                    <EditableText contentId="stat_services_label" defaultValue="Services Available" />
                  </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-value accent">
                    <EditableText contentId="stat_clients" defaultValue="500+" />
                  </div>
                  <div className="stat-label">
                    <EditableText contentId="stat_clients_label" defaultValue="Happy Clients" />
                  </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-value success">
                    <EditableText contentId="stat_support" defaultValue="24/7" />
                  </div>
                  <div className="stat-label">
                    <EditableText contentId="stat_support_label" defaultValue="Support" />
                  </div>
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
          <p className="trusted-text">
            <EditableText contentId="trusted_text" defaultValue="Trusted by businesses across India" />
          </p>
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
              <h2>
                <EditableText contentId="sale_title_1" defaultValue="Hot" tag="span" />{' '}
                <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  <EditableText contentId="sale_title_highlight" defaultValue="Deals" tag="span" />
                </span>
              </h2>
              <EditableText
                contentId="sale_description"
                defaultValue="Grab these exclusive discounts before they're gone!"
                tag="p"
              />
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
            <h2>
              <EditableText contentId="services_title_1" defaultValue="What We" tag="span" />{' '}
              <span className="text-gradient">
                <EditableText contentId="services_title_highlight" defaultValue="Offer" tag="span" />
              </span>
            </h2>
            <EditableText
              contentId="services_description"
              defaultValue="From websites to automation, we provide everything you need to succeed in the digital world."
              tag="p"
            />
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
            <h2>
              <EditableText contentId="popular_title_1" defaultValue="Popular" tag="span" />{' '}
              <span className="text-gradient">
                <EditableText contentId="popular_title_highlight" defaultValue="Services" tag="span" />
              </span>
            </h2>
            <EditableText
              contentId="popular_description"
              defaultValue="Our most requested services with transparent pricing in ₹ INR."
              tag="p"
            />
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
            <EditableText
              contentId="pricing_disclaimer"
              defaultValue="💡 Note: Prices shown are starting prices and may vary based on specific requirements. All prices are in Indian Rupees (₹ INR). Contact us for a custom quote."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Us?</span>
            <h2>
              <EditableText contentId="why_title_1" defaultValue="Why Choose" tag="span" />{' '}
              <span className="text-gradient">
                <EditableText contentId="why_title_highlight" defaultValue="MakeMyPortal" tag="span" />
              </span>
            </h2>
          </div>

          <div className="features-grid">
            {features.map((item, i) => (
              <div key={i} className={`feature-card feature-${item.color}`}>
                <div className="feature-icon">{item.icon}</div>
                <h4>
                  <EditableText contentId={`feature_title_${i}`} defaultValue={item.title} />
                </h4>
                <EditableText
                  contentId={`feature_desc_${i}`}
                  defaultValue={item.desc}
                  tag="p"
                />
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
            <h2>
              <EditableText contentId="process_title_1" defaultValue="Simple" tag="span" />{' '}
              <span className="text-gradient">
                <EditableText contentId="process_title_highlight" defaultValue="Process" tag="span" />
              </span>
            </h2>
          </div>

          <div className="process-grid">
            {processSteps.map((item, i) => (
              <div key={i} className="process-card">
                <div className="process-step">{item.step}</div>
                <div className="process-icon">{item.icon}</div>
                <h4>
                  <EditableText contentId={`process_title_${i}`} defaultValue={item.title} />
                </h4>
                <EditableText
                  contentId={`process_desc_${i}`}
                  defaultValue={item.desc}
                  tag="p"
                />
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
            <h2>
              <EditableText contentId="testimonials_title_1" defaultValue="What Our" tag="span" />{' '}
              <span className="text-gradient">
                <EditableText contentId="testimonials_title_highlight" defaultValue="Clients Say" tag="span" />
              </span>
            </h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((item, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-rating">
                  {'⭐'.repeat(item.rating)}
                </div>
                <p className="testimonial-text">
                  &ldquo;<EditableText contentId={`testimonial_text_${i}`} defaultValue={item.text} />&rdquo;
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="author-name">
                      <EditableText contentId={`testimonial_name_${i}`} defaultValue={item.name} />
                    </div>
                    <div className="author-role">
                      <EditableText contentId={`testimonial_role_${i}`} defaultValue={item.role} />
                    </div>
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
            <h3>
              <EditableText contentId="hosting_title" defaultValue="About Hosting" />
            </h3>
            <EditableText
              contentId="hosting_description"
              defaultValue="We build websites and digital products. We do not own a hosting platform. Hosting is an optional paid add-on, provided only if you request it. You can choose self-hosting or hosting through our assistance."
              tag="p"
            />
            <div className="disclaimer warning">
              <EditableText
                contentId="hosting_warning"
                defaultValue="⚠️ Hosting charges are optional and depend on third-party providers."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-content">
            <h2>
              <EditableText contentId="cta_title" defaultValue="Ready to Start Your Project?" />
            </h2>
            <EditableText
              contentId="cta_description"
              defaultValue="Get in touch with us today and let's bring your vision to life. We're here to help you succeed in the digital world."
              tag="p"
            />
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
