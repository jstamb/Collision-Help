import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Is My Car Totaled? | Free Total Loss Calculator by State (2026)',
  description: 'Free total loss calculator — instantly check if your car is totaled using your state\'s threshold. Calculates actual cash value, salvage value, and estimated insurance payout for 2026.',
  keywords: 'is my car totaled calculator, total loss calculator, totaled car value calculator, car total loss value calculator, total loss threshold, total loss formula calculator, stolen car insurance payout calculator, actual cash value calculator',
  openGraph: {
    title: 'Total Loss Calculator | Is My Car Totaled? Free Estimator (2026)',
    description: 'Free total loss calculator — find out if your car is totaled and estimate your insurance payout. Uses state-specific thresholds.',
    url: 'https://www.collisionhelp.org/tools/total-loss-calculator',
    type: 'website',
    siteName: 'Collision Help',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Total Loss Calculator | Is My Car Totaled? (2026)',
    description: 'Find out if your car is totaled and estimate your insurance payout with our free calculator.',
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
