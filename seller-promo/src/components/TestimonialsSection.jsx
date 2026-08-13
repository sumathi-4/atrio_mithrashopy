import React, { useState, useEffect, useRef } from 'react'
import { MEDIA } from '../utils/cloudinary'
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
  const [activeIndex, setActiveIndex] = useState(0)
  const videoRef = useRef(null)

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
            // ENTERING SECTION: Play video with unmuted audio
            videoEl.muted = false
            videoEl.volume = 1.0
            videoEl.play().catch(() => {
              // If initial unmuted play is held by browser autoplay policy, retry muted then unmute
              videoEl.muted = true
              videoEl.play().catch(() => {})
            })
          } else {
            // SCROLLING AWAY TO OTHER SECTIONS: Immediately pause and stop audio completely
            videoEl.pause()
            videoEl.currentTime = 0
          }
        })
      },
      { threshold: 0.25 } // Triggers as soon as 25% of section enters/leaves viewport
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
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#081638] text-white relative overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest bg-white/10 border border-[#DFB743]/40 px-4 py-1.5 rounded-full shadow-2xs">
            Real Merchant Success Stories
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Loved by Sellers Across <span className="gold-gradient-text">India</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            See how authentic Indian artisans and store owners scale nationwide with 0% commission.
          </p>
        </div>

        {/* 2-Column Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Merchant Success Cards Carousel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              {testimonials.map((item, idx) => {
                const isActive = activeIndex === idx
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-[#0B1A40] border-2 border-[#DFB743] shadow-2xl gold-glow scale-102'
                        : 'bg-[#06122E] border-slate-700/60 hover:border-[#DFB743]/50 hover:bg-[#0A1B46]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#DFB743]/60 bg-slate-900 shrink-0">
                          <img
                            src={item.photo}
                            alt={`Photo of ${item.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-sans text-base font-extrabold text-white tracking-tight">
                            {item.name}
                          </h3>
                          <p className="font-sans text-xs text-slate-300">
                            {item.storeName} · <span className="text-slate-400">{item.location}</span>
                          </p>
                        </div>
                      </div>

                      <span className="font-mono text-xs font-black text-[#DFB743] bg-[#DFB743]/10 border border-[#DFB743]/40 px-3 py-1 rounded-full shrink-0">
                        {item.salesGrowth}
                      </span>
                    </div>

                    <p className="font-serif italic text-sm text-slate-200 leading-relaxed">
                      {item.quote}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Slide Pagination Dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Switch to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-8 bg-[#DFB743]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Video Player Unmuted Auto-Play on Viewport & Stop on Exit */}
          <div className="lg:col-span-6">
            <div className="w-full rounded-3xl overflow-hidden glass-panel border-2 border-[#DFB743]/60 shadow-2xl gold-glow relative">
              
              {/* Video Browser Header Bar */}
              <div className="bg-[#0B1A40] px-4 py-3 border-b border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                
                {/* Pill Badge: VERIFIED STORY */}
                <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    VERIFIED STORY
                  </span>
                </div>
              </div>

              {/* Video Player Container */}
              <div className="relative bg-slate-950 aspect-video overflow-hidden">
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
