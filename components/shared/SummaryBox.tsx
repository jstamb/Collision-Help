import React from 'react'
import { Lightbulb } from 'lucide-react'

interface SummaryBoxProps {
  title?: string
  children: React.ReactNode
}

export default function SummaryBox({ title = "Key Takeaways", children }: SummaryBoxProps) {
  return (
    <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h3 className="font-semibold text-brand-900 mb-2">{title}</h3>
          <div className="text-brand-800 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
