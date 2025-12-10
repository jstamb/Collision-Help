'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  title?: string
}

export default function FAQAccordion({ items, title = "Frequently Asked Questions" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Generate JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <section className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">{title}</h2>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-medium text-slate-900 pr-4">{item.question}</span>
              <span className="flex-shrink-0 text-slate-400">
                {openIndex === index ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </span>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                openIndex === index ? "max-h-96" : "max-h-0"
              )}
            >
              <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
