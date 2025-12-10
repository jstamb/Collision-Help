import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://collisionhelp.org'),
  title: {
    default: 'Collision Help | Nationwide Accident Help',
    template: '%s | Collision Help',
  },
  description: 'Guidance for motor vehicle accident victims. Navigate insurance claims, repairs, and total loss disputes.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://collisionhelp.org',
    siteName: 'Collision Help',
    title: 'Collision Help | Nationwide Accident Help',
    description: 'AI-powered damage analysis and expert guidance to help you navigate insurance claims after a car accident.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collision Help | Nationwide Accident Help',
    description: 'AI-powered damage analysis and expert guidance to help you navigate insurance claims after a car accident.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://collisionhelp.org',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn("min-h-screen bg-white font-sans text-slate-900 antialiased", inter.variable)}>
        {children}
      </body>
    </html>
  )
}