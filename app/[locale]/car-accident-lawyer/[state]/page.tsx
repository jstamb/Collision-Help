import React from 'react'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { lawyerPagesByState, getLawyerPagesForState } from '@/content/lawyers/lawyer-pages'
import { getStateBySlug } from '@/content/locations/states'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CallbackButton from '@/components/CallbackButton'
import { getTranslations } from 'next-intl/server'
import {
  Scale,
  MapPin,
  ChevronRight,
  Shield,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Car
} from 'lucide-react'

interface PageProps {
  params: Promise<{
    state: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(lawyerPagesByState).map(stateSlug => ({
    state: stateSlug
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params
  const stateInfo = getStateBySlug(stateSlug)
  const pages = getLawyerPagesForState(stateSlug)

  if (!stateInfo || pages.length === 0) {
    return { title: 'Page Not Found' }
  }

  const stateName = stateInfo.name

  return {
    title: `${stateName} Car Accident Lawyers | Find an Attorney by City`,
    description: `Find a car accident lawyer in ${stateName}. Free consultations in ${pages.length} cities including ${pages.slice(0, 3).map(p => p.cityName).join(', ')}. No fee unless you win.`,
    openGraph: {
      title: `${stateName} Car Accident Lawyers | Find an Attorney by City`,
      description: `Find a car accident lawyer in ${stateName}. Free consultations in ${pages.length} cities. No fee unless you win.`,
      url: `https://collisionhelp.org/car-accident-lawyer/${stateSlug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://collisionhelp.org/car-accident-lawyer/${stateSlug}`,
    },
  }
}

// Generate schema for the state hub page
function generateSchema(stateSlug: string, stateName: string, pages: { cityName: string; slug: string }[]) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://collisionhelp.org'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Car Accident Lawyer',
        item: 'https://collisionhelp.org/car-accident-lawyer'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: stateName,
        item: `https://collisionhelp.org/car-accident-lawyer/${stateSlug}`
      }
    ]
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${stateName} Car Accident Lawyers`,
    description: `Find a car accident lawyer in ${stateName}. Free consultations in ${pages.length} cities.`,
    url: `https://collisionhelp.org/car-accident-lawyer/${stateSlug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Collision Help',
      url: 'https://collisionhelp.org'
    }
  }

  return { breadcrumbSchema, webPageSchema }
}

export default async function StateLawyerHub({ params }: PageProps) {
  const { state: stateSlug } = await params
  const stateInfo = getStateBySlug(stateSlug)
  const pages = getLawyerPagesForState(stateSlug)

  if (!stateInfo || pages.length === 0) {
    notFound()
  }

  const { breadcrumbSchema, webPageSchema } = generateSchema(stateSlug, stateInfo.name, pages)
  const t = await getTranslations()

  // Get state-specific legal info from the first page (all same state)
  const firstPage = pages[0]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-blue-200 text-sm mb-6">
                <Link href="/" className="hover:text-white">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/car-accident-lawyer" className="hover:text-white">Car Accident Lawyer</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">{stateInfo.name}</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-600 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-5 h-5 text-blue-300" />
                <span className="text-blue-200 text-sm font-medium">{pages.length} Cities in {stateInfo.name}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {stateInfo.name} Car Accident Lawyers
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Find an experienced car accident attorney in {stateInfo.name}. Free consultations,
                no upfront fees, and you only pay if you win your case.
              </p>

              <CallbackButton
                state={stateSlug}
                stateName={stateInfo.name}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get a Free Case Review
              </CallbackButton>
            </div>
          </div>
        </section>

        {/* State Legal Info Bar */}
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-gray-600">Injury Deadline:</span>
                <span className="font-semibold text-gray-900">{firstPage.statuteOfLimitations.personalInjury}</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">Fault System:</span>
                <span className="font-semibold text-gray-900 capitalize">{firstPage.faultSystem.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">Negligence Rule:</span>
                <span className="font-semibold text-gray-900 capitalize">{firstPage.comparativeNegligence} Comparative</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
                Find a Lawyer by City
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Select your city to connect with a car accident attorney who knows the local courts,
                roads, and insurance companies in your area.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/car-accident-lawyer/${stateSlug}/${page.slug}`}
                    className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 group hover:border-blue-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {page.cityName}
                          </h3>
                          <span className="text-xs text-gray-500">Free consultation</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* State-Specific Legal Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
                {stateInfo.name} Car Accident Laws
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Understanding {stateInfo.name}'s laws can help you protect your rights after an accident.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Statute of Limitations */}
                <div className="bg-amber-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Filing Deadlines</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between">
                      <span>Personal Injury:</span>
                      <span className="font-semibold">{firstPage.statuteOfLimitations.personalInjury}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Property Damage:</span>
                      <span className="font-semibold">{firstPage.statuteOfLimitations.propertyDamage}</span>
                    </li>
                  </ul>
                  <p className="text-sm text-amber-700 mt-4">
                    Missing these deadlines can permanently bar your claim.
                  </p>
                </div>

                {/* Minimum Coverage */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Minimum Insurance</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between">
                      <span>Bodily Injury (per person):</span>
                      <span className="font-semibold">${firstPage.minimumCoverage.bodilyInjuryPerPerson.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Bodily Injury (per accident):</span>
                      <span className="font-semibold">${firstPage.minimumCoverage.bodilyInjuryPerAccident.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Property Damage:</span>
                      <span className="font-semibold">${firstPage.minimumCoverage.propertyDamage.toLocaleString()}</span>
                    </li>
                  </ul>
                  <p className="text-sm text-blue-700 mt-4">
                    Many drivers only carry minimum coverage, which may not cover serious injuries.
                  </p>
                </div>

                {/* Fault System */}
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Scale className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Fault System</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {stateInfo.name} is an <span className="font-semibold capitalize">{firstPage.faultSystem.replace('-', ' ')}</span> state.
                  </p>
                  <p className="text-sm text-gray-600">
                    {firstPage.faultSystem === 'at-fault'
                      ? 'The driver who caused the accident is responsible for damages. You can file a claim against the at-fault driver\'s insurance.'
                      : firstPage.faultSystem === 'no-fault'
                      ? 'You file a claim with your own insurance first, regardless of who caused the accident. Lawsuits are limited to serious injuries.'
                      : 'Drivers can choose between at-fault and no-fault coverage options.'}
                  </p>
                </div>

                {/* Comparative Negligence */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Comparative Negligence</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {stateInfo.name} follows <span className="font-semibold capitalize">{firstPage.comparativeNegligence}</span> comparative negligence.
                  </p>
                  <p className="text-sm text-gray-600">
                    {firstPage.comparativeNegligence === 'pure'
                      ? 'You can recover damages even if you\'re mostly at fault, reduced by your percentage of fault.'
                      : firstPage.comparativeNegligence === 'modified-50'
                      ? 'You can recover damages only if you\'re 49% or less at fault for the accident.'
                      : firstPage.comparativeNegligence === 'modified-51'
                      ? 'You can recover damages only if you\'re 50% or less at fault for the accident.'
                      : 'Any fault on your part bars you from recovering damages. Even 1% fault means no recovery.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Injured in a {stateInfo.name} Car Accident?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a free case evaluation from an experienced attorney in your city.
              No upfront costs, no obligation.
            </p>
            <CallbackButton
              state={stateSlug}
              stateName={stateInfo.name}
              className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Get Your Free Case Review
            </CallbackButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
