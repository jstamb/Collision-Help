import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Is My Car Totaled? Free Total Loss Calculator (2026) | Collision Help',
  description: 'Free totaled car value calculator — find out if your car is a total loss using state-specific thresholds. Estimate your insurance payout for a totaled car, including gap insurance. Updated for 2026.',
  keywords: 'total loss calculator, is my car totaled calculator, totaled car value calculator, insurance payout for totaled car calculator, total loss threshold, car total loss value calculator, total loss formula calculator, stolen car insurance payout calculator',
  openGraph: {
    title: 'Is My Car Totaled? Free Total Loss Calculator (2026) | Collision Help',
    description: 'Free totaled car value calculator — find out if your car is a total loss using state-specific thresholds. Estimate your insurance payout for a totaled car.',
    url: 'https://www.collisionhelp.org/tools/total-loss-calculator',
    type: 'website',
    siteName: 'Collision Help',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is My Car Totaled? Free Total Loss Calculator (2026)',
    description: 'Free totaled car value calculator — check if your car is a total loss and estimate your insurance payout using state thresholds.',
  },
  alternates: {
    canonical: 'https://www.collisionhelp.org/tools/total-loss-calculator',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TotalLossCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
