import React from 'react'
import { motion } from 'framer-motion'
import { Banknote, BadgePercent, Users, Camera, UploadCloud, Headphones } from 'lucide-react'
import { getSellerPortalUrl } from '../utils/navigation'

const features = [
  {
    icon: Banknote,
    stat: '7-Day Direct Payouts',
    title: 'Fast & Reliable Settlement',
    description: 'Get automated weekly payouts directly into your bank account with zero payment delays.',
  },
  {
    icon: BadgePercent,
    stat: '0% Upfront Listing Fees',
    title: 'Zero Financial Risk',
    description: 'List unlimited products across multiple categories without paying any initial catalog fees.',
  },
  {
    icon: Users,
    stat: 'High-Intent Premium Buyers',
    title: 'Reach Ethnic & Gift Shoppers',
    description: 'Connect directly with millions of verified customers looking for authentic Indian crafts & fashion.',
  },
  {
    icon: Camera,
    stat: 'Free Photography Guidance',
    title: 'Professional Cataloging Help',
    description: 'Access expert image guidelines and catalog optimization support to make your products stand out.',
  },
  {
    icon: UploadCloud,
    stat: 'Bulk Upload & Inventory Tools',
    title: 'Effortless Store Management',
    description: 'Import thousands of product SKUs seamlessly via CSV and sync stock in real time.',
  },
  {
    icon: Headphones,
    stat: 'Dedicated Onboarding Manager',
    title: '1-on-1 Personalized Support',
    description: 'Get assigned a dedicated account specialist to assist you from signup to your very first sale.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // ~80ms stagger
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function WhyUsSection({ sellerPortalUrl }) {
  const activePortalUrl = sellerPortalUrl || getSellerPortalUrl()
  const registerUrl = `${activePortalUrl}/register`

  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#051838] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold text-[#B48B1E] uppercase tracking-widest bg-[#FFFBEB] border border-[#FDE68A] px-4 py-1.5 rounded-full mb-3 shadow-xs">
            Why Partner With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0B1A40] tracking-tight leading-tight mb-4">
            Why Sellers Choose <span className="gold-gradient-text">MithraShoppy</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Everything you need to showcase your authentic products, scale sales, and build a flourishing brand across India.
          </p>
        </div>

        {/* 6-Card Responsive Grid with Framer Motion Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14"
        >
          {features.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: '0 20px 35px -10px rgba(11, 26, 64, 0.12)' }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Header */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border border-[#DFB743]/40 flex items-center justify-center text-[#051838] mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Bold Stat / Claim */}
                  <div className="inline-block text-xs font-extrabold text-[#047857] bg-[#E6F4EA] border border-[#A7F3D0] px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    {item.stat}
                  </div>

                  {/* Card Title */}
                  <h3 className="font-sans text-xl font-bold text-[#0B1A40] tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* One-line description */}
                  <p className="font-sans text-sm text-slate-600 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Section Bottom CTA Link */}
        <div className="text-center">
          <a
            href={registerUrl}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B1A40] hover:bg-[#051838] text-[#DFB743] font-bold text-sm sm:text-base rounded-2xl transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DFB743]"
          >
            <span>Start Selling With 0% Commission</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
