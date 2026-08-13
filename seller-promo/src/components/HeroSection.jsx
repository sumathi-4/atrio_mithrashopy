import React, { useEffect, useRef } from 'react'
import { MEDIA } from '../utils/cloudinary'

export default function HeroSection({ sellerPortalUrl }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause()
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
      className="relative min-h-screen lg:min-h-[105vh] h-screen flex flex-col justify-between overflow-hidden bg-black text-white font-sans pt-32 sm:pt-44 pb-4 sm:pb-6"
    >
      {/* Layer 0: High-Impact Full-Height Background Video (sellr-promo-vedio.mp4 - Unobscured Video Logo & Center Text) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={MEDIA.HERO_POSTER}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-100 scale-100 z-0"
      >
        <source src={MEDIA.HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Pure Neutral Black Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75 z-10 pointer-events-none" />

      {/* Hero Action Bar & Header CTAs — Positioned Lower at Left Corner with Complete Clearance of Video Title */}
      <div className="relative z-20 flex-1 flex flex-col items-start justify-end text-left px-6 sm:px-10 lg:px-16 pb-4 sm:pb-6 max-w-7xl mx-auto w-full transform translate-y-2 sm:translate-y-4">
        
        {/* Top Clean Pill Badge with Dual Red & Green Pulsing Dots */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/80 border border-[#DFB743]/80 text-[#DFB743] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 backdrop-blur-md shadow-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Next-Gen E-Commerce Seller Ecosystem</span>
        </div>

        {/* Action Buttons & Reassurance Bar Aligned to Left Corner */}
        <div className="flex flex-col items-start gap-3 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4 w-full">
            {/* Primary CTA */}
            <a
              href={registerUrl}
              target="_top"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-9 py-4.5 bg-[#DFB743] hover:bg-[#f5d98b] text-[#051838] font-black text-base sm:text-lg rounded-2xl transition-all duration-200 shadow-2xl shadow-black/80 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 border-2 border-[#DFB743]"
            >
              <span>Start Selling — Free</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {/* Secondary CTA */}
            <a
              href="#how-it-works"
              onClick={handleWatchHowItWorks}
              className="w-full sm:w-auto px-8 py-4.5 bg-black/80 hover:bg-black/95 text-white font-bold text-base sm:text-lg rounded-2xl transition-all duration-200 border border-white/50 hover:border-white/90 backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-2xl"
            >
              <span>Watch How It Works</span>
              <svg className="w-5 h-5 text-[#DFB743]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          <p className="font-sans text-xs font-bold text-slate-100 tracking-wide uppercase drop-shadow-lg text-left pt-0.5">
            Join 10,000+ Merchants · 0% Commission for 30 Days · Free Setup
          </p>
        </div>
      </div>
    </section>
  )
}
