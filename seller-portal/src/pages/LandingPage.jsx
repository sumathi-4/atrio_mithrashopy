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
  HiOutlineBadgeCheck,
  HiOutlineLightningBolt,
  HiOutlineCube,
  HiOutlineMenu,
  HiOutlineX,
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
  FaPercentage,
  FaUserPlus,
  FaChevronRight,
  FaQuoteLeft,
  FaCheckCircle,
} from 'react-icons/fa'
import { getPublicStats } from '../services/api'
import heroIllustration from '../assets/seller_hero_illustration.jpg'
import sellerFemaleFashion from '../assets/seller_female_fashion.jpg'
import sellerMaleElectronics from '../assets/seller_male_electronics.jpg'
import sellerFemaleCrafts from '../assets/seller_female_crafts.jpg'
import faq3dIllustration from '../assets/faq_3d_illustration.jpg'
import cta3dSeller from '../assets/cta_3d_seller.png'
import cta3dSellerTransparent from '../assets/cta_3d_seller_transparent.png'
import logoImg from '../assets/logo.png'

// FAQ items matching Image 1 icon design colors
const faqs = [
  {
    q: 'How to become a seller on MithraShoppy?',
    a: 'Simply click "Become a Seller" or "Start Selling", fill out our quick registration form with your business details, and upload your verification documents (PAN and GSTIN / Cancelled Cheque). Our seller onboarding team will review and approve your seller account within 24 hours.',
    icon: HiOutlineUserGroup,
    badgeBg: 'bg-[#2563EB]',
  },
  {
    q: 'Is there any fee or hidden charge to sell?',
    a: 'Registration on MithraShoppy is 100% FREE! We charge zero listing fees and zero subscription fees. You enjoy a 0% commission structure on your sales, allowing you to maximize your profit margins.',
    icon: HiOutlineCurrencyRupee,
    badgeBg: 'bg-[#F59E0B]',
  },
  {
    q: 'How and when do seller payouts work?',
    a: 'Payments for your completed customer orders are deposited directly into your linked bank account via automated weekly payouts (every 7 working days). You can track all earnings in real time on your seller dashboard.',
    icon: HiOutlineCreditCard,
    badgeBg: 'bg-[#EA580C]',
  },
  {
    q: 'How long does the account approval take?',
    a: 'Our platform review team processes vendor submissions within 24 hours. You will receive an automated email confirmation along with instant access to your seller dashboard once approved.',
    icon: HiOutlineShieldCheck,
    badgeBg: 'bg-[#8B5CF6]',
  },
  {
    q: 'Do I need a GSTIN to register as a seller?',
    a: 'Yes, GSTIN is mandatory for selling taxable goods online in India. If you sell GST-exempt products (like certain books or handlooms), you can register using your PAN and bank details as per government guidelines.',
    icon: HiOutlineTag,
    badgeBg: 'bg-[#D97706]',
  },
]

// Testimonials data for Clothing E-commerce Sellers matching Image 2 vertical layout & MithraShoppy branding
const testimonials = [
  {
    name: 'Anjali Verma',
    role: 'Founder, Verma Ethnic & Couture',
    business: 'VERMA ETHNIC & COUTURE',
    headline: 'From 5 orders a day to 180+ daily parcels, MithraShoppy transformed our fashion label.',
    text: 'Switching our boutique clothing brand to MithraShoppy was our best business decision. The seller dashboard analytics helped us manage size variants, optimize inventory, and scale nationwide sales by 180%!',
    rating: 5,
    location: 'New Delhi, Delhi',
    image: sellerFemaleFashion,
    growth: '+180%',
    growthLabel: 'Clothing Sales Growth',
    orders: '14K+',
    ordersLabel: 'Apparel Orders Shipped',
    ratingScore: '4.9',
    ratingLabel: 'Seller Rating',
    reverse: false,
  },
  {
    name: 'Vikram Shah',
    role: 'Owner, Shah Menswear & Formals',
    business: 'SHAH MENSWEAR & FORMALS',
    headline: 'We went from local store sales to ₹5 Lakh weekly apparel payouts in just two years.',
    text: 'Listing catalog sizes and fits is effortless, and automated weekly payouts are always on time. MithraShoppy’s 0% commission structure allows us to offer premium shirts and suits at unbeatable prices.',
    rating: 5,
    location: 'Ahmedabad, Gujarat',
    image: sellerMaleElectronics,
    growth: '500%',
    growthLabel: 'Revenue Growth',
    orders: '28K+',
    ordersLabel: 'Menswear Orders Shipped',
    ratingScore: '4.9',
    ratingLabel: 'Seller Rating',
    reverse: true,
  },
  {
    name: 'Priya Sharma',
    role: 'Founder, Jaipur Designer Sarees',
    business: 'JAIPUR DESIGNER SAREES',
    headline: 'From 5 tailors to 30 weavers, MithraShoppy delivered orders to 28,000+ pincodes.',
    text: 'Our handcrafted sarees and ethnic dresses now reach fashion enthusiasts across India. Reliable shipping partners and instant payout tracking make online fashion retailing completely stress-free.',
    rating: 5,
    location: 'Jaipur, Rajasthan',
    image: sellerFemaleCrafts,
    growth: '300%',
    growthLabel: 'Business Growth',
    orders: '18K+',
    ordersLabel: 'Saree & Dress Orders',
    ratingScore: '5.0',
    ratingLabel: 'Seller Rating',
    reverse: false,
  },
]

