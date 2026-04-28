'use client'

import { useRef, MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion'

interface DoctorCardProps {
  initials: string
  dept: string
  name: string
  experience: string
  index: number
}

export default function DoctorCard({
  initials,
  dept,
  name,
  experience,
  index,
}: DoctorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })

  // ── 3D Tilt via useMotionValue + useSpring ──────────────────
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring config for snappy yet smooth feel
  const springConfig = { stiffness: 280, damping: 22, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  // Scale spring
  const scale = useSpring(1, { stiffness: 300, damping: 25 })

  // Top bar width
  const barWidth = useMotionValue('0%')
  const barWidthSpring = useSpring(barWidth as unknown as number, {
    stiffness: 260,
    damping: 24,
  })

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    // Normalize to [-0.5, 0.5]
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function onMouseEnter() {
    scale.set(1.02)
    barWidth.set(100)
  }

  function onMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    scale.set(1)
    barWidth.set(0)
  }

  return (
    // Entrance animation with stagger
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="perspective-1000 cursor-pointer"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="relative bg-white rounded-xl p-8 border border-gray-100 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
        whileHover={{
          boxShadow: '0 20px 60px rgba(25,118,210,0.12)',
        }}
        transition={{ boxShadow: { duration: 0.3 } }}
      >
        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 rounded-xl"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18) 0%, transparent 65%)`,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden rounded-t-xl">
          <motion.div
            className="h-full bg-gradient-to-r from-neon to-neon-light origin-left"
            style={{ scaleX: barWidthSpring as unknown as number, transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
          />
        </div>

        {/* Avatar */}
        <motion.div
          className="w-14 h-14 rounded-full bg-gradient-to-br from-neon to-neon-light flex items-center justify-center mb-6"
          style={{ translateZ: 20 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white font-black text-xl">{initials}</span>
        </motion.div>

        {/* Dept label */}
        <p className="text-neon text-[10px] font-bold tracking-[4px] uppercase mb-4">
          {dept}
        </p>

        {/* Name */}
        <h3 className="text-charcoal text-[22px] font-black leading-tight mb-2">
          {name}
        </h3>

        {/* Experience */}
        <p className="text-body-text/40 text-[13px] font-normal leading-relaxed">
          {experience} Experience
        </p>

        {/* Book button — appears on hover */}
        <motion.div
          className="mt-6 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          whileHover={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="w-full py-3 rounded-lg bg-neon text-white text-[12px] font-bold tracking-widest uppercase hover:bg-neon-dark transition-colors duration-200">
            Book Appointment
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
