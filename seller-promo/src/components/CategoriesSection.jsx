import React from 'react'
import { motion } from 'framer-motion'
import { getSellerPortalUrl } from '../utils/navigation'
import { MEDIA } from '../utils/cloudinary'
import SectionReveal from './SectionReveal'

const defaultCategories = [
  { id: 'ethnic', name: 'Ethnic Wear & Sarees', buyersBrowsing: 14250, image: MEDIA.CATEGORY_ETHNIC, tag: 'High Margin' },
  { id: 'jewellery', name: 'Handcrafted Jewellery', buyersBrowsing: 18400, image: MEDIA.CATEGORY_JEWELLERY, tag: 'Top Trend' },
  { id: 'kids', name: 'Kids Clothing & Wear', buyersBrowsing: 9820, image: MEDIA.CATEGORY_KIDS, tag: 'Fast Growing' },
  { id: 'stationery', name: 'School & Office Stationery', buyersBrowsing: 7150, image: MEDIA.CATEGORY_STATIONERY, tag: 'High Volume' },
  { id: 'gifts', name: 'Luxury Gifts & Decor', buyersBrowsing: 12600, image: MEDIA.CATEGORY_GIFTS, tag: 'Festive Favorite' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function CategoriesSection({ categoriesData = defaultCategories, sellerPortalUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const registerUrl = `${activePortalUrl}/register`

  return (
    <SectionReveal
      id="categories"
      className="pt-8 lg:pt-12 pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-slate-900 relative overflow-hidden border-b border-slate-200/80"
    >
      {/* Expanded Container Width to max-w-[1440px] for wider cards */}
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-block text-xs font-bold text-[#B3871E] uppercase tracking-widest bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full shadow-2xs">
            High-Demand Marketplace Categories
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Explore Top Selling <span className="gold-gradient-text">Categories</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Millions of active buyers across India search for authentic products in these key categories every single day.
          </p>
        </div>

        {/* Categories Grid with Wider Card Dimensions & Taller Image Ratio */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-7 sm:gap-8"
        >
          {categoriesData.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-[#06122E] rounded-3xl overflow-hidden border-2 border-[#DFB743]/60 shadow-2xl gold-glow transition-all duration-300 flex flex-col justify-between w-full"
              tabIndex={0}
            >
              {/* Taller Image Container (h-72 sm:h-80) */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900 cursor-pointer">
                <img
                  src={cat.image}
                  alt={`${cat.name} products category showcase on MithraShoppy`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Permanent Top Tag */}
                <span className="absolute top-4 left-4 bg-[#DFB743] text-[#051838] font-black text-xs font-mono px-3.5 py-1.5 rounded-xl shadow-lg z-10">
                  {cat.tag || 'Trending'}
                </span>

                {/* Live Browsing Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06122E] via-[#06122E]/80 to-transparent flex items-end p-5 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 z-20">
                  <p className="font-sans text-xs font-black text-[#DFB743] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>{(cat.buyersBrowsing || 0).toLocaleString('en-IN')} active buyers browsing</span>
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-white tracking-tight leading-snug">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-xs font-medium text-slate-300 mt-2">
                    High Demand & Premium Margins
                  </p>
                </div>

                {/* Category Action Link */}
                <a
                  href={registerUrl}
                  className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-extrabold text-[#DFB743] group-hover:text-white transition-colors"
                  aria-label={`Start selling in ${cat.name} category`}
                >
                  <span>Start Selling In Category</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  )
}
