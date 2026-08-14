import React from 'react'
import { getSellerPortalUrl, getUserStorefrontUrl, scrollToSection } from './utils/navigation'
import { MEDIA } from './utils/cloudinary'

export default function FooterSection({ sellerPortalUrl, userStorefrontUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const activeStorefrontUrl = userStorefrontUrl || getUserStorefrontUrl()
  const sellerLoginUrl = `${activePortalUrl}/login`
  const sellerRegisterUrl = `${activePortalUrl}/register`

  return (
    <footer id="footer" className="seller-promo-footer">
      <div className="seller-promo-footer-container">
        
        {/* 4-Column Grid matching img2 100% */}
        <div className="seller-promo-footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="seller-promo-footer-col-brand">
            <div className="seller-promo-footer-brand-logo-row">
              <img src={MEDIA.BRAND_LOGO} alt="MithraShoppy Logo" loading="lazy" className="seller-promo-footer-brand-img" />
              <span className="seller-promo-footer-brand-title">
                Mithra<span className="seller-promo-footer-brand-gold">Shoppy</span>
              </span>
            </div>
            <p className="seller-promo-footer-brand-desc">
              India's premier online marketplace connecting authentic artisans, fashion creators, and sellers with millions of customers nationwide.
            </p>
          </div>

          {/* Column 2: Seller Quick Links */}
          <div className="seller-promo-footer-col">
            <h3 className="seller-promo-footer-col-title">
              SELLER PORTAL
            </h3>
            <ul className="seller-promo-footer-link-list">
              <li>
                <a href={sellerRegisterUrl} className="seller-promo-footer-link">
                  Register New Store
                </a>
              </li>
              <li>
                <a href={sellerLoginUrl} className="seller-promo-footer-link-bold">
                  Existing Seller Login →
                </a>
              </li>
              <li>
                <a href="#earnings-calculator" onClick={(e) => { e.preventDefault(); scrollToSection('earnings-calculator'); }} className="seller-promo-footer-link">
                  Earnings Estimator
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="seller-promo-footer-link">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Storefront & Support */}
          <div className="seller-promo-footer-col space-y-4 sm:space-y-6">
            <div>
              <h3 className="seller-promo-footer-col-title">
                MITHRASHOPPY STOREFRONT
              </h3>
              <ul className="seller-promo-footer-link-list">
                <li>
                  <a href={activeStorefrontUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit main customer storefront website" className="seller-promo-footer-link-bold">
                    <span>Visit Customer Storefront</span>
                    <svg className="w-4 h-4 text-[#C2931F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="seller-promo-footer-col-title">
                SUPPORT
              </h3>
              <ul className="seller-promo-footer-link-list">
                <li>
                  <a href="#support-training" onClick={(e) => { e.preventDefault(); scrollToSection('support-training'); }} className="seller-promo-footer-link-bold">
                    24/7 WhatsApp Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar matching img2 100% */}
        <div className="seller-promo-footer-bottom-bar">
          <p className="seller-promo-footer-copyright-text">
            © {new Date().getFullYear()} <span className="seller-promo-footer-copyright-bold">MithraShopy</span>. All rights reserved. Designed & Developed by <span className="seller-promo-footer-copyright-bold">Atriowings Technologies India Private Limited</span>
          </p>

          <div className="seller-promo-footer-bottom-links">
            <a href={sellerLoginUrl} className="seller-promo-footer-link-bold">
              Existing Seller Login
            </a>
            <span>•</span>
            <a href={activeStorefrontUrl} target="_blank" rel="noopener noreferrer" className="seller-promo-footer-link">
              Main Storefront
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
