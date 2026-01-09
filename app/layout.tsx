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
  metadataBase: new URL('https://collisionhelp.org'),
  title: {
    default: 'Collision Help | Nationwide Accident Help',
    template: '%s | Collision Help',
  },
  description: 'Guidance for motor vehicle accident victims. Navigate insurance claims, repairs, and total loss disputes.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://collisionhelp.org',
    siteName: 'Collision Help',
    title: 'Collision Help | Nationwide Accident Help',
    description: 'AI-powered damage analysis and expert guidance to help you navigate insurance claims after a car accident.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collision Help | Nationwide Accident Help',
    description: 'AI-powered damage analysis and expert guidance to help you navigate insurance claims after a car accident.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
