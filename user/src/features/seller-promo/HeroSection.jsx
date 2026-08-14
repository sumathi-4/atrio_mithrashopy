import React, { useEffect, useRef } from 'react'
import { MEDIA } from './utils/cloudinary'

export default function HeroSection({ sellerPortalUrl }) {
  const desktopVideoRef = useRef(null)
  const mobileVideoRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      if (desktopVideoRef.current) desktopVideoRef.current.pause()
      if (mobileVideoRef.current) mobileVideoRef.current.pause()
    }
  }, [])

  const handleWatchHowItWorks = (e) => {
    e.preventDefault()
    const target = document.getElementById('how-it-works')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const registerUrl = `${sellerPortalUrl.replace(/\/$/, '')}/register`

  return (
    <section
      id="hero"
      className="relative min-h-screen h-screen flex flex-col justify-between overflow-hidden bg-black text-white font-sans pt-28 sm:pt-36"
    >
      {/* Desktop Background Video (>768px) */}
      <video
        ref={desktopVideoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={MEDIA.HERO_POSTER}
        className="hero-video-desktop absolute inset-0 w-full h-full object-cover pointer-events-none opacity-100 scale-100 z-0"
      >
        <source src={MEDIA.HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Mobile Background Video (<=768px) */}
      <video
        ref={mobileVideoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={MEDIA.HERO_POSTER}
        className="hero-video-mobile absolute inset-0 w-full h-full object-cover pointer-events-none opacity-100 scale-100 z-0"
      >
        <source src={MEDIA.HERO_VIDEO_MOBILE} type="video/mp4" />
      </video>

      {/* Pure Neutral Black Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75 z-10 pointer-events-none" />

      {/* Hero Action Bar & Header CTAs — Bulletproof left gap (80px) and bottom gap (44px) matching img1 */}
      <div className="hero-cta-container">
        
        {/* Top Clean Pill Badge with Dual Red & Green Pulsing Dots */}
        <div className="hero-pill-badge">
          <span className="hero-pill-dot-red animate-pulse" />
          <span className="hero-pill-dot-green animate-pulse" />
          <span>NEXT-GEN E-COMMERCE SELLER ECOSYSTEM</span>
        </div>

        {/* Action Buttons & Reassurance Bar */}
        <div className="flex flex-col items-start gap-2.5 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <a
              href={registerUrl}
              target="_top"
              rel="noopener noreferrer"
              className="hero-cta-btn-primary w-full sm:w-auto"
            >
              <span>Start Selling — Free</span>
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {/* Secondary CTA */}
            <a
              href="#how-it-works"
              onClick={handleWatchHowItWorks}
              className="hero-cta-btn-secondary w-full sm:w-auto"
            >
              <span>Watch How It Works</span>
              <svg className="w-4.5 h-4.5 text-[#DFB743]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* Reassurance Subtext Line — Fully Visible Above Bottom Edge */}
          <p className="hero-reassurance-text">
            JOIN 10,000+ MERCHANTS · 0% COMMISSION FOR 30 DAYS · FREE SETUP
          </p>
        </div>
      </div>
    </section>
  )
}
