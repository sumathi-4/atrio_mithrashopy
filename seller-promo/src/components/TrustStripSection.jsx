import React from 'react'
import { ShieldCheck, Truck, FileText, Headphones } from 'lucide-react'

const badges = [
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    subtitle: 'Direct 7-Day Bank Settlements',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    subtitle: 'Reaching 29,000+ Pincodes',
  },
  {
    icon: FileText,
    title: 'GST Assisted Onboarding',
    subtitle: 'Hassle-Free Registration Support',
  },
  {
    icon: Headphones,
    title: 'Dedicated Seller Support',
    subtitle: '1-on-1 Account Management',
  },
]

export default function TrustStripSection() {
  return (
    <section id="trust-strip" className="relative bg-[#061432] text-white border-y border-[#DFB743]/30 py-4 overflow-hidden shadow-inner">
      {/* Desktop View: Static Row */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 items-center justify-between gap-6">
        {badges.map((badge, idx) => {
          const Icon = badge.icon
          return (
            <div key={idx} className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#DFB743]/40 flex items-center justify-center text-[#DFB743] shrink-0 group-hover:bg-[#DFB743] group-hover:text-[#051838] transition-all duration-300 shadow-md">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-white tracking-tight leading-tight">
                  {badge.title}
                </h4>
                <p className="font-sans text-xs font-normal text-slate-300">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile View: Horizontal Auto-Scroll Marquee */}
      <div className="md:hidden w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-8">
          {[...badges, ...badges].map((badge, idx) => {
            const Icon = badge.icon
            return (
              <div key={idx} className="flex items-center gap-3 shrink-0 px-2">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-[#DFB743]/40 flex items-center justify-center text-[#DFB743] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-white tracking-tight leading-tight">
                    {badge.title}
                  </h4>
                  <p className="font-sans text-[11px] font-normal text-slate-300 whitespace-nowrap">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
