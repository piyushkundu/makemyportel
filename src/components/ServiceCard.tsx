import Link from 'next/link';

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
    icon,
}: ServiceCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN').format(price);
    };

    const hasDiscount = discountPrice && discountPrice < priceMin;
    const displayPrice = hasDiscount ? discountPrice : priceMin;
    const isSinglePrice = priceMin === priceMax;

    return (
        <div className={`price-card ${featured ? 'featured' : ''}`}>
            {featured && <span className="price-card-badge">Popular</span>}
            {hasDiscount && <span className="price-card-badge" style={{ background: 'var(--success)' }}>Sale</span>}

            {icon && (
                <div className="price-card-icon">
                    {icon}
                </div>
            )}

            <h3 className="price-card-title">{name}</h3>
            <p className="price-card-description">{description}</p>

            <div className="price-card-price">
                <span className="price-card-currency">₹</span>
                {hasDiscount && (
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-tertiary)', marginRight: '8px' }}>
                        {formatPrice(priceMin)}
                    </span>
                )}
                <span className="price-card-amount">{formatPrice(displayPrice)}</span>
                {!isSinglePrice && (
                    <span className="price-card-range">– ₹{formatPrice(priceMax)}</span>
                )}
                {perPage && <span className="price-card-range"> / page</span>}
            </div>

            <Link href={`/contact?service=${id}`} className="btn btn-primary" style={{ width: '100%' }}>
                Get Started
            </Link>
        </div>
    );
}
