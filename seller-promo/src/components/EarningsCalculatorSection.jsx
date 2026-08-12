import React, { useState } from 'react'

// EASY TO EDIT CONSTANT: Illustrative ~15% platform + logistics deduction (0.85 net payout)
const PLATFORM_PAYOUT_RATE = 0.85

const categories = [
  { id: 'ethnic', name: 'Ethnic Wear' },
  { id: 'kids', name: 'Kids Clothing' },
  { id: 'jewellery', name: 'Jewellery' },
  { id: 'stationery', name: 'Stationery' },
  { id: 'gifts', name: 'Gifts' },
]

export default function EarningsCalculatorSection() {
  const [price, setPrice] = useState(1500)
  const [orders, setOrders] = useState(60)
  const [category, setCategory] = useState('ethnic')

  // Calculate live estimated monthly payout: price * orders * 0.85
  const estimatedPayout = Math.round(price * orders * PLATFORM_PAYOUT_RATE)
  const grossRevenue = price * orders

  return (
    <section id="earnings-calculator" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1A40] text-white relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest bg-white/10 border border-[#DFB743]/40 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            Interactive Earnings Estimator
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Calculate Your Estimated <span className="gold-gradient-text">Earnings</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            See how much you could earn selling your craft on MithraShoppy every month.
          </p>
        </div>

        {/* Calculator Main Card (Cream Card Background) */}
        <div className="bg-[#FAF8F5] text-[#051838] rounded-3xl p-6 sm:p-10 border-2 border-[#DFB743]/40 shadow-2xl space-y-8">
          {/* Category Dropdown & Inputs Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <label htmlFor="category-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Select Product Category
              </label>
              <select
                id="category-select"
                aria-label="Select Product Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white border-2 border-slate-300 focus:border-[#DFB743] font-sans font-bold text-sm text-[#051838] rounded-xl px-4 py-2.5 outline-none transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743]"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Estimated Gross Revenue</span>
              <span className="font-mono text-xl font-bold text-[#0B1A40]">
                ₹{grossRevenue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Slider 1: Average Product Price */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-sans">
              <label htmlFor="price-slider" className="text-sm font-bold text-[#0B1A40]">
                Average Selling Price per Unit
              </label>
              <span className="font-mono text-lg font-extrabold text-[#0B1A40] bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-xs">
                ₹{price.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              id="price-slider"
              aria-label="Average Selling Price per Unit in Rupees"
              type="range"
              min="100"
              max="5000"
              step="50"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#DFB743] focus-visible:outline-2 focus-visible:outline-[#DFB743]"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 font-mono">
              <span>₹100</span>
              <span>₹2,500</span>
              <span>₹5,000</span>
            </div>
          </div>

          {/* Slider 2: Estimated Monthly Orders */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-sans">
              <label htmlFor="orders-slider" className="text-sm font-bold text-[#0B1A40]">
                Estimated Monthly Orders
              </label>
              <span className="font-mono text-lg font-extrabold text-[#0B1A40] bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-xs">
                {orders} Orders
              </span>
            </div>
            <input
              id="orders-slider"
              aria-label="Estimated Monthly Orders Count"
              type="range"
              min="10"
              max="500"
              step="5"
              value={orders}
              onChange={(e) => setOrders(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#DFB743] focus-visible:outline-2 focus-visible:outline-[#DFB743]"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 font-mono">
              <span>10 Orders</span>
              <span>250 Orders</span>
              <span>500 Orders</span>
            </div>
          </div>

          {/* Result Highlight Box */}
          <div className="bg-[#0B1A40] text-white rounded-2xl p-6 sm:p-8 text-center border border-[#DFB743]/50 shadow-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DFB743] block">
              Estimated Monthly Net Payout
            </span>
            <div className="font-mono text-4xl sm:text-6xl font-black text-[#DFB743] tracking-tight">
              ₹{estimatedPayout.toLocaleString('en-IN')}
              <span className="text-sm font-sans text-slate-300 font-medium ml-2">/ month</span>
            </div>

            {/* Disclaimer Line */}
            <p className="text-xs font-sans text-slate-300 italic pt-2 border-t border-white/10 mt-3">
              Estimate only, actual earnings vary by category and demand.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
