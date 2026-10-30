import type { Metadata } from 'next'
import { locales, defaultLocale } from '@/i18n/config'

// Every page is served under a locale prefix (next-intl localePrefix: 'always'),
// and the unprefixed URLs 308 to /en. Canonicals and hreflang must therefore
// point at the prefixed www URL that actually returns 200, matching the sitemap.
export const SITE_URL = 'https://www.collisionhelp.org'

function normalizeLocale(locale?: string): string {
  return locale && (locales as readonly string[]).includes(locale) ? locale : defaultLocale
}

export function localeUrl(locale: string | undefined, path = ''): string {
  const p = !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}/${normalizeLocale(locale)}${p}`
}

// Self-referencing canonical for the current locale plus en/es/x-default alternates.
export function localeAlternates(locale: string | undefined, path = ''): NonNullable<Metadata['alternates']> {
  return {
    canonical: localeUrl(locale, path),
    languages: {
      en: localeUrl('en', path),
      es: localeUrl('es', path),
      'x-default': localeUrl(defaultLocale, path),
    },
  }
}

// English-only sections (the SEObot blog) canonicalize to the /en URL in every locale.
export function englishCanonical(path = ''): NonNullable<Metadata['alternates']> {
  return { canonical: localeUrl('en', path) }
}
