'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion'
import DoctorCard from './DoctorCard'
import { doctors } from '@/data/srmc'

export default function DoctorsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

  // ── Master scroll progress for this section ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  // ── Background branding text — velocity 0.2 (slow, distant) ──
  const brandY = useTransform(smooth, [0, 1], [100, -100])  // 0.2x feel
  const brandOpacity = useTransform(smooth, [0, 0.2, 0.8, 1], [0, 0.06, 0.06, 0])

  // ── Foreground cards — velocity 1.5 (fast, close) ──
  const cardsY = useTransform(smooth, [0, 1], [180, -180]) // 1.5x feel

  // ── Header parallax ──
  const headerY = useTransform(smooth, [0, 0.4], [60, 0])

  return (
    <section
      ref={sectionRef}
      id="specialists"
      className="relative py-32 md:py-44 px-6 md:px-14 bg-white overflow-hidden"
    >
      {/* ═══════════════════════════════════════════════════
          LAYER 0 — Background branding watermark (0.2x)
          Massive SRMC text that drifts slowly for depth
      ═══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ y: brandY }}
      >
        <motion.span
          className="text-[120px] sm:text-[200px] md:text-[300px] lg:text-[400px] font-black leading-none tracking-tight whitespace-nowrap"
          style={{
            opacity: brandOpacity,
            color: '#1a1a2e',
            WebkitTextStroke: '1px rgba(26,26,46,0.04)',
          }}
        >
          SRMC
        </motion.span>
        <motion.span
          className="text-[16px] sm:text-[22px] md:text-[32px] font-bold tracking-[12px] md:tracking-[20px] uppercase mt-2"
          style={{
            opacity: brandOpacity,
            color: '#1a1a2e',
          }}
        >
          Sri Ramachandra
        </motion.span>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          LAYER 1 — Header (standard speed)
      ═══════════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto relative">
        <motion.div
          ref={headerRef}
          className="mb-24 md:mb-32"
          style={{ y: headerY }}
        >
          <motion.p
            className="text-neon text-[11px] font-bold tracking-[5px] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Leading Specialists
          </motion.p>
          <motion.h2
            className="text-charcoal text-[42px] md:text-[64px] lg:text-[80px] font-black leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Our
            <br />
            Doctors
          </motion.h2>
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            LAYER 2 — Doctor cards (1.5x velocity)
            Scroll faster than the background for depth
        ═══════════════════════════════════════════════════ */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8"
          style={{ y: cardsY }}
        >
          {doctors.map((doc, i) => (
            <DoctorCard
              key={doc.id}
              initials={doc.initials}
              dept={doc.specialty}
              name={doc.name}
              experience={doc.experience}
              index={i}
            />
          ))}
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            LAYER 3 — Decorative side elements
        ═══════════════════════════════════════════════════ */}
        <motion.div
          className="hidden lg:block absolute -right-4 top-1/3 w-px h-48 bg-gradient-to-b from-transparent via-gray-200 to-transparent"
          style={{ y: useTransform(smooth, [0, 1], [40, -40]) }}
        />
        <motion.div
          className="hidden lg:block absolute -left-4 top-2/3 w-px h-32 bg-gradient-to-b from-transparent via-neon/20 to-transparent"
          style={{ y: useTransform(smooth, [0, 1], [-20, 20]) }}
        />
      </div>
    </section>
  )
}
