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
  const stat4 = useCountUp(7)

  return (
    <SectionReveal
      id="trust-strip"
      watermark="STATS"
      className="trust-strip-section"
    >
      <div className="trust-strip-card-wrapper">
        {/* Floating Card with 4 Metrics matching img1 100% */}
        <div className="trust-strip-card">
          {/* Stat 1: Active Buyers */}
          <div ref={stat1.ref} className="trust-strip-item">
            <div className="trust-strip-number-gold">
              {stat1.count >= 500 ? '500K+' : `${stat1.count}K+`}
            </div>
            <div className="trust-strip-label">
              Active Buyers
            </div>
          </div>

          {/* Stat 2: Sellers Onboarded */}
          <div ref={stat2.ref} className="trust-strip-item">
            <div className="trust-strip-number-white">
              {stat2.count.toLocaleString('en-IN')}+
            </div>
            <div className="trust-strip-label">
              Sellers Onboarded
            </div>
          </div>

          {/* Stat 3: Product Categories */}
          <div ref={stat3.ref} className="trust-strip-item">
            <div className="trust-strip-number-gold">
              {stat3.count}+
            </div>
            <div className="trust-strip-label">
              Product Categories
            </div>
          </div>

          {/* Stat 4: Avg. Payout Days */}
          <div ref={stat4.ref} className="trust-strip-item">
            <div className="trust-strip-number-white">
              {stat4.count} Days
            </div>
            <div className="trust-strip-label">
              Avg. Payout Days
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
