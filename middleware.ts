import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

const handleI18n = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
  // lib/seo.ts owns hreflang; the generated Link header sends x-default to the unprefixed URL
  alternateLinks: false,
});

export default function middleware(request: NextRequest) {
  const response = handleI18n(request);
  if (response.status !== 307) return response;

  // Unprefixed URLs moved for good, so tell Google permanently (next-intl only sends 307).
  // The target varies by visitor language, so browsers must not cache it.
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-store');
  return new NextResponse(null, { status: 308, headers });
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};
