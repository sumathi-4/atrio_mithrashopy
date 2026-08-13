import React, { useState, useEffect } from 'react'
import { MEDIA } from '../utils/cloudinary'
import SectionReveal from './SectionReveal'

const steps = [
  {
    number: '01',
    title: 'Register Your Store',
    caption: 'Enter your GSTIN & bank details to activate your seller account in 5 minutes.',
    image: MEDIA.HOW_IT_WORKS_STEP_1,
    alt: '1. Register Your Store 3D Illustration',
  },
  {
    number: '02',
    title: 'Upload Products',
    caption: 'Upload your product catalog with high-res photos, descriptions, and pricing.',
    image: MEDIA.HOW_IT_WORKS_STEP_2,
    alt: '2. Upload Products 3D Illustration',
  },
  {
    number: '03',
    title: 'Receive Orders',
    caption: 'Process incoming orders and ship products nationwide with automated labels.',
    image: MEDIA.HOW_IT_WORKS_STEP_3,
    alt: '3. Receive Orders 3D Illustration',
  },
  {
    number: '04',
    title: 'Get Paid',
    caption: 'Receive 7-day direct payouts sent automatically into your verified bank account.',
    image: MEDIA.HOW_IT_WORKS_STEP_4,
    alt: '4. Get Paid 3D Illustration',
  },
]

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  // Auto-rotate 4 steps one by one every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  return (
    <SectionReveal
      id="how-it-works"
      className="bg-[#FAF8F5] text-slate-900 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-block text-xs font-bold text-[#B3871E] uppercase tracking-widest bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full shadow-2xs">
            Simple 4-Step Process
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Selling in <span className="gold-gradient-text">4 Simple Steps</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Follow our streamlined onboarding workflow designed to get your store live and generating revenue quickly.
          </p>
        </div>

        {/* Desktop View: Unpinned 2-Column Click-to-Select & Auto-Rotating Layout */}
        <div className="hidden md:grid grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: 4 Step Cards */}
          <div className="col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-[#0B1A40] border-2 border-[#DFB743] shadow-2xl gold-glow scale-102'
                      : 'bg-[#06122E] border-slate-700/60 hover:border-[#DFB743]/50 hover:bg-[#0A1B46] shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xl font-black rounded-2xl w-12 h-12 flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#DFB743] text-[#051838] shadow-md'
                          : 'bg-[#0F2454] text-[#DFB743] border border-slate-600/50'
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className="font-sans text-xl font-extrabold tracking-tight text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-slate-200 font-medium mt-3 pl-16 leading-relaxed">
                    {step.caption}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right Column: Active 3D Isometric Step Illustration Display Frame */}
          <div className="col-span-7">
            <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-[#DFB743]/60 shadow-2xl aspect-[16/9] transition-all duration-500">
              <img
                key={activeStep}
                src={steps[activeStep].image}
                alt={steps[activeStep].alt}
                className="w-full h-full object-cover transition-opacity duration-500 animate-fade-in"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#06122E]/95 backdrop-blur-md border-t border-white/15 text-center">
                <span className="font-sans text-xs sm:text-sm font-extrabold text-[#DFB743]">
                  Step {steps[activeStep].number}: {steps[activeStep].caption}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile View: Stacked List */}
        <div className="md:hidden space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-[#06122E] text-white rounded-3xl p-6 border border-slate-700/60 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl font-black bg-[#DFB743] text-[#051838] rounded-xl w-10 h-10 flex items-center justify-center shrink-0 shadow-md">
                  {step.number}
                </span>
                <h3 className="font-sans text-lg font-extrabold text-white tracking-tight">
                  {step.title}
                </h3>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-700/60 aspect-[16/9] bg-white">
                <img src={step.image} alt={step.alt} className="w-full h-full object-cover" />
              </div>

              <p className="font-sans text-xs text-slate-200 leading-relaxed font-medium">
                {step.caption}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SectionReveal>
  )
}
