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

// Category icon mapping
const categoryIcons: Record<string, React.ElementType> = {
    websites: Globe,
    bots: Bot,
    design: Palette,
    video: Video,
    tools: Wrench,
    hosting: Cloud,
};

// Icon component for categories
export function CategoryIcon({ categoryId, size = 24 }: { categoryId: string; size?: number }) {
    const IconComponent = categoryIcons[categoryId] || Sparkles;
    return <IconComponent size={size} />;
}

// Floating card icons
export function FloatingCardIcons() {
    return (
        <>
            <div className="floating-card card-1">
                <Monitor size={20} />
                <span>Web Development</span>
            </div>
            <div className="floating-card card-2">
                <Cpu size={20} />
                <span>AI & Bots</span>
            </div>
            <div className="floating-card card-3">
                <Palette size={20} />
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
                <Rocket size={20} />
                <span>Explore Services</span>
            </a>
            <a href="/contact" className="btn btn-outline btn-lg">
                <MessageSquare size={20} />
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
                <div className="category-icon-badge">
                    <IconComponent size={24} />
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="category-link">
                    Explore <ArrowRight size={16} />
                </span>
            </div>
        </a>
    );
}
