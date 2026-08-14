import React from 'react'
import './seller-promo.css'
import { getSellerPortalUrl } from './utils/navigation'
import SellerPromoHeader from './SellerPromoHeader'
import HeroSection from './HeroSection'
import TrustStripSection from './TrustStripSection'
import WhyUsSection from './WhyUsSection'
import HowItWorksSection from './HowItWorksSection'
import DashboardPreviewSection from './DashboardPreviewSection'
import EarningsCalculatorSection from './EarningsCalculatorSection'
import CategoriesSection from './CategoriesSection'
import TestimonialsSection from './TestimonialsSection'
import SupportTrainingSection from './SupportTrainingSection'
import FinalCTASection from './FinalCTASection'
import FooterSection from './FooterSection'

export default function SellerPromoPage() {
  const sellerPortalUrl = getSellerPortalUrl()

  return (
    <div className="min-h-screen bg-[#06122E] text-white selection:bg-[#DFB743] selection:text-[#051838]">
      <SellerPromoHeader sellerPortalUrl={sellerPortalUrl} />
      <HeroSection sellerPortalUrl={sellerPortalUrl} />
      <TrustStripSection />
      <WhyUsSection sellerPortalUrl={sellerPortalUrl} />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <EarningsCalculatorSection sellerPortalUrl={sellerPortalUrl} />
      <CategoriesSection sellerPortalUrl={sellerPortalUrl} />
      <TestimonialsSection />
      <SupportTrainingSection />
      <FinalCTASection sellerPortalUrl={sellerPortalUrl} />
      <FooterSection sellerPortalUrl={sellerPortalUrl} />
    </div>
  )
}
