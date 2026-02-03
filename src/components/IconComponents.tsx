'use client';

import {
    Globe,
    Bot,
    Palette,
    Video,
    Wrench,
    Cloud,
    Rocket,
    MessageSquare,
    Monitor,
    Cpu,
    Sparkles,
    ArrowRight
} from 'lucide-react';

// Category colors - vibrant and premium
const categoryColors: Record<string, { bg: string; color: string; gradient: string }> = {
    websites: {
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        gradient: '#667eea'
    },
    bots: {
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: '#fff',
        gradient: '#f093fb'
    },
    design: {
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: '#fff',
        gradient: '#4facfe'
    },
    video: {
        bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        color: '#fff',
        gradient: '#fa709a'
    },
    tools: {
        bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        color: '#1a1a2e',
        gradient: '#a8edea'
    },
    hosting: {
        bg: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
        color: '#fff',
        gradient: '#5ee7df'
    },
};

// Category icon mapping
const categoryIcons: Record<string, React.ElementType> = {
    websites: Globe,
    bots: Bot,
    design: Palette,
    video: Video,
    tools: Wrench,
    hosting: Cloud,
};

// Icon component for categories with colorful background
export function CategoryIcon({ categoryId, size = 24 }: { categoryId: string; size?: number }) {
    const IconComponent = categoryIcons[categoryId] || Sparkles;
    const colors = categoryColors[categoryId] || { bg: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff' };

    return (
        <div
            className="category-icon-wrapper"
            style={{
                background: colors.bg,
                width: size + 32,
                height: size + 32,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 24px ${colors.gradient}40`,
            }}
        >
            <IconComponent size={size} color={colors.color} strokeWidth={2.5} />
        </div>
    );
}

// Floating card icons with colors
export function FloatingCardIcons() {
    return (
        <>
            <div className="floating-card card-1">
                <div className="floating-icon" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                    <Monitor size={18} color="#fff" strokeWidth={2.5} />
                </div>
                <span>Web Development</span>
            </div>
            <div className="floating-card card-2">
                <div className="floating-icon" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
                    <Cpu size={18} color="#fff" strokeWidth={2.5} />
                </div>
                <span>AI & Bots</span>
            </div>
            <div className="floating-card card-3">
                <div className="floating-icon" style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
                    <Palette size={18} color="#fff" strokeWidth={2.5} />
                </div>
                <span>Design</span>
            </div>
        </>
    );
}

// Hero button icons
export function HeroButtons() {
    return (
        <div className="hero-cta">
            <a href="/services" className="btn btn-primary btn-lg">
                <Rocket size={20} strokeWidth={2.5} />
                <span>Explore Services</span>
            </a>
            <a href="/contact" className="btn btn-outline btn-lg">
                <MessageSquare size={20} strokeWidth={2.5} />
                <span>Get Custom Quote</span>
            </a>
        </div>
    );
}

// Category card component
export function CategoryCard({
    category,
    imageUrl
}: {
    category: { id: string; name: string; description: string };
    imageUrl: string;
}) {
    const IconComponent = categoryIcons[category.id] || Sparkles;
    const colors = categoryColors[category.id] || { bg: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff' };

    return (
        <a href={`/services#${category.id}`} className="category-card">
            <div className="category-image">
                <img
                    src={imageUrl}
                    alt={category.name}
                    className="category-img"
                    loading="lazy"
                />
                <div className="category-overlay"></div>
            </div>
            <div className="category-content">
                <div
                    className="category-icon-badge"
                    style={{
                        background: colors.bg,
                        boxShadow: `0 8px 24px ${colors.gradient}40`,
                    }}
                >
                    <IconComponent size={24} color={colors.color} strokeWidth={2.5} />
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="category-link">
                    Explore <ArrowRight size={16} strokeWidth={2.5} />
                </span>
            </div>
        </a>
    );
}
