import React from 'react'
import { getSellerPortalUrl } from '../utils/navigation'

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
    <section id="comparison-table" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#051838]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold text-[#B48B1E] uppercase tracking-widest bg-[#FFFBEB] border border-[#FDE68A] px-4 py-1.5 rounded-full mb-3 shadow-xs">
            Clear Advantage
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0B1A40] tracking-tight leading-tight mb-4">
            MithraShoppy vs. <span className="gold-gradient-text">Typical Marketplace</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            See why thousands of Indian sellers switch to MithraShoppy for higher margins, faster payouts, and dedicated growth.
          </p>
        </div>

        {/* 2-Column Comparison Table Container */}
        <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl mb-12">
          <div className="grid grid-cols-12 bg-[#0B1A40] text-white p-6 sm:p-8 items-center border-b border-white/10">
            <div className="col-span-5 font-sans font-bold text-xs sm:text-base text-slate-300 uppercase tracking-wider">
              Feature / Benefit
            </div>
            <div className="col-span-4 text-center">
              <span className="inline-flex items-center gap-2 bg-[#DFB743] text-[#051838] font-extrabold font-sans text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full shadow-md">
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="truncate">MithraShoppy</span>
              </span>
            </div>
            <div className="col-span-3 text-center font-sans font-bold text-xs sm:text-sm text-slate-400 uppercase tracking-wider truncate">
              Other Platforms
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {comparisonData.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-5 sm:p-7 items-center transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                }`}
              >
                {/* Feature Name */}
                <div className="col-span-5 font-sans text-xs sm:text-base font-bold text-[#0B1A40]">
                  {row.feature}
                </div>

                {/* MithraShoppy Column (Visually Emphasized in Gold & Navy) */}
                <div className="col-span-4 text-center px-2">
                  <div className="inline-block bg-[#FFFBEB] border-2 border-[#DFB743] text-[#051838] font-bold text-[11px] sm:text-sm px-3 sm:px-4 py-2 rounded-2xl shadow-sm">
                    <span className="text-[#047857] font-extrabold mr-1">✓</span>
                    {row.mithra}
                  </div>
                </div>

                {/* Typical Marketplace Column */}
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
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#DFB743] hover:bg-[#f5d98b] text-[#051838] font-bold text-sm sm:text-base rounded-2xl transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B1A40]"
          >
            <span>Switch To MithraShoppy Today</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
