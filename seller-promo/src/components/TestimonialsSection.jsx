import React, { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    storeName: 'Jaipur Crafts & Ethnic Hub',
    location: 'Jaipur, Rajasthan',
    photo: '/testimonials/seller1.jpg',
    quote: '"MithraShoppy transformed our boutique into a nationwide brand with 7-day payouts and zero listing fees!"',
    salesGrowth: '3.4x Revenue Growth',
    hasVideo: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    name: 'Rajesh Varma',
    storeName: 'Varma Handlooms & Sarees',
    location: 'Varanasi, Uttar Pradesh',
    photo: '/testimonials/seller2.jpg',
    quote: '"The dedicated account manager helped us upload 500+ SKUs in one afternoon. Our orders doubled in 30 days."',
    salesGrowth: '₹4.5L/Month Sales',
    hasVideo: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 3,
    name: 'Ananya Roy',
    storeName: 'Artisan Krafts Studio',
    location: 'Kolkata, West Bengal',
    photo: '/testimonials/seller3.jpg',
    quote: '"Free photography guidance and bulk upload tools made catalog management completely seamless for our team."',
    salesGrowth: '500+ Orders Shipped',
    hasVideo: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
]

export default function TestimonialsSection() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const carouselRef = useRef(null)

  // Listen for Escape key to close video modal for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedVideo])

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8
      carouselRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1A40] text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest bg-white/10 border border-[#DFB743]/40 px-4 py-1.5 rounded-full mb-3 shadow-xs">
              Seller Success Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Hear From Our <span className="gold-gradient-text">Sellers</span>
            </h2>
          </div>

          {/* Desktop Arrow Navigation */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollCarousel('prev')}
              className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#DFB743] hover:text-[#051838] border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md focus-visible:outline-2 focus-visible:outline-[#DFB743]"
              aria-label="Scroll to previous seller testimonial card"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel('next')}
              className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#DFB743] hover:text-[#051838] border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md focus-visible:outline-2 focus-visible:outline-[#DFB743]"
              aria-label="Scroll to next seller testimonial card"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3-Card Carousel (Swipeable Overflow on Mobile, Desktop Nav) */}
        <div
          ref={carouselRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="snap-center shrink-0 w-full bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between hover:border-[#DFB743]/60 transition-all duration-300 shadow-xl"
            >
              {/* Photo & Video Overlay Thumbnail */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/10 group">
                <img
                  src={item.photo}
                  alt={`Portrait photograph of ${item.name}, seller at ${item.storeName}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A40]/90 via-transparent to-transparent" />

                {/* Optional Video Play Button Overlay */}
                {item.hasVideo && (
                  <button
                    onClick={() => setSelectedVideo(item.videoUrl)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#DFB743] text-[#051838] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                    aria-label={`Watch video story of seller ${item.name}`}
                  >
                    <svg className="w-7 h-7 ml-1 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                )}

                {/* Sales Growth Badge */}
                <div className="absolute bottom-3 left-3 bg-[#0B1A40]/90 border border-[#DFB743]/50 text-[#DFB743] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                  {item.salesGrowth}
                </div>
              </div>

              {/* Quote Content */}
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <p className="font-sans text-base sm:text-lg text-slate-200 italic font-normal leading-relaxed">
                  {item.quote}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="font-sans text-lg font-bold text-white tracking-tight">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs text-[#DFB743] font-medium">
                    {item.storeName} • <span className="text-slate-400">{item.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Seller story video modal"
        >
          <div className="relative bg-[#0B1A40] border-2 border-[#DFB743] rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 bg-[#061432] flex items-center justify-between border-b border-white/10">
              <span className="font-bold text-sm text-[#DFB743]">Seller Story Video</span>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743]"
                aria-label="Close video player modal"
              >
                ✕
              </button>
            </div>

            {/* Video Container */}
            <div className="aspect-video bg-black">
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Your browser does not support HTML5 video playback.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
