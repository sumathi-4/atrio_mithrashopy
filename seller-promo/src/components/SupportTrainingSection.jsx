import React from 'react'
import { Headphones, UserCheck, BookOpen, MessageCircle } from 'lucide-react'

const supportItems = [
  {
    icon: Headphones,
    title: 'Dedicated 1-on-1 Support',
    description: 'Get paired with a personal seller advisor who guides you through store setup, pricing strategies, and order management.',
  },
  {
    icon: UserCheck,
    title: 'Assisted Onboarding',
    description: 'Our team assists you with GSTIN verification, bank account linking, and bulk product catalog uploads for a smooth start.',
  },
  {
    icon: BookOpen,
    title: 'Seller Training & Academy',
    description: 'Access free step-by-step video tutorials, growth webinars, catalog photography tips, and marketing guides anytime.',
  },
]

export default function SupportTrainingSection() {
  return (
    <section id="support-training" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#051838]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold text-[#B48B1E] uppercase tracking-widest bg-[#FFFBEB] border border-[#FDE68A] px-4 py-1.5 rounded-full mb-3 shadow-xs">
            We are here for you
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0B1A40] tracking-tight leading-tight mb-4">
            Support & Training Every Step of the <span className="gold-gradient-text">Way</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            You are never alone. Our dedicated seller support team ensures you have all the guidance and tools required to succeed.
          </p>
        </div>

        {/* 3 Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {supportItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border border-[#DFB743]/40 flex items-center justify-center text-[#051838] mb-6 shadow-sm">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>

                  <h3 className="font-sans text-xl font-bold text-[#0B1A40] tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm text-slate-600 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* WhatsApp / Contact CTA Banner */}
        <div className="bg-[#0B1A40] text-white rounded-3xl p-8 sm:p-10 border-2 border-[#DFB743]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              Have Questions Before Registering?
            </h3>
            <p className="font-sans text-sm text-slate-300">
              Speak directly with our seller onboarding specialists on WhatsApp for instant assistance.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hi%20MithraShoppy%20Seller%20Team%2C%20I%20want%20to%20know%20more%20about%20selling%20on%20your%20platform."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base rounded-2xl transition-all shadow-xl flex items-center gap-3 shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-current text-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
