import React from 'react'
import { getSellerPortalUrl, scrollToSection } from '../utils/navigation'
import { MEDIA } from '../utils/cloudinary'

const storefrontUrl = 'https://mithrashopy-frontend.onrender.com'

export default function FooterSection({ sellerPortalUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const sellerLoginUrl = `${activePortalUrl}/login`
  const sellerRegisterUrl = `${activePortalUrl}/register`

  return (
    <footer id="footer" className="bg-[#FAF8F5] text-slate-900 pt-16 pb-12 border-t border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/80">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={MEDIA.BRAND_LOGO} alt="MithraShoppy Logo" loading="lazy" className="w-10 h-10 object-contain" />
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                Mithra<span className="text-[#B3871E]">Shoppy</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              India's premier online marketplace connecting authentic artisans, fashion creators, and sellers with millions of customers nationwide.
            </p>
          </div>

          {/* Column 2: Seller Quick Links */}
          <div className="space-y-3.5">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#B3871E]">
              Seller Portal
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-700">
              <li>
                <a href={sellerRegisterUrl} className="hover:text-[#B3871E] transition-colors">
                  Register New Store
                </a>
              </li>
              <li>
                <a href={sellerLoginUrl} className="hover:text-[#B3871E] transition-colors font-extrabold text-slate-900">
                  Existing Seller Login →
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('earnings-calculator')} className="hover:text-[#B3871E] transition-colors cursor-pointer text-left">
                  Earnings Estimator
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#B3871E] transition-colors cursor-pointer text-left">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Storefront */}
          <div className="space-y-3.5">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#B3871E]">
              MithraShoppy Storefront
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-700">
              <li>
                <a href={storefrontUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit main customer storefront website" className="hover:text-[#B3871E] transition-colors flex items-center gap-1.5 font-bold text-slate-900">
                  <span>Visit Customer Storefront</span>
                  <svg className="w-4 h-4 text-[#B3871E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-3.5">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#B3871E]">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-700">
              <li>
                <button onClick={() => scrollToSection('support-training')} className="hover:text-[#B3871E] transition-colors cursor-pointer text-left font-bold text-slate-900">
                  24/7 WhatsApp Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-600">
          <p>
            © {new Date().getFullYear()} <span className="font-bold text-slate-900">MithraShopy</span>. All rights reserved. Designed & Developed by <span className="font-bold text-slate-900">Atriowings Technologies India Private Limited</span>
          </p>

          <div className="flex items-center gap-4 text-sm">
            <a href={sellerLoginUrl} className="hover:text-[#B3871E] transition-colors font-extrabold text-slate-900">
              Existing Seller Login
            </a>
            <span>•</span>
            <a href={storefrontUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#B3871E] transition-colors font-semibold">
              Main Storefront
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
