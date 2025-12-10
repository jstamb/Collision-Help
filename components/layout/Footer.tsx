import React from 'react'
import Link from 'next/link'
import { Shield } from 'lucide-react'

const footerLinks = {
  guides: [
    { name: 'Total Loss Disputes', href: '/guides/total-loss-dispute' },
    { name: 'Insurance Claims', href: '/guides/insurance-claims' },
    { name: 'Repair Rights', href: '/guides/repair-rights' },
    { name: 'Fault Determination', href: '/guides/fault-determination' },
    { name: 'Rear-End Collisions', href: '/guides/rear-end-collisions' },
    { name: 'Commercial Vehicles', href: '/guides/commercial-vehicle' },
    { name: 'Accident Injuries', href: '/guides/accident-injuries' },
  ],
  tools: [
    { name: 'AI Damage Analyzer', href: '/' },
    { name: 'Total Loss Calculator', href: '/tools/total-loss-calculator' },
  ],
  states: [
    { name: 'California', href: '/locations/california' },
    { name: 'Texas', href: '/locations/texas' },
    { name: 'Florida', href: '/locations/florida' },
    { name: 'New York', href: '/locations/new-york' },
    { name: 'All States', href: '/locations' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-7 h-7 text-brand-400" />
              <span className="text-xl font-bold text-white">Collision Help</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered damage analysis and expert guidance to help you navigate insurance claims and get back on the road.
            </p>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Guides</h3>
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
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Tools</h3>
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

          {/* States */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">States</h3>
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
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
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
              &copy; {new Date().getFullYear()} Collision Help. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 max-w-xl text-center md:text-right">
              Disclaimer: This website provides general information only and is not legal or medical advice.
              Consult with qualified professionals for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
