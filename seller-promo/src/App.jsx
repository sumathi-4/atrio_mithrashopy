import React from 'react'
import { getSellerPortalUrl, scrollToSection } from './utils/navigation'
import { MEDIA } from './utils/cloudinary'
import HeroSection from './components/HeroSection'
import TrustStripSection from './components/TrustStripSection'
import WhyUsSection from './components/WhyUsSection'
import HowItWorksSection from './components/HowItWorksSection'
import DashboardPreviewSection from './components/DashboardPreviewSection'
import EarningsCalculatorSection from './components/EarningsCalculatorSection'
import CategoriesSection from './components/CategoriesSection'
import TestimonialsSection from './components/TestimonialsSection'
import SupportTrainingSection from './components/SupportTrainingSection'
import FinalCTASection from './components/FinalCTASection'
import FooterSection from './components/FooterSection'

function HomePage() {
  const sellerPortalUrl = getSellerPortalUrl()
  const registerUrl = `${sellerPortalUrl}/register`

  return (
    <div className="min-h-screen bg-[#06122E] text-white selection:bg-[#DFB743] selection:text-[#051838]">
      {/* Sleek Top Navbar Header (Clean & Minimal) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white py-3.5 px-4 sm:px-6 border-b border-white/10 flex items-center justify-between shadow-lg">
        {/* Brand Logo & Title */}
        <div
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img src={MEDIA.BRAND_LOGO} alt="MithraShoppy Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
          <span className="font-bold text-xl tracking-tight font-sans">
            Mithra<span className="text-[#DFB743]">Shoppy</span> <span className="text-xs font-sans text-slate-300 ml-1.5 uppercase tracking-widest font-semibold hidden xs:inline">Seller Hub</span>
          </span>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-300">
          <button onClick={() => scrollToSection('why-us')} className="hover:text-[#DFB743] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743]">
            Why Us
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#DFB743] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743]">
            How It Works
          </button>
          <button onClick={() => scrollToSection('earnings-calculator')} className="hover:text-[#DFB743] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743]">
            Calculator & Savings
          </button>
          <button onClick={() => scrollToSection('categories')} className="hover:text-[#DFB743] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743]">
            Categories
          </button>
          <button onClick={() => scrollToSection('support-training')} className="hover:text-[#DFB743] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743]">
            Support & Approval
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={`${sellerPortalUrl}/login`}
            className="hidden sm:inline-block text-xs font-bold text-slate-200 hover:text-[#DFB743] px-3.5 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#DFB743]"
          >
            Existing Seller Login
          </a>
          <a
            href={registerUrl}
            className="bg-[#DFB743] hover:bg-[#f5d98b] text-[#051838] font-bold text-xs sm:text-sm px-4.5 py-2 sm:py-2.5 rounded-xl transition-all shadow-md shadow-[#DFB743]/20 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            Start Selling — Free
          </a>
        </div>
      </header>

      {/* Hero */}
      <HeroSection sellerPortalUrl={sellerPortalUrl} />

      {/* TrustStrip */}
      <TrustStripSection />

      {/* WhyUs */}
      <WhyUsSection sellerPortalUrl={sellerPortalUrl} />

      {/* HowItWorks */}
      <HowItWorksSection />

      {/* DashboardPreview */}
      <DashboardPreviewSection />

      {/* EarningsCalculator & Side-by-Side Comparison Table */}
      <EarningsCalculatorSection sellerPortalUrl={sellerPortalUrl} />

      {/* Categories */}
      <CategoriesSection sellerPortalUrl={sellerPortalUrl} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Support & Approval */}
      <SupportTrainingSection />

      {/* FinalCTA */}
      <FinalCTASection sellerPortalUrl={sellerPortalUrl} />

      {/* Footer */}
      <FooterSection sellerPortalUrl={sellerPortalUrl} />
    </div>
  )
}

export default HomePage
