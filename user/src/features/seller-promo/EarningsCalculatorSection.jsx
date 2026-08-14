import React, { useState, useEffect, useRef } from 'react'
import { MEDIA } from './utils/cloudinary'
import { getSellerPortalUrl } from './utils/navigation'
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
      watermark="ESTIMATOR"
      className="calculator-section"
    >
      <div className="calculator-container">
        
        {/* Centered Section Header Block matching img3 100% */}
        <div className="calculator-header-block">
          <span className="calculator-tag">
            INTERACTIVE ESTIMATOR & COMPARISON
          </span>

          <h2 className="calculator-heading">
            Calculate Payout & <span className="gold-gradient-text">Compare Savings</span>
          </h2>

          <p className="calculator-subtitle">
            Estimate your net monthly earnings and see why thousands of Indian sellers switch to<br className="hidden sm:inline" /> MithraShoppy.
          </p>
        </div>

        {/* 2-Column Side-by-Side Grid Layout matching img3 (Slightly Decreased Width 1200px max-w) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Calculate Your Estimated Payout Interactive Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="calculator-card-left">
              
              <div>
                <h3 className="calculator-card-title">
                  <span>Calculate Your Estimated </span>
                  <span className="text-[#C2931F]">Payout</span>
                </h3>

                {/* Category Dropdown & Inputs Header */}
                <div className="calculator-dropdown-row">
                  <div>
                    <label htmlFor="category-select" className="calculator-input-label">
                      SELECT CATEGORY
                    </label>
                    <select
                      id="category-select"
                      aria-label="Select Product Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="calculator-select-box"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="calculator-gross-block">
                    <span className="calculator-input-label">GROSS REVENUE</span>
                    <span className="calculator-gross-amount">
                      ₹{animatedGross.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Slider 1: Average Product Price */}
                <div className="calculator-slider-group">
                  <div className="flex items-center justify-between">
                    <label htmlFor="price-slider" className="calculator-slider-label">
                      Avg. Price per Unit:
                    </label>
                    <span className="calculator-badge-gold">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
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
                    className="calculator-range-input"
                  />
                  <div className="calculator-minmax-row">
                    <span>₹100</span>
                    <span>₹2,500</span>
                    <span>₹5,000</span>
                  </div>
                </div>

                {/* Slider 2: Estimated Monthly Orders */}
                <div className="calculator-slider-group">
                  <div className="flex items-center justify-between">
                    <label htmlFor="orders-slider" className="calculator-slider-label">
                      Monthly Orders:
                    </label>
                    <span className="calculator-badge-gold">
                      {orders} orders / mo
                    </span>
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
                    className="calculator-range-input"
                  />
                  <div className="calculator-minmax-row">
                    <span>10 orders</span>
                    <span>250 orders</span>
                    <span>500 orders</span>
                  </div>
                </div>
              </div>

              {/* Estimated Monthly Payout Result Display Box */}
              <div className="calculator-payout-box">
                <span className="calculator-payout-label">
                  ESTIMATED MONTHLY NET PAYOUT
                </span>
                <div className="calculator-payout-amount">
                  ₹{animatedPayout.toLocaleString('en-IN')}
                </div>
                <p className="calculator-payout-subtext">
                  * Illustrative 15% platform & logistics deduction.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: MithraShoppy vs. Typical Marketplace Comparison Table */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="calculator-card-right">
              
              <div className="flex flex-col flex-grow justify-between">
                {/* Table Header */}
                <div className="calc-table-header">
                  <div className="calc-th-left">
                    FEATURE / BENEFIT
                  </div>
                  <div className="calc-th-mid">
                    <span className="calc-mithra-header-badge">
                      <img src={MEDIA.BRAND_LOGO} alt="MithraShoppy Logo Badge" className="w-3.5 h-3.5 object-contain" />
                      <span>MithraShoppy</span>
                    </span>
                  </div>
                  <div className="calc-th-right">
                    OTHER PLATFORMS
                  </div>
                </div>

                {/* Table Rows */}
                <div className="calc-table-rows">
                  {comparisonData.map((row, idx) => (
                    <div
                      key={idx}
                      className={`calc-table-row ${
                        idx % 2 === 0 ? 'calc-table-row-even' : 'calc-table-row-odd'
                      }`}
                    >
                      {/* Feature Name */}
                      <div className="calc-td-left">
                        {row.feature}
                      </div>

                      {/* MithraShoppy Column (Glowing Gold Pill Outline matching img2 & img3) */}
                      <div className="calc-td-mid">
                        <div className="calc-mithra-cell-pill">
                          <span className="calc-check-green">✓</span>
                          <span>{row.mithra}</span>
                        </div>
                      </div>

                      {/* Typical Marketplace Column */}
                      <div className="calc-td-right">
                        {row.others}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Link */}
              <div className="calc-table-footer">
                <a
                  href={registerUrl}
                  target="_top"
                  rel="noopener noreferrer"
                  className="calc-switch-btn"
                >
                  <span>Switch To MithraShoppy Today</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </SectionReveal>
  )
}
