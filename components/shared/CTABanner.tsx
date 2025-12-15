import React from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight, Camera } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CTABannerProps {
  title?: string
  description?: string
  primaryAction?: {
    label: string
    href: string
  }
  variant?: 'default' | 'compact'
}

export default function CTABanner({
  title = "Get Your Free Damage Analysis",
  description = "Upload photos of your vehicle damage and get an AI-powered assessment within minutes. No obligation, completely free.",
  primaryAction = { label: "Analyze My Damage", href: "/" },
  variant = 'default'
}: CTABannerProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Camera className="w-8 h-8 text-brand-200" />
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-brand-100">{description}</p>
            </div>
          </div>
          <Link href={primaryAction.href}>
            <Button variant="outline" className="bg-white text-brand-700 border-white hover:bg-brand-50 whitespace-nowrap">
              {primaryAction.label}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-brand-100 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <Link href={primaryAction.href}>
            <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50">
              {primaryAction.label}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
