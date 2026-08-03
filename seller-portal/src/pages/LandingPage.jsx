import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineArrowRight,
  HiOutlineCloudUpload,
  HiOutlineCreditCard,
  HiOutlineTrendingUp,
  HiOutlineClipboardList,
  HiOutlineSupport,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineCurrencyRupee,
  HiOutlineChartBar,
  HiOutlineTruck,
  HiOutlineTag,
  HiOutlinePhone,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi'
import {
  FaStar,
  FaQuoteRight,
  FaStore,
  FaRocket,
  FaHandHoldingUsd,
  FaRegCheckCircle,
  FaBoxOpen,
  FaChartLine,
  FaShieldAlt,
  FaUserCheck,
  FaTruckMoving,
} from 'react-icons/fa'
import { getPublicStats } from '../services/api'
import heroIllustration from '../assets/seller_hero_illustration.jpg'

// FAQ items
const faqs = [
  {
    q: 'How to become a seller on MithraShoppy?',
    a: 'Simply click "Become a Seller" or "Start Selling", fill out our quick registration form with your business details, and upload your verification documents (PAN and GSTIN / Cancelled Cheque). Our seller onboarding team will review and approve your seller account within 24 hours.',
    icon: HiOutlineUserGroup,
  },
  {
    q: 'Is there any fee or hidden charge to sell?',
    a: 'Registration on MithraShoppy is 100% FREE! We charge zero listing fees and zero subscription fees. You enjoy a 0% commission structure on your sales, allowing you to maximize your profit margins.',
    icon: HiOutlineCurrencyRupee,
  },
  {
    q: 'How and when do seller payouts work?',
    a: 'Payments for your completed customer orders are deposited directly into your linked bank account via automated weekly payouts (every 7 working days). You can track all earnings in real time on your seller dashboard.',
    icon: HiOutlineCreditCard,
  },
  {
    q: 'How long does the account approval take?',
    a: 'Our platform review team processes vendor submissions within 24 hours. You will receive an automated email confirmation along with instant access to your seller dashboard once approved.',
    icon: HiOutlineShieldCheck,
  },
  {
    q: 'Do I need a GSTIN to register as a seller?',
    a: 'Yes, GSTIN is mandatory for selling taxable goods online in India. If you sell GST-exempt products (like certain books or handlooms), you can register using your PAN and bank details as per government guidelines.',
    icon: HiOutlineTag,
  },
]

// Testimonials
const testimonials = [
  {
    name: 'Anjali Verma',
    business: 'Verma Apparel & Fashion',
    text: 'Switching my boutique business to MithraShoppy was the best decision. The seller dashboard analytics helped me double my stock efficiency and boost monthly orders by 180%!',
    rating: 5,
    location: 'New Delhi, Delhi',
    avatarBg: 'from-[#08214D] to-[#051838]',
    tag: 'Fashion & Apparel',
    salesGrowth: '+180% Sales',
  },
  {
    name: 'Vikram Shah',
    business: 'Shah Electronics Hub',
    text: 'Catalog uploads are smooth and order payouts are always on time. Their customer support team resolves any shipping issues fast, making selling online stress-free.',
    rating: 5,
    location: 'Ahmedabad, Gujarat',
    avatarBg: 'from-[#DFB743] to-[#C29B27]',
    tag: 'Electronics & Gadgets',
    salesGrowth: '₹4.5L/mo Payouts',
  },
  {
    name: 'Priya Sharma',
    business: 'Jaipur Crafts & Decor',
    text: 'Zero commission structure allows us to price our handcrafted decor competitively. We now dispatch 500+ orders every month across 28,000+ pincodes in India!',
    rating: 5,
    location: 'Jaipur, Rajasthan',
    avatarBg: 'from-[#08214D] via-[#1E3A8A] to-[#DFB743]',
    tag: 'Home & Handicrafts',
    salesGrowth: '500+ Orders/mo',
  },
]

const AccordionItem = ({ q, a, icon: Icon }) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`border rounded-2xl overflow-hidden mb-3.5 bg-white transition-all duration-300 ${
        open
          ? 'border-[#DFB743] shadow-md ring-2 ring-[#DFB743]/15'
          : 'border-slate-200/80 shadow-xs hover:border-[#DFB743]/50'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4.5 text-left font-bold text-[#08214D] hover:bg-[#FFFDF7] transition-colors group cursor-pointer"
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              open
                ? 'bg-[#DFB743] text-[#051838] shadow-sm'
                : 'bg-[#08214D]/5 text-[#08214D] group-hover:bg-[#DFB743]/20 group-hover:text-[#051838]'
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-sm md:text-base font-extrabold tracking-tight text-[#08214D]">
            {q}
          </span>
        </div>
        <span className="flex-shrink-0 ml-4">
          {open ? (
            <div className="w-7 h-7 rounded-full bg-[#DFB743]/20 flex items-center justify-center">
              <HiOutlineChevronUp className="w-4 h-4 text-[#051838]" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#DFB743]/20">
              <HiOutlineChevronDown className="w-4 h-4 text-slate-500 group-hover:text-[#051838]" />
            </div>
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 pt-4 bg-gradient-to-b from-white to-[#FFFDF7] font-medium pl-16">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalSellers: 12,
    totalProducts: 56,
    totalRevenue: 485230,
  })

  // Fetch dynamic stats from database
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getPublicStats()
        if (res.data && res.data.success && res.data.stats) {
          const rev = Number(res.data.stats.totalRevenue)
          setStats({
            totalSellers: res.data.stats.totalSellers || 12,
            totalProducts: res.data.stats.totalProducts || 56,
            totalRevenue: !isNaN(rev) && rev > 0 ? rev : 485230,
          })
        }
      } catch (e) {
        console.error('Failed to load public stats:', e)
      }
    }
    fetchStats()
  }, [])

  const rawRevenue =
    typeof stats.totalRevenue === 'number' &&
    !isNaN(stats.totalRevenue) &&
    stats.totalRevenue > 0
      ? stats.totalRevenue
      : 485230

  const formattedRevenue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rawRevenue)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased overflow-x-hidden">
      {/* Premium Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-4 md:px-12 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-[#051838] bg-gradient-to-br from-[#DFB743] via-[#F5D98B] to-[#C29B27] shadow-md shadow-[#DFB743]/20 border border-[#DFB743]/40">
            <span className="text-xl font-black">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#08214D] font-black text-lg tracking-tight leading-none">
              Mithra<span className="text-[#DFB743]">Shoppy</span>
            </span>
            <span className="text-[#08214D]/60 text-[10px] font-bold tracking-widest uppercase mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              SELLER HUB
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-xs tracking-wider text-slate-600">
          <button
            onClick={() => scrollToSection('benefits')}
            className="hover:text-[#08214D] hover:scale-105 transition-all cursor-pointer uppercase"
          >
            Benefits
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-[#08214D] hover:scale-105 transition-all cursor-pointer uppercase"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="hover:text-[#08214D] hover:scale-105 transition-all cursor-pointer uppercase"
          >
            Stories
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-[#08214D] hover:scale-105 transition-all cursor-pointer uppercase"
          >
            FAQ
          </button>
          <Link
            to="/login"
            className="hover:text-[#08214D] hover:scale-105 transition-all uppercase font-bold text-[#08214D]"
          >
            Seller Login
          </Link>
        </div>

        {/* Right Action CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="md:hidden px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#08214D] border border-slate-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-md shadow-[#DFB743]/25 hover:shadow-lg hover:shadow-[#DFB743]/35 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5 border border-[#DFB743]/40"
          >
            <HiOutlineSparkles className="w-4 h-4 text-[#051838]" />
            Become a Seller
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 md:px-12 bg-gradient-to-b from-[#FFFDF7] via-[#FFFBF0] to-[#F8FAFC] relative overflow-hidden">
        {/* Soft Background Decorative Shapes */}
        <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-gradient-to-bl from-[#DFB743]/15 via-[#F5D98B]/20 to-transparent blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#FDE68A]/25 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-[#08214D]/5 via-transparent to-transparent blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-6 space-y-6 text-left relative z-10">
              {/* Trust Pill Tag */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] shadow-xs"
              >
                <span className="text-[#D97706] text-sm animate-bounce">⚡</span>
                <span className="tracking-wide uppercase text-[11px] font-black">
                  INDIA'S TRUSTED MARKETPLACE · 0% COMMISSION FEE
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#08214D] leading-[1.12] tracking-tight"
              >
                Grow Your Business Nationwide with <br />
                <span className="text-[#08214D]">Mithra</span>
                <span className="text-[#DFB743]">Shoppy</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl font-medium"
              >
                Join 10,000+ active sellers delivering to 28,000+ pincodes in India. Enjoy 0% commission, automated 7-day bank payouts, and dedicated seller support.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-1"
              >
                <Link
                  to="/register"
                  className="px-8 py-4 text-sm md:text-base font-black rounded-full text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] hover:scale-[1.03] shadow-md shadow-[#DFB743]/30 hover:shadow-xl hover:shadow-[#DFB743]/40 transition-all flex items-center gap-2 border border-[#DFB743]/50 cursor-pointer"
                >
                  Start Selling Now <HiOutlineArrowRight className="w-5 h-5 text-[#051838]" />
                </Link>
                <Link
                  to="/login"
                  className="px-7 py-4 text-sm md:text-base font-extrabold rounded-full bg-white border border-slate-200 text-[#08214D] hover:bg-slate-50 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#DFB743]/20 flex items-center justify-center text-[#08214D]">
                    <FaStore className="w-3.5 h-3.5 text-[#08214D]" />
                  </div>
                  Seller Login
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap items-center gap-4 text-xs font-extrabold text-slate-500 pt-2"
              >
                <div className="flex items-center gap-1.5 text-[#08214D]">
                  <HiOutlineCheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>0% Listing Fee</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5 text-[#08214D]">
                  <HiOutlineCheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>24hr Approval</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5 text-[#08214D]">
                  <HiOutlineCheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Weekly Payouts</span>
                </div>
              </motion.div>
            </div>

            {/* Right Side Illustration Image with Animated Floating Stat Cards */}
            <div className="md:col-span-6 relative flex justify-center items-center z-10 mt-6 md:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-[#FDF8EA] via-[#FDE68A]/35 to-transparent blur-[70px] rounded-full pointer-events-none -z-10"></div>

              {/* Main Illustration Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full relative flex justify-center items-center"
              >
                <img
                  src={heroIllustration}
                  alt="MithraShoppy Seller Hub E-Commerce Platform"
                  className="w-full h-auto max-w-lg lg:max-w-xl object-contain mix-blend-multiply filter contrast-[1.03] rounded-3xl"
                />

                {/* Floating Card 1: Revenue Card (Top Right) */}
                <motion.div
                  initial={{ opacity: 0, y: -20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute -top-4 -right-2 sm:right-2 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xl flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                    <HiOutlineTrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        Seller Earnings
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                        +28.4%
                      </span>
                    </div>
                    <p className="text-base sm:text-lg font-black text-[#08214D] leading-none mt-1">
                      {formattedRevenue}
                    </p>
                  </div>
                </motion.div>

                {/* Floating Card 2: Live Orders Card (Bottom Left) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute -bottom-4 -left-2 sm:left-2 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xl flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFB743] to-[#C29B27] text-[#051838] flex items-center justify-center shadow-md flex-shrink-0">
                    <FaBoxOpen className="w-5 h-5 text-[#051838]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        Live Orders Today
                      </span>
                    </div>
                    <p className="text-base sm:text-lg font-black text-[#08214D] leading-none mt-1">
                      1,420+ Orders
                    </p>
                  </div>
                </motion.div>

                {/* Floating Card 3: Verified Seller Badge (Bottom Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="hidden sm:flex absolute bottom-8 -right-4 bg-[#08214D] text-white p-3 rounded-2xl border border-[#DFB743]/40 shadow-xl items-center gap-2.5 z-20"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#DFB743] text-[#051838] font-black flex items-center justify-center text-sm shadow-sm">
                    4.9★
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white leading-tight">
                      Seller Rating
                    </p>
                    <p className="text-[10px] font-medium text-slate-300">
                      10,000+ Verified
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* 4 Stat Metric Cards Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
          >
            {/* Stat Card 1 */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 flex-shrink-0">
                <FaStore className="w-5 h-5 text-[#B45309]" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-[#08214D] leading-none">
                  {stats.totalSellers > 12 ? `${stats.totalSellers}+` : '10,000+'}
                </p>
                <p className="text-xs font-extrabold text-slate-500 mt-1">
                  Active Sellers
                </p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 flex-shrink-0">
                <HiOutlineClipboardList className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-[#08214D] leading-none">
                  {stats.totalProducts > 56 ? `${stats.totalProducts}+` : '50,000+'}
                </p>
                <p className="text-xs font-extrabold text-slate-500 mt-1">
                  Products Listed
                </p>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                <HiOutlineCurrencyRupee className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-[#08214D] leading-none">
                  ₹100 Cr+
                </p>
                <p className="text-xs font-extrabold text-slate-500 mt-1">
                  Annual Sales
                </p>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#DFB743]/15 text-[#051838] flex items-center justify-center border border-[#DFB743]/30 flex-shrink-0">
                <FaStar className="w-5 h-5 text-[#D97706]" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-[#08214D] leading-none">
                  4.9 ★
                </p>
                <p className="text-xs font-extrabold text-slate-500 mt-1">
                  Seller Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          {/* Full-width Dark Navy Feature Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#08214D] text-white rounded-3xl p-6 md:p-8 shadow-xl border border-[#08214D]/40"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {/* Feature 1 */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 first:px-0">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#DFB743] flex-shrink-0 border border-white/10">
                  <HiOutlineShieldCheck className="w-6 h-6 text-[#DFB743]" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white tracking-tight">
                    Secure & Verified
                  </h4>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    100% Protected Transactions
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#DFB743] flex-shrink-0 border border-white/10">
                  <FaRocket className="w-5 h-5 text-[#DFB743]" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white tracking-tight">
                    Instant Onboarding
                  </h4>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Approved within 24 Hours
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#DFB743] flex-shrink-0 border border-white/10">
                  <HiOutlineCreditCard className="w-6 h-6 text-[#DFB743]" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white tracking-tight">
                    7-Day Bank Payouts
                  </h4>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Automated Weekly Deposits
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#DFB743] flex-shrink-0 border border-white/10">
                  <HiOutlineSupport className="w-6 h-6 text-[#DFB743]" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white tracking-tight">
                    24/7 Seller Hotline
                  </h4>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Dedicated Account Managers
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Sell on MithraShoppy? (Benefits) Section */}
      <section id="benefits" className="py-20 px-4 md:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto text-center space-y-14">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#DFB743]/15 text-[#051838] uppercase tracking-wider border border-[#DFB743]/30">
              SELLER ADVANTAGES
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#08214D] tracking-tight">
              Why Choose MithraShoppy?
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              We empower local merchants, manufacturers, and brand owners with industry-leading tools, nationwide reach, and 0% commission fees.
            </p>
            <div className="w-16 h-1.5 bg-gradient-to-r from-[#08214D] via-[#DFB743] to-[#E5C058] mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HiOutlineCurrencyRupee,
                title: '0% Commission Fee',
                desc: 'Keep 100% of your earnings. We charge zero listing fees, zero subscription fees, and no hidden commission fees.',
                color: 'from-amber-500 to-yellow-600',
                border: 'hover:border-amber-300 hover:shadow-amber-500/10',
                badge: 'Maximum Profit',
              },
              {
                icon: HiOutlineCloudUpload,
                title: 'Instant Catalog Upload',
                desc: 'Easily add single products or bulk-upload thousands of catalog items using CSV spreadsheets with automatic image optimization.',
                color: 'from-blue-500 to-indigo-600',
                border: 'hover:border-blue-300 hover:shadow-blue-500/10',
                badge: 'Fast Setup',
              },
              {
                icon: HiOutlineTruck,
                title: 'Pan-India Delivery Network',
                desc: 'Seamlessly ship orders to over 28,000+ pincodes across India with integrated doorstep courier pickup & live tracking.',
                color: 'from-emerald-500 to-teal-600',
                border: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
                badge: '28,000+ Pincodes',
              },
              {
                icon: HiOutlineCreditCard,
                title: 'Automated 7-Day Payouts',
                desc: 'Get your sales proceeds directly deposited into your linked bank account every 7 working days with zero transfer charges.',
                color: 'from-purple-500 to-violet-600',
                border: 'hover:border-purple-300 hover:shadow-purple-500/10',
                badge: 'Weekly Bank Transfer',
              },
              {
                icon: HiOutlineTrendingUp,
                title: 'Real-Time Seller Analytics',
                desc: 'Track daily views, sales performance, revenue metrics, top-performing SKUs, and inventory alerts on your seller dashboard.',
                color: 'from-rose-500 to-pink-600',
                border: 'hover:border-rose-300 hover:shadow-rose-500/10',
                badge: 'Live Insights',
              },
              {
                icon: HiOutlineSupport,
                title: '24/7 Dedicated Support',
                desc: 'Get rapid assistance from expert seller advisors via phone call, email, and live seller support chat whenever you need help.',
                color: 'from-indigo-500 to-cyan-600',
                border: 'hover:border-indigo-300 hover:shadow-indigo-500/10',
                badge: 'Priority Support',
              },
            ].map(({ icon: Icon, title, desc, color, border, badge }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`bg-[#F8FAFC] border border-slate-200/90 p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between text-left space-y-4 hover:-translate-y-1.5 shadow-sm hover:shadow-xl ${border} group relative overflow-hidden`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-13 h-13 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${color} shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase tracking-wide">
                      {badge}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-[#08214D] text-lg tracking-tight leading-tight group-hover:text-[#051838]">
                      {title}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-extrabold text-[#08214D] group-hover:text-[#DFB743] transition-colors">
                  <span>Learn details</span>
                  <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section (Connected Timeline) */}
      <section
        id="how-it-works"
        className="py-20 px-4 md:px-12 bg-gradient-to-b from-[#F8FAFC] to-white relative"
      >
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#08214D]/10 text-[#08214D] uppercase tracking-wider border border-[#08214D]/20">
              SIMPLE ONBOARDING
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#08214D] tracking-tight">
              4 Easy Steps to Start Selling
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Start receiving orders across India in less than 24 hours.
            </p>
            <div className="w-16 h-1.5 bg-gradient-to-r from-[#08214D] via-[#DFB743] to-[#E5C058] mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Register Account',
                desc: 'Fill out your phone number, business details, PAN, and GSTIN for instant account creation.',
                icon: FaStore,
                badgeColor: 'bg-[#08214D] text-white',
              },
              {
                step: '02',
                title: 'Get Verified',
                desc: 'Our seller onboarding team reviews and verifies your documents within 24 hours.',
                icon: FaRegCheckCircle,
                badgeColor: 'bg-[#051838] text-white',
              },
              {
                step: '03',
                title: 'Upload Products',
                desc: 'List your items with titles, photos, descriptions, stock quantities, and your selling price.',
                icon: HiOutlineCloudUpload,
                badgeColor: 'bg-[#08214D] text-white',
              },
              {
                step: '04',
                title: 'Receive Orders & Get Paid',
                desc: 'Receive customer orders nationwide, pack parcels, and get automated weekly bank payouts.',
                icon: FaHandHoldingUsd,
                badgeColor:
                  'bg-gradient-to-r from-[#DFB743] to-[#C29B27] text-[#051838]',
              },
            ].map(({ step, title, desc, icon: Icon, badgeColor }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-slate-200/90 rounded-3xl p-7 text-center flex flex-col items-center space-y-4 shadow-sm hover:shadow-xl hover:border-[#DFB743] transition-all duration-300 group relative"
              >
                {/* Step Badge */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-md ${badgeColor} group-hover:scale-110 transition-transform duration-300 relative`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 text-[11px] font-black bg-[#DFB743] text-[#051838] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {step}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-black text-[#08214D] text-lg tracking-tight group-hover:text-[#051838]">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer / Seller Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#DFB743]/15 text-[#051838] uppercase tracking-wider border border-[#DFB743]/30">
              SUCCESS STORIES
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#08214D] tracking-tight">
              What Our Sellers Say
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Read how merchants across India expanded their reach and revenue with MithraShoppy.
            </p>
            <div className="w-16 h-1.5 bg-gradient-to-r from-[#08214D] via-[#DFB743] to-[#E5C058] mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map(
              (
                { name, business, text, rating, location, avatarBg, tag, salesGrowth },
                i
              ) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="bg-[#F8FAFC] p-7 rounded-3xl shadow-xs border border-slate-200/90 flex flex-col justify-between hover:shadow-xl hover:border-[#DFB743]/60 transition-all duration-300 relative overflow-hidden group"
                >
                  <FaQuoteRight className="absolute top-6 right-6 w-10 h-10 text-slate-200/60 group-hover:text-[#DFB743]/20 transition-colors" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 text-[#DFB743]">
                        {Array.from({ length: rating }).map((_, j) => (
                          <FaStar key={j} className="w-4 h-4" />
                        ))}
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {salesGrowth}
                      </span>
                    </div>

                    <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-semibold italic">
                      "{text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-200/80 relative z-10">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base text-white bg-gradient-to-br ${avatarBg} shadow-md border-2 border-[#DFB743] flex-shrink-0`}
                    >
                      {name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-[#08214D] text-sm tracking-tight">
                          {name}
                        </h4>
                        <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-slate-500 text-[11px] font-extrabold mt-0.5">
                        {business} ·{' '}
                        <span className="text-slate-400">{location}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section
        id="faq"
        className="py-20 px-4 md:px-12 bg-gradient-to-b from-white to-[#F8FAFC]"
      >
        <div className="max-w-4xl mx-auto space-y-14">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#08214D]/10 text-[#08214D] uppercase tracking-wider border border-[#08214D]/20">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#08214D] tracking-tight">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Everything you need to know about selling on MithraShoppy.
            </p>
            <div className="w-16 h-1.5 bg-gradient-to-r from-[#08214D] via-[#DFB743] to-[#E5C058] mx-auto rounded-full mt-2"></div>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} q={faq.q} a={faq.a} icon={faq.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* High-Converting Bottom CTA Banner */}
      <section className="py-16 px-4 md:px-12 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#08214D] via-[#051838] to-[#0A2E6B] text-center text-white py-16 px-6 md:px-16 relative shadow-2xl border border-[#DFB743]/30">
          {/* Subtle Abstract Radial Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>

          {/* Glowing Gradient Accents */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#DFB743]/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#08214D]/50 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full text-xs font-black bg-white/10 text-[#DFB743] uppercase tracking-wider border border-[#DFB743]/30 inline-flex items-center gap-1.5">
              <HiOutlineSparkles className="w-4 h-4 text-[#DFB743]" />
              START SELLING IN LESS THAN 24 HOURS
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Ready to Grow Your Business with MithraShoppy?
            </h2>

            <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
              Join thousands of successful sellers nationwide. Register today for 0% commission and reach millions of happy buyers across India.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 font-black rounded-2xl text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] hover:scale-[1.03] active:scale-[0.98] transition-all text-sm md:text-base shadow-xl shadow-[#DFB743]/25 flex items-center gap-2 border border-[#DFB743]/40 cursor-pointer"
              >
                Become a Seller Now <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 font-black rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all text-sm md:text-base border border-white/20 cursor-pointer"
              >
                Seller Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#051838] text-slate-400 py-10 px-4 md:px-12 border-t border-slate-800 text-center text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#DFB743] text-[#051838] font-black flex items-center justify-center text-xs">
              M
            </div>
            <span className="text-white font-bold text-sm">
              MithraShoppy Seller Portal
            </span>
          </div>
          <p>
            © {new Date().getFullYear()} MithraShoppy Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-slate-400 font-semibold">
            <button
              onClick={() => scrollToSection('benefits')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Stories
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}


