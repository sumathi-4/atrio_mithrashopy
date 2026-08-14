import React, { useState, useEffect } from 'react'
import { MEDIA } from './utils/cloudinary'
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
      watermark="PROCESS"
      className="how-it-works-section"
    >
      <div className="how-it-works-container">
        
        {/* Section Header — Centered matching img2 100% */}
        <div className="how-it-works-header-block">
          <span className="how-it-works-tag">
            SIMPLE 4-STEP PROCESS
          </span>

          <h2 className="how-it-works-heading">
            Selling in <span className="gold-gradient-text">4 Simple Steps</span>
          </h2>

          <p className="how-it-works-subtitle">
            Follow our streamlined onboarding workflow designed to get your store live and<br className="hidden sm:inline" /> generating revenue quickly.
          </p>
        </div>

        {/* Desktop View: 2-Column Click-to-Select & Auto-Rotating Layout */}
        <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: 4 Step Cards with Explicit Vertical Gaps */}
          <div className="col-span-5 flex flex-col">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`how-it-works-card ${
                    isActive ? 'how-it-works-card-active' : 'how-it-works-card-inactive'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`how-it-works-num ${isActive ? 'how-it-works-num-active' : 'how-it-works-num-inactive'}`}>
                      {step.number}
                    </span>
                    <h3 className="how-it-works-title">
                      {step.title}
                    </h3>
                  </div>
                  <p className="how-it-works-desc">
                    {step.caption}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right Column: Active 3D Illustration Display Frame matching img2 */}
          <div className="col-span-7">
            <div className="how-it-works-frame">
              <img
                key={activeStep}
                src={steps[activeStep].image}
                alt={steps[activeStep].alt}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="how-it-works-banner">
                <span className="how-it-works-banner-text">
                  Step {steps[activeStep].number}: {steps[activeStep].caption}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile View: Stacked List */}
        <div className="md:hidden space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="how-it-works-card-active p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="how-it-works-num-active">
                  {step.number}
                </span>
                <h3 className="how-it-works-title">
                  {step.title}
                </h3>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-700/60 aspect-[16/9] bg-white">
                <img src={step.image} alt={step.alt} className="w-full h-full object-cover" />
              </div>

              <p className="how-it-works-desc">
                {step.caption}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SectionReveal>
  )
}
