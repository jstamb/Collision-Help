import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Accident Settlement Calculator | Free Insurance Claim Estimator 2026',
  description: 'Free car accident settlement calculator — estimate your insurance claim payout based on medical bills, lost wages, injury severity & pain and suffering. Used by car accident lawyers to value claims.',
  keywords: 'car accident settlement calculator, insurance claim calculator, claim calculator, personal injury settlement calculator, car crash settlement estimate, injury claim value, pain and suffering calculator, car insurance claim calculator',
  openGraph: {
    title: 'Car Accident Settlement Calculator | Free Insurance Claim Estimator 2026',
    description: 'Free car accident settlement calculator — estimate your insurance claim payout based on medical bills, lost wages, injury severity & pain and suffering.',
    url: 'https://www.collisionhelp.org/tools/settlement-calculator',
    type: 'website',
    siteName: 'Collision Help',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Accident Settlement Calculator | Free Insurance Claim Estimator 2026',
    description: 'Free insurance claim calculator — estimate your car accident settlement based on injuries, medical bills & lost wages.',
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
