# SRMC Web — Next.js 14 + Tailwind + Framer Motion

## Quick Start

```bash
cd srmc-web

# 1. Install dependencies
npm install

# 2. Copy assets manually
cp ../asset/logo.png public/
cp ../asset/udayarbuilding.jpg public/
cp ../asset/MEDICAL-CENTRE-2.mp4 public/

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
srmc-web/
├── public/
│   ├── logo.png
│   ├── udayarbuilding.jpg
│   └── MEDICAL-CENTRE-2.mp4
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout + SEO metadata
│   │   ├── page.tsx          # Home page assembly
│   │   └── globals.css       # Tailwind + custom CSS
│   ├── components/
│   │   ├── SmoothScrollWrapper.tsx  # Lerp-based buttery scroll
│   │   ├── NavBar.tsx               # Transparent→glass nav
│   │   ├── HeroSection.tsx          # Video bg + parallax (0.2x)
│   │   ├── StatsSection.tsx         # Animated counters
│   │   ├── DeptSection.tsx          # Outline text + hover fill
│   │   ├── DoctorsSection.tsx       # Doctor grid
│   │   ├── DoctorCard.tsx           # 3D tilt + glare effect
│   │   ├── AboutSection.tsx         # Split layout + parallax image
│   │   └── FooterSection.tsx        # Dark footer
│   └── data/
│       └── srmc.ts                  # Doctors, depts, stats data
```

---

## Key Features

### 🎭 3D Hover Tilt (DoctorCard.tsx)
- `useMotionValue` tracks normalized mouse position [-0.5, 0.5]
- `useSpring(stiffness: 280, damping: 22)` for snappy elastic response
- `rotateX` / `rotateY` applied via Framer Motion `style` prop
- Glare radial gradient follows cursor position
- Top accent bar: `scaleX` spring from 0→1 on hover

### 🌊 3-Layer Parallax (HeroSection.tsx)
- `useScroll` tracks scroll progress relative to hero section
- **Background video**: `y: 0% → 20%` (0.2x speed)
- **Text layer**: `y: 0% → 50%` (faster fade-out)
- **Building strip**: `y: 0% → 10%` (subtle drift)
- `useSpring(stiffness: 60, damping: 20)` smooths all transforms

### 🚀 Smooth Scroll (SmoothScrollWrapper.tsx)
- Custom lerp loop (`ease = 0.1`) via `requestAnimationFrame`
- Prevents default wheel and manually sets `scrollY`
- Mobile-safe: disabled on touch devices

### ✨ Scroll Reveals
- `useInView` from Framer Motion for threshold-based triggers
- Stagger: each item delays by `index * 0.1s`
- Easing: `[0.16, 1, 0.3, 1]` (custom expo-out)
