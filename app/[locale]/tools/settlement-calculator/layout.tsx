import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Accident Claim Calculator | Free Insurance Settlement Estimator (2026)',
  description: 'Free claim calculator to estimate your car accident insurance settlement. Enter medical bills, lost wages, and injury details to calculate your potential payout. Used by 10,000+ accident victims.',
  keywords: 'claim calculator, car insurance claim calculator, insurance claim calculator, car accident settlement calculator, insurance payout calculator, stolen car insurance payout calculator, claim estimate, accident claim calculator',
  openGraph: {
    title: 'Insurance Claim Calculator | Free Car Accident Settlement Estimator (2026)',
    description: 'Free insurance claim calculator to estimate your car accident settlement. Calculate your potential payout based on medical bills, lost wages, and injury severity.',
    url: 'https://www.collisionhelp.org/tools/settlement-calculator',
    type: 'website',
    siteName: 'Collision Help',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Claim Calculator | Free Car Accident Settlement Estimator',
    description: 'Estimate your insurance claim payout based on your injuries, expenses, and damages.',
  },
  alternates: {
    canonical: 'https://www.collisionhelp.org/tools/settlement-calculator',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SettlementCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
