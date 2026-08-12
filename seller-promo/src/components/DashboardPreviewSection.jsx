import React, { useState } from 'react'

const tabs = [
  { id: 'dashboard', label: 'Overview Dashboard', image: '/dashboard-preview/dashboard.png' },
  { id: 'products', label: 'Products & Inventory', image: '/dashboard-preview/products.png' },
  { id: 'orders', label: 'Orders & Fulfillment', image: '/dashboard-preview/orders.png' },
  { id: 'analytics', label: 'Sales Analytics', image: '/dashboard-preview/analytics.png' },
]

export default function DashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0]

  // Mouse move parallax tilt (Max 6 degrees, disabled on prefers-reduced-motion)
  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const maxTilt = 6 // Max 6 degrees as specified
    setTilt({ x: -y * maxTilt, y: x * maxTilt })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section id="dashboard-preview" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#051838]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold text-[#B48B1E] uppercase tracking-widest bg-[#FFFBEB] border border-[#FDE68A] px-4 py-1.5 rounded-full mb-3 shadow-xs">
            Interactive Portal Preview
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0B1A40] tracking-tight leading-tight mb-4">
            Powerful Seller Dashboard Built For <span className="gold-gradient-text">Growth</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Manage your store, track sales metrics, catalog inventory, and process customer orders in real time.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mb-10" role="tablist" aria-label="Seller Dashboard Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                aria-label={`Switch to ${tab.label} view`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743] ${
                  isActive
                    ? 'bg-[#0B1A40] text-[#DFB743] shadow-md shadow-[#0B1A40]/20 scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Mock Browser / Device Frame with Parallax Tilt */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="max-w-5xl mx-auto transition-transform duration-150 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-2xl shadow-[#0B1A40]/20">
            {/* Top Browser Bar */}
            <div className="bg-[#0B1A40] text-white px-5 py-3.5 flex items-center justify-between border-b border-white/10">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>

              {/* URL Address Bar */}
              <div className="bg-white/10 border border-white/15 px-4 py-1 rounded-full font-mono text-xs text-slate-300 flex items-center gap-2 max-w-sm w-full justify-center">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="truncate">https://seller.mithrashoppy.com/portal</span>
              </div>

              {/* Small Pulsing Green "Live" Dot */}
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo
              </div>
            </div>

            {/* Dashboard Display Screen */}
            <div id={`panel-${currentTab.id}`} role="tabpanel" className="relative bg-slate-900 aspect-[16/9] overflow-hidden group">
              <img
                src={currentTab.image}
                alt={`${currentTab.label} interface screenshot showing MithraShoppy seller tools`}
                loading="lazy"
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Subtle Overlay Label */}
              <div className="absolute bottom-4 left-4 bg-[#0B1A40]/90 backdrop-blur-md border border-[#DFB743]/40 text-[#DFB743] text-xs font-bold px-4 py-1.5 rounded-xl shadow-lg">
                Active Tab: {currentTab.label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
