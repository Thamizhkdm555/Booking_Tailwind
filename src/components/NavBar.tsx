'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const links = ['Departments', 'Specialists', 'About', 'Contact']

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      animate={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        paddingTop: scrolled ? '14px' : '24px',
        paddingBottom: scrolled ? '14px' : '24px',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.06)' : 'none',
      }}
      style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
    >
      <div className="w-full mx-auto px-8 md:px-14 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
        >
          <Image
            src="/properties/logo.png"
            alt="SRMC Logo"
            width={200}
            height={56}
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? 'h-10' : 'h-12'
            }`}
            priority
          />
        </motion.a>

        {/* Desktop nav */}
        <motion.nav
          className="hidden md:flex items-center gap-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-[13px] font-semibold tracking-widest uppercase transition-colors duration-200 whitespace-nowrap ${
                scrolled
                  ? 'text-charcoal/60 hover:text-neon'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link}
            </a>
          ))}
          <a
            href="#specialists"
            className={`ml-2 text-[12px] font-semibold tracking-widest uppercase px-6 py-3 rounded-full border transition-all duration-300 whitespace-nowrap ${
              scrolled
                ? 'border-charcoal/20 text-charcoal hover:bg-neon hover:text-white hover:border-neon'
                : 'border-white/30 text-white hover:bg-white hover:text-charcoal'
            }`}
          >
            Book Now
          </a>
        </motion.nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-charcoal' : 'bg-white'
            } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-charcoal' : 'bg-white'
            } ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-charcoal' : 'bg-white'
            } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white/97 backdrop-blur-xl border-t border-gray-100"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 py-8 flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[15px] font-semibold tracking-widest uppercase text-charcoal/70 hover:text-neon transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
              <motion.a
                href="#specialists"
                className="w-fit text-[12px] font-semibold tracking-widest uppercase px-6 py-3 rounded-full bg-neon text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setMenuOpen(false)}
              >
                Book Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
