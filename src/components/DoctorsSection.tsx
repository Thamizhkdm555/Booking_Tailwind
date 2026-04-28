'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import DoctorCard from './DoctorCard'
import { doctors } from '@/data/srmc'

export default function DoctorsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="specialists" className="py-40 px-6 md:px-14 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef}>
          <motion.p
            className="text-neon text-[11px] font-bold tracking-[5px] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Leading Specialists
          </motion.p>
          <motion.h2
            className="text-charcoal text-[48px] md:text-[72px] font-black leading-none tracking-tight mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Our Doctors
          </motion.h2>
        </div>

        {/* Doctor grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    </section>
  )
}
