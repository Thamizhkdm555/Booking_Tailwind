'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { departments } from '@/data/srmc'

// Icons + accent colors per department
const deptMeta: Record<string, { icon: string; color: string; light: string }> = {
  Cardiology: {
    icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    color: '#E53935',
    light: 'rgba(229,57,53,0.08)',
  },
  Nephrology: {
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    color: '#1976D2',
    light: 'rgba(25,118,210,0.08)',
  },
  Neurology: {
    icon: 'M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z',
    color: '#7B1FA2',
    light: 'rgba(123,31,162,0.08)',
  },
  Orthopaedics: {
    icon: 'M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z',
    color: '#00897B',
    light: 'rgba(0,137,123,0.08)',
  },
  Oncology: {
    icon: 'M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z',
    color: '#F57C00',
    light: 'rgba(245,124,0,0.08)',
  },
  Gastroenterology: {
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z',
    color: '#5C6BC0',
    light: 'rgba(92,107,192,0.08)',
  },
  Pulmonology: {
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    color: '#0097A7',
    light: 'rgba(0,151,167,0.08)',
  },
}

function DeptCard({
  name,
  num,
  index,
}: {
  name: string
  num: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  const meta = deptMeta[name] || deptMeta.Cardiology

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative rounded-2xl p-7 md:p-8 border overflow-hidden h-full"
        animate={{
          borderColor: hovered ? meta.color + '30' : 'rgba(0,0,0,0.05)',
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${meta.light} 0%, rgba(255,255,255,1) 100%)`
            : 'rgba(255,255,255,1)',
          boxShadow: hovered
            ? `0 16px 48px ${meta.color}15, 0 4px 16px rgba(0,0,0,0.06)`
            : '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        {/* Top row: icon + number */}
        <div className="flex items-start justify-between mb-7">
          {/* Animated icon container */}
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            animate={{
              backgroundColor: hovered ? meta.color : meta.light,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              animate={{ fill: hovered ? '#ffffff' : meta.color }}
              transition={{ duration: 0.25 }}
            >
              <path d={meta.icon} />
            </motion.svg>
          </motion.div>

          {/* Number badge */}
          <span
            className="text-[11px] font-bold tracking-[3px] tabular-nums"
            style={{ color: hovered ? meta.color + '80' : 'rgba(0,0,0,0.12)' }}
          >
            {num}
          </span>
        </div>

        {/* Name */}
        <motion.h3
          className="text-[20px] md:text-[22px] font-black leading-tight tracking-tight mb-2"
          animate={{ color: hovered ? meta.color : '#1a1a2e' }}
          transition={{ duration: 0.25 }}
        >
          {name}
        </motion.h3>

        {/* Tagline */}
        <p className="text-[12px] text-gray-400 leading-relaxed mb-6">
          Expert specialists &amp; advanced care
        </p>

        {/* Bottom: animated line + arrow */}
        <div className="flex items-center gap-3">
          {/* Animated accent line */}
          <div className="flex-1 h-px bg-gray-100 overflow-hidden rounded-full">
            <motion.div
              className="h-full rounded-full origin-left"
              style={{ backgroundColor: meta.color }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Arrow circle */}
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            animate={{
              backgroundColor: hovered ? meta.color + '12' : 'rgba(0,0,0,0.03)',
              scale: hovered ? 1 : 0.85,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              animate={{
                fill: hovered ? meta.color : 'rgba(0,0,0,0.18)',
                x: hovered ? 1.5 : 0,
              }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </motion.svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DeptSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

  // Parallax for header
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const headerY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [40, 0]),
    { stiffness: 80, damping: 25 }
  )

  return (
    <section
      ref={sectionRef}
      id="departments"
      className="relative py-20 md:py-28 px-6 md:px-14 bg-gray-50/60 overflow-hidden"
    >
      {/* Decorative background dots */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1400px] mx-auto relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
          style={{ y: headerY }}
        >
          <div>
            <motion.p
              className="text-neon text-[11px] font-bold tracking-[5px] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Centres of Excellence
            </motion.p>

            <motion.h2
              className="text-[28px] md:text-[40px] font-black text-charcoal leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Departments
            </motion.h2>
          </div>

          <motion.p
            className="text-gray-400 text-[13px] leading-relaxed max-w-sm mt-4 md:mt-0"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            World-class medical expertise across specialized centres, delivering compassionate care.
          </motion.p>
        </motion.div>

        {/* Department grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {departments.map((dept, i) => (
            <DeptCard key={dept.name} name={dept.name} num={dept.num} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
