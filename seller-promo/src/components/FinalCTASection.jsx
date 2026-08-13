import React, { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { MEDIA } from '../utils/cloudinary'
import SectionReveal from './SectionReveal'

export default function FinalCTASection({ sellerPortalUrl }) {
  const portalUrl = sellerPortalUrl || 'http://localhost:5173'
  const registerUrl = `${portalUrl.replace(/\/$/, '')}/register`
  const sectionRef = useRef(null)
  const hasFiredConfetti = useRef(false)

  // Trigger Confetti Celebration automatically when entering section viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFiredConfetti.current) {
            hasFiredConfetti.current = true
            try {
              confetti({
                particleCount: 100,
                spread: 90,
                origin: { y: 0.65 },
                colors: ['#DFB743', '#0B1A40', '#ffffff', '#10B981', '#F59E0B'],
              })
            } catch (err) {
              console.warn('Viewport confetti trigger error:', err)
            }
          }
        })
      },
      { threshold: 0.35 } // Trigger when 35% of final CTA section enters viewport
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleRegisterClick = (e) => {
    e.preventDefault()
    window.location.href = registerUrl
  }

  const features = [
    {
      title: 'Easy Onboarding',
      icon: (
        <svg className="w-5 h-5 text-[#DFB743]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Zero Commission',
      icon: (
        <svg className="w-5 h-5 text-[#DFB743]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Secure & Fast Payments',
      icon: (
        <svg className="w-5 h-5 text-[#DFB743]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: '24/7 Seller Support',
      icon: (
        <svg className="w-5 h-5 text-[#DFB743]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div ref={sectionRef}>
      <SectionReveal
        id="final-cta"
        className="relative py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#05112B] text-white overflow-hidden border-b border-white/10"
      >
        {/* Background Decorative Gold Confetti Glow Effects */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#DFB743]/10 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#DFB743]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN (Cols 4): 3D Storefront Shop Illustration */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative max-w-xs sm:max-w-sm lg:max-w-full drop-shadow-2xl">
              <img
                src={MEDIA.FINAL_CTA_STOREFRONT}
                alt="3D MithraShoppy Seller Storefront & Giftboxes"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* CENTER COLUMN (Cols 5): Heading, Subtitle & Primary CTA Button */}
          <div className="lg:col-span-5 text-center lg:text-center space-y-4">
            <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest">
              YOUR NEXT CUSTOMER IS WAITING
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Start Your Seller Journey <span className="gold-gradient-text">Today</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium max-w-md mx-auto leading-relaxed">
              Join thousands of successful sellers and build your brand with India's trusted marketplace.
            </p>

            <div className="pt-2 flex justify-center">
              <a
                href={registerUrl}
                onClick={handleRegisterClick}
                aria-label="Start Selling Free on MithraShoppy"
                className="px-8 py-3.5 bg-[#DFB743] hover:bg-[#f5d98b] text-[#051838] font-extrabold text-sm sm:text-base rounded-xl transition-all duration-300 shadow-xl shadow-[#DFB743]/25 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 border-2 border-[#DFB743]"
              >
                <span>Start Selling — Free</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN (Cols 3): 4 Vertical Feature Badges */}
          <div className="lg:col-span-3 flex flex-col justify-center gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#DFB743]/15 border border-[#DFB743]/30 flex items-center justify-center shrink-0">
                  {feat.icon}
                </div>
                <span className="font-sans text-xs sm:text-sm font-bold text-white tracking-wide">
                  {feat.title}
                </span>
              </div>
            ))}
          </div>

        </div>
      </SectionReveal>
    </div>
  )
}
