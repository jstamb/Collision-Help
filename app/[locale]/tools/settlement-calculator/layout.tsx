import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Accident Settlement Calculator | Free Claim Estimator',
  description: 'Free car accident settlement calculator. Estimate your potential settlement based on medical bills, lost wages, injury severity, and pain & suffering. Get a personalized claim value estimate.',
  keywords: 'car accident settlement calculator, accident claim calculator, personal injury settlement calculator, car crash settlement estimate, injury claim value, pain and suffering calculator',
  openGraph: {
    title: 'Car Accident Settlement Calculator | Free Claim Estimator',
    description: 'Free car accident settlement calculator. Estimate your potential settlement based on medical bills, lost wages, injury severity, and pain & suffering.',
    url: 'https://collisionhelp.org/tools/settlement-calculator',
    type: 'website',
    siteName: 'Collision Help',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Accident Settlement Calculator | Free Claim Estimator',
    description: 'Estimate your car accident settlement based on your injuries, expenses, and damages.',
  },
  alternates: {
    canonical: 'https://collisionhelp.org/tools/settlement-calculator',
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
