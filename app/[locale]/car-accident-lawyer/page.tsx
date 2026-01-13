import React from 'react'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { lawyerPagesByState } from '@/content/lawyers/lawyer-pages'
import { getStateBySlug } from '@/content/locations/states'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getTranslations } from 'next-intl/server'
import {
  Scale,
  MapPin,
  ChevronRight,
  Shield,
  Clock,
  DollarSign,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Find a Car Accident Lawyer | Free Consultation by City',
  description: 'Find an experienced car accident lawyer in your city. Free consultations, no fee unless you win. Browse attorneys by state and city.',
  openGraph: {
    title: 'Find a Car Accident Lawyer | Free Consultation by City',
    description: 'Find an experienced car accident lawyer in your city. Free consultations, no fee unless you win.',
    url: 'https://collisionhelp.org/car-accident-lawyer',
    type: 'website',
  },
  alternates: {
    canonical: 'https://collisionhelp.org/car-accident-lawyer',
  },
}

// Generate schema for the hub page
function generateSchema() {
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
      }
    ]
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Find a Car Accident Lawyer',
    description: 'Find an experienced car accident lawyer in your city. Free consultations, no fee unless you win.',
    url: 'https://collisionhelp.org/car-accident-lawyer',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Collision Help',
      url: 'https://collisionhelp.org'
    }
  }

  return { breadcrumbSchema, webPageSchema }
}

export default async function CarAccidentLawyerHub() {
  const { breadcrumbSchema, webPageSchema } = generateSchema()
  const t = await getTranslations()

  // Get state information for each state with lawyer pages
  const statesWithLawyers = Object.entries(lawyerPagesByState).map(([stateSlug, pages]) => {
    const stateInfo = getStateBySlug(stateSlug)
    return {
      slug: stateSlug,
      name: stateInfo?.name || stateSlug.charAt(0).toUpperCase() + stateSlug.slice(1),
      abbreviation: stateInfo?.abbreviation || stateSlug.toUpperCase().slice(0, 2),
      cityCount: pages.length,
      cities: pages.slice(0, 5).map(p => p.cityName) // Preview of top cities
    }
  }).sort((a, b) => b.cityCount - a.cityCount)

  const totalCities = Object.values(lawyerPagesByState).reduce((sum, pages) => sum + pages.length, 0)

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
                <span className="text-white">Car Accident Lawyer</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-600 rounded-full px-4 py-2 mb-6">
                <Scale className="w-5 h-5 text-blue-300" />
                <span className="text-blue-200 text-sm font-medium">Free Consultations Available</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Find a Car Accident Lawyer
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Connect with experienced car accident attorneys in your city. Free case evaluations,
                no upfront fees, and you only pay if you win.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{totalCities}+</div>
                  <div className="text-blue-200 text-sm">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{statesWithLawyers.length}</div>
                  <div className="text-blue-200 text-sm">States</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-blue-200 text-sm">Free Consultations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">No Win, No Fee</h3>
                  <p className="text-sm text-gray-600">Pay nothing unless you win your case</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fast Response</h3>
                  <p className="text-sm text-gray-600">Get a response within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Local Expertise</h3>
                  <p className="text-sm text-gray-600">Attorneys who know your area</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Proven Results</h3>
                  <p className="text-sm text-gray-600">Experienced in accident claims</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* States Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
                Browse by State
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Select your state to find car accident lawyers in your city. Each attorney offers free consultations.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statesWithLawyers.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/car-accident-lawyer/${state.slug}`}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {state.name}
                          </h3>
                          <span className="text-sm text-gray-500">{state.cityCount} cities</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {state.cities.map((city) => (
                        <span key={city} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {city}
                        </span>
                      ))}
                      {state.cityCount > 5 && (
                        <span className="text-xs text-blue-600 px-2 py-1">
                          +{state.cityCount - 5} more
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With a Lawyer */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
                Why Work With a Car Accident Lawyer?
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Insurance companies have teams of adjusters working to minimize what they pay. An experienced attorney levels the playing field.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">When You Should Consider Legal Help:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">You suffered injuries requiring medical treatment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">The insurance company is disputing fault</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">You're being pressured to accept a quick settlement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">The other driver was uninsured or underinsured</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">You're unable to work due to your injuries</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">What a Lawyer Can Do For You:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Scale className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Handle all communication with insurance companies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Scale className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Investigate the accident and gather evidence</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Scale className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Calculate the full value of your claim</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Scale className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Negotiate for maximum compensation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Scale className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">File a lawsuit if a fair settlement isn't offered</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contingency Fee Explanation */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                No Upfront Costs. Ever.
              </h2>
              <p className="text-gray-600 mb-8">
                Car accident lawyers work on a contingency fee basis. This means you pay nothing upfront
                and only pay a percentage of your recovery if you win. If you don't win, you don't pay.
              </p>
              <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-6 py-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">Free consultations for all cases</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
