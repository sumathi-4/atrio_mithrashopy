import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MEDIA } from '../utils/cloudinary'
import { getSellerPortalUrl } from '../utils/navigation'
import SectionReveal from './SectionReveal'

// EASY TO EDIT CONSTANT: Illustrative ~15% platform + logistics deduction (0.85 net payout)
const PLATFORM_PAYOUT_RATE = 0.85

const categories = [
  { id: 'ethnic', name: 'Ethnic Wear & Sarees' },
  { id: 'jewellery', name: 'Handcrafted Jewellery' },
  { id: 'kids', name: 'Kids Clothing & Wear' },
  { id: 'stationery', name: 'School & Office Stationery' },
  { id: 'gifts', name: 'Luxury Gifts & Decor' },
]

const comparisonData = [
  {
    feature: 'Listing & Catalog Fees',
    mithra: '₹0 Free Unlimited Listing',
    others: 'Charged Per SKU / Monthly Fee',
  },
  {
    feature: 'Commission Rates',
    mithra: '0% First 30 Days (Ultra-Low After)',
    others: '15% – 28% High Cuts',
  },
  {
    feature: 'Payout Settlement',
    mithra: '7-Day Fast Bank Payouts',
    others: '15 – 45 Days Delayed',
  },
  {
    feature: 'Category Focus',
    mithra: 'Authentic Crafts & Fashion',
    others: 'Generic Commodities',
  },
  {
    feature: 'Support Model',
    mithra: '1-on-1 Dedicated Specialist',
    others: 'Automated Bot Only',
  },
]

// Custom hook to animate/roll numbers smoothly over ~300ms
function useAnimatedNumber(targetValue, duration = 300) {
  const [displayValue, setDisplayValue] = useState(targetValue)
  const previousValueRef = useRef(targetValue)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplayValue(targetValue)
      previousValueRef.current = targetValue
      return
    }

    const startValue = previousValueRef.current
    const change = targetValue - startValue
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = Math.round(startValue + change * easeProgress)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(targetValue)
        previousValueRef.current = targetValue
      }
    }

    requestAnimationFrame(animate)
  }, [targetValue, duration])

  return displayValue
}

