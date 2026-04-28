import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SRMC — Sri Ramachandra Medical Centre',
  description:
    'World-class healthcare at Sri Ramachandra Medical Centre, Chennai. Book appointments with leading specialists.',
  keywords: 'SRMC, Sri Ramachandra, doctor booking, Chennai hospital, specialists',
  openGraph: {
    title: 'SRMC — Sri Ramachandra Medical Centre',
    description: 'Book appointments with leading specialists at SRMC Chennai.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
