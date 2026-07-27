import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // Automatically close sidebar on mobile resize, open on desktop
      setSidebarOpen(!mobile)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Mobile Backdrop Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content area */}
      <div
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300"
        style={{ marginLeft: (!isMobile && sidebarOpen) ? '240px' : '0px' }}
      >
        {/* Top Navigation */}
        <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Scrollable page content */}
        <main
          className="flex-1 overflow-y-auto pt-16"
          style={{ backgroundColor: 'var(--cream)' }}
        >
          <div className="p-6 min-h-full">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout
