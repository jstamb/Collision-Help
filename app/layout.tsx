import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { cn } from '@/lib/utils';

const GA_MEASUREMENT_ID = 'G-VYBCK94B6J';
const CRONITOR_CLIENT_KEY = 'bee8bc73945613102aa5723071fcc965';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.collisionhelp.org'),
  title: {
    default: 'Collision Help | Nationwide Accident Help',
    template: '%s | Collision Help',
  },
  description: 'Free expert guidance for car accident victims. Navigate insurance claims, total loss disputes, repair rights, and settlement negotiations. Get help 24/7.',
  keywords: ['car accident help', 'insurance claim help', 'total loss dispute', 'car accident lawyer', 'accident settlement', 'insurance claim denied'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.collisionhelp.org',
    siteName: 'Collision Help',
    title: 'Collision Help | Nationwide Accident Help',
    description: 'Free expert guidance for car accident victims. Navigate insurance claims, total loss disputes, and settlement negotiations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collision Help - Nationwide Accident Assistance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collision Help | Nationwide Accident Help',
    description: 'Free expert guidance for car accident victims. Navigate insurance claims and get the settlement you deserve.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.collisionhelp.org',
    languages: {
      'en': 'https://www.collisionhelp.org/en',
      'es': 'https://www.collisionhelp.org/es',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale } = await params;
  const lang = locale || 'en';

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {/* Cronitor RUM */}
        <Script
          src="https://rum.cronitor.io/script.js"
          strategy="lazyOnload"
        />
        <Script id="cronitor-rum" strategy="lazyOnload">
          {`
            window.cronitor = window.cronitor || function() { (window.cronitor.q = window.cronitor.q || []).push(arguments); };
            cronitor('config', { clientKey: '${CRONITOR_CLIENT_KEY}' });
          `}
        </Script>
      </head>
      <body className={cn("min-h-screen bg-white font-sans text-slate-900 antialiased", inter.variable)}>
        {children}
      </body>
    </html>
  );
}