const AccordionItem = ({ q, a, icon: Icon, badgeBg = 'bg-[#2563EB]' }) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`border rounded-2xl overflow-hidden mb-3 bg-white transition-all duration-300 ${
        open
          ? 'border-[#2563EB]/40 shadow-md ring-2 ring-[#2563EB]/10'
          : 'border-slate-100 shadow-xs hover:border-[#DFB743]/50 hover:shadow-sm'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-[#0B1A40] hover:bg-slate-50/60 transition-colors group cursor-pointer"
      >
        <div className="flex items-center gap-3.5 flex-1 pr-2">
          {/* Icon Badge matching Image 1 design */}
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white ${badgeBg} shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm md:text-base font-extrabold tracking-tight text-[#0B1A40]">
            {q}
          </span>
        </div>
        <span className="flex-shrink-0 ml-2">
          <HiOutlineChevronDown
            className={`w-5 h-5 text-[#2563EB] transition-transform duration-300 ${
              open ? 'rotate-180 text-amber-500' : ''
            }`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100/80">
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-3 sm:px-6 md:px-12 py-2.5 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <img
            src={logoImg}
            alt="MithraShoppy Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-[#08214D] font-black text-base sm:text-lg tracking-tight leading-none whitespace-nowrap">
              Mithra<span className="text-[#DFB743]">Shoppy</span>
            </span>
            <span className="text-[#08214D]/60 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mt-0.5 flex items-center gap-1">
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
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/register"
            className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-extrabold text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] shadow-md shadow-[#DFB743]/25 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 border border-[#DFB743]/40 whitespace-nowrap"
          >
            <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#051838] shrink-0" />
            <span>Become a Seller</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-lg text-[#08214D] hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[55px] left-0 right-0 z-40 bg-white border-b border-slate-200 p-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <button
            onClick={() => { scrollToSection('benefits'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-bold text-slate-700 hover:text-[#08214D]"
          >
            BENEFITS
          </button>
          <button
            onClick={() => { scrollToSection('how-it-works'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-bold text-slate-700 hover:text-[#08214D]"
          >
            HOW IT WORKS
          </button>
          <button
            onClick={() => { scrollToSection('testimonials'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-bold text-slate-700 hover:text-[#08214D]"
          >
            STORIES
          </button>
          <button
            onClick={() => { scrollToSection('faq'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-bold text-slate-700 hover:text-[#08214D]"
          >
            FAQ
          </button>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-2.5 rounded-xl bg-slate-100 font-bold text-sm text-[#08214D]"
          >
            SELLER LOGIN
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 md:px-12 bg-gradient-to-b from-[#FFFDF8] via-[#FFFBF2] to-[#F8FAFC] relative overflow-hidden">
        {/* Soft Background Decorative Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#DFB743]/20 via-[#F5D98B]/25 to-transparent blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/4 right-12 w-[450px] h-[450px] bg-[#FDE68A]/30 blur-[90px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#08214D]/5 via-transparent to-transparent blur-[80px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-6 space-y-6 text-left relative z-10">
              {/* Trust Pill Tag */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] shadow-xs"
              >
                <HiOutlineLightningBolt className="w-4 h-4 text-[#D97706] animate-pulse" />
                <span className="tracking-wide uppercase text-[11px] font-black">
                  INDIA'S TRUSTED MARKETPLACE FOR SELLERS
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#08214D] leading-[1.12] tracking-tight"
              >
                Start Selling & Growing <br />
                Your Business on <br />
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
                Reach millions of active buyers across 28,000+ pincodes in India with 0% commission, automated weekly payouts, and 24/7 dedicated support.
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
                  className="px-8 py-3.5 text-sm md:text-base font-black rounded-full text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-[#DFB743]/30 hover:shadow-xl hover:shadow-[#DFB743]/40 transition-all flex items-center gap-2 border border-[#DFB743]/50 cursor-pointer"
                >
                  Become a Seller <HiOutlineArrowRight className="w-5 h-5 text-[#051838]" />
                </Link>
                <Link
                  to="/login"
                  className="px-7 py-3.5 text-sm md:text-base font-extrabold rounded-full bg-white border border-slate-200 text-[#08214D] hover:bg-slate-50 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#DFB743]/20 flex items-center justify-center text-[#08214D]">
                    <FaStore className="w-3.5 h-3.5 text-[#08214D]" />
                  </div>
                  Seller Login
                </Link>
              </motion.div>

              {/* 4 Stat Metric Cards (Directly under buttons) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-4"
              >
                {/* Stat 1 */}
                <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2 sm:gap-2.5 hover:shadow-md hover:border-[#DFB743]/40 transition-all min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
                    <FaStore className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B45309]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-base font-black text-[#08214D] leading-tight truncate">
                      {stats.totalSellers}+
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 leading-tight truncate">
                      Active Sellers
                    </p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2 sm:gap-2.5 hover:shadow-md hover:border-[#DFB743]/40 transition-all min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                    <HiOutlineClipboardList className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#1E3A8A]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-base font-black text-[#08214D] leading-tight truncate">
                      {stats.totalProducts}+
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 leading-tight truncate">
                      Products Listed
                    </p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2 sm:gap-2.5 hover:shadow-md hover:border-[#DFB743]/40 transition-all min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                    <HiOutlineCurrencyRupee className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-base font-black text-[#08214D] leading-tight truncate">
                      ₹100Cr+
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 leading-tight truncate">
                      Monthly Sales
                    </p>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2 sm:gap-2.5 hover:shadow-md hover:border-[#DFB743]/40 transition-all min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#DFB743]/15 text-[#051838] flex items-center justify-center border border-[#DFB743]/30 shrink-0">
                    <FaStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-base font-black text-[#08214D] leading-tight truncate">
                      4.8 ★
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 leading-tight truncate">
                      Seller Rating
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side Illustration Image with Animated Floating Stat Cards */}
            <div className="md:col-span-6 relative flex justify-center items-center z-10 mt-6 md:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-gradient-to-tr from-[#FDF8EA] via-[#FDE68A]/30 to-transparent blur-[60px] rounded-full pointer-events-none -z-10"></div>

              {/* Clean Illustration Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full relative flex justify-center items-center"
              >
                <img
                  src={heroIllustration}
                  alt="MithraShoppy Seller Hub E-Commerce Platform"
                  className="w-full h-auto max-w-lg lg:max-w-xl object-contain rounded-2xl drop-shadow-md"
                />

                {/* Animated Floating Card 1: Total Revenue Graphic Card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                  className="absolute -top-3 right-1 sm:right-6 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 sm:gap-3 z-20 scale-90 sm:scale-100 origin-top-right"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100 shrink-0">
                    <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-[10px] sm:text-xs font-bold text-slate-400">Total Sales Revenue</p>
                      <span className="text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                        +18.4%
                      </span>
                    </div>
                    <p className="text-xs sm:text-base font-black text-[#08214D]">
                      {formattedRevenue}
                    </p>
                  </div>
                </motion.div>

                {/* Animated Floating Card 2: 0% Commission Badge */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-4 left-1 sm:left-6 bg-[#08214D] text-white p-2.5 sm:p-3.5 rounded-2xl shadow-xl border border-[#DFB743]/40 flex items-center gap-2 sm:gap-3 z-20 scale-90 sm:scale-100 origin-bottom-left"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#DFB743] to-[#C29B27] text-[#051838] flex items-center justify-center font-black shadow-sm shrink-0">
                    <FaPercentage className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#051838]" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-[#DFB743]">0% Commission Fee</p>
                    <p className="text-[11px] sm:text-xs font-extrabold text-white">Keep 100% Profits</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Full-width Dark Navy Feature Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#08214D] text-white rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-xl border border-[#08214D]/40"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-2">
              {/* Feature 1 */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#DFB743] shrink-0 border border-white/10">
                  <HiOutlineShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#DFB743]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight leading-tight truncate">
                    Secure & Reliable
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium mt-0.5 truncate">
                    100% Safe Transactions
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#DFB743] shrink-0 border border-white/10">
                  <FaRocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DFB743]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight leading-tight truncate">
                    Easy Onboarding
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium mt-0.5 truncate">
                    Quick & Simple Process
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#DFB743] shrink-0 border border-white/10">
                  <HiOutlineCreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#DFB743]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight leading-tight truncate">
                    Timely Payments
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium mt-0.5 truncate">
                    Direct to Your Bank
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#DFB743] shrink-0 border border-white/10">
                  <HiOutlineSupport className="w-4 h-4 sm:w-5 sm:h-5 text-[#DFB743]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight leading-tight truncate">
                    24/7 Support
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium mt-0.5 truncate">
                    We're Here to Help
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Sell on MithraShoppy? (Benefits) Section */}
      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 md:px-12 bg-gradient-to-b from-[#F5F7FF] via-[#FAFCFF] to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          {/* Header */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-[#0B1A40] tracking-tight">
              Why Sell on MithraShoppy?
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full mt-2"></div>
          </div>

          {/* 5 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-5 relative max-w-7xl mx-auto pt-16">
            {[
              {
                icon: HiOutlineCloudUpload,
                num: '01',
                title: 'Easy Product Upload',
                desc: 'List your products in just a few simple steps.',
                bgGradient: 'from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]',
                shadowColor: 'shadow-blue-500/30',
                numberColor: 'text-blue-600',
                accentColor: 'bg-blue-500',
                borderColor: 'border-blue-100/80',
                haloColor: 'bg-blue-500/15',
              },
              {
                icon: HiOutlineCreditCard,
                num: '02',
                title: 'Fast Payments',
                desc: 'Get secure payments directly in your bank account.',
                bgGradient: 'from-[#F59E0B] via-[#D97706] to-[#B45309]',
                shadowColor: 'shadow-amber-500/30',
                numberColor: 'text-amber-600',
                accentColor: 'bg-amber-500',
                borderColor: 'border-amber-100/80',
                haloColor: 'bg-amber-500/15',
              },
              {
                icon: HiOutlineTrendingUp,
                num: '03',
                title: 'Real-time Analytics',
                desc: 'Track your performance and grow your business with insights.',
                bgGradient: 'from-[#10B981] via-[#059669] to-[#047857]',
                shadowColor: 'shadow-emerald-500/30',
                numberColor: 'text-emerald-600',
                accentColor: 'bg-emerald-500',
                borderColor: 'border-emerald-100/80',
                haloColor: 'bg-emerald-500/15',
              },
              {
                icon: HiOutlineCube,
                num: '04',
                title: 'Order Management',
                desc: 'Manage orders, returns and customers efficiently.',
                bgGradient: 'from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]',
                shadowColor: 'shadow-purple-500/30',
                numberColor: 'text-purple-600',
                accentColor: 'bg-purple-500',
                borderColor: 'border-purple-100/80',
                haloColor: 'bg-purple-500/15',
              },
              {
                icon: HiOutlineSupport,
                num: '05',
                title: '24/7 Support',
                desc: 'Our support team is always available anytime.',
                bgGradient: 'from-[#F43F5E] via-[#E11D48] to-[#BE123C]',
                shadowColor: 'shadow-rose-500/30',
                numberColor: 'text-rose-600',
                accentColor: 'bg-rose-500',
                borderColor: 'border-rose-100/80',
                haloColor: 'bg-rose-500/15',
              },
            ].map(
              (
                {
                  icon: Icon,
                  num,
                  title,
                  desc,
                  bgGradient,
                  shadowColor,
                  numberColor,
                  accentColor,
                  borderColor,
                  haloColor,
                },
                i
              ) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`bg-white border ${borderColor} rounded-[28px] pt-16 pb-7 px-4 text-center flex flex-col items-center justify-between shadow-md shadow-indigo-100/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative z-10 min-h-[220px]`}
                >
                  {/* Floating Circle Icon with Halo */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <div className={`w-24 h-24 rounded-full ${haloColor} p-1.5 flex items-center justify-center`}>
                      <div
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${bgGradient} shadow-lg ${shadowColor} flex items-center justify-center text-white relative group-hover:scale-105 transition-transform duration-300`}
                      >
                        <Icon className="w-9 h-9 text-white drop-shadow-sm" />
                        {/* Step Badge */}
                        <span
                          className={`absolute bottom-0 right-0 translate-x-1 translate-y-1 w-8 h-8 rounded-full bg-white ${numberColor} font-black text-[11px] flex items-center justify-center shadow-md border-2 border-white`}
                        >
                          {num}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2 pt-2">
                    <h3 className="font-extrabold text-[#0B1A40] text-base tracking-tight">
                      {title}
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed max-w-[170px] mx-auto">
                      {desc}
                    </p>
                  </div>

                  {/* Accent Dash at bottom */}
                  <div
                    className={`w-8 h-1 rounded-full ${accentColor} mx-auto mt-4 opacity-90`}
                  ></div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 md:px-12 bg-gradient-to-b from-[#F5F7FF] via-[#FAFCFF] to-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto text-center space-y-16">
          {/* Header */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-[#0B1A40] tracking-tight">
              How It Works
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full mt-2"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative max-w-6xl mx-auto pt-16">
            {/* Desktop Connected Line behind badges */}
            <div className="hidden lg:block absolute top-[68px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-indigo-200/80 z-0"></div>

            {/* Step 1 -> Step 2 Arrow */}
            <div className="hidden lg:flex absolute top-[52px] left-[25%] -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-blue-200 items-center justify-center text-blue-500">
              <FaChevronRight className="w-3 h-3" />
            </div>

            {/* Step 2 -> Step 3 Arrow */}
            <div className="hidden lg:flex absolute top-[52px] left-[50%] -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-emerald-200 items-center justify-center text-emerald-500">
              <FaChevronRight className="w-3 h-3" />
            </div>

            {/* Step 3 -> Step 4 Arrow */}
            <div className="hidden lg:flex absolute top-[52px] left-[75%] -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-purple-200 items-center justify-center text-purple-500">
              <FaChevronRight className="w-3 h-3" />
            </div>

            {[
              {
                step: '01',
                title: 'Register',
                desc: 'Create your seller account in just a few minutes.',
                icon: FaUserPlus,
                bgGradient: 'from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]',
                shadowColor: 'shadow-blue-500/30',
                numberColor: 'text-blue-600',
                accentColor: 'bg-blue-500',
                borderColor: 'border-blue-100',
              },
              {
                step: '02',
                title: 'Get Approved',
                desc: 'Our team will verify your details and approve.',
                icon: FaShieldAlt,
                bgGradient: 'from-[#F59E0B] via-[#D97706] to-[#B45309]',
                shadowColor: 'shadow-amber-500/30',
                numberColor: 'text-amber-600',
                accentColor: 'bg-amber-500',
                borderColor: 'border-amber-100',
              },
              {
                step: '03',
                title: 'Add Products',
                desc: 'Upload your products and set competitive prices.',
                icon: FaBoxOpen,
                bgGradient: 'from-[#10B981] via-[#059669] to-[#047857]',
                shadowColor: 'shadow-emerald-500/30',
                numberColor: 'text-emerald-600',
                accentColor: 'bg-emerald-500',
                borderColor: 'border-emerald-100',
              },
              {
                step: '04',
                title: 'Start Selling',
                desc: 'Reach lakhs of customers and grow your business.',
                icon: FaStore,
                bgGradient: 'from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]',
                shadowColor: 'shadow-purple-500/30',
                numberColor: 'text-purple-600',
                accentColor: 'bg-purple-500',
                borderColor: 'border-purple-100',
              },
            ].map(
              (
                {
                  step,
                  title,
                  desc,
                  icon: Icon,
                  bgGradient,
                  shadowColor,
                  numberColor,
                  accentColor,
                  borderColor,
                },
                i
              ) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`bg-white border ${borderColor} rounded-[28px] pt-16 pb-7 px-5 text-center flex flex-col items-center justify-between shadow-md shadow-indigo-100/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative z-10`}
                >
                  {/* Floating Circle Icon */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-br ${bgGradient} shadow-lg ${shadowColor} flex items-center justify-center text-white relative group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-10 h-10 text-white drop-shadow-sm" />
                      {/* Step Badge */}
                      <span
                        className={`absolute bottom-0 right-0 translate-x-1 translate-y-1 w-9 h-9 rounded-full bg-white ${numberColor} font-black text-xs flex items-center justify-center shadow-md border-2 border-white`}
                      >
                        {step}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2 pt-2">
                    <h3 className="font-extrabold text-[#0B1A40] text-lg md:text-xl tracking-tight">
                      {title}
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed max-w-[210px] mx-auto">
                      {desc}
                    </p>
                  </div>

                  {/* Accent Dash at bottom */}
                  <div
                    className={`w-8 h-1 rounded-full ${accentColor} mx-auto mt-4 opacity-90`}
                  ></div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Seller Success Stories / Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 md:px-12 bg-gradient-to-b from-white via-[#FAF9F6] to-[#F5F7FF] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-4 py-1.5 rounded-full text-xs font-black bg-[#08214D]/10 text-[#08214D] uppercase tracking-wider border border-[#08214D]/20 inline-flex items-center gap-2 shadow-xs">
              <HiOutlineUserGroup className="w-4 h-4 text-[#DFB743]" />
              CLOTHING SELLER SUCCESS STORIES
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#08214D] tracking-tight">
              Here's What <span className="text-[#DFB743]">Our Apparel Sellers</span> Are Saying
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Real success stories from boutique owners, apparel brands, and weavers growing nationwide on MithraShoppy.
            </p>
            <div className="w-16 h-1.5 bg-gradient-to-r from-[#08214D] via-[#DFB743] to-[#E5C058] mx-auto rounded-full mt-2"></div>
          </div>

          {/* Testimonial Cards Layout: Vertical Stack (One by One), Alternating Left/Right Photo */}
          <div className="space-y-12 max-w-4xl mx-auto">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-[28px] p-6 sm:p-9 shadow-lg shadow-indigo-100/50 border border-slate-100 hover:border-[#DFB743]/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Decorative Background Ambient Glow */}
                <div
                  className={`absolute -top-16 ${
                    item.reverse ? '-left-16' : '-right-16'
                  } w-40 h-40 bg-[#DFB743]/10 rounded-full blur-2xl group-hover:bg-[#DFB743]/20 transition-all`}
                ></div>

                <div
                  className={`flex flex-col ${
                    item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
                  } items-center md:items-start gap-8 relative z-10`}
                >
                  {/* Seller Portrait (Photo Only - Alternating Left/Right) */}
                  <div className="relative flex-shrink-0">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full p-2.5 bg-gradient-to-tr from-[#DFB743]/40 via-[#FBBF24]/20 to-[#FEF3C7]/60 relative flex items-center justify-center">
                      <div className="w-full h-full rounded-full p-1 border-4 border-[#DFB743]/90 shadow-md overflow-hidden bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Decorative Sparkle Stars */}
                      <span className="absolute -top-1 right-2 text-[#DFB743] text-lg">✦</span>
                      <span className="absolute bottom-3 -left-1 text-[#DFB743] text-sm">✨</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3.5 text-center md:text-left flex-1">
                    <span className="text-[11px] font-black tracking-widest text-[#08214D] uppercase font-mono bg-[#08214D]/5 px-3 py-1 rounded-md inline-block border border-[#08214D]/10">
                      {item.business}
                    </span>
                    
                    <div className="pt-1">
                      <FaQuoteLeft className="w-8 h-8 text-[#2563EB] mb-2 mx-auto md:mx-0" />
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1A40] leading-snug">
                        "{item.headline}"
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      "{item.text}"
                    </p>

                    <div className="pt-2">
                      <div className="flex items-center justify-center md:justify-start gap-1.5">
                        <h4 className="font-black text-[#08214D] text-base sm:text-lg">
                          {item.name}
                        </h4>
                        <HiOutlineCheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                      </div>
                      <p className="text-slate-500 text-xs font-semibold mt-0.5">
                        {item.role} · <span className="text-slate-400">{item.location}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats Pill Bar */}
                <div className="mt-8 pt-5 border-t border-slate-100 relative z-10 bg-[#FFFBEB]/80 border border-[#FDE68A]/60 rounded-2xl p-4 flex items-center justify-around gap-3 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[#D97706] font-black text-xs sm:text-sm">
                      <HiOutlineTrendingUp className="w-4 h-4" />
                      <span>{item.growth}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5">{item.growthLabel}</p>
                  </div>

                  <div className="h-7 w-px bg-amber-200/80"></div>

                  <div>
                    <div className="flex items-center justify-center gap-1 text-[#08214D] font-black text-xs sm:text-sm">
                      <HiOutlineCube className="w-4 h-4 text-[#DFB743]" />
                      <span>{item.orders}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5">{item.ordersLabel}</p>
                  </div>

                  <div className="h-7 w-px bg-amber-200/80"></div>

                  <div>
                    <div className="flex items-center justify-center gap-1 font-black text-xs sm:text-sm">
                      <div className="flex text-amber-400 gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <FaStar key={j} className="w-3.5 h-3.5 text-[#DFB743]" />
                        ))}
                      </div>
                      <span className="text-slate-800 ml-1">{item.ratingScore}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5">{item.ratingLabel}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section with 3D Illustration */}
      <section
        id="faq"
        className="py-20 px-4 md:px-12 bg-gradient-to-b from-white via-[#FAF9F5] to-[#F8FAFC] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-14">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#08214D]/10 text-[#08214D] uppercase tracking-wider border border-[#08214D]/20">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B1A40] tracking-tight">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Everything you need to know about selling on MithraShoppy.
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full mt-2"></div>
          </div>

          {/* 2-Column Layout: 3D Illustration on LEFT + FAQ Accordion on RIGHT (Matching Image 1 & 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center max-w-6xl mx-auto">
            {/* Left Column: 3D Question Mark Illustration */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
                <img
                  src={faq3dIllustration}
                  alt="Frequently Asked Questions 3D Illustration"
                  className="w-full h-auto object-contain rounded-3xl drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Right Column: FAQ Accordion List */}
            <div className="lg:col-span-7 space-y-3.5">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  icon={faq.icon}
                  badgeBg={faq.badgeBg}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* High-Converting Bottom CTA Banner matching Image 2 & 3 */}
      <section className="py-16 px-4 md:px-12 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto rounded-[32px] overflow-hidden bg-[#0B1C42] text-white py-10 px-8 sm:px-12 md:px-14 relative shadow-2xl border border-blue-900/40">
          {/* Subtle Abstract Radial Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>

          {/* Glowing Gradient Accents */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#DFB743]/15 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Text & Buttons */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Ready to <span className="text-[#DFB743]">Grow Your Business?</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                Join MithraShoppy today and start your journey towards success. It's quick, easy and 100% free!
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className="px-7 py-3.5 font-extrabold rounded-xl text-[#051838] bg-gradient-to-r from-[#DFB743] via-[#F5D98B] to-[#E5C058] hover:scale-[1.03] active:scale-[0.98] transition-all text-sm sm:text-base shadow-xl shadow-[#DFB743]/20 flex items-center gap-2 border border-[#DFB743]/40 cursor-pointer"
                >
                  Become a Seller <HiOutlineArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="px-7 py-3.5 font-bold rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all text-sm sm:text-base border border-white/20 cursor-pointer"
                >
                  Seller Login
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Seller Artwork merged with background (No Frame) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-md flex justify-center items-center">
                <img
                  src={cta3dSellerTransparent}
                  alt="Ready to Grow Your Business with MithraShoppy"
                  className="w-full h-auto object-contain mix-blend-multiply filter contrast-105 drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
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
