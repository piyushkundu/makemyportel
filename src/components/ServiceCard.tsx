import Link from 'next/link';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

interface ServiceCardProps {
    id: string;
    name: string;
    description: string;
    priceMin: number;
    priceMax: number;
    discountPrice?: number | null;
    featured?: boolean;
    perPage?: boolean;
    category: string;
    icon?: string;
}

export default function ServiceCard({
    id,
    name,
    description,
    priceMin,
    priceMax,
    discountPrice,
    featured = false,
    perPage = false,
}: ServiceCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN').format(price);
    };

    const hasDiscount = discountPrice && discountPrice < priceMin;
    const displayPrice = hasDiscount ? discountPrice : priceMin;
    const isSinglePrice = priceMin === priceMax;

    return (
        <div className={`relative bg-white rounded-3xl p-6 border transition-all duration-500 hover:-translate-y-2 ${featured
                ? 'border-purple-200 shadow-xl shadow-purple-500/10 ring-2 ring-purple-500/20'
                : 'border-slate-200/80 shadow-lg shadow-slate-500/5 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-200'
            }`}>
            {/* Badges */}
            {featured && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-purple-500/30">
                    <Sparkles size={14} />
                    Popular
                </span>
            )}
            {hasDiscount && !featured && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-emerald-500/30">
                    <Tag size={14} />
                    Sale
                </span>
            )}

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-purple-600" />
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-slate-800 mb-2">{name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
                <span className="text-slate-400 text-lg">₹</span>
                {hasDiscount && (
                    <span className="text-slate-400 line-through text-lg">
                        {formatPrice(priceMin)}
                    </span>
                )}
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                    {formatPrice(displayPrice)}
                </span>
                {!isSinglePrice && (
                    <span className="text-slate-400">– ₹{formatPrice(priceMax)}</span>
                )}
                {perPage && <span className="text-slate-400 text-sm">/ page</span>}
            </div>

            {/* CTA Button */}
            <Link
                href={`/contact?service=${id}`}
                className={`group flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${featured
                        ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40'
                        : 'bg-slate-100 text-slate-700 hover:bg-purple-600 hover:text-white'
                    }`}
            >
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}
