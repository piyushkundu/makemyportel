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

// Icon component for categories - consistent purple styling
export function CategoryIcon({ categoryId, size = 24 }: { categoryId: string; size?: number }) {
    const IconComponent = categoryIcons[categoryId] || Sparkles;

    return (
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/30 border-2 border-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <IconComponent size={size} className="text-white" strokeWidth={2.5} />
        </div>
    );
}

// Floating card icons with premium styling
export function FloatingCardIcons() {
    return (
        <>
            <div className="absolute -left-4 top-1/4 flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 animate-float">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-md shadow-purple-500/30">
                    <Monitor size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-slate-800">Web Development</span>
            </div>

            <div className="absolute -right-4 top-1/3 flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-md shadow-purple-500/30">
                    <Cpu size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-slate-800">AI & Bots</span>
            </div>

            <div className="absolute left-8 bottom-8 flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 animate-float" style={{ animationDelay: '4s' }}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-md shadow-purple-500/30">
                    <Palette size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-slate-800">Design</span>
            </div>
        </>
    );
}

// Hero button icons with premium styling - consistent purple
export function HeroButtons() {
    return (
        <div className="flex flex-wrap gap-4">
            <a
                href="/services"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold rounded-2xl shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300"
            >
                <Rocket size={22} strokeWidth={2.5} />
                <span>Explore Services</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-purple-200 text-purple-600 font-semibold rounded-2xl shadow-lg shadow-purple-500/10 hover:border-purple-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
                <MessageSquare size={22} strokeWidth={2.5} />
                <span>Get Custom Quote</span>
            </a>
        </div>
    );
}

// Category card component - consistent purple theme
export function CategoryCard({
    category,
    imageUrl
}: {
    category: { id: string; name: string; description: string };
    imageUrl: string;
}) {
    const IconComponent = categoryIcons[category.id] || Sparkles;

    return (
        <a href={`/services#${category.id}`} className="group block bg-white rounded-3xl overflow-hidden border border-purple-100/50 shadow-lg shadow-purple-500/5 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-3 transition-all duration-500">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6 relative">
                <div className="absolute -top-8 left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-xl shadow-purple-500/40 border-4 border-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <IconComponent size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{category.name}</h3>
                <p className="mt-2 text-slate-500 leading-relaxed">{category.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={18} />
                </span>
            </div>
        </a>
    );
}
