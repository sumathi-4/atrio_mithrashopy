import React, { useState, useEffect } from 'react'
import { MEDIA } from '../utils/cloudinary'
import SectionReveal from './SectionReveal'

const tabs = [
  { id: 'dashboard', label: 'Overview Dashboard', image: MEDIA.DASHBOARD_PREVIEW_OVERVIEW },
  { id: 'products', label: 'Products & Inventory', image: MEDIA.DASHBOARD_PREVIEW_PRODUCTS },
  { id: 'orders', label: 'Orders & Fulfillment', image: MEDIA.DASHBOARD_PREVIEW_ORDERS },
  { id: 'analytics', label: 'Sales Analytics', image: MEDIA.DASHBOARD_PREVIEW_ANALYTICS },
]

export default function DashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0]

  // Auto-rotate tabs one by one every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currIndex = tabs.findIndex((t) => t.id === prev)
        const nextIndex = (currIndex + 1) % tabs.length
        return tabs[nextIndex].id
      })
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const maxTilt = 6 // Max 6 degrees parallax tilt
    setTilt({ x: -y * maxTilt, y: x * maxTilt })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <SectionReveal
      id="dashboard-preview"
      className="pt-10 lg:pt-14 pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-[#06122E] text-white relative overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest bg-white/10 border border-[#DFB743]/40 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            Interactive Portal Preview
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Real-Time <span className="gold-gradient-text">Control & Analytics</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Manage your store, track sales metrics, catalog inventory, and process customer orders in real time.
          </p>
        </div>

        {/* Tab Navigation with Automatic Smooth Cycling */}
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
                className={`px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743] ${
                  isActive
                    ? 'bg-[#DFB743] text-[#051838] shadow-lg shadow-[#DFB743]/30 scale-105 font-black ring-2 ring-[#DFB743]/50'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Panel Content Container with 3D Mouse Parallax Tilt */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="perspective-1000 flex justify-center"
        >
          <div
            id={`panel-${currentTab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentTab.id}`}
            className="w-full max-w-5xl rounded-3xl overflow-hidden glass-panel border-2 border-[#DFB743]/50 shadow-2xl transition-transform duration-200 ease-out relative gold-glow"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* Device Browser Header Bar */}
            <div className="bg-[#0B1A40] px-4 py-3 border-b border-white/15 flex items-center justify-between">
              {/* Traffic Light Window Buttons */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* URL Address Bar */}
              <div className="bg-[#06122E] px-4 py-1 rounded-lg text-slate-300 font-mono text-xs border border-white/10 hidden xs:flex items-center gap-2 max-w-md w-full justify-center shadow-inner">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="truncate">seller.mithrashopy.com/dashboard/{currentTab.id}</span>
              </div>

              {/* Pulsing Green Live Dot */}
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Live Portal
                </span>
              </div>
            </div>

            {/* Full-Bleed Edge-to-Edge Screenshot Mockup Image */}
            <div className="relative bg-[#06122E] aspect-[16/10] overflow-hidden">
              <img
                key={currentTab.id}
                src={currentTab.image}
                alt={`MithraShoppy Seller Portal - ${currentTab.label} interface preview`}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-opacity duration-500 animate-fade-in"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
