import React from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GuideCardProps {
  title: string
  description: string
  href: string
  icon?: LucideIcon
  readingTime?: string
  variant?: 'default' | 'featured' | 'compact'
}

export default function GuideCard({
  title,
  description,
  href,
  icon: Icon,
  readingTime,
  variant = 'default'
}: GuideCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
      >
        {Icon && (
          <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-brand-50 transition-colors">
            <Icon className="w-4 h-4 text-slate-500 group-hover:text-brand-600" />
          </div>
        )}
        <span className="text-sm font-medium text-slate-700 group-hover:text-brand-600 transition-colors">
          {title}
        </span>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={href}
        className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-lg transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          {Icon && (
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
              <Icon className="w-6 h-6 text-brand-600" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex items-center justify-between">
            {readingTime && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {readingTime}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:gap-2 transition-all">
              Read Guide
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={href}
      className="group block bg-white rounded-xl border border-slate-200 p-5 hover:border-brand-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-brand-50 transition-colors">
            <Icon className="w-5 h-5 text-slate-500 group-hover:text-brand-600" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-brand-700 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
          {readingTime && (
            <span className="inline-flex items-center gap-1 mt-2 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              {readingTime}
            </span>
          )}
        </div>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </Link>
  )
}
