'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const stats = [
  { value: '40+', label: 'Years of Excellence' },
  { value: '60+', label: 'Specialties' },
  { value: '1500+', label: 'Beds' },
  { value: '24/7', label: 'Emergency Care' },
]

const accreditations = [
  { icon: '🏥', label: 'NABH', desc: 'Accredited Hospital' },
  { icon: '🌐', label: 'JCI', desc: 'International Certified' },
  { icon: '✅', label: 'ISO', desc: '9001:2015 Certified' },
  { icon: '🎓', label: 'NAAC', desc: 'A++ Graded University' },
]

const easing = [0.16, 1, 0.3, 1] as const

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(textRef, { once: true, margin: '-80px' })
  const isVideoInView = useInView(videoRef, { once: true, margin: '-60px' })
  const [videoLoaded, setVideoLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [10, -10, 10])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-0 overflow-hidden bg-charcoal"
    >
      {/* ── Cinematic Video Banner ── */}
      <div ref={videoRef} className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: videoScale }}
        >
          {/* Fallback building image */}
          <Image
            src="/properties/udayarbuilding.jpg"
            alt="Sri Ramachandra Medical Centre Building"
            fill
            className={`object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            sizes="100vw"
            priority
          />
          {/* Video layer */}
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            poster="/properties/udayarbuilding.jpg"
          >
            <source src="/properties/MEDICAL-CENTRE-2.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Floating Logo Badge */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isVideoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: easing }}
        >
          {/* <div className="relative px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl">
            <Image
              src="/properties/logo.png"
              alt="SRMC Logo"
              width={220}
              height={50}
              className="object-contain brightness-0 invert opacity-90"
            />
          </div> */}
        </motion.div>

        {/* Video section heading */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 text-center px-6 pb-12 pt-20"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.88) 40%, rgba(0,0,0,0.5) 70%, transparent 100%)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isVideoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: easing }}
        >
          <p className="text-neon-light text-[11px] md:text-[12px] font-bold tracking-[6px] uppercase mb-4 drop-shadow-md">
            Est. 1985 · Chennai, India
          </p>
          <h2 className="text-white text-[32px] md:text-[52px] lg:text-[60px] font-black leading-[1.05] tracking-tight drop-shadow-xl">
            A Legacy of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60c0ff] to-neon">
              Healing
            </span>
          </h2>
        </motion.div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="relative z-10 bg-white">
        {/* Stat counters row */}
        <div className="max-w-[1400px] mx-auto -mt-14 px-6 md:px-14 relative z-20">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={isVideoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: easing }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="relative px-6 py-6 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-neon/5 text-center group hover:border-neon/20 transition-all duration-500"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative text-neon text-[28px] md:text-[36px] font-black block">
                  {stat.value}
                </span>
                <span className="relative text-body-text/50 text-[10px] md:text-[11px] tracking-[2px] uppercase font-semibold mt-1 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Two-column content */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Building image with parallax + overlay accent */}
            <motion.div
              className="relative h-[420px] md:h-[580px] rounded-3xl overflow-hidden group"
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: easing }}
            >
              <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
                <Image
                  src="/properties/udayarbuilding.jpg"
                  alt="SRMC Udayar Building"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Floating info card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15"
                style={{ y: floatY }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon/20 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/properties/logo.png"
                      alt="SRMC"
                      width={32}
                      height={32}
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                  <div>
                    <p className="text-white text-[13px] font-bold tracking-wide">
                      Sri N.P.V. Ramaswamy Udayar Block
                    </p>
                    <p className="text-white/50 text-[11px] font-medium tracking-wider uppercase mt-0.5">
                      Main Hospital Campus · Porur, Chennai
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Corner accent line */}
              <div className="absolute top-0 left-0 w-20 h-1 bg-gradient-to-r from-neon to-transparent rounded-br" />
              <div className="absolute top-0 left-0 w-1 h-20 bg-gradient-to-b from-neon to-transparent rounded-br" />
            </motion.div>

            {/* Right: Text content */}
            <div ref={textRef}>
              <motion.p
                className="text-neon text-[11px] font-bold tracking-[5px] uppercase mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: easing }}
              >
                About SRMC
              </motion.p>

              <motion.h2
                className="text-[34px] md:text-[46px] lg:text-[52px] font-black leading-[1.08] text-charcoal mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: easing }}
              >
                Where{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-neon-light">
                  compassion
                </span>
                <br />
                meets cutting‑edge{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-light to-neon">
                  medicine
                </span>
              </motion.h2>

              <motion.p
                className="text-body-text/60 text-[15px] leading-[1.9] font-normal mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: easing }}
              >
                Sri Ramachandra Medical Centre has been a beacon of healthcare
                excellence in Chennai for over four decades, combining world-class
                clinical expertise with a deeply human approach to healing. As a
                part of the prestigious Sri Ramachandra Institute of Higher
                Education and Research (Deemed University), SRMC stands at the
                intersection of cutting-edge medical research and compassionate
                patient care.
              </motion.p>

              <motion.p
                className="text-body-text/45 text-[14px] leading-[1.85] font-normal mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25, ease: easing }}
              >
                Our multi-disciplinary team of specialists, surgeons, and
                researchers collaborate seamlessly to deliver personalised
                treatment plans, leveraging state-of-the-art technology and
                evidence-based protocols.
              </motion.p>

              {/* Accreditation badges */}
              <motion.div
                className="grid grid-cols-2 gap-3 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {accreditations.map((a, i) => (
                  <motion.div
                    key={a.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-gray-100 group hover:border-neon/20 hover:bg-neon/[0.03] transition-all duration-400"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-[20px]">{a.icon}</span>
                    <div>
                      <span className="text-neon text-[15px] font-extrabold block leading-tight">
                        {a.label}
                      </span>
                      <span className="text-body-text/40 text-[10px] tracking-[1.5px] uppercase font-semibold">
                        {a.desc}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.a
                  href="#specialists"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-neon to-neon-dark rounded-full text-white text-[12px] font-bold tracking-widest uppercase shadow-lg shadow-neon/25 hover:shadow-neon/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Find a Specialist
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.a>

                <motion.a
                  href="#departments"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-charcoal/10 rounded-full text-charcoal text-[12px] font-bold tracking-widest uppercase hover:border-neon hover:text-neon transition-all duration-300 group"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Our Departments
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
