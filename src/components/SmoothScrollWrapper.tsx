'use client'

import { useEffect, useRef } from 'react'

/**
 * SmoothScrollWrapper
 * Uses native scroll with CSS scroll-behavior + a small lerp-based
 * custom scroll for buttery feel without heavy dependencies.
 * For production, swap the inner logic with Lenis:
 *   npm install @studio-freight/lenis
 */
export default function SmoothScrollWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const rafRef = useRef<number>(0)
  const currentY = useRef(0)
  const targetY = useRef(0)

  useEffect(() => {
    // Only apply on desktop — mobile native scroll is already smooth
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ease = 0.1

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetY.current += e.deltaY
      targetY.current = Math.max(
        0,
        Math.min(
          targetY.current,
          document.documentElement.scrollHeight - window.innerHeight
        )
      )
    }

    const loop = () => {
      currentY.current += (targetY.current - currentY.current) * ease
      if (Math.abs(targetY.current - currentY.current) < 0.5) {
        currentY.current = targetY.current
      }
      window.scrollTo(0, currentY.current)
      rafRef.current = requestAnimationFrame(loop)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <>{children}</>
}
