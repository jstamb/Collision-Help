import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getStateBySlug, getFaultSystemExplanation, getComparativeNegligenceExplanation } from '@/content/locations/states'
import { getCityBySlug, getCitiesForState, type CityData } from '@/content/locations/cities'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CallbackButton from '@/components/CallbackButton'
import {
  MapPin,
  AlertTriangle,
  Car,
  Clock,
  Scale,
  Shield,
  Phone,
  ChevronRight,
  Navigation,
  Building2,
  CloudRain,
  FileText,
  Users,
  Zap,
  CircleDot,
  MapPinned
} from 'lucide-react'

interface PageProps {
  params: Promise<{
    state: string
    city: string
  }>
}

export async function generateStaticParams() {
  // Import here to avoid build issues
  const { citiesByState } = await import('@/content/locations/cities')
  const params: { state: string; city: string }[] = []

  Object.entries(citiesByState).forEach(([stateSlug, cities]) => {
    cities.forEach(city => {
      params.push({
        state: stateSlug,
        city: city.slug
      })
    })
  })

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params
  const city = getCityBySlug(stateSlug, citySlug)
  const state = getStateBySlug(stateSlug)

  if (!city || !state) {
    return { title: 'City Not Found' }
  }

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    keywords: city.keywords.join(', '),
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `https://collisionhelp.org/locations/${stateSlug}/${citySlug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://collisionhelp.org/locations/${stateSlug}/${citySlug}`,
    },
  }
}

// Generate JSON-LD Schema
function generateSchema(city: CityData, stateData: ReturnType<typeof getStateBySlug>) {
  if (!stateData) return null

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: city.metaTitle,
    description: city.metaDescription,
    url: `https://collisionhelp.org/locations/${city.state}/${city.slug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Collision Help',
      url: 'https://collisionhelp.org'
    },
    about: {
      '@type': 'Place',
      name: `${city.name}, ${stateData.name}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: city.stateAbbreviation,
        addressCountry: 'US'
      }
    },
    mainEntity: {
      '@type': 'Article',
      headline: `Car Accident Help in ${city.name}, ${stateData.name}`,
      description: city.introText,
      author: {
        '@type': 'Organization',
        name: 'Collision Help'
      }
    },
    breadcrumb: {
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
          name: 'Locations',
          item: 'https://collisionhelp.org/locations'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: stateData.name,
          item: `https://collisionhelp.org/locations/${city.state}`
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: city.name,
          item: `https://collisionhelp.org/locations/${city.state}/${city.slug}`
        }
      ]
    }
  }

  // Local Business Schema for legal services in the area
  const localServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Car Accident Help - ${city.name}`,
    description: `Free car accident guidance and attorney connections for ${city.name}, ${stateData.name} residents`,
    url: `https://collisionhelp.org/locations/${city.state}/${city.slug}`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: stateData.name
      }
    },
    serviceType: ['Car Accident Assistance', 'Insurance Claim Guidance', 'Attorney Referral'],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://collisionhelp.org/locations/${city.state}/${city.slug}`,
      serviceType: 'Online'
    }
  }

  // FAQ Schema
  const faqItems = [
    {
      question: `What should I do immediately after a car accident in ${city.name}?`,
      answer: `After an accident in ${city.name}: 1) Check for injuries and call 911 if needed. 2) Move to safety if possible. 3) Exchange information with other drivers. 4) Document the scene with photos. 5) File a police report. 6) Contact your insurance company. ${stateData.name} has a ${stateData.statuteOfLimitations.personalInjury} statute of limitations for personal injury claims.`
    },
    {
      question: `How does ${stateData.name}'s ${stateData.faultSystem === 'no-fault' ? 'no-fault' : stateData.faultSystem === 'choice' ? 'choice no-fault' : 'at-fault'} insurance system work in ${city.name}?`,
      answer: getFaultSystemExplanation(stateData)
    },
    {
      question: `What are the most dangerous roads in ${city.name}?`,
      answer: `The most common accident locations in ${city.name} include: ${city.highways.slice(0, 3).map(h => h.name).join(', ')}. ${city.dangerousIntersections ? `Dangerous intersections include ${city.dangerousIntersections.slice(0, 3).join(', ')}.` : ''}`
    },
    {
      question: `How long do I have to file a car accident lawsuit in ${city.name}, ${stateData.name}?`,
      answer: `In ${stateData.name}, you have ${stateData.statuteOfLimitations.personalInjury} to file a personal injury lawsuit and ${stateData.statuteOfLimitations.propertyDamage} for property damage claims. It's important to act quickly to preserve evidence and meet all deadlines.`
    },
    {
      question: `What if I'm partially at fault for my ${city.name} car accident?`,
      answer: getComparativeNegligenceExplanation(stateData)
    }
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  return { webPageSchema, localServiceSchema, faqSchema, faqItems }
}

