import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Total Loss Calculator | Free Car Insurance Settlement Estimator',
  description: 'Free total loss calculator to estimate if your car will be declared a total loss after an accident. Calculate your expected insurance settlement using state-specific thresholds. Includes gap insurance calculator.',
  keywords: 'total loss calculator, totaled car calculator, car insurance settlement calculator, total loss threshold, actual cash value calculator, gap insurance calculator, car accident settlement',
  openGraph: {
    title: 'Total Loss Calculator | Free Car Insurance Settlement Estimator',
    description: 'Free total loss calculator to estimate if your car will be declared a total loss after an accident. Calculate your expected insurance settlement using state-specific thresholds.',
    url: 'https://collisionhelp.org/tools/total-loss-calculator',
    type: 'website',
    siteName: 'Collision Help',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Total Loss Calculator | Free Car Insurance Settlement Estimator',
    description: 'Find out if your car will be declared a total loss and estimate your insurance settlement.',
  },
  alternates: {
    canonical: 'https://collisionhelp.org/tools/total-loss-calculator',
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
