import React from 'react'
import { LucideIcon } from 'lucide-react'
import Breadcrumbs, { BreadcrumbItem } from '@/components/layout/Breadcrumbs'

interface PillarHeroProps {
  title: string
  description: string
  icon: LucideIcon
  breadcrumbs: BreadcrumbItem[]
  articleCount?: number
}

export default function PillarHero({
  title,
  description,
  icon: Icon,
  breadcrumbs,
  articleCount
}: PillarHeroProps) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbs} />

        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-brand-600" />
            </div>
            {articleCount && (
              <span className="px-3 py-1 bg-brand-50 text-brand-700 text-sm font-medium rounded-full">
                {articleCount} Articles
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
