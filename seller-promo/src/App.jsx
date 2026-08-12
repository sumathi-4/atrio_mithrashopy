import React from 'react'
import { getSellerPortalUrl, scrollToSection } from './utils/navigation'
import HeroSection from './components/HeroSection'
import TrustStripSection from './components/TrustStripSection'
import WhyUsSection from './components/WhyUsSection'
import HowItWorksSection from './components/HowItWorksSection'
import DashboardPreviewSection from './components/DashboardPreviewSection'
import EarningsCalculatorSection from './components/EarningsCalculatorSection'
import CategoriesSection from './components/CategoriesSection'
import TestimonialsSection from './components/TestimonialsSection'
import ComparisonTableSection from './components/ComparisonTableSection'
import SupportTrainingSection from './components/SupportTrainingSection'
import FAQSection from './components/FAQSection'
import FinalCTASection from './components/FinalCTASection'
import FooterSection from './components/FooterSection'

function HomePage() {
  const sellerPortalUrl = getSellerPortalUrl()
  const registerUrl = `${sellerPortalUrl}/register`

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#051838]">
      {/* Fixed Navbar Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1A40]/95 backdrop-blur-md text-white py-3.5 px-4 sm:px-6 border-b border-white/10 flex items-center justify-between shadow-lg">
        {/* Brand Logo & Title */}
        <div
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img src="/logo.png" alt="MithraShoppy Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
          <span className="font-bold text-xl tracking-tight font-sans">
            Mithra<span className="text-[#DFB743]">Shoppy</span> <span className="text-xs font-sans text-slate-300 ml-1.5 uppercase tracking-widest font-semibold hidden xs:inline">Seller Hub</span>
          </span>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-300">
          <button onClick={() => scrollToSection('why-us')} className="hover:text-[#DFB743] transition-colors cursor-pointer">
            Why Us
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#DFB743] transition-colors cursor-pointer">
            How It Works
          </button>
          <button onClick={() => scrollToSection('earnings-calculator')} className="hover:text-[#DFB743] transition-colors cursor-pointer">
            Earnings
          </button>
          <button onClick={() => scrollToSection('categories')} className="hover:text-[#DFB743] transition-colors cursor-pointer">
            Categories
          </button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-[#DFB743] transition-colors cursor-pointer">
            FAQ
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={`${sellerPortalUrl}/login`}
            className="hidden sm:inline-block text-xs font-bold text-slate-200 hover:text-[#DFB743] px-3 py-2 transition-colors"
          >
            Login
          </a>
          <a
            href={registerUrl}
            className="px-4 sm:px-5 py-2 bg-[#DFB743] hover:bg-[#f5d98b] text-[#051838] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Start Selling
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

      {/* EarningsCalculator */}
      <EarningsCalculatorSection />

      {/* Categories */}
      <CategoriesSection sellerPortalUrl={sellerPortalUrl} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* ComparisonTable */}
      <ComparisonTableSection sellerPortalUrl={sellerPortalUrl} />

      {/* SupportTraining */}
      <SupportTrainingSection />

      {/* FAQ */}
      <FAQSection />

      {/* FinalCTA */}
      <FinalCTASection sellerPortalUrl={sellerPortalUrl} />

      {/* Footer */}
      <FooterSection sellerPortalUrl={sellerPortalUrl} />
    </div>
  )
}

export default function App() {
  return <HomePage />
}
