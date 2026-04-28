'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { stats } from '@/data/srmc'

function StatCounter({
  target,
  suffix,
  label,
  index,
}: {
  target: number
  suffix: string
  label: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, target])

  return (
    <motion.div
      ref={ref}
      className="flex-1 flex flex-col items-center text-center py-10 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <span className="text-neon text-[64px] md:text-[80px] font-black leading-none tabular-nums">
        {count}
        {suffix}
      </span>
      <span className="text-body-text/40 text-[11px] font-bold tracking-[3px] uppercase mt-4">
        {label}
      </span>
    </motion.div>
  )
}

export default function StatsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })

  return (
    <section className="py-32 px-6 md:px-14 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.p
          ref={headerRef}
          className="text-neon text-[11px] font-bold tracking-[5px] uppercase mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          In Numbers
        </motion.p>

        {/* Stats row with dividers */}
        <div className="flex flex-wrap md:flex-nowrap divide-x divide-gray-100">
          {stats.map((s, i) => (
            <StatCounter
              key={s.label}
              target={s.value}
              suffix={s.suffix}
              label={s.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
