import React from 'react'
import { getSellerPortalUrl } from './utils/navigation'
import { MEDIA } from './utils/cloudinary'
import SectionReveal from './SectionReveal'

const comparisonData = [
  {
    feature: 'Listing & Catalog Fees',
    mithra: '₹0 Free Unlimited Listing',
    others: 'Charged Per SKU / Monthly Fee',
    mithraHighlight: true,
  },
  {
    feature: 'Commission Rates',
    mithra: '0% First 30 Days (Ultra-Low After)',
    others: '15% – 28% High Commission Cuts',
    mithraHighlight: true,
  },
  {
    feature: 'Payout Settlement Time',
    mithra: '7-Day Fast Direct Bank Payouts',
    others: '15 – 45 Days Delayed Payouts',
    mithraHighlight: true,
  },
  {
    feature: 'Category Focus',
    mithra: 'Authentic Indian Crafts, Fashion & Gifts',
    others: 'Generic Mass-Produced Commodities',
    mithraHighlight: true,
  },
  {
    feature: 'Onboarding & Growth Support',
    mithra: '1-on-1 Dedicated Account Specialist',
    others: 'Automated Bot Helpdesk Only',
    mithraHighlight: true,
  },
]

export default function ComparisonTableSection({ sellerPortalUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const registerUrl = `${activePortalUrl}/register`

  return (
    <SectionReveal
      id="comparison-table"
      watermark="COMPARISON"
      className="py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-[#06122E] text-white relative overflow-hidden border-b border-white/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header with Dribbble Style Bold Oversized Stat Anchor */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest bg-white/10 border border-[#DFB743]/40 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            Clear Advantage
          </span>

          <div className="font-mono text-3xl sm:text-5xl lg:text-6xl font-black uppercase gold-gradient-text tracking-tight mb-3">
            SAVE UP TO 28% IN MARKETPLACE COMMISSIONS
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            MithraShopy vs. <span className="gold-gradient-text">Typical Marketplace</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            See why thousands of Indian sellers switch to MithraShopy for higher margins, faster payouts, and dedicated growth.
          </p>
        </div>

        {/* 2-Column Comparison Table Container */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/15 shadow-2xl mb-12">
          <div className="grid grid-cols-12 bg-[#0B1A40] text-white p-6 sm:p-8 items-center border-b border-white/15">
            <div className="col-span-5 font-sans font-bold text-xs sm:text-base text-slate-300 uppercase tracking-wider">
              Feature / Benefit
            </div>
            <div className="col-span-4 text-center">
              {/* Highlighted MithraShopy Column Header with Continuous Gold Glow Pulse */}
              <span className="inline-flex items-center gap-2 bg-[#DFB743] text-[#051838] font-extrabold font-sans text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full shadow-lg animate-gold-pulse">
                <img src={MEDIA.COMPARISON_TABLE_BADGE} alt="MithraShopy Logo Badge" className="w-4 h-4 object-contain" />
                <span className="truncate">MithraShopy</span>
              </span>
            </div>
            {/* Static Neutral "Other Platforms" Column Header */}
            <div className="col-span-3 text-center font-sans font-bold text-xs sm:text-sm text-slate-400 uppercase tracking-wider truncate">
              Other Platforms
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/10">
            {comparisonData.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-5 sm:p-7 items-center transition-colors ${
                  idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                }`}
              >
                {/* Feature Name */}
                <div className="col-span-5 font-sans text-xs sm:text-base font-bold text-white">
                  {row.feature}
                </div>

                {/* MithraShopy Column (Visually Emphasized with Continuous Gold Glow Pulse ~3s cycle) */}
                <div className="col-span-4 text-center px-2">
                  <div className="inline-block bg-[#0B1A40] border-2 border-[#DFB743] text-[#DFB743] font-bold text-[11px] sm:text-sm px-3 sm:px-4 py-2 rounded-2xl shadow-md animate-gold-pulse">
                    <span className="text-emerald-400 font-extrabold mr-1">✓</span>
                    {row.mithra}
                  </div>
                </div>

                {/* Typical Marketplace Column (Kept Static & Neutral for Stark Contrast) */}
                <div className="col-span-3 text-center font-sans text-[11px] sm:text-sm font-medium text-slate-400">
                  {row.others}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Bottom CTA Link */}
        <div className="text-center">
          <a
            href={registerUrl}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#DFB743] hover:bg-[#f5d98b] text-[#051838] font-black text-sm sm:text-base rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>Switch To MithraShopy Today</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </SectionReveal>
  )
}
