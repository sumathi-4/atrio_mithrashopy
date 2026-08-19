import React, { useState, useEffect } from 'react';
import { Tag, Clock, Copy, Check, Gift, Flame } from 'lucide-react';
import { apiService } from '../services/apiService';
import { resolveProductImage } from '../utils/imageHelper';
import logoImg from '../assets/logo.png';
import newsletterGiftsImg from '../assets/newsletter_gifts.png';
import newsletterPerfumeImg from '../assets/newsletter_perfume.png';
import { useToast } from './ToastProvider';

export default function OffersView() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [revealedGift, setRevealedGift] = useState(false);
  const [mysteryCode, setMysteryCode] = useState('');
  const [scratching, setScratching] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 });
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast({ message: '🎉 Thank you for subscribing! Check your email for exclusive offer codes.', type: 'success' });
    setEmail('');
  };
  
  const [coupons, setCoupons] = useState([
    {
      code: "MITHRA10",
      discount: "10% OFF",
      desc: "On all clothing purchases above ₹1,499",
      expiry: "Valid till end of month"
    },
    {
      code: "FESTIVE25",
      discount: "25% OFF",
      desc: "On Premium Gift Hampers & Occasion Boxes",
      expiry: "Limited time offer"
    },
    {
      code: "GOLDEN50",
      discount: "₹500 Flat OFF",
      desc: "On luxury necklaces and accessories",
      expiry: "Exclusive user voucher"
    }
  ]);

  const [offerProducts, setOfferProducts] = useState([]);

  // 1. Live Countdown Timer running every second
  useEffect(() => {
    const target = new Date();
    target.setHours(target.getHours() + 14); // 14 hours from now
    target.setMinutes(target.getMinutes() + 45);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch real data from API
  useEffect(() => {
    // Fetch real active coupons
    apiService.getCoupons().then(data => {
      if (data && data.length > 0) {
        const active = data
          .filter(c => c.status === 'Active')
          .map(c => ({
            code: c.code,
            discount: c.discount,
            desc: `Min Cart Value: ₹${c.minCart || '0'}`,
            expiry: `Expires on ${c.expiry}`
          }));
        if (active.length > 0) {
          setCoupons(active);
        }
      }
    }).catch(() => {});

    // Fetch real products for specially discounted section
    apiService.getProducts().then(data => {
      if (data && data.length > 0) {
        // Filter products that have offers (isOffer is true, or badge contains 'OFFER'/'DEAL', or discount/originalPrice > price)
        let filtered = data.filter(p => {
          const hasOfferBadge = p.badge?.toUpperCase()?.includes('OFFER') || p.badge?.toUpperCase()?.includes('DEAL');
          const hasDiscount = p.originalPrice && parseFloat(String(p.originalPrice).replace(/[^0-9.]/g, '')) > (typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^0-9.]/g, '')));
          return p.isOffer || hasOfferBadge || hasDiscount;
        });

        // Fallback: If no products have offer indicators in backend, take the first 3 products as fallback
        if (filtered.length === 0) {
          filtered = data.slice(0, 3);
        }

        // Limit to 3 items for the grid section
        const sliced = filtered.slice(0, 3);

        const mappedOffers = sliced.map((p, idx) => {
          // Parse price
          const priceNum = typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^0-9.]/g, '')) || 299;
          
          // Determine discount percentage
          let discountPercent = 30 + (idx * 10); // fallback default
          let originalPriceNum = Math.round(priceNum / (1 - (discountPercent / 100)));

          // If product has originalPrice, use it
          if (p.originalPrice) {
            const rawOrig = parseFloat(String(p.originalPrice).replace(/[^0-9.]/g, ''));
            if (rawOrig > priceNum) {
              originalPriceNum = Math.round(rawOrig);
              discountPercent = Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100);
            }
          }

          const resolvedImg = resolveProductImage(p);

          return {
            id: p.id,
            title: p.name || p.title || 'Exclusive Product',
            originalPrice: originalPriceNum,
            price: priceNum,
            discount: `${discountPercent}% OFF`,
            image: resolvedImg,
            badge: p.badge || '', // ONLY show badge added by admin, no hardcoding
            category: p.category ? p.category.toLowerCase() : 'clothing'
          };
        });
        setOfferProducts(mappedOffers);
      }
    }).catch(() => {});
  }, []);

  // 2. Copy Code helper
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  // 3. Reveal mystery discount function
  const handleRevealGift = () => {
    if (revealedGift) return;
    setScratching(true);
    setTimeout(() => {
      const activeCodes = coupons.map(c => c.code);
      const codes = activeCodes.length > 0 ? activeCodes : ['WELCOME10', 'SUMMER30', 'FESTIVE50'];
      const randomCode = codes[Math.floor(Math.random() * codes.length)];
      setMysteryCode(randomCode);
      setScratching(false);
      setRevealedGift(true);
    }, 1200);
  };

  // Navigate to Shop and auto-open quick view for the product
  const handleViewProduct = (prodId) => {
    sessionStorage.setItem('auto_open_product_id', String(prodId));
    window.history.pushState({}, '', '/shop');
    window.dispatchEvent(new Event('popstate'));
  };

  // Navigate to Shop with offers filter enabled
  const handleViewAllOffers = () => {
    window.history.pushState({}, '', '/shop?offers=true');
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="offers-view-page" style={{ width: '100%', padding: 0 }}>
      {/* 1. Header Banner (Full Width, Large Side Images, Perfectly Centered Text) */}
      <div 
        className="newsletter-banner offers-header-banner" 
        style={{ 
          width: '100%', 
          margin: '0 0 28px 0', 
          borderRadius: '0px', 
          padding: '16px 0',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #fceaa7 0%, #f7d070 50%, #eac157 100%)',
          boxShadow: '0 4px 16px rgba(212, 175, 55, 0.15)'
        }}
      >
        <div 
          style={{ 
            maxWidth: '1280px', 
            margin: '0 auto', 
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          {/* Left Side Image */}
          <div style={{ position: 'relative', left: '0', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img 
              src={newsletterGiftsImg} 
              alt="Exclusive offers and gifts" 
              style={{ 
                height: '180px', 
                width: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.12))'
              }} 
            />
          </div>

          {/* Center Text Block - Perfectly Centered */}
          <div style={{ flex: 1, textAlign: 'center', padding: '0 36px' }}>
            <h1 
              style={{ 
                fontFamily: "'Playfair Display', Georgia, serif", 
                fontSize: '2.4rem', 
                fontWeight: 700, 
                color: '#0f172a', 
                marginBottom: '8px',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              Exclusive Offers & Deals
            </h1>
            <p 
              style={{ 
                fontSize: '1.05rem', 
                fontWeight: 500, 
                color: '#334155', 
                margin: 0,
                lineHeight: 1.5 
              }}
            >
              Unlock limited-time discounts, luxury rewards, and voucher values
            </p>
          </div>

          {/* Right Side Image - Gift Boxes Asset (Same as Left Side) */}
          <div style={{ position: 'relative', right: '0', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img 
              src={newsletterGiftsImg} 
              alt="Exclusive offers and gifts" 
              style={{ 
                height: '180px', 
                width: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.12))'
              }} 
            />
          </div>
        </div>
      </div>

      <div className="offers-container">

        {/* 2. Interactive Mystery Scratch Box (Golden Glow Premium Design) */}
        <section className="mystery-reward-section" style={{ marginBottom: '60px', display: 'flex', justifyContent: 'center' }}>
          <div 
            className="mystery-card" 
            style={{
              width: '100%',
              maxWidth: '580px',
              background: 'linear-gradient(180deg, #ffffff 0%, #fffdf2 100%)',
              border: '2.5px solid #d4af37',
              borderRadius: '28px',
              padding: '36px 32px 40px',
              textAlign: 'center',
              boxShadow: '0 0 25px rgba(212, 175, 55, 0.45), 0 12px 36px rgba(0, 0, 0, 0.06)',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            {/* Sparkle 1 (Left) */}
            <span style={{ position: 'absolute', left: '28px', top: '48%', color: '#d4af37', fontSize: '18px', opacity: 0.9, pointerEvents: 'none' }}>✨</span>
            
            {/* Sparkle 2 (Right) */}
            <span style={{ position: 'absolute', right: '28px', top: '48%', color: '#d4af37', fontSize: '18px', opacity: 0.9, pointerEvents: 'none' }}>✨</span>

            {/* Premium Realistic 3D Golden Ribbon Accents - Left (Hugging Golden Border) */}
            <svg 
              style={{ 
                position: 'absolute', 
                left: '-6px', 
                bottom: '-4px', 
                width: '65px', 
                height: '190px', 
                pointerEvents: 'none', 
                zIndex: 3 
              }} 
              viewBox="0 0 100 260" 
              fill="none"
            >
              <defs>
                <linearGradient id="goldRibbonMain" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff7ed" />
                  <stop offset="25%" stopColor="#fde047" />
                  <stop offset="55%" stopColor="#eab308" />
                  <stop offset="85%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <linearGradient id="goldRibbonFold" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="#92400e" />
                  <stop offset="100%" stopColor="#451a03" />
                </linearGradient>
                <filter id="goldRibbonGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#78350f" floodOpacity="0.3" />
                </filter>
              </defs>

              <g filter="url(#goldRibbonGlow)">
                <path 
                  d="M 5,250 C 25,230 45,210 35,185 C 20,155 -5,130 25,95 C 50,65 30,30 10,5 C 22,12 40,35 25,60 C 5,90 35,120 48,150 C 60,180 35,215 15,245 Z" 
                  fill="url(#goldRibbonMain)" 
                />
                <path 
                  d="M 35,185 C 20,155 -5,130 25,95 L 35,108 C 15,138 32,160 42,175 Z" 
                  fill="url(#goldRibbonFold)" 
                  opacity="0.85" 
                />
              </g>
            </svg>

            {/* Premium Realistic 3D Golden Ribbon Accents - Right (Hugging Golden Border) */}
            <svg 
              style={{ 
                position: 'absolute', 
                right: '-6px', 
                bottom: '-4px', 
                width: '65px', 
                height: '190px', 
                pointerEvents: 'none', 
                zIndex: 3, 
                transform: 'scaleX(-1)' 
              }} 
              viewBox="0 0 100 260" 
              fill="none"
            >
              <g filter="url(#goldRibbonGlow)">
                <path 
                  d="M 5,250 C 25,230 45,210 35,185 C 20,155 -5,130 25,95 C 50,65 30,30 10,5 C 22,12 40,35 25,60 C 5,90 35,120 48,150 C 60,180 35,215 15,245 Z" 
                  fill="url(#goldRibbonMain)" 
                />
                <path 
                  d="M 35,185 C 20,155 -5,130 25,95 L 35,108 C 15,138 32,160 42,175 Z" 
                  fill="url(#goldRibbonFold)" 
                  opacity="0.85" 
                />
              </g>
            </svg>

            <div className="mystery-card-glass" style={{ position: 'relative', zIndex: 2 }}>
              {/* Top Circular Golden Badge */}
              <div 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)', 
                  border: '2px solid #facc15',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 16px auto',
                  boxShadow: '0 6px 18px rgba(234, 179, 8, 0.3)'
                }}
              >
                <Gift className={scratching ? 'shaking' : ''} size={32} color="#b45309" />
              </div>

              {/* Title & Subtitle */}
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.9rem', color: '#1e293b', fontWeight: 700, marginBottom: '8px' }}>
                Claim Your Mystery Gift!
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '24px', lineHeight: 1.5 }}>
                Unlock exclusive offers and surprise rewards<br />
                <span style={{ fontWeight: 600, color: '#475569' }}>Just for you.</span>
              </p>

              <div className="scratch-area-box">
                {!revealedGift ? (
                  <button 
                    onClick={handleRevealGift} 
                    disabled={scratching}
                    style={{
                      background: 'linear-gradient(135deg, #fceaa7 0%, #e5c158 50%, #c39a2b 100%)',
                      color: '#3b2d04',
                      border: '1px solid #fff3b0',
                      borderRadius: '30px',
                      padding: '14px 44px',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(212, 175, 55, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {scratching ? "Scratching Card..." : "Reveal Code"}
                  </button>
                ) : (
                  <div 
                    className="animate-scale-in"
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: '#fefce8',
                      border: '2px dashed #eab308',
                      borderRadius: '20px',
                      padding: '20px 44px',
                      margin: '0 auto',
                      boxShadow: '0 4px 16px rgba(234, 179, 8, 0.12)'
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', color: '#92400e', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '6px' }}>
                      YOUR MYSTERY CODE
                    </span>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.5rem', fontWeight: 800, color: '#ca8a04', letterSpacing: '0.08em', marginBottom: '14px' }}>
                      {mysteryCode || 'LUCKY10'}
                    </span>
                    <button 
                      onClick={() => handleCopyCode(mysteryCode || 'LUCKY10')}
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid #d97706',
                        color: '#854d0e',
                        borderRadius: '24px',
                        padding: '8px 24px',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {copiedCode === (mysteryCode || 'LUCKY10') ? <Check size={16} color="#16a34a" /> : <Gift size={16} color="#d97706" />}
                      {copiedCode === (mysteryCode || 'LUCKY10') ? "Copied!" : "Copy Code"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Deal of the Day: Live Countdown (Matching Image 1) */}
        <section className="deal-of-the-day-section" style={{ marginBottom: '60px', display: 'flex', justifyContent: 'center' }}>
          <div 
            className="deal-countdown-card"
            style={{
              width: '100%',
              maxWidth: '1280px',
              background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
              border: '1.5px solid #e2e8f0',
              borderRadius: '24px',
              padding: '36px 32px 44px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Soft Yellow Waves (Left & Right Bottom Corners) */}
            <svg style={{ position: 'absolute', left: 0, bottom: 0, width: '38%', height: '90px', pointerEvents: 'none', opacity: 0.65 }} viewBox="0 0 300 100" preserveAspectRatio="none" fill="none">
              <path d="M0 100 C 100 80, 200 30, 300 100 Z" fill="#fef3c7" />
              <path d="M0 100 C 120 60, 180 40, 300 100 Z" fill="#fde68a" opacity="0.5" />
            </svg>
            <svg style={{ position: 'absolute', right: 0, bottom: 0, width: '38%', height: '90px', pointerEvents: 'none', opacity: 0.65, transform: 'scaleX(-1)' }} viewBox="0 0 300 100" preserveAspectRatio="none" fill="none">
              <path d="M0 100 C 100 80, 200 30, 300 100 Z" fill="#fef3c7" />
              <path d="M0 100 C 120 60, 180 40, 300 100 Z" fill="#fde68a" opacity="0.5" />
            </svg>

            {/* Left Side Art - 3D Golden Stopwatch / Clock (Matching Image 1) */}
            <div style={{ position: 'absolute', left: '48px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 2 }}>
              <svg width="72" height="72" viewBox="0 0 100 100" fill="none" style={{ filter: 'drop-shadow(0 8px 16px rgba(245, 158, 11, 0.35))' }}>
                <defs>
                  <linearGradient id="clockGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="40%" stopColor="#f59e0b" />
                    <stop offset="80%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
                {/* Clock Top Ring & Button */}
                <circle cx="50" cy="14" r="7" stroke="url(#clockGoldGrad)" strokeWidth="4" fill="none" />
                <rect x="46" y="20" width="8" height="6" rx="2" fill="url(#clockGoldGrad)" />
                {/* Outer Clock Body */}
                <circle cx="50" cy="58" r="34" stroke="url(#clockGoldGrad)" strokeWidth="6" fill="#ffffff" />
                {/* Clock Face Rim */}
                <circle cx="50" cy="58" r="27" fill="#fffbeb" stroke="#fef08a" strokeWidth="2" />
                {/* Clock Hands */}
                <line x1="50" y1="58" x2="50" y2="40" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="50" y1="58" x2="64" y2="65" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="50" cy="58" r="3.5" fill="#b45309" />
              </svg>
            </div>

            {/* Right Side Art - 3D Golden % Scalloped Star Badge (Matching Image 1) */}
            <div style={{ position: 'absolute', right: '48px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 2 }}>
              <svg width="72" height="72" viewBox="0 0 100 100" fill="none" style={{ filter: 'drop-shadow(0 8px 16px rgba(245, 158, 11, 0.35))' }}>
                <defs>
                  <linearGradient id="badgeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                {/* Scalloped Star Shape */}
                <path d="M50 5 L58 15 L71 11 L74 24 L87 27 L84 40 L95 47 L87 57 L95 67 L83 72 L83 85 L70 85 L64 97 L50 91 L36 97 L30 85 L17 85 L17 72 L5 67 L13 57 L5 47 L16 40 L13 27 L26 24 L29 11 L42 15 Z" fill="url(#badgeGoldGrad)" />
                {/* Percent Symbol */}
                <text x="50" y="65" textAnchor="middle" fontSize="38" fontWeight="900" fill="#ffffff" fontFamily="sans-serif">%</text>
              </svg>
            </div>

            {/* Content Centered */}
            <div style={{ position: 'relative', zIndex: 3 }}>
              {/* Top Badge: FLASH DEAL */}
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: '#fef3c7', 
                  color: '#b45309', 
                  padding: '6px 18px', 
                  borderRadius: '20px', 
                  fontSize: '0.82rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.06em', 
                  marginBottom: '14px',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.15)'
                }}
              >
                <Flame size={15} color="#d97706" />
                <span>FLASH DEAL</span>
              </div>
              
              <h2 
                style={{ 
                  fontFamily: "'Playfair Display', Georgia, serif", 
                  fontSize: '2.2rem', 
                  color: '#1e293b', 
                  fontWeight: 700, 
                  marginBottom: '8px' 
                }}
              >
                Deal of the Day
              </h2>
              <p 
                style={{ 
                  fontSize: '0.98rem', 
                  color: '#64748b', 
                  marginBottom: '28px',
                  fontWeight: 500
                }}
              >
                Hurry! Grab these amazing offers before they're gone.
              </p>

              {/* Countdown Timer Row (Matching Image 1 Soft Light Blue Boxes) */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                <div 
                  style={{
                    background: '#e0f2fe',
                    borderRadius: '16px',
                    padding: '16px 28px',
                    minWidth: '95px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(186, 230, 253, 0.45)'
                  }}
                >
                  <span style={{ display: 'block', fontSize: '2.3rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#0284c7', marginTop: '6px' }}>
                    Hours
                  </span>
                </div>

                <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0284c7' }}>:</span>

                <div 
                  style={{
                    background: '#e0f2fe',
                    borderRadius: '16px',
                    padding: '16px 28px',
                    minWidth: '95px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(186, 230, 253, 0.45)'
                  }}
                >
                  <span style={{ display: 'block', fontSize: '2.3rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#0284c7', marginTop: '6px' }}>
                    Minutes
                  </span>
                </div>

                <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0284c7' }}>:</span>

                <div 
                  style={{
                    background: '#e0f2fe',
                    borderRadius: '16px',
                    padding: '16px 28px',
                    minWidth: '95px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(186, 230, 253, 0.45)'
                  }}
                >
                  <span style={{ display: 'block', fontSize: '2.3rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#0284c7', marginTop: '6px' }}>
                    Seconds
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Active Promo Vouchers Grid */}
        <section className="promo-vouchers-section">
          <h2 className="section-block-title">Active Store Coupons</h2>
          <div className="coupons-grid">
            {coupons.map((coupon, index) => (
              <div key={index} className="coupon-card-item">
                <div className="coupon-ticket-left">
                  <span className="coupon-discount-text">{coupon.discount}</span>
                  <span className="coupon-badge-tag">MITHRASHOPY</span>
                </div>
                
                <div className="coupon-ticket-right">
                  <h3 className="coupon-title">{coupon.code}</h3>
                  <p className="coupon-desc">{coupon.desc}</p>
                  <span className="coupon-expiry">{coupon.expiry}</span>
                  
                  <button 
                    className={`coupon-copy-action ${copiedCode === coupon.code ? 'copied' : ''}`}
                    onClick={() => handleCopyCode(coupon.code)}
                  >
                    {copiedCode === coupon.code ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedCode === coupon.code ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>
                
                {/* Visual tickets notch circles */}
                <div className="ticket-notch top-notch"></div>
                <div className="ticket-notch bottom-notch"></div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Discounted Products Grid */}
        <section className="offers-products-section">
          <h2 className="section-block-title">Specially Discounted Products</h2>
          <div className="offers-grid-cards">
            {offerProducts.map((prod) => (
              <div key={prod.id} className="offer-product-item" onClick={() => handleViewProduct(prod.id)} style={{ cursor: 'pointer' }}>
                <div className="offer-img-box-wrapper">
                  <div className="offer-badge-percent">{prod.discount}</div>
                  {prod.badge && <div className="offer-badge-status">{prod.badge}</div>}
                  <img src={prod.image} alt={prod.title} className="offer-product-img" />
                  <div className="offer-img-overlay"></div>
                </div>

                <div className="offer-item-content">
                  <h3 className="offer-item-title">{prod.title}</h3>
                  <div className="offer-price-row">
                    <span className="offer-price-original">₹{prod.originalPrice}</span>
                    <span className="offer-price-discounted">₹{prod.price}</span>
                  </div>
                  
                  <button 
                    className="offer-btn-examine"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProduct(prod.id);
                    }}
                  >
                    View in Shop
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Products Button */}
          <div className="view-all-offers-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <button 
              onClick={handleViewAllOffers}
              className="view-all-offers-btn"
            >
              View All Products
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
