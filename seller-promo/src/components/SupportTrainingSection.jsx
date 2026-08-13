import React from 'react'
import { MEDIA } from '../utils/cloudinary'
import SectionReveal from './SectionReveal'

export default function SupportTrainingSection() {
  const whatsappUrl =
    'https://wa.me/919876543210?text=Hi%20MithraShoppy%20Seller%20Team%2C%20I%20want%20to%20know%20more%20about%20selling%20on%20your%20platform.'

  const approvalSteps = [
    {
      num: '1',
      title: 'Submit Application',
      bgColor: 'bg-blue-100/80 border-2 border-blue-200',
      iconColor: 'text-blue-600',
      icon: (
        <svg className="w-7 h-7 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      num: '2',
      title: 'Verify Documents',
      bgColor: 'bg-amber-100/80 border-2 border-amber-200',
      iconColor: 'text-amber-600',
      icon: (
        <svg className="w-7 h-7 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      num: '3',
      title: 'Admin Review',
      bgColor: 'bg-indigo-100/80 border-2 border-indigo-200',
      iconColor: 'text-indigo-600',
      icon: (
        <svg className="w-7 h-7 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      num: '4',
      title: 'Get Approved',
      bgColor: 'bg-amber-100/80 border-2 border-amber-200',
      iconColor: 'text-amber-600',
      icon: (
        <svg className="w-7 h-7 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      num: '5',
      title: 'Start Selling',
      bgColor: 'bg-blue-100/80 border-2 border-blue-200',
      iconColor: 'text-blue-600',
      icon: (
        <svg className="w-7 h-7 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      ),
    },
  ]

  return (
    <SectionReveal
      id="support-training"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#F0F5FF] text-slate-900 relative overflow-hidden border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT CARD (Cols 5): Dedicated Seller Support */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#EBF2FF] to-[#DCE8FF] border border-blue-200/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="relative z-10 max-w-[65%] space-y-4">
            <span className="inline-block text-[11px] font-extrabold text-[#1E40AF] uppercase tracking-wider">
              DEDICATED SELLER SUPPORT
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We're Here to Help You Grow
            </h3>

            <ul className="space-y-2.5 pt-2">
              <li className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-slate-700">
                <span className="text-emerald-600 font-extrabold">✓</span> Priority support for all sellers
              </li>
              <li className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-slate-700">
                <span className="text-emerald-600 font-extrabold">✓</span> Quick response & issue resolution
              </li>
              <li className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-slate-700">
                <span className="text-emerald-600 font-extrabold">✓</span> Guidance to grow your business
              </li>
              <li className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-slate-700">
                <span className="text-emerald-600 font-extrabold">✓</span> Training and resources
              </li>
            </ul>

            {/* Chat on WhatsApp Button */}
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp with Seller Support"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                {/* Official WhatsApp SVG Logo Icon */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Support Advisor Cutout Photo */}
          <div className="absolute right-0 bottom-0 w-[45%] max-w-[210px] sm:max-w-[240px] pointer-events-none">
            <img
              src={MEDIA.SUPPORT_ADVISOR_CUTOUT}
              alt="MithraShoppy Seller Support Advisor"
              className="w-full h-auto object-contain object-bottom drop-shadow-md"
            />
          </div>
        </div>

        {/* RIGHT CARD (Cols 7): Simple & Transparent Approval */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col justify-between">
          <div className="space-y-8">
            <span className="inline-block text-xs font-extrabold text-[#1E40AF] uppercase tracking-wider">
              SIMPLE & TRANSPARENT APPROVAL
            </span>

            {/* 5-Step Horizontal Flow with Increased Icon & Text Sizes */}
            <div className="grid grid-cols-5 gap-3 sm:gap-6 items-start text-center pt-2">
              {approvalSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-3 group">
                  {/* Larger Circular Icon Container */}
                  <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full ${step.bgColor} ${step.iconColor} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                    {step.icon}
                  </div>
                  
                  {/* Larger Step Number & Step Title Text */}
                  <span className="font-sans text-xs sm:text-base font-extrabold text-slate-800 leading-tight">
                    <span className="text-slate-400 font-mono text-xs sm:text-sm mr-1">{step.num}</span>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center sm:text-left text-xs sm:text-sm font-semibold text-slate-500">
            * Quick 24–48 hour store activation process once GSTIN & Bank details are uploaded.
          </div>
        </div>

      </div>
    </SectionReveal>
  )
}
