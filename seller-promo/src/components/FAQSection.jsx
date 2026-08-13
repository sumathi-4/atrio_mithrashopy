import React, { useState } from 'react'
import { MEDIA } from '../utils/cloudinary'
import SectionReveal from './SectionReveal'

const faqData = [
  {
    question: 'What documents are needed to register as a seller on MithraShoppy?',
    answer:
      'To start selling, you need a valid GSTIN (GST Number), your PAN card, an active Indian Bank Account with IFSC code for settlements, and business address proof.',
  },
  {
    question: 'Are there any hidden listing fees or registration charges?',
    answer:
      'No! Registering your store on MithraShoppy is 100% free. There are zero upfront listing fees for uploading catalog SKUs, and you enjoy 0% platform commission for your first 30 days.',
  },
  {
    question: 'How and when do I receive payouts for my delivered orders?',
    answer:
      'Payouts are automated and deposited directly into your verified bank account on a weekly 7-day settlement cycle following successful customer order delivery.',
  },
  {
    question: 'What seller support channels are available if I need help?',
    answer:
      'You get a dedicated 1-on-1 onboarding account manager, 24/7 WhatsApp seller advisor support, email helpdesk assistance, and free access to our seller training academy.',
  },
  {
    question: 'Are there any product category restrictions?',
    answer:
      'MithraShoppy focuses on high-demand categories including Ethnic Wear, Kids Clothing, Jewellery, Handcrafted Gifts, and School/Office Stationery. Illegal, unsafe, or counterfeit items are strictly prohibited.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <SectionReveal
      id="faq"
      watermark="FAQ"
      className="py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-[#06122E] text-white relative overflow-hidden border-b border-white/10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header with Dribbble Style Bold Oversized Stat Anchor */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest bg-white/10 border border-[#DFB743]/40 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            Frequently Asked Questions
          </span>

          <div className="font-mono text-3xl sm:text-5xl lg:text-6xl font-black uppercase gold-gradient-text tracking-tight mb-3">
            GET APPROVED IN UNDER 24 TO 48 HOURS
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Everything You Need To Know Before <span className="gold-gradient-text">Joining</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Find instant answers to common questions regarding seller registration, document requirements, fees, and payouts.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-sans text-base sm:text-lg font-bold text-white hover:text-[#DFB743] transition-colors focus-visible:outline-2 focus-visible:outline-[#DFB743]"
                >
                  <span>{item.question}</span>
                  <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#DFB743] shrink-0 font-mono font-black">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="px-6 pb-6 pt-2 text-slate-300 font-sans text-sm sm:text-base leading-relaxed border-t border-white/10 bg-white/5"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </SectionReveal>
  )
}
