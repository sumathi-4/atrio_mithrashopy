import React, { useState, useEffect } from 'react'
import { MEDIA } from './utils/cloudinary'
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
      watermark="PORTAL"
      className="dashboard-preview-section"
    >
      <div className="dashboard-preview-container">
        {/* Section Header — 100% Centered matching img2 */}
        <div className="dashboard-preview-header-block">
          <span className="dashboard-preview-tag">
            INTERACTIVE PORTAL PREVIEW
          </span>

          <h2 className="dashboard-preview-heading">
            Real-Time <span className="gold-gradient-text">Control & Analytics</span>
          </h2>
          <p className="dashboard-preview-subtitle">
            Manage your store, track sales metrics, catalog inventory, and process customer orders in<br className="hidden sm:inline" /> real time.
          </p>
        </div>

        {/* Tab Navigation with Automatic Smooth Cycling */}
        <div className="dashboard-tab-bar" role="tablist" aria-label="Seller Dashboard Tabs">
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
                className={isActive ? 'dashboard-tab-btn-active' : 'dashboard-tab-btn-inactive'}
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
            className="dashboard-browser-frame transition-transform duration-200 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* Device Browser Header Bar */}
            <div className="dashboard-browser-topbar">
              {/* Traffic Light Window Buttons */}
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block shrink-0" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block shrink-0" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block shrink-0" />
              </div>

              {/* Pulsing Green Live Dot Badge with Generous Inner Spacing */}
              <div className="dashboard-live-badge">
                <span className="dashboard-live-dot" />
                <span className="dashboard-live-text">
                  LIVE PORTAL
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
