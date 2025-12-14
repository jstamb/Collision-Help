'use client'

import React, { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { Shield, Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const t = useTranslations()

  const navigation = [
    {
      name: t('nav.guides'),
      href: '/guides',
      children: [
        { name: t('guides.totalLossDisputes'), href: '/guides/total-loss-dispute' },
        { name: t('guides.insuranceClaims'), href: '/guides/insurance-claims' },
        { name: t('guides.repairRights'), href: '/guides/repair-rights' },
        { name: t('guides.faultDetermination'), href: '/guides/fault-determination' },
        { name: t('guides.rearEndCollisions'), href: '/guides/rear-end-collisions' },
        { name: t('guides.commercialVehicles'), href: '/guides/commercial-vehicle' },
        { name: t('guides.accidentInjuries'), href: '/guides/accident-injuries' },
      ]
    },
    {
      name: t('nav.tools'),
      href: '/tools',
      children: [
        { name: t('tools.aiDamageAnalyzer'), href: '/ai-damage-analyzer' },
        { name: t('tools.settlementCalculator'), href: '/tools/settlement-calculator' },
        { name: t('tools.totalLossCalculator'), href: '/tools/total-loss-calculator' },
      ]
    },
    { name: t('nav.resources'), href: '/resources' },
    { name: t('nav.glossary'), href: '/glossary' },
    { name: t('nav.locations'), href: '/locations' },
    { name: t('nav.about'), href: '/about' },
  ]

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-slate-200">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-brand-600" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">{t('common.siteName')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 rounded-lg hover:bg-slate-50 transition-colors",
                    item.children && "pr-2"
                  )}
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 w-56">
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 py-2 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA + Language Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/ai-damage-analyzer">
              <Button size="sm">{t('common.getFreeAnalysis')}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-600 hover:text-brand-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 px-4 space-y-3">
              <LanguageSwitcher />
              <Link href="/ai-damage-analyzer" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">{t('common.getFreeAnalysis')}</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
