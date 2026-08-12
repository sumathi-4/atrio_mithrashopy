import React from 'react'
import { getSellerPortalUrl } from '../utils/navigation'

const defaultCategories = [
  { id: 'ethnic', name: 'Ethnic Wear', buyersBrowsing: 14250, image: '/categories/ethnic.jpg' },
  { id: 'kids', name: 'Kids Clothing', buyersBrowsing: 9820, image: '/categories/kids.jpg' },
  { id: 'jewellery', name: 'Jewellery', buyersBrowsing: 18400, image: '/categories/jewellery.jpg' },
  { id: 'stationery', name: 'Stationery', buyersBrowsing: 7150, image: '/categories/stationery.jpg' },
  { id: 'gifts', name: 'Gifts', buyersBrowsing: 12600, image: '/categories/gifts.jpg' },
]

export default function CategoriesSection({ categoriesData = defaultCategories, sellerPortalUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const registerUrl = `${activePortalUrl}/register`

  return (
    <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#051838]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold text-[#B48B1E] uppercase tracking-widest bg-[#FFFBEB] border border-[#FDE68A] px-4 py-1.5 rounded-full mb-3 shadow-xs">
            High-Demand Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0B1A40] tracking-tight leading-tight mb-4">
            Explore Top Selling <span className="gold-gradient-text">Categories</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Millions of active buyers across India are searching for products in these high-growth categories every week.
          </p>
        </div>

        {/* Categories Grid (5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={`${cat.name} products category showcase on MithraShoppy`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A40]/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 bg-[#DFB743] text-[#051838] font-bold text-xs font-mono px-3 py-1 rounded-lg shadow-sm">
                  Trending
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-sans text-lg font-extrabold text-[#0B1A40] tracking-tight">
                    {cat.name}
                  </h3>
                  {/* Prop-driven Buyers Browsing Text */}
                  <p className="font-sans text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>{(cat.buyersBrowsing || 0).toLocaleString('en-IN')} buyers browsing this week</span>
                  </p>
                </div>

                {/* Active Register Link */}
                <a
                  href={registerUrl}
                  className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B1A40] group-hover:text-[#B48B1E] transition-colors focus-visible:outline-2 focus-visible:outline-[#DFB743]"
                  aria-label={`Start selling in ${cat.name} category`}
                >
                  <span>Start Selling In Category</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