export default async function CityPage({ params }: PageProps) {
  const { state: stateSlug, city: citySlug } = await params
  const city = getCityBySlug(stateSlug, citySlug)
  const state = getStateBySlug(stateSlug)

  if (!city || !state) {
    notFound()
  }

  const schema = generateSchema(city, state)
  const otherCities = getCitiesForState(stateSlug).filter(c => c.slug !== citySlug)

  // Determine fault badge color
  const getFaultBadge = () => {
    switch (state.faultSystem) {
      case 'no-fault':
        return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'No-Fault State' }
      case 'choice':
        return { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Choice State' }
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-700', label: 'At-Fault State' }
    }
  }

  const faultBadge = getFaultBadge()

  return (
    <>
      <Header />

      {/* Schema Markup */}
      {schema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.webPageSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.localServiceSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.faqSchema) }}
          />
        </>
      )}

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/locations" className="hover:text-white transition-colors">Locations</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/locations/${stateSlug}`} className="hover:text-white transition-colors">{state.name}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{city.name}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 text-brand-400" />
                  <span className="text-sm font-medium text-brand-300">{city.name}, {state.abbreviation}</span>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${faultBadge.bg} ${faultBadge.text}`}>
                  {faultBadge.label}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Car Accident Help in <span className="text-brand-400">{city.name}</span>
              </h1>

              <p className="text-lg text-slate-300 mb-6 max-w-3xl">
                {city.introText}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/ai-damage-analyzer"
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Car className="w-5 h-5" />
                  Analyze Your Damage
                </Link>
                <CallbackButton
                  state={stateSlug}
                  stateName={state.name}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Request Callback
                </CallbackButton>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{city.population.toLocaleString()}</div>
                <div className="text-xs text-slate-500">Population ({city.populationYear})</div>
              </div>
              {city.annualAccidents && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{city.annualAccidents.toLocaleString()}+</div>
                  <div className="text-xs text-slate-500">Annual Accidents</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600">{state.statuteOfLimitations.personalInjury}</div>
                <div className="text-xs text-slate-500">Injury Deadline</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-700">{state.minimumCoverage.formatted}</div>
                <div className="text-xs text-slate-500">Min. Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-700">{city.highways.length}</div>
                <div className="text-xs text-slate-500">Major Highways</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-8">

                {/* Major Highways & Accident Hotspots */}
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-brand-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Major Highways & Accident Hotspots</h2>
                  </div>

                  <p className="text-slate-600 mb-6">
                    Understanding where accidents commonly occur in {city.name} can help you stay alert and know what to expect if you're involved in a collision.
                  </p>

                  <div className="space-y-4">
                    {city.highways.map((highway, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <h3 className="font-semibold text-slate-900 mb-1">{highway.name}</h3>
                        <p className="text-sm text-slate-600 mb-2">{highway.description}</p>
                        {highway.accidentHotspots && highway.accidentHotspots.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {highway.accidentHotspots.map((spot, spotIndex) => (
                              <span key={spotIndex} className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                                <CircleDot className="w-3 h-3" />
                                {spot}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {city.dangerousIntersections && city.dangerousIntersections.length > 0 && (
                    <div className="mt-6 p-4 bg-red-50 rounded-lg">
                      <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Dangerous Intersections
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {city.dangerousIntersections.map((intersection, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-red-800">
                            <MapPinned className="w-4 h-4 flex-shrink-0" />
                            {intersection}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Traffic Patterns */}
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">{city.name} Traffic Patterns</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {city.trafficPatterns.map((pattern, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4">
                        <h3 className="font-semibold text-slate-900 mb-1">{pattern.type}</h3>
                        <p className="text-sm text-slate-600">{pattern.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Accident Types */}
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Common Accident Types in {city.name}</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {city.commonAccidentTypes.map((type, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neighborhoods */}
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Neighborhood Traffic Considerations</h2>
                  </div>

                  <p className="text-slate-600 mb-6">
                    Different areas of {city.name} present unique driving challenges. Here's what to know about each neighborhood.
                  </p>

                  <div className="space-y-3">
                    {city.neighborhoods.map((neighborhood, index) => (
                      <div key={index} className="border-l-4 border-brand-500 pl-4 py-2">
                        <h3 className="font-semibold text-slate-900">{neighborhood.name}</h3>
                        <p className="text-sm text-slate-600">{neighborhood.characteristics}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weather Factors */}
                {city.weatherFactors && city.weatherFactors.length > 0 && (
                  <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                        <CloudRain className="w-5 h-5 text-sky-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">Weather-Related Driving Hazards</h2>
                    </div>

                    <div className="space-y-3">
                      {city.weatherFactors.map((factor, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg">
                          <CloudRain className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Local Considerations */}
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Local Considerations for {city.name} Accidents</h2>
                  </div>

                  <p className="text-slate-600 mb-6">
                    Important factors specific to handling car accident claims in {city.name}:
                  </p>

                  <ul className="space-y-3">
                    {city.localConsiderations.map((consideration, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQ Section */}
                {schema && schema.faqItems && (
                  <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                      Frequently Asked Questions About {city.name} Car Accidents
                    </h2>

                    <div className="space-y-6">
                      {schema.faqItems.map((faq, index) => (
                        <div key={index} className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                          <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                          <p className="text-slate-600 text-sm">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Sidebar */}
              <div className="space-y-6">

                {/* State Law Summary */}
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-brand-600" />
                    {state.name} Law Summary
                  </h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fault System:</span>
                      <span className={`font-medium px-2 py-0.5 rounded ${faultBadge.bg} ${faultBadge.text}`}>
                        {faultBadge.label.replace(' State', '')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Injury Deadline:</span>
                      <span className="font-medium text-slate-900">{state.statuteOfLimitations.personalInjury}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Property Deadline:</span>
                      <span className="font-medium text-slate-900">{state.statuteOfLimitations.propertyDamage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Min. Coverage:</span>
                      <span className="font-medium text-slate-900">{state.minimumCoverage.formatted}</span>
                    </div>
                    {state.pipRequired && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">PIP Required:</span>
                        <span className="font-medium text-green-600">Yes</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Loss:</span>
                      <span className="font-medium text-slate-900">{state.totalLossThreshold}</span>
                    </div>
                  </div>

                  {state.comparativeNegligence === 'contributory' && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-xs text-red-700">
                        <strong>Warning:</strong> {state.name} uses contributory negligence. Any fault on your part could bar recovery.
                      </p>
                    </div>
                  )}

                  <Link
                    href={`/locations/${stateSlug}`}
                    className="mt-4 block text-center text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    View Full {state.name} Guide
                  </Link>
                </div>

                {/* Get Help CTA */}
                <div className="bg-brand-600 rounded-xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">Been in a {city.name} Accident?</h3>
                  <p className="text-brand-100 text-sm mb-4">
                    Get free guidance on your next steps and connect with local legal professionals.
                  </p>
                  <CallbackButton
                    state={stateSlug}
                    stateName={state.name}
                    className="w-full bg-white text-brand-600 hover:bg-brand-50 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Request Free Callback
                  </CallbackButton>
                </div>

                {/* Police Contact */}
                {city.policeNonEmergency && (
                  <div className="bg-slate-100 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-slate-600" />
                      {city.name} Police
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">Non-Emergency Line:</p>
                    <a href={`tel:${city.policeNonEmergency.replace(/[^\d]/g, '')}`} className="text-lg font-bold text-brand-600 hover:text-brand-700">
                      {city.policeNonEmergency}
                    </a>
                    <p className="text-xs text-slate-500 mt-2">For accident reports and follow-up</p>
                  </div>
                )}

                {/* Other Cities */}
                {otherCities.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-slate-600" />
                      Other {state.name} Cities
                    </h3>
                    <div className="space-y-2">
                      {otherCities.map(otherCity => (
                        <Link
                          key={otherCity.slug}
                          href={`/locations/${stateSlug}/${otherCity.slug}`}
                          className="flex items-center justify-between p-2 rounded hover:bg-slate-50 transition-colors group"
                        >
                          <span className="text-sm text-slate-700 group-hover:text-brand-600">{otherCity.name}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Unique Traffic Laws */}
                {city.uniqueTrafficLaws && city.uniqueTrafficLaws.length > 0 && (
                  <div className="bg-amber-50 rounded-xl p-6">
                    <h3 className="font-semibold text-amber-900 mb-3">Local Traffic Laws</h3>
                    <ul className="space-y-2">
                      {city.uniqueTrafficLaws.map((law, index) => (
                        <li key={index} className="text-sm text-amber-800 flex items-start gap-2">
                          <Scale className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {law}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Expert Help With Your {city.name} Accident
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Upload photos of your damage for instant AI analysis or connect with local legal professionals who understand {city.name} traffic patterns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/ai-damage-analyzer"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                <Car className="w-5 h-5" />
                Try Free AI Analysis
              </Link>
              <CallbackButton
                state={stateSlug}
                stateName={state.name}
                className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                <Phone className="w-5 h-5" />
                Get Free Case Review
              </CallbackButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
