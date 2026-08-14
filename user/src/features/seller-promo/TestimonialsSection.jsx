import React, { useState, useEffect, useRef } from 'react'
import { MEDIA } from './utils/cloudinary'
import SectionReveal from './SectionReveal'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    storeName: 'Jaipur Crafts & Ethnic Hub',
    location: 'Jaipur, Rajasthan',
    photo: MEDIA.TESTIMONIAL_SELLER_1,
    quote: '"MithraShoppy transformed our boutique into a nationwide brand with 7-day payouts and zero listing fees!"',
    salesGrowth: '3.4x Revenue Growth',
  },
  {
    id: 2,
    name: 'Rajesh Varma',
    storeName: 'Varma Handlooms & Sarees',
    location: 'Varanasi, Uttar Pradesh',
    photo: MEDIA.TESTIMONIAL_SELLER_2,
    quote: '"The dedicated account manager helped us upload 500+ SKUs in one afternoon. Our orders doubled in 30 days."',
    salesGrowth: '₹4.5L/Month Sales',
  },
  {
    id: 3,
    name: 'Ananya Roy',
    storeName: 'Artisan Krafts Studio',
    location: 'Kolkata, West Bengal',
    photo: MEDIA.TESTIMONIAL_SELLER_3,
    quote: '"Free photography guidance and bulk upload tools made catalog management completely seamless for our team."',
    salesGrowth: '500+ Orders Shipped',
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(1) // Default to Rajesh Varma matching img2 & img3
  const videoRef = useRef(null)

  // Touch Swipe Gesture State for Mobile Carousel
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 40) {
      // Swipe Left -> Next
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    } else if (distance < -40) {
      // Swipe Right -> Prev
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  // Auto-advance testimonials cards every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Video Autoplay WITH AUDIO when entering section & STOP completely when scrolling away
  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    videoEl.muted = false
    videoEl.volume = 1.0

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.muted = false
            videoEl.volume = 1.0
            videoEl.play().catch(() => {
              videoEl.muted = true
              videoEl.play().catch(() => {})
            })
          } else {
            videoEl.pause()
            videoEl.currentTime = 0
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(videoEl)

    return () => {
      observer.disconnect()
      if (videoEl) {
        videoEl.pause()
      }
    }
  }, [])

  return (
    <SectionReveal
      id="testimonials"
      watermark="STORIES"
      className="testimonials-section"
    >
      <div className="testimonials-container">
        
        {/* Section Header Block matching img2 & img3 100% */}
        <div className="testimonials-header-block">
          <span className="testimonials-tag">
            REAL MERCHANT SUCCESS STORIES
          </span>

          <h2 className="testimonials-heading">
            Loved by Sellers Across <span className="gold-gradient-text">India</span>
          </h2>

          <p className="testimonials-subtitle">
            See how authentic Indian artisans and store owners scale nationwide with 0% commission.
          </p>
        </div>

        {/* 2-Column Grid Layout matching img2 & img3 100% */}
        <div className="testimonials-grid">
          
          {/* LEFT COLUMN: 3 Testimonial Cards Stack with Touch Swipe Support */}
          <div className="testimonial-left-col">
            <div
              className="testimonial-cards-stack"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((item, idx) => {
                const isActive = activeIndex === idx
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={isActive ? 'testimonial-card-active' : 'testimonial-card-inactive'}
                  >
                    <div className="testimonial-user-row">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.photo}
                          alt={`Photo of ${item.name}`}
                          className="testimonial-avatar"
                        />
                        <div>
                          <h3 className="testimonial-user-name">
                            {item.name}
                          </h3>
                          <p className="testimonial-user-sub">
                            {item.storeName} · {item.location}
                          </p>
                        </div>
                      </div>

                      <span className="testimonial-badge-gold">
                        {item.salesGrowth}
                      </span>
                    </div>

                    <p className="testimonial-quote-text">
                      {item.quote}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Slide Pagination Dots matching img2 & img3 */}
            <div className="testimonial-dots-row">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Switch to testimonial ${idx + 1}`}
                  className={activeIndex === idx ? 'testimonial-dot-active' : 'testimonial-dot-inactive'}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Laptop Browser Video Frame matching img2 & img3 100% */}
          <div className="testimonial-right-col">
            <div className="testimonial-video-frame">
              
              {/* Laptop Browser Header Bar */}
              <div className="testimonial-video-topbar">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
                </div>
                
                {/* VERIFIED STORY Badge matching img2 & img3 */}
                <div className="testimonial-verified-badge">
                  <span className="testimonial-verified-dot" />
                  <span className="testimonial-verified-text">
                    VERIFIED STORY
                  </span>
                </div>
              </div>

              {/* Video Container with 16:9 Aspect Ratio */}
              <div className="testimonial-video-box">
                <video
                  ref={videoRef}
                  src="/testimonial-video.mp4"
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              </div>

            </div>
          </div>

        </div>

      </div>
    </SectionReveal>
  )
}
