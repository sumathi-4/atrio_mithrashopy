import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Layers, ShieldCheck, BarChart3, Headphones, ArrowRight } from 'lucide-react'
import { getSellerPortalUrl } from '../utils/navigation'
import { MEDIA } from '../utils/cloudinary'
import SectionReveal from './SectionReveal'

const features = [
  {
    icon: Users,
    bg: 'bg-indigo-50 text-indigo-600',
    border: 'border-indigo-100',
    title: 'Reach More Customers',
    description: 'Access millions of shoppers across India and grow your brand beyond boundaries.',
  },
  {
    icon: Layers,
    bg: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-100',
    title: 'Easy Product Management',
    description: 'Add, edit and manage your products, inventory and prices with ease.',
  },
  {
    icon: ShieldCheck,
    bg: 'bg-teal-50 text-teal-600',
    border: 'border-teal-100',
    title: 'Secure Payments',
    description: 'Safe, reliable and timely payments directly to your account.',
  },
  {
    icon: BarChart3,
    bg: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
    title: 'Real-Time Analytics',
    description: 'Track your sales, orders and performance with advanced real-time insights.',
  },
  {
    icon: Headphones,
    bg: 'bg-purple-50 text-purple-600',
    border: 'border-purple-100',
    title: 'Dedicated Support',
    description: 'Get priority support from our seller success team whenever you need.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function WhyUsSection({ sellerPortalUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const registerUrl = `${activePortalUrl}/register`

  // Live countdown timer state (23 Days, 14 Hours, 48 Mins, 32 Secs)
  const [timer, setTimer] = useState({ days: 23, hours: 14, mins: 48, secs: 32 })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 }
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 }
        return prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleExploreFeatures = (e) => {
    e.preventDefault()
    const target = document.getElementById('how-it-works')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <SectionReveal
      id="why-us"
      watermark="WHY SELL"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF8F5] text-slate-900 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Top Part: 2-Column Why Choose MithraShoppy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Button (Cols 4) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-[#B3871E] block">
              WHY SELL ON MITHRASHOPPY?
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Everything You Need to Grow Your Business
            </h2>

            <p className="font-sans text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-md">
              Powerful tools and features designed to help you scale faster and smarter.
            </p>

            <div className="pt-2">
              <a
                href="#how-it-works"
                onClick={handleExploreFeatures}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-[#F5F0E6] text-slate-900 font-bold text-sm sm:text-base rounded-2xl border border-[#DFB743]/60 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-102 active:scale-98 cursor-pointer"
              >
                <span>Explore All Features</span>
                <ArrowRight className="w-4 h-4 text-[#B3871E]" />
              </a>
            </div>
          </div>

          {/* Right Column: 5 Cards Grid Row (Cols 8) */}
          <div className="lg:col-span-8 w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-5"
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    <div>
                      {/* Icon Circle */}
                      <div className={`w-13 h-13 rounded-full ${feature.bg} flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>

                      {/* Card Title */}
                      <h3 className="font-sans text-base font-extrabold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-[#B3871E] transition-colors">
                        {feature.title}
                      </h3>

                      {/* Card Description */}
                      <p className="font-sans text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

        </div>

        {/* Bottom Part: 0% COMMISSION Limited Time Offer Banner (Matching Reference Image) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full bg-gradient-to-r from-[#FFF5DC] via-[#FFF9EC] to-[#FFF5DD] border border-[#F6E5B8] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: 3D Gold 0% Gift Box Graphic (Cols 4) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start items-center">
              <div className="relative w-48 sm:w-60 md:w-72 aspect-square flex items-center justify-center">
                <img
                  src={MEDIA.GOLD_0_PERCENT}
                  alt="3D Gold 0% Commission Gift Box"
                  className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Middle: Text Information (Cols 4) */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-3">
              <span className="font-mono text-xs font-bold text-[#C2931F] uppercase tracking-widest block">
                LIMITED TIME OFFER
              </span>

              <h3 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                0% COMMISSION
              </h3>

              <p className="font-sans text-xs sm:text-sm font-medium text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Start selling with zero commission for a limited time and keep 100% of your earnings!
              </p>
            </div>

            {/* Right: Live Countdown Card + Action Button (Cols 4) */}
            <div className="lg:col-span-4 w-full">
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-100/90 text-center space-y-5">
                
                {/* Timer Header */}
                <div className="flex items-center justify-center gap-2">
                  <span className="h-[1px] w-6 bg-slate-200" />
                  <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Offer Ends In
                  </span>
                  <span className="h-[1px] w-6 bg-slate-200" />
                </div>

                {/* 4 Timer Boxes (Days, Hours, Mins, Secs) */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {/* Days */}
                  <div className="bg-[#FFFDF7] border border-amber-100 rounded-xl p-2.5 sm:p-3 text-center shadow-2xs">
                    <div className="font-mono text-lg sm:text-2xl font-black text-slate-900 leading-none mb-1">
                      {String(timer.days).padStart(2, '0')}
                    </div>
                    <div className="font-sans text-[10px] sm:text-xs font-semibold text-slate-500 uppercase">
                      Days
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="bg-[#FFFDF7] border border-amber-100 rounded-xl p-2.5 sm:p-3 text-center shadow-2xs">
                    <div className="font-mono text-lg sm:text-2xl font-black text-slate-900 leading-none mb-1">
                      {String(timer.hours).padStart(2, '0')}
                    </div>
                    <div className="font-sans text-[10px] sm:text-xs font-semibold text-slate-500 uppercase">
                      Hours
                    </div>
                  </div>

                  {/* Mins */}
                  <div className="bg-[#FFFDF7] border border-amber-100 rounded-xl p-2.5 sm:p-3 text-center shadow-2xs">
                    <div className="font-mono text-lg sm:text-2xl font-black text-slate-900 leading-none mb-1">
                      {String(timer.mins).padStart(2, '0')}
                    </div>
                    <div className="font-sans text-[10px] sm:text-xs font-semibold text-slate-500 uppercase">
                      Mins
                    </div>
                  </div>

                  {/* Secs */}
                  <div className="bg-[#FFFDF7] border border-amber-100 rounded-xl p-2.5 sm:p-3 text-center shadow-2xs">
                    <div className="font-mono text-lg sm:text-2xl font-black text-slate-900 leading-none mb-1">
                      {String(timer.secs).padStart(2, '0')}
                    </div>
                    <div className="font-sans text-[10px] sm:text-xs font-semibold text-slate-500 uppercase">
                      Secs
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={registerUrl}
                  target="_top"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#06122E] hover:bg-[#0B1A40] text-white font-extrabold text-sm sm:text-base rounded-xl border border-[#06122E] shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Selling Now</span>
                  <ArrowRight className="w-4 h-4 text-[#DFB743]" />
                </a>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </SectionReveal>
  )
}
