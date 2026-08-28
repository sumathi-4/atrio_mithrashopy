import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import promoBanner1 from '../assets/promo_banner_1.jpg';
import promoBanner2 from '../assets/promo_banner_2.jpg';
import promoBanner3 from '../assets/promo_banner_3.jpg';
import sellerBannerImg from '../assets/seller_banner_promo.png';

const PROMO_SLIDES = [
  {
    id: 1,
    image: promoBanner1,
    title: 'Fashion Sale 50% Off',
  },
  {
    id: 2,
    image: promoBanner2,
    title: 'Elevate Your Style - Platinum Collection',
  },
  {
    id: 3,
    image: promoBanner3,
    title: 'Special Offer Summer Sale - Up to 50% Off',
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.02,
    opacity: 0.9,
  }),
  center: {
    x: '0%',
    scale: 1,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    scale: 1.02,
    opacity: 0.9,
  }),
};

export default function VideoShowcase() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const currentIndex = ((page % PROMO_SLIDES.length) + PROMO_SLIDES.length) % PROMO_SLIDES.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const goToSlide = (slideIndex) => {
    const dir = slideIndex > currentIndex ? 1 : -1;
    setPage([slideIndex, dir]);
  };

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4500);
    return () => clearInterval(timer);
  }, [page, isPlaying, isHovered]);

  const handleNavigateToShop = () => {
    window.history.pushState({}, '', '/Shop?discount=50');
    window.dispatchEvent(new Event('popstate'));
  };

  const handleNavigateToSeller = () => {
    const portalUrl = import.meta.env.VITE_SELLER_PORTAL_URL ||
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5176'
        : 'https://mithrashopy-seller.netlify.app');
    window.location.href = `${portalUrl}/login`;
  };

  return (
    <section className="video-showcase-section" style={{ padding: '16px 0 20px', background: '#fff' }}>
      <div
        className="ajio-slider-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '95%',
          maxWidth: '1280px',
          margin: '0 auto',
          borderRadius: '20px',
          overflow: 'hidden',
          aspectRatio: '1024 / 380',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(229, 207, 156, 0.5)',
          backgroundColor: '#ffffff',
          cursor: 'pointer',
        }}
      >
        {/* Animated Banner Slide */}
        <div
          onClick={handleNavigateToShop}
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 280, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              style={{
                gridArea: '1 / 1',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <img
                src={`${PROMO_SLIDES[currentIndex].image}?v=2`}
                alt={PROMO_SLIDES[currentIndex].title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AJIO Style Bottom Control Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '0',
            right: '0',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {/* Bottom-Left: Play / Pause Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            aria-label={isPlaying ? 'Pause Slider' : 'Play Slider'}
            style={{
              pointerEvents: 'auto',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.25s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.95)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)')}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
          </button>

          {/* Bottom-Center: AJIO Capsule Indicator Bar */}
          <div
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          >
            {PROMO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    height: '8px',
                    width: isActive ? '36px' : '14px',
                    borderRadius: '999px',
                    backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                    border: isActive ? '1px solid rgba(223, 183, 67, 0.9)' : 'none',
                    boxShadow: isActive ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              );
            })}
          </div>

          {/* Bottom-Right: Prev / Next Navigation Arrows */}
          <div
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              aria-label="Previous Slide"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px 0 0 8px',
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.95)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)')}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              aria-label="Next Slide"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '0 8px 8px 0',
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.95)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Global Sellers Connect / Become a Supplier Banner */}
      <div
        onClick={handleNavigateToSeller}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleNavigateToSeller();
        }}
        aria-label="Become a Supplier / Global Sellers Connect"
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '8px 0 0',
          borderRadius: '0px',
          overflow: 'hidden',
          boxShadow: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <img
          src={`${sellerBannerImg}?v=5`}
          alt="Become a Seller - Global Sellers Connect"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover',
          }}
        />
      </div>
    </section>
  );
}
