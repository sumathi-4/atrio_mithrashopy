import React from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable SectionReveal Wrapper Component
 * Fades and slides its children up as a single unit on scroll using Framer Motion's whileInView.
 * Respects prefers-reduced-motion accessibility preferences.
 */
export default function SectionReveal({
  children,
  className = '',
  id,
  delay = 0,
}) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return (
      <section id={id} className={`relative overflow-hidden ${className}`}>
        <div className="relative z-10">{children}</div>
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </motion.section>
  )
}
