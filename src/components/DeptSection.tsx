'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { departments } from '@/data/srmc'

function DeptRow({
  name,
  num,
  index,
}: {
  name: string
  num: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="border-b border-gray-100 group cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover fill background */}
      <motion.div
        className="absolute inset-0 bg-neon origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="relative flex items-baseline justify-between py-8 md:py-10 px-0">
        {/* Department name */}
        <motion.h3
          className="text-[40px] md:text-[70px] lg:text-[90px] font-black leading-none tracking-tight transition-none"
          animate={{
            WebkitTextStroke: hovered ? '0px' : '1.5px rgba(26,26,46,0.2)',
            color: hovered ? '#ffffff' : 'transparent',
            x: hovered ? 12 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {name}
        </motion.h3>

        {/* Number */}
        <motion.span
          className="text-[13px] font-semibold tracking-[3px]"
          animate={{ color: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(85,85,85,0.25)' }}
          transition={{ duration: 0.3 }}
        >
          {num}
        </motion.span>
      </div>
    </motion.div>
  )
}

export default function DeptSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="departments" className="py-36 px-6 md:px-14 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef}>
          <motion.p
            className="text-neon text-[11px] font-bold tracking-[5px] uppercase mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Centres of Excellence
          </motion.p>
        </div>

        {/* Department rows */}
        <div>
          {departments.map((dept, i) => (
            <DeptRow key={dept.name} name={dept.name} num={dept.num} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
