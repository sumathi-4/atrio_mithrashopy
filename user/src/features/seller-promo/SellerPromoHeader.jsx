import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from './utils/navigation'
import { MEDIA } from './utils/cloudinary'

export default function SellerPromoHeader({ sellerPortalUrl }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const registerUrl = `${sellerPortalUrl}/register`
  const loginUrl = `${sellerPortalUrl}/login`

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId)
    setMobileMenuOpen(false)
  }

  return (
    <header className="seller-promo-header-bar fixed top-0 left-0 right-0 z-[9999]">
      {/* Brand Logo & Title */}
      <div
        onClick={() => handleNavClick('why-us')}
        className="flex items-center gap-3 cursor-pointer group shrink-0"
      >
        <img
          src={MEDIA.BRAND_LOGO}
          alt="MithraShopy Logo"
          className="seller-promo-brand-logo group-hover:scale-105 transition-transform duration-200"
        />
        <span className="seller-promo-brand-title">
          Mithra<span className="seller-promo-brand-title-gold">Shopy</span>
        </span>
      </div>

      {/* Center Navigation Links (Desktop) */}
      <nav className="hidden lg:flex items-center">
        <div className="seller-promo-nav-list">
          <button
            onClick={() => scrollToSection('why-us')}
            className="seller-promo-nav-btn"
          >
            Why Us
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="seller-promo-nav-btn"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('earnings-calculator')}
            className="seller-promo-nav-btn"
          >
            Calculator & Savings
          </button>
          <button
            onClick={() => scrollToSection('categories')}
            className="seller-promo-nav-btn"
          >
            Categories
          </button>
          <button
            onClick={() => scrollToSection('support-training')}
            className="seller-promo-nav-btn"
          >
            Support & Approval
          </button>
        </div>
      </nav>

      {/* Action Buttons & Mobile Hamburger */}
      <div className="seller-promo-actions-group">
        <a
          href={loginUrl}
          className="hidden sm:inline-block seller-promo-login-link"
        >
          Existing Seller Login
        </a>
        <a
          href={registerUrl}
          className="seller-promo-cta-btn"
        >
          Start Selling — Free
        </a>

        {/* Hamburger Toggle Button (≤768px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="seller-promo-hamburger-btn"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu Panel (≤768px) */}
      {mobileMenuOpen && (
        <div className="seller-promo-mobile-menu">
          <button
            onClick={() => handleNavClick('why-us')}
            className="seller-promo-mobile-nav-link"
          >
            Why Us
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="seller-promo-mobile-nav-link"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('earnings-calculator')}
            className="seller-promo-mobile-nav-link"
          >
            Calculator & Savings
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className="seller-promo-mobile-nav-link"
          >
            Categories
          </button>
          <button
            onClick={() => handleNavClick('support-training')}
            className="seller-promo-mobile-nav-link"
          >
            Support & Approval
          </button>

          <div className="seller-promo-mobile-menu-divider" />

          <a
            href={loginUrl}
            className="seller-promo-mobile-login-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Existing Seller Login
          </a>
          <a
            href={registerUrl}
            className="seller-promo-mobile-cta-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start Selling — Free
          </a>
        </div>
      )}
    </header>
  )
}
