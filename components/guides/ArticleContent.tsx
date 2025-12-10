'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { AlertTriangle, Lightbulb, Info } from 'lucide-react'

interface ArticleContentProps {
  content: string
}

// Callout component
function Callout({ type, children }: { type: 'tip' | 'warning' | 'info', children: React.ReactNode }) {
  const styles = {
    tip: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />,
      text: 'text-emerald-800'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />,
      text: 'text-amber-800'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />,
      text: 'text-blue-800'
    }
  }

  const style = styles[type]

  return (
    <div className={`${style.bg} border ${style.border} rounded-xl p-5 my-6`}>
      <div className="flex gap-3">
        {style.icon}
        <div className={`${style.text} text-base leading-relaxed`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ArticleContent({ content }: ArticleContentProps) {
  // Parse the content and extract callouts
  // Pattern: > [!TYPE] content
  const calloutPattern = /^>\s*\[!(TIP|WARNING|INFO)\]\s*(.+)$/gim

  // Split content into segments (regular content and callouts)
  const segments: { type: 'markdown' | 'callout', content: string, calloutType?: 'tip' | 'warning' | 'info' }[] = []

  let lastIndex = 0
  let match

  // Reset lastIndex for the regex
  calloutPattern.lastIndex = 0

  const lines = content.split('\n')
  let currentMarkdown: string[] = []

  for (const line of lines) {
    const calloutMatch = line.match(/^>\s*\[!(TIP|WARNING|INFO)\]\s*(.+)$/i)

    if (calloutMatch) {
      // Save accumulated markdown
      if (currentMarkdown.length > 0) {
        segments.push({ type: 'markdown', content: currentMarkdown.join('\n') })
        currentMarkdown = []
      }

      // Add callout
      segments.push({
        type: 'callout',
        content: calloutMatch[2],
        calloutType: calloutMatch[1].toLowerCase() as 'tip' | 'warning' | 'info'
      })
    } else {
      currentMarkdown.push(line)
    }
  }

  // Don't forget remaining markdown
  if (currentMarkdown.length > 0) {
    segments.push({ type: 'markdown', content: currentMarkdown.join('\n') })
  }

  return (
    <div className="article-content">
      {segments.map((segment, index) => {
        if (segment.type === 'callout' && segment.calloutType) {
          return (
            <Callout key={index} type={segment.calloutType}>
              {segment.content}
            </Callout>
          )
        }

        // Regular markdown content
        if (segment.content.trim()) {
          return (
            <div key={index} className="prose prose-slate prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
              prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-brand-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-slate-600 prose-li:leading-relaxed prose-li:my-1
              prose-li:marker:text-brand-500
              prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:bg-slate-50 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:my-6
              prose-code:text-brand-700 prose-code:bg-brand-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-900 prose-pre:rounded-xl
              prose-hr:my-8 prose-hr:border-slate-200
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom link handling
                  a: ({ href, children }) => {
                    if (href?.startsWith('/')) {
                      return <Link href={href}>{children}</Link>
                    }
                    return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
                  },
                  // Better table styling
                  table: ({ children }) => (
                    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full border-collapse text-base">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-slate-100">{children}</thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border border-slate-200">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 text-slate-600 border border-slate-200">{children}</td>
                  ),
                  // Add IDs to headings for anchor links
                  h2: ({ children }) => {
                    const text = typeof children === 'string' ? children : String(children)
                    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
                    return <h2 id={id}>{children}</h2>
                  },
                  h3: ({ children }) => {
                    const text = typeof children === 'string' ? children : String(children)
                    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
                    return <h3 id={id}>{children}</h3>
                  },
                }}
              >
                {segment.content}
              </ReactMarkdown>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
