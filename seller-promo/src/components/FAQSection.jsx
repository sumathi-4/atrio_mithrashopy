import React, { useState } from 'react'

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
  const [openIndex, setOpenIndex] = useState(0) // Default first item open

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1A40] text-white relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold text-[#DFB743] uppercase tracking-widest bg-white/10 border border-[#DFB743]/40 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Frequently Asked <span className="gold-gradient-text">Questions</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Everything you need to know about joining India's fastest-growing seller marketplace.
          </p>
        </div>

        {/* Fresh Accordion Component */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                {/* Accordion Question Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-sans font-bold text-base sm:text-lg text-white hover:text-[#DFB743] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#DFB743] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#DFB743] text-[#051838]' : ''
                    }`}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                {/* Accordion Answer Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm sm:text-base font-sans text-slate-300 font-normal leading-relaxed border-t border-white/10 mt-1">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
