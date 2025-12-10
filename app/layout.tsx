import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'MVA Assist | Nationwide Accident Help',
  description: 'Guidance for motor vehicle accident victims. Navigate insurance claims, repairs, and total loss disputes.',
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