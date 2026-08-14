import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Layers, ShieldCheck, BarChart3, Headphones, ArrowRight } from 'lucide-react'
import { getSellerPortalUrl } from './utils/navigation'
import { MEDIA } from './utils/cloudinary'
import SectionReveal from './SectionReveal'

const features = [
  {
    icon: Users,
    bg: 'bg-indigo-50 text-indigo-600',
    title: 'Reach More Customers',
    description: 'Access millions of shoppers across India and grow your brand beyond boundaries.',
  },
  {
    icon: Layers,
    bg: 'bg-emerald-50 text-emerald-600',
    title: 'Easy Product Management',
    description: 'Add, edit and manage your products, inventory and prices with ease.',
  },
  {
    icon: ShieldCheck,
    bg: 'bg-teal-50 text-teal-600',
    title: 'Secure Payments',
    description: 'Safe, reliable and timely payments directly to your account.',
  },
  {
    icon: BarChart3,
    bg: 'bg-blue-50 text-blue-600',
    title: 'Real-Time Analytics',
    description: 'Track your sales, orders and performance with advanced real-time insights.',
  },
  {
    icon: Headphones,
    bg: 'bg-purple-50 text-purple-600',
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

  // Live countdown timer state (23 Days, 14 Hours, 59 Mins, 38 Secs)
  const [timer, setTimer] = useState({ days: 23, hours: 14, mins: 59, secs: 38 })

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
      className="why-us-section"
    >
      <div className="why-us-container">
        
        {/* Top Part: 2-Column Why Choose MithraShoppy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Button (Cols 4) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="why-us-tag">
              WHY SELL ON MITHRASHOPPY?
            </span>

            <h2 className="why-us-heading">
              Everything You Need to Grow Your Business
            </h2>

            <p className="why-us-subtitle">
              Powerful tools and features designed to help you scale faster and smarter.
            </p>

            <div className="pt-1">
              <a
                href="#how-it-works"
                onClick={handleExploreFeatures}
                className="why-us-explore-btn"
              >
                <span>Explore All Features</span>
                <ArrowRight className="w-4 h-4 text-[#C2931F]" />
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
              className="why-us-cards-grid"
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="why-us-card group"
                  >
                    {/* Icon Circle */}
                    <div className={`why-us-icon-circle ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Card Title */}
                    <h3 className="why-us-card-title group-hover:text-[#B3871E] transition-colors">
                      {feature.title}
                    </h3>

                    {/* Card Description */}
                    <p className="why-us-card-desc">
                      {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

        </div>

        {/* Bottom Part: 0% COMMISSION Limited Time Offer Banner matching img2 100% */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="offer-banner-container"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: 3D Gold 0% Gift Box Graphic (Cols 4) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start items-center">
              <div className="relative w-48 sm:w-56 md:w-64 aspect-square flex items-center justify-center">
                <img
                  src={MEDIA.GOLD_0_PERCENT}
                  alt="3D Gold 0% Commission Gift Box"
                  className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Middle: Text Information (Cols 4) */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-2">
              <span className="offer-banner-tag">
                LIMITED TIME OFFER
              </span>

              <h3 className="offer-banner-headline">
                0% <br />
                COMMISSION
              </h3>

              <p className="offer-banner-desc mx-auto lg:mx-0">
                Start selling with zero commission for a limited time and keep 100% of your earnings!
              </p>
            </div>

            {/* Right: Live Countdown Card + Action Button (Cols 4) */}
            <div className="lg:col-span-4 w-full">
              <div className="offer-timer-card">
                
                {/* Timer Header */}
                <div className="flex items-center justify-center gap-2">
                  <span className="h-[1px] w-6 bg-slate-200" />
                  <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
                    OFFER ENDS IN
                  </span>
                  <span className="h-[1px] w-6 bg-slate-200" />
                </div>

                {/* 4 Timer Boxes (Days, Hours, Mins, Secs) */}
                <div className="grid grid-cols-4 gap-2">
                  {/* Days */}
                  <div className="offer-timer-box">
                    <div className="offer-timer-number">
                      {String(timer.days).padStart(2, '0')}
                    </div>
                    <div className="offer-timer-unit">
                      DAYS
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="offer-timer-box">
                    <div className="offer-timer-number">
                      {String(timer.hours).padStart(2, '0')}
                    </div>
                    <div className="offer-timer-unit">
                      HOURS
                    </div>
                  </div>

                  {/* Mins */}
                  <div className="offer-timer-box">
                    <div className="offer-timer-number">
                      {String(timer.mins).padStart(2, '0')}
                    </div>
                    <div className="offer-timer-unit">
                      MINS
                    </div>
                  </div>

                  {/* Secs */}
                  <div className="offer-timer-box">
                    <div className="offer-timer-number">
                      {String(timer.secs).padStart(2, '0')}
                    </div>
                    <div className="offer-timer-unit">
                      SECS
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={registerUrl}
                  target="_top"
                  rel="noopener noreferrer"
                  className="offer-start-btn"
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
