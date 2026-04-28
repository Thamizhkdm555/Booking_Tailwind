'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const smoothBgY = useSpring(bgY, { stiffness: 60, damping: 20 })
  const smoothTextY = useSpring(textY, { stiffness: 60, damping: 20 })

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-charcoal"
    >
      {/* ── Background video layer (0.2x parallax) ── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: smoothBgY }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/properties/udayarbuilding.jpg"
        >
          <source src="/properties/MEDICAL-CENTRE-2.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />
      </motion.div>

      {/* ── Hero text content ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 will-change-transform"
        style={{ y: smoothTextY, opacity }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-white/40 text-[11px] md:text-[13px] font-semibold tracking-[6px] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Purposefully Precise. Simply Extraordinary.
        </motion.p>

        {/* Massive headline */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[72px] md:text-[130px] lg:text-[160px] font-black leading-none tracking-tight"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outline stroke text */}
            <span
              className="block text-stroke text-white/25 hover:text-white transition-colors duration-300 cursor-pointer"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}
            >
              Sri Ramachandra Medical
            </span>
            {/* Solid neon text */}
            <span className="block text-neon" style={{ marginTop: '-0.1em' }}>
              Centre
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-white/35 text-[12px] md:text-[14px] font-medium tracking-[3px] uppercase mt-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Sri Ramachandra Medical Centre — World-Class Healthcare
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#specialists"
          className="flex items-center gap-3 px-8 py-4 border border-white/25 rounded-full text-white text-[13px] font-semibold tracking-widest uppercase hover:bg-white hover:text-charcoal transition-all duration-300 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Explore Departments
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </motion.a>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white text-[9px] tracking-[4px] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
