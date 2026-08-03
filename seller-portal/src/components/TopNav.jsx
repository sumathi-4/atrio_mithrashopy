import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearAuth } from '../store/authSlice'
import { HiOutlineBell, HiOutlineMenu, HiOutlineUser, HiOutlineLogout, HiOutlineCheckCircle } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/products': 'My Products',
  '/products/add': 'Add Product',
  '/orders': 'Orders',
  '/analytics': 'Analytics',
  '/notifications': 'Notifications',
  '/profile': 'Profile',
  '/settings': 'Settings',
}

const TopNav = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const vendor = useSelector((state) => state.auth.vendor)
  const unreadCount = useSelector((state) => state.notifications.unreadCount)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const getTitle = () => {
    const path = location.pathname
    if (path.startsWith('/products/edit/')) return 'Edit Product'
    return pageTitles[path] || 'MithraShoppy'
  }

  const getInitials = (name) => {
    if (!name) return 'V'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = () => {
    dispatch(clearAuth())
    navigate('/login')
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className="fixed top-0 right-0 left-0 h-16 bg-white/90 backdrop-blur-md z-30 flex items-center px-4 sm:px-6 gap-4 shadow-sm border-b border-slate-100/80 font-sans antialiased"
      style={{ left: sidebarOpen ? '240px' : '0px', transition: 'left 0.3s ease' }}
    >
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-xl text-slate-500 hover:text-[#0B1A40] hover:bg-slate-100/80 transition-all cursor-pointer"
      >
        <HiOutlineMenu className="w-5 h-5" />
      </button>

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-base sm:text-lg font-black text-[#0B1A40] tracking-tight leading-none">
          {getTitle()}
        </h1>
        <p className="text-[11px] text-slate-400 font-semibold hidden sm:block mt-1">
          Welcome back, <span className="text-[#0B1A40] font-extrabold">{vendor?.ownerName?.split(' ')[0] || 'Vendor'}</span>!
        </p>
      </div>

      {/* Right Action Icons */}
      <div className="ml-auto flex items-center gap-3">
        {/* Status Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black">
          <HiOutlineCheckCircle className="w-3.5 h-3.5" />
          <span>{vendor?.status || 'Approved'}</span>
        </div>

        {/* Notification Bell */}
        <Link
          to="/notifications"
          className="relative p-2.5 rounded-xl text-slate-500 hover:text-[#0B1A40] hover:bg-slate-100/80 transition-all"
        >
          <HiOutlineBell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 text-[10px] font-black rounded-full bg-red-500 text-white flex items-center justify-center shadow-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Vendor Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-100/80 transition-all cursor-pointer border border-transparent hover:border-slate-200"
          >
            {vendor?.logo || vendor?.businessLogo || vendor?.storeLogo || vendor?.logoUrl ? (
              <img
                src={vendor?.logo || vendor?.businessLogo || vendor?.storeLogo || vendor?.logoUrl}
                alt="Vendor Logo"
                className="w-8 h-8 rounded-xl object-cover shadow-xs flex-shrink-0 border border-slate-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DFB743] via-[#F5D98B] to-[#C29B27] flex items-center justify-center text-xs font-black text-[#051838] shadow-xs">
                {getInitials(vendor?.ownerName)}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-xs font-black text-[#0B1A40] leading-none">
                {vendor?.ownerName?.split(' ')[0] || 'Vendor'}
              </p>
              <p className="text-[10px] font-bold text-slate-400 leading-none mt-1">
                {vendor?.businessName || 'Seller Portal'}
              </p>
            </div>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-xs font-black text-[#0B1A40] truncate">{vendor?.ownerName}</p>
                  <p className="text-[11px] font-medium text-slate-400 truncate">{vendor?.email}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#0B1A40] transition-colors"
                >
                  <HiOutlineUser className="w-4 h-4 text-[#DFB743]" />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <HiOutlineLogout className="w-4 h-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default TopNav
