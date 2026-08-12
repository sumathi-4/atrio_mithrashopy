import React from 'react'
import confetti from 'canvas-confetti'

export default function FinalCTASection({ sellerPortalUrl }) {
  const registerUrl = `${sellerPortalUrl.replace(/\/$/, '')}/register`

  const handleRegisterClick = (e) => {
    e.preventDefault()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#DFB743', '#0B1A40', '#ffffff', '#10B981'],
        })
      } catch (err) {
        console.warn('Confetti burst trigger:', err)
      }
    }

    setTimeout(() => {
      window.location.href = registerUrl
    }, prefersReducedMotion ? 0 : 450)
  }

  return (
    <section id="final-cta" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0B1A40] via-[#061432] to-[#DFB743]/90 text-white overflow-hidden shadow-2xl">
      {/* Background Decorative Circles */}
      <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#DFB743]/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest bg-white/10 border border-[#DFB743]/40 px-4 py-1.5 rounded-full shadow-xs">
          Take Your Business Online Today
        </span>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Start Your Seller Journey <span className="gold-gradient-text">Today</span>
        </h2>

        <p className="font-sans text-base sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed">
          Join thousands of Indian artisans and business owners scaling nationwide with 0% commission on your first 30 days.
        </p>

        {/* Primary Shimmer Button with Confetti Click Handler */}
        <div className="pt-4 flex flex-col items-center justify-center space-y-4">
          <a
            href={registerUrl}
            onClick={handleRegisterClick}
            aria-label="Register new seller store on MithraShoppy"
            className="animate-shimmer px-10 py-5 bg-[#DFB743] hover:bg-[#f5d98b] text-[#051838] font-black text-lg sm:text-xl rounded-2xl transition-all duration-300 shadow-2xl shadow-[#DFB743]/30 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 border-2 border-[#DFB743] focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>Register Store Now — It's Free</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Reassurance Line */}
          <p className="font-sans text-xs sm:text-sm font-semibold text-slate-200 tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Free to join · Approved in 24–48 hrs · Zero hidden fees
          </p>
        </div>
      </div>
    </section>
  )
}
