import React from 'react';
import { Star, Sparkles, Banknote, Tag, Shield } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: <Star size={22} strokeWidth={1.8} />, title: 'PREMIUM QUALITY', sub: 'Handpicked Collections' },
  { icon: <Sparkles size={22} strokeWidth={1.8} />, title: 'EXCLUSIVE CATEGORY', sub: 'Curated Choices' },
  { icon: <Banknote size={22} strokeWidth={1.8} />, title: 'CASH ON DELIVERY', sub: 'COD Available' },
  { icon: <Tag size={22} strokeWidth={1.8} />, title: 'LOWEST PRICE', sub: 'Best Price Guaranteed' },
  { icon: <Shield size={22} strokeWidth={1.8} />, title: 'SECURE PAYMENT', sub: '100% Safe & Encrypted' },
];

export default function TrustBar() {
  return (
    <div className="trust-bar-section">
      <div className="trust-bar-container">
        {TRUST_ITEMS.map((item, i) => (
          <React.Fragment key={i}>
            <div className="trust-bar-item">
              <span className="trust-bar-icon">{item.icon}</span>
              <div className="trust-bar-text">
                <span className="trust-bar-title">{item.title}</span>
                <span className="trust-bar-sub">{item.sub}</span>
              </div>
            </div>
            {i < TRUST_ITEMS.length - 1 && <div className="trust-bar-divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

