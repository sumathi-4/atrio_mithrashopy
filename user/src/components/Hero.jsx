import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroBanner1 from '../assets/hero_main_banner.jpg';
import heroBanner2 from '../assets/hero_slider_2.jpg';
import heroBanner3 from '../assets/hero_slider_3.jpg';

const SLIDES = [
  {
    id: 1,
    image: heroBanner1,
    alt: 'Elevated Everyday - Discover Our Finest Collection of Fashion & Lifestyle Essentials',
    link: '/Shop?offers=true',
  },
  {
    id: 2,
    image: heroBanner2,
    alt: 'Womens Heritage Sarees - Shop Now',
    link: '/Shop?category=clothing&search=saree',
  },
  {
    id: 3,
    image: heroBanner3,
    alt: 'Kids Western Luxury - Premium Party Collections',
    link: '/Shop?discount=50',
  },
];

const slideVariants = {
  enter: {
    x: '100%',
    scale: 1.12,
    opacity: 0.9,
  },
  center: {
    x: '0%',
    scale: 1,
    opacity: 1,
  },
  exit: {
    x: '-100%',
    scale: 1.12,
    opacity: 0.9,
  },
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section
      id="home"
      className="hero-banner-section"
      onClick={() => navigateTo(SLIDES[currentIndex]?.link || '/Shop?offers=true')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigateTo(SLIDES[currentIndex]?.link || '/Shop?offers=true');
        }
      }}
      style={{ cursor: 'pointer', width: '100%', display: 'block', overflow: 'hidden', position: 'relative' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr',
          width: '100%',
          aspectRatio: '1024 / 381',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={SLIDES[currentIndex].id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              gridArea: '1 / 1',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              src={`${SLIDES[currentIndex].image}?v=7`}
              alt={SLIDES[currentIndex].alt}
              className="hero-clean-banner-img"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Auto Slider Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          {SLIDES.map((slide, idx) => (
            <span
              key={slide.id}
              style={{
                height: '8px',
                width: idx === currentIndex ? '32px' : '8px',
                backgroundColor: idx === currentIndex ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.45)',
                borderRadius: '9999px',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: idx === currentIndex ? '0 2px 8px rgba(0,0,0,0.35)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


