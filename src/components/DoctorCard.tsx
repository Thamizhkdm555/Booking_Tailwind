'use client'

import { useRef, MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

interface DoctorCardProps {
  initials: string
  dept: string
  name: string
  experience: string
  index: number
}

// Accent palette — each card gets a unique dual-tone gradient
const accents = [
  { from: 'rgba(25,118,210,0.14)', to: 'rgba(156,39,176,0.08)', glow: 'rgba(25,118,210,0.18)' },
  { from: 'rgba(233,30,99,0.12)', to: 'rgba(255,152,0,0.08)', glow: 'rgba(233,30,99,0.16)' },
  { from: 'rgba(0,172,193,0.13)', to: 'rgba(76,175,80,0.08)', glow: 'rgba(0,172,193,0.16)' },
  { from: 'rgba(103,58,183,0.13)', to: 'rgba(3,169,244,0.08)', glow: 'rgba(103,58,183,0.16)' },
  { from: 'rgba(255,87,34,0.12)', to: 'rgba(255,193,7,0.08)', glow: 'rgba(255,87,34,0.16)' },
  { from: 'rgba(0,150,136,0.13)', to: 'rgba(63,81,181,0.08)', glow: 'rgba(0,150,136,0.16)' },
]

export default function DoctorCard({
  initials,
  dept,
  name,
  experience,
  index,
}: DoctorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // ── 3D Tilt engine ──
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const spring = { stiffness: 350, damping: 25, mass: 0.4 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), spring)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), spring)
  const scale = useSpring(1, { stiffness: 350, damping: 28 })

  // Glare
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  // Floating shadow intensity
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-8, 8])
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [-4, 16])

  const accent = accents[index % accents.length]

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width - 0.5)
    mouseY.set((e.clientY - r.top) / r.height - 0.5)
  }

  function onEnter() {
    scale.set(1.04)
  }

  function onLeave() {
    mouseX.set(0)
    mouseY.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      // ── Viewport reveal ──
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 80,
        damping: 18,
      }}
      style={{ perspective: 900 }}
      className="cursor-pointer will-change-transform"
    >
      <motion.div
        className="relative rounded-2xl p-8 md:p-9 border border-gray-100/70 overflow-hidden h-full"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          background: `linear-gradient(145deg, ${accent.from} 0%, ${accent.to} 55%, rgba(255,255,255,0.95) 100%)`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.04)`,
        }}
        whileHover={{
          boxShadow: '0 24px 64px rgba(25,118,210,0.14), 0 8px 24px rgba(0,0,0,0.06)',
        }}
        transition={{ boxShadow: { duration: 0.35 } }}
      >
        {/* 3D Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.28) 0%, transparent 55%)`,
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        />

        {/* Corner accent glow */}
        <div
          className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.7), transparent)' }}
        />

        {/* Avatar — elevated in Z */}
        <motion.div
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-neon to-neon-light flex items-center justify-center mb-7"
          style={{ translateZ: 35 }}
        >
          <span className="text-white font-black text-xl">{initials}</span>
        </motion.div>

        {/* Dept */}
        <p className="relative text-neon text-[10px] font-bold tracking-[4px] uppercase mb-3" style={{ translateZ: 20 }}>
          {dept}
        </p>

        {/* Name */}
        <h3 className="relative text-charcoal text-[22px] font-black leading-tight mb-2" style={{ translateZ: 25 }}>
          {name}
        </h3>

        {/* Experience */}
        <p className="relative text-body-text/40 text-[13px] font-normal leading-relaxed" style={{ translateZ: 15 }}>
          {experience} Experience
        </p>

        {/* Book button — slides up on hover */}
        <motion.div
          className="relative mt-7 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          whileHover={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="w-full py-3 rounded-xl bg-neon text-white text-[11px] font-bold tracking-[3px] uppercase hover:bg-neon-dark transition-colors duration-200">
            Book Appointment
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
