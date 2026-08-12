import React, { useState, useEffect, useRef } from 'react'

// Custom count-up hook with IntersectionObserver & prefers-reduced-motion check
function useCountUp(end, duration = 1600) {
  const [count, setCount] = useState(0)
  const elementRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let startTime = null
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setCount(Math.floor(easeProgress * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(end)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.15 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration])

  return { count, ref: elementRef }
}

export default function HeroSection({ sellerPortalUrl }) {
  const videoRef = useRef(null)

  // Pause video autoplay if user prefers reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  // Stats setup using custom count-up hook
  const stat1 = useCountUp(500)   // 500K+ Active Buyers
  const stat2 = useCountUp(10000) // 10,000+ Sellers Onboarded
  const stat3 = useCountUp(50)    // 50+ Product Categories
  const stat4 = useCountUp(3)     // 3 Days Avg. Payout

  const handleWatchHowItWorks = (e) => {
    e.preventDefault()
    const target = document.getElementById('how-it-works')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const registerUrl = `${sellerPortalUrl.replace(/\/$/, '')}/register`

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0B1A40] text-white font-sans">
      {/* Background Video with Poster Fallback */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-seller-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/hero-seller-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A40]/90 via-[#0B1A40]/80 to-[#0B1A40]/95 backdrop-blur-[2px] z-10" />

      {/* Content Container */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 max-w-5xl mx-auto">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#DFB743]/50 text-[#DFB743] text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#DFB743] animate-pulse" />
          India's Premier Artisan & Vendor Marketplace
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          Turn Your Craft Into a <span className="gold-gradient-text">Business</span>
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Join over 10,000+ Indian artisans, creators, and sellers growing their business nationwide with zero upfront listing fees.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Solid Gold CTA: External link opening in same tab */}
          <a
            href={registerUrl}
            target="_top"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#DFB743] hover:bg-[#f5d98b] text-[#051838] font-bold text-base sm:text-lg rounded-2xl transition-all duration-200 shadow-xl shadow-[#DFB743]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border border-[#DFB743]"
          >
            Start Selling — It's Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Outline CTA: Smooth scroll to HowItWorks */}
          <a
            href="#how-it-works"
            onClick={handleWatchHowItWorks}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base sm:text-lg rounded-2xl transition-all duration-200 backdrop-blur-md border border-white/30 hover:border-white/60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            Watch How It Works
            <svg className="w-5 h-5 text-[#DFB743]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      {/* Horizontal Stats Strip (Count-Up on Scroll) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
          {/* Stat 1: Active Buyers */}
          <div ref={stat1.ref} className="text-center p-2">
            <div className="font-mono text-2xl sm:text-4xl font-extrabold text-[#DFB743] tracking-tight mb-1">
              {stat1.count >= 500 ? '500K+' : `${stat1.count}K+`}
            </div>
            <div className="font-sans text-xs sm:text-sm font-medium text-slate-300 uppercase tracking-wider">
              Active Buyers
            </div>
          </div>

          {/* Stat 2: Sellers Onboarded */}
          <div ref={stat2.ref} className="text-center p-2 border-l border-white/10">
            <div className="font-mono text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
              {stat2.count.toLocaleString('en-IN')}+
            </div>
            <div className="font-sans text-xs sm:text-sm font-medium text-slate-300 uppercase tracking-wider">
              Sellers Onboarded
            </div>
          </div>

          {/* Stat 3: Product Categories */}
          <div ref={stat3.ref} className="text-center p-2 border-l border-white/10">
            <div className="font-mono text-2xl sm:text-4xl font-extrabold text-[#DFB743] tracking-tight mb-1">
              {stat3.count}+
            </div>
            <div className="font-sans text-xs sm:text-sm font-medium text-slate-300 uppercase tracking-wider">
              Product Categories
            </div>
          </div>

          {/* Stat 4: Avg. Payout Days */}
          <div ref={stat4.ref} className="text-center p-2 border-l border-white/10">
            <div className="font-mono text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
              {stat4.count} Days
            </div>
            <div className="font-sans text-xs sm:text-sm font-medium text-slate-300 uppercase tracking-wider">
              Avg. Payout Days
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
