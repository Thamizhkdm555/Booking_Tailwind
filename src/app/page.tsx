import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import DeptSection from '@/components/DeptSection'
import DoctorsSection from '@/components/DoctorsSection'
import AboutSection from '@/components/AboutSection'
import FooterSection from '@/components/FooterSection'
import SmoothScrollWrapper from '@/components/SmoothScrollWrapper'

export default function Home() {
  return (
    <SmoothScrollWrapper>
      <main className="relative overflow-x-hidden">
        <NavBar />
        <HeroSection />
        <StatsSection />
        <DeptSection />
        <DoctorsSection />
        <AboutSection />
        <FooterSection />
      </main>
    </SmoothScrollWrapper>
  )
}
