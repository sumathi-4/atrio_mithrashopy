import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { clearAuth } from '../store/authSlice'
import {
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineChartBar,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
} from 'react-icons/hi'
import logoImg from '../assets/logo.png'

const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/products', label: 'Products', icon: HiOutlineCube },
  { path: '/orders', label: 'Orders', icon: HiOutlineShoppingCart },
  { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
  { path: '/notifications', label: 'Notifications', icon: HiOutlineBell, hasbadge: true },
  { path: '/profile', label: 'Profile', icon: HiOutlineUser },
  { path: '/settings', label: 'Settings', icon: HiOutlineCog },
]

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const vendor = useSelector((state) => state.auth.vendor)
  const unreadCount = useSelector((state) => state.notifications.unreadCount)

  const handleLogout = () => {
    dispatch(clearAuth())
    navigate('/login')
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="sidebar"
          initial={{ x: -240 }}
          animate={{ x: 0 }}
          exit={{ x: -240 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 h-full w-60 flex flex-col z-40 shadow-2xl sidebar-scroll overflow-y-auto bg-gradient-to-b from-[#061638] via-[#0A204C] to-[#05122E] border-r border-[#DFB743]/20 font-sans antialiased"
        >
          {/* Logo Header */}
          <div className="px-5 pt-6 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="MithraShoppy Logo" className="w-9 h-9 object-contain drop-shadow-xs" />
              <div className="flex flex-col">
                <span className="text-white font-black text-lg tracking-tight leading-none">
                  Mithra<span className="text-[#DFB743]">Shoppy</span>
                </span>
                <span className="text-[#DFB743]/90 text-[9px] font-black tracking-widest uppercase mt-0.5">
                  SELLER PORTAL
                </span>
              </div>
            </div>

            {/* Vendor Profile Badge */}
            <div className="flex items-center gap-3 mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              {vendor?.logo || vendor?.businessLogo || vendor?.storeLogo || vendor?.logoUrl ? (
                <img
                  src={vendor?.logo || vendor?.businessLogo || vendor?.storeLogo || vendor?.logoUrl}
                  alt="Vendor Logo"
                  className="w-9 h-9 rounded-xl object-cover shadow-md flex-shrink-0 border border-[#DFB743]/40"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#DFB743] via-[#F5D98B] to-[#C29B27] flex items-center justify-center font-black text-[#051838] text-sm shadow-md flex-shrink-0">
                  {getInitials(vendor?.ownerName || vendor?.businessName)}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-white text-xs font-black truncate">
                  {vendor?.ownerName || 'Vendor'}
                </p>
                <p className="text-[11px] truncate font-semibold text-[#DFB743]">
                  {vendor?.businessName || 'Business'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1.5">
            {navLinks.map(({ path, label, icon: Icon, hasbadge }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => {
                  if (window.innerWidth < 1024) setIsOpen(false)
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#DFB743] bg-gradient-to-r from-[#DFB743]/20 to-[#DFB743]/5 border-l-4 border-[#DFB743] shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{label}</span>
                {hasbadge && unreadCount > 0 && (
                  <span className="ml-auto text-[10px] font-black rounded-full px-2 py-0.5 bg-red-500 text-white shadow-sm">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-3 pb-6 border-t border-white/10 pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
            >
              <HiOutlineLogout className="w-5 h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
