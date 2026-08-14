import React, { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { MEDIA } from './utils/cloudinary'
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
      { threshold: 0.35 }
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
        watermark="JOIN TODAY"
        className="final-cta-section"
      >
        <div className="final-cta-container">
          <div className="final-cta-grid">
            
            {/* LEFT COLUMN: 3D Storefront Shop Illustration matching img1 100% */}
            <div className="final-cta-left-col">
              <img
                src={MEDIA.FINAL_CTA_STOREFRONT}
                alt="3D MithraShoppy Seller Storefront & Giftboxes"
                className="final-cta-store-img"
              />
            </div>

            {/* CENTER COLUMN: Heading, Subtitle & Primary CTA Button matching img1 100% */}
            <div className="final-cta-center-col">
              <span className="final-cta-tag">
                YOUR NEXT CUSTOMER IS WAITING
              </span>

              <h2 className="final-cta-heading">
                Start Your Seller Journey <span className="final-cta-heading-gold">Today</span>
              </h2>

              <p className="final-cta-subtitle">
                Join thousands of successful sellers and build your brand with India's trusted marketplace.
              </p>

              <div className="final-cta-btn-wrapper">
                <a
                  href={registerUrl}
                  onClick={handleRegisterClick}
                  aria-label="Start Selling Free on MithraShoppy"
                  className="final-cta-btn"
                >
                  <span>Start Selling — Free</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: 4 Vertical Feature Badges matching img1 100% */}
            <div className="final-cta-right-col">
              {features.map((feat, idx) => (
                <div key={idx} className="final-cta-feature-pill">
                  <div className="final-cta-icon-box">
                    {feat.icon}
                  </div>
                  <span className="final-cta-feature-text">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </SectionReveal>
    </div>
  )
}
