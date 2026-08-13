import React, { useState, useEffect, useRef } from 'react'
import SectionReveal from './SectionReveal'

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

export default function TrustStripSection() {
  const stat1 = useCountUp(500)
  const stat2 = useCountUp(10000)
  const stat3 = useCountUp(50)
  const stat4 = useCountUp(7) // Updated from 3 Days to 7 Days

  return (
    <SectionReveal
      id="trust-strip"
      watermark="STATS"
      className="relative bg-[#081638] text-white border-y border-white/10 py-10 lg:py-12 overflow-hidden shadow-2xl z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Count-Up Metrics Section (Zero PAN-INDIA Badges Row) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#06122E]/90 border border-white/15 backdrop-blur-md shadow-2xl gold-glow">
          {/* Stat 1: Active Buyers */}
          <div ref={stat1.ref} className="text-center p-2">
            <div className="font-mono text-2xl sm:text-4xl font-black text-[#DFB743] tracking-tight mb-1">
              {stat1.count >= 500 ? '500K+' : `${stat1.count}K+`}
            </div>
            <div className="font-sans text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Active Buyers
            </div>
          </div>

          {/* Stat 2: Sellers Onboarded */}
          <div ref={stat2.ref} className="text-center p-2 border-l border-white/10">
            <div className="font-mono text-2xl sm:text-4xl font-black text-white tracking-tight mb-1">
              {stat2.count.toLocaleString('en-IN')}+
            </div>
            <div className="font-sans text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Sellers Onboarded
            </div>
          </div>

          {/* Stat 3: Product Categories */}
          <div ref={stat3.ref} className="text-center p-2 border-l border-white/10">
            <div className="font-mono text-2xl sm:text-4xl font-black text-[#DFB743] tracking-tight mb-1">
              {stat3.count}+
            </div>
            <div className="font-sans text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Product Categories
            </div>
          </div>

          {/* Stat 4: Avg. Payout Days (7 Days) */}
          <div ref={stat4.ref} className="text-center p-2 border-l border-white/10">
            <div className="font-mono text-2xl sm:text-4xl font-black text-white tracking-tight mb-1">
              {stat4.count} Days
            </div>
            <div className="font-sans text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Avg. Payout Days
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
