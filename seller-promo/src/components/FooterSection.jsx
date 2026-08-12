import React from 'react'
import { getSellerPortalUrl, scrollToSection } from '../utils/navigation'

const storefrontUrl = 'https://mithrashopy-frontend.onrender.com'

export default function FooterSection({ sellerPortalUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const sellerLoginUrl = `${activePortalUrl}/login`
  const sellerRegisterUrl = `${activePortalUrl}/register`

  return (
    <footer id="footer" className="bg-[#051838] text-white pt-16 pb-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="MithraShoppy Logo" loading="lazy" className="w-10 h-10 object-contain" />
              <span className="font-bold text-xl tracking-tight">
                Mithra<span className="text-[#DFB743]">Shoppy</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              India's premier online marketplace connecting authentic artisans, fashion creators, and sellers with millions of customers nationwide.
            </p>
          </div>

          {/* Column 2: Seller Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#DFB743]">
              Seller Portal
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href={sellerRegisterUrl} className="hover:text-[#DFB743] transition-colors focus-visible:outline-2 focus-visible:outline-[#DFB743]">
                  Register New Store
                </a>
              </li>
              <li>
                <a href={sellerLoginUrl} className="hover:text-[#DFB743] transition-colors font-semibold text-white focus-visible:outline-2 focus-visible:outline-[#DFB743]">
                  Existing Seller Login →
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('earnings-calculator')} className="hover:text-[#DFB743] transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#DFB743]">
                  Earnings Estimator
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#DFB743] transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#DFB743]">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Storefront */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#DFB743]">
              MithraShoppy Storefront
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href={storefrontUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit main customer storefront website" className="hover:text-[#DFB743] transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#DFB743]">
                  <span>Visit Customer Storefront</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('categories')} className="hover:text-[#DFB743] transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#DFB743]">
                  Ethnic Wear & Fashion
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('categories')} className="hover:text-[#DFB743] transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#DFB743]">
                  Handcrafted Jewellery & Gifts
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#DFB743]">
              Legal & Support
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-[#DFB743] transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#DFB743]">
                  Seller FAQ & Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('support-training')} className="hover:text-[#DFB743] transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#DFB743]">
                  24/7 WhatsApp Support
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#DFB743] transition-colors">Privacy Policy</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#DFB743] transition-colors">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} MithraShoppy Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={sellerLoginUrl} className="text-[#DFB743] hover:underline font-bold focus-visible:outline-2 focus-visible:outline-[#DFB743]">
              Existing Seller Login
            </a>
            <span>•</span>
            <a href={storefrontUrl} target="_blank" rel="noopener noreferrer" className="hover:underline focus-visible:outline-2 focus-visible:outline-[#DFB743]">
              Main Storefront
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
