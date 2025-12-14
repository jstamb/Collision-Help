'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations()

  const footerLinks = {
    guides: [
      { name: t('guides.totalLossDisputes'), href: '/guides/total-loss-dispute' },
      { name: t('guides.insuranceClaims'), href: '/guides/insurance-claims' },
      { name: t('guides.repairRights'), href: '/guides/repair-rights' },
      { name: t('guides.faultDetermination'), href: '/guides/fault-determination' },
      { name: t('guides.rearEndCollisions'), href: '/guides/rear-end-collisions' },
      { name: t('guides.commercialVehicles'), href: '/guides/commercial-vehicle' },
      { name: t('guides.accidentInjuries'), href: '/guides/accident-injuries' },
    ],
    tools: [
      { name: t('tools.aiDamageAnalyzer'), href: '/' },
      { name: t('tools.settlementCalculator'), href: '/tools/settlement-calculator' },
      { name: t('tools.totalLossCalculator'), href: '/tools/total-loss-calculator' },
    ],
    resources: [
      { name: t('footer.resourcesHub'), href: '/resources' },
      { name: t('nav.glossary'), href: '/glossary' },
    ],
    states: [
      { name: 'California', href: '/locations/california' },
      { name: 'Texas', href: '/locations/texas' },
      { name: 'Florida', href: '/locations/florida' },
      { name: 'New York', href: '/locations/new-york' },
      { name: t('common.allStates'), href: '/locations' },
    ],
    company: [
      { name: t('nav.about'), href: '/about' },
      { name: t('footer.privacyPolicy'), href: '/privacy' },
      { name: t('footer.termsOfService'), href: '/terms' },
    ],
  }

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-7 h-7 text-brand-400" />
              <span className="text-xl font-bold text-white">{t('common.siteName')}</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('common.tagline')}
            </p>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('nav.guides')}</h3>
            <ul className="space-y-3">
              {footerLinks.guides.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('nav.tools')}</h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('nav.resources')}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* States */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('nav.states')}</h3>
            <ul className="space-y-3">
              {footerLinks.states.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('nav.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} {t('common.copyright')}
            </p>
            <p className="text-xs text-slate-500 max-w-xl text-center md:text-right">
              {t('common.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
