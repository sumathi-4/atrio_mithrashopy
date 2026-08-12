import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Register Your Store',
    caption: 'Enter your GSTIN & bank details to activate your seller account in 5 minutes.',
    image: '/how-it-works/step1.png',
    alt: 'Register Your Store Screenshot',
  },
  {
    number: '02',
    title: 'List Your Products',
    caption: 'Upload your product catalog with high-res photos, descriptions, and pricing.',
    image: '/how-it-works/step2.png',
    alt: 'List Your Products Screenshot',
  },
  {
    number: '03',
    title: 'Receive Orders',
    caption: 'Process incoming orders and ship products nationwide with automated labels.',
    image: '/how-it-works/step3.png',
    alt: 'Receive Orders Dashboard',
  },
  {
    number: '04',
    title: 'Get Paid',
    caption: 'Receive 7-day direct payouts sent automatically into your verified bank account.',
    image: '/how-it-works/step4.png',
    alt: 'Get Paid Settlement Screen',
  },
]

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    // Only set up GSAP ScrollTrigger Pinning on Desktop (Width >= 768px)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const pinTrigger = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=2000',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Calculate current active step index (0 to 3) based on scroll progress
          const progress = self.progress
          const newStep = Math.min(
            Math.floor(progress * steps.length),
            steps.length - 1
          )
          setActiveStep(newStep)
        },
      })

      return () => {
        pinTrigger.kill()
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1A40] text-white relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest bg-white/10 border border-[#DFB743]/40 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            Simple 4-Step Process
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            How Selling On <span className="gold-gradient-text">MithraShoppy</span> Works
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            From registration to your first payout — everything is designed to get you selling across India seamlessly.
          </p>
        </div>

        {/* DESKTOP VIEW: Pinned Two-Column Layout (GSAP ScrollTrigger Pinned) */}
        <div ref={triggerRef} className="hidden md:block min-h-[550px] relative">
          <div className="grid grid-cols-12 gap-10 items-center h-full">
            {/* Left Column: Numbered Stepper */}
            <div className="col-span-5 space-y-6">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-white/15 to-white/5 border-[#DFB743] shadow-xl shadow-[#DFB743]/10 translate-x-2'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-2xl font-black ${
                          isActive ? 'text-[#DFB743]' : 'text-slate-400'
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3
                        className={`font-sans text-xl font-bold ${
                          isActive ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                    {isActive && (
                      <p className="font-sans text-sm text-slate-200 font-normal mt-3 leading-relaxed transition-all">
                        {step.caption}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right Column: Swapping Active Step Image */}
            <div className="col-span-7 flex items-center justify-center">
              <div className="relative w-full h-[420px] rounded-3xl overflow-hidden border-2 border-[#DFB743]/40 bg-[#061432] p-3 shadow-2xl">
                {steps.map((step, idx) => (
                  <img
                    key={idx}
                    src={step.image}
                    alt={step.alt}
                    className={`absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover rounded-2xl transition-all duration-500 ease-out ${
                      activeStep === idx
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-95 z-0 pointer-events-none'
                    }`}
                  />
                ))}
                {/* Active Step Badge Overlay */}
                <div className="absolute top-6 right-6 z-20 bg-[#0B1A40]/90 backdrop-blur-md border border-[#DFB743]/50 text-[#DFB743] text-xs font-bold font-mono px-3.5 py-1.5 rounded-full shadow-lg">
                  Step {steps[activeStep].number} / 04
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Normal Stacked List (Pin & Scrub Disabled) */}
        <div className="md:hidden space-y-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg space-y-4"
            >
              {/* Stepper Header */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl font-bold text-[#DFB743]">
                  {step.number}
                </span>
                <h3 className="font-sans text-lg font-bold text-white">
                  {step.title}
                </h3>
              </div>

              {/* Caption */}
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                {step.caption}
              </p>

              {/* Image directly beneath each step */}
              <div className="relative rounded-xl overflow-hidden border border-white/15 bg-[#061432] p-1.5 shadow-md">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-52 object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