export default function EarningsCalculatorSection({ sellerPortalUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const registerUrl = `${activePortalUrl}/register`

  const [price, setPrice] = useState(2100)
  const [orders, setOrders] = useState(190)
  const [category, setCategory] = useState('ethnic')

  // Calculate live estimated monthly payout: price * orders * 0.85
  const estimatedPayout = Math.round(price * orders * PLATFORM_PAYOUT_RATE)
  const grossRevenue = price * orders

  // Animate numbers with a smooth ~300ms rolling tween
  const animatedPayout = useAnimatedNumber(estimatedPayout, 300)
  const animatedGross = useAnimatedNumber(grossRevenue, 300)

  return (
    <SectionReveal
      id="earnings-calculator"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-slate-900 relative overflow-hidden border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Combined Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <span className="inline-block text-xs font-bold text-[#B3871E] uppercase tracking-widest bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full shadow-2xs">
            Interactive Estimator & Comparison
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Calculate Payout & <span className="gold-gradient-text">Compare Savings</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Estimate your net monthly earnings and see why thousands of Indian sellers switch to MithraShoppy.
          </p>
        </motion.div>

        {/* 2-Column Side-by-Side Grid Layout with Framer Motion Entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Calculate Your Estimated Payout Interactive Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="bg-white text-[#051838] rounded-3xl p-6 sm:p-8 border-2 border-[#DFB743]/60 shadow-2xl space-y-6 gold-glow h-full flex flex-col justify-between hover:border-[#DFB743] transition-all duration-300">
              
              <div>
                <h3 className="font-serif text-2xl font-extrabold text-[#0B1A40] mb-6 flex items-center gap-2">
                  <span>Calculate Your Estimated</span>
                  <span className="text-[#B48B1E]">Payout</span>
                </h3>

                {/* Category Dropdown & Inputs Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <label htmlFor="category-select" className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Select Category
                    </label>
                    <select
                      id="category-select"
                      aria-label="Select Product Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-white border-2 border-slate-300 focus:border-[#DFB743] font-sans font-bold text-xs sm:text-sm text-[#051838] rounded-xl px-3.5 py-2 outline-none transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743]"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Gross Revenue</span>
                    <motion.span
                      key={animatedGross}
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      className="font-mono text-lg sm:text-xl font-black text-[#0B1A40] inline-block"
                    >
                      ₹{animatedGross.toLocaleString('en-IN')}
                    </motion.span>
                  </div>
                </div>

                {/* Slider 1: Average Product Price */}
                <div className="space-y-2.5 pt-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="price-slider" className="font-sans text-xs sm:text-sm font-bold text-[#0B1A40]">
                      Avg. Price per Unit:
                    </label>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="font-mono text-sm sm:text-base font-black text-[#B48B1E] bg-[#FFFBEB] px-3 py-1 rounded-xl border border-[#FDE68A] shadow-2xs"
                    >
                      ₹{price.toLocaleString('en-IN')}
                    </motion.span>
                  </div>
                  <input
                    id="price-slider"
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    aria-label="Average Selling Price per Unit Slider"
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#DFB743] focus-visible:outline-2 focus-visible:outline-[#DFB743]"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>₹100</span>
                    <span>₹2,500</span>
                    <span>₹5,000</span>
                  </div>
                </div>

                {/* Slider 2: Estimated Monthly Orders */}
                <div className="space-y-2.5 pt-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="orders-slider" className="font-sans text-xs sm:text-sm font-bold text-[#0B1A40]">
                      Monthly Orders:
                    </label>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="font-mono text-sm sm:text-base font-black text-[#B48B1E] bg-[#FFFBEB] px-3 py-1 rounded-xl border border-[#FDE68A] shadow-2xs"
                    >
                      {orders} orders / mo
                    </motion.span>
                  </div>
                  <input
                    id="orders-slider"
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={orders}
                    onChange={(e) => setOrders(Number(e.target.value))}
                    aria-label="Estimated Monthly Orders Slider"
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#DFB743] focus-visible:outline-2 focus-visible:outline-[#DFB743]"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>10 orders</span>
                    <span>250 orders</span>
                    <span>500 orders</span>
                  </div>
                </div>
              </div>

              {/* Estimated Monthly Payout Result Display */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#0B1A40] text-white rounded-2xl p-5 sm:p-6 text-center border border-white/10 shadow-xl space-y-1 mt-6"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300 block">
                  Estimated Monthly Net Payout
                </span>
                <motion.div
                  key={animatedPayout}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  className="font-mono text-3xl sm:text-5xl font-black text-[#DFB743] tracking-tight"
                >
                  ₹{animatedPayout.toLocaleString('en-IN')}
                </motion.div>
                <p className="font-sans text-[10px] text-slate-300 pt-1 italic">
                  * Illustrative 15% platform & logistics deduction.
                </p>
              </motion.div>

            </div>
          </motion.div>

          {/* RIGHT COLUMN: MithraShoppy vs. Typical Marketplace Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="bg-[#06122E] text-white rounded-3xl overflow-hidden border-2 border-[#DFB743]/60 shadow-2xl gold-glow flex flex-col justify-between h-full">
              
              <div>
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-[#0B1A40] text-white p-5 sm:p-6 items-center border-b border-white/15">
                  <div className="col-span-5 font-sans font-bold text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
                    Feature / Benefit
                  </div>
                  <div className="col-span-4 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-[#DFB743] text-[#051838] font-extrabold font-sans text-xs px-3 py-1 rounded-full shadow-lg animate-gold-pulse">
                      <img src={MEDIA.BRAND_LOGO} alt="MithraShoppy Logo Badge" className="w-3.5 h-3.5 object-contain" />
                      <span className="truncate">MithraShoppy</span>
                    </span>
                  </div>
                  <div className="col-span-3 text-center font-sans font-bold text-xs text-slate-400 uppercase tracking-wider truncate">
                    Other Platforms
                  </div>
                </div>

                {/* Table Rows with Animated Hover Interactions */}
                <div className="divide-y divide-white/10">
                  {comparisonData.map((row, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                      transition={{ duration: 0.2 }}
                      className={`grid grid-cols-12 p-4 sm:p-5 items-center transition-colors ${
                        idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                      }`}
                    >
                      {/* Feature Name */}
                      <div className="col-span-5 font-sans text-xs sm:text-sm font-bold text-white leading-snug">
                        {row.feature}
                      </div>

                      {/* MithraShoppy Column (Gold Glow Pulse) */}
                      <div className="col-span-4 text-center px-1">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="inline-block bg-[#0B1A40] border-2 border-[#DFB743] text-[#DFB743] font-bold text-[10px] sm:text-xs px-2.5 py-1.5 rounded-xl shadow-md animate-gold-pulse"
                        >
                          <span className="text-emerald-400 font-extrabold mr-1">✓</span>
                          {row.mithra}
                        </motion.div>
                      </div>

                      {/* Typical Marketplace Column */}
                      <div className="col-span-3 text-center font-sans text-[10px] sm:text-xs font-medium text-slate-400 leading-snug">
                        {row.others}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Link */}
              <div className="p-6 text-center bg-white/5 border-t border-white/10">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={registerUrl}
                  target="_top"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#DFB743] hover:bg-[#f5d98b] text-[#051838] font-black text-xs sm:text-sm rounded-xl transition-all shadow-xl cursor-pointer"
                >
                  <span>Switch To MithraShoppy Today</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </SectionReveal>
  )
}
