import React from 'react'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLawyerPageBySlug, getLawyerPagesForState, lawyerPagesByState, type LawyerPageData } from '@/content/lawyers/lawyer-pages'
import { getCityBySlug } from '@/content/locations/cities'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CallbackButton from '@/components/CallbackButton'
import LeadForm from '@/components/LeadForm'
import { getTranslations } from 'next-intl/server'
import {
  Scale,
  Clock,
  Shield,
  Phone,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  FileText,
  Users,
  ArrowRight,
  MapPin,
  Gavel,
  Car,
  HeartPulse,
  BadgeCheck,
  ChevronRight
} from 'lucide-react'

interface PageProps {
  params: Promise<{
    state: string
    city: string
  }>
}

export async function generateStaticParams() {
  const params: { state: string; city: string }[] = []

  Object.entries(lawyerPagesByState).forEach(([stateSlug, pages]) => {
    pages.forEach(page => {
      params.push({
        state: stateSlug,
        city: page.slug
      })
    })
  })

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params
  const page = getLawyerPageBySlug(stateSlug, citySlug)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://collisionhelp.org/car-accident-lawyer/${stateSlug}/${citySlug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://collisionhelp.org/car-accident-lawyer/${stateSlug}/${citySlug}`,
    },
  }
}

// Generate comprehensive schema markup
function generateSchema(page: LawyerPageData) {
  // Attorney/Legal Service Schema
  const attorneySchema = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: `${page.cityName} Car Accident Lawyer`,
    description: page.metaDescription,
    url: `https://collisionhelp.org/car-accident-lawyer/${page.state}/${page.slug}`,
    areaServed: {
      '@type': 'City',
      name: page.cityName,
      containedInPlace: {
        '@type': 'State',
        name: page.stateFull
      }
    },
    priceRange: 'Free Consultation - Contingency Fee',
    knowsAbout: [
      'Car Accident Claims',
      'Personal Injury Law',
      'Insurance Disputes',
      'Vehicle Accident Litigation',
      `${page.stateFull} Traffic Law`
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Case Evaluation',
            description: 'No-cost review of your car accident case'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Contingency Fee Representation',
            description: 'No fee unless you win your case'
          }
        }
      ]
    }
  }

  // LegalService Schema
  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Car Accident Legal Help - ${page.cityName}`,
    description: `Car accident lawyer services in ${page.cityName}, ${page.stateFull}. Free consultation and contingency fee representation.`,
    url: `https://collisionhelp.org/car-accident-lawyer/${page.state}/${page.slug}`,
    serviceType: 'Car Accident Attorney',
    areaServed: {
      '@type': 'City',
      name: page.cityName
    },
    provider: {
      '@type': 'LegalService',
      name: 'Collision Help Attorney Network'
    }
  }

  // FAQ Schema
  const faqItems = [
    {
      question: `How much does a car accident lawyer cost in ${page.cityName}?`,
      answer: `Most car accident lawyers in ${page.cityName} work on contingency, meaning you pay nothing upfront and no attorney fees unless you win. Typical contingency fees range from 33-40% of your settlement. Free consultations are standard.`
    },
    {
      question: `How long do I have to file a car accident lawsuit in ${page.stateFull}?`,
      answer: `In ${page.stateFull}, you have ${page.statuteOfLimitations.personalInjury} from the accident date to file a personal injury lawsuit and ${page.statuteOfLimitations.propertyDamage} for property damage claims. These deadlines are strict—missing them means losing your right to compensation.`
    },
    {
      question: `What if I was partially at fault for the accident?`,
      answer: `${page.stateFull} follows a ${page.comparativeNegligence === 'pure' ? 'pure comparative negligence' : page.comparativeNegligence === 'modified-50' ? 'modified comparative negligence (50%)' : page.comparativeNegligence === 'modified-51' ? 'modified comparative negligence (51%)' : 'contributory negligence'} system. ${page.comparativeNegligence === 'pure' ? 'You can recover compensation even if you were mostly at fault—your award is simply reduced by your percentage of fault.' : page.comparativeNegligence === 'contributory' ? 'Unfortunately, if you were any percentage at fault, you may be barred from recovery. This makes legal representation particularly important.' : 'You can recover as long as you were less than 50% at fault, with your award reduced by your fault percentage.'}`
    },
    {
      question: `Should I accept the insurance company's first settlement offer?`,
      answer: `Usually no. First offers are typically designed to close your claim quickly for less than it's worth. Insurance companies know many accident victims are stressed and need money fast. A lawyer can evaluate whether the offer is fair based on your injuries, lost wages, and other damages.`
    },
    {
      question: `What types of compensation can I receive after a car accident?`,
      answer: `Depending on your case, you may recover: medical expenses (past and future), lost wages and earning capacity, property damage, pain and suffering, and in some cases, punitive damages. An attorney can help identify all potential sources of compensation.`
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

  // Breadcrumb Schema
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
        name: page.stateFull,
        item: `https://collisionhelp.org/car-accident-lawyer/${page.state}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: page.cityName,
        item: `https://collisionhelp.org/car-accident-lawyer/${page.state}/${page.slug}`
      }
    ]
  }

  return { attorneySchema, legalServiceSchema, faqSchema, breadcrumbSchema, faqItems }
}

export default async function LawyerCityPage({ params }: PageProps) {
  const { state: stateSlug, city: citySlug } = await params
  const page = getLawyerPageBySlug(stateSlug, citySlug)

  if (!page) {
    notFound()
  }

  // Get linked city info page if it exists
  const cityInfoPage = getCityBySlug(stateSlug, citySlug)

  const { attorneySchema, legalServiceSchema, faqSchema, breadcrumbSchema, faqItems } = generateSchema(page)
  const t = await getTranslations()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
                <span>Car Accident Lawyer</span>
                <ChevronRight className="w-4 h-4" />
                <span>{page.stateFull}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">{page.cityName}</span>
              </nav>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {page.cityName} Car Accident Lawyer
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Were you injured in a car accident? Get a free case evaluation from an experienced attorney who handles {page.cityName} accident cases.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span>No Fee Unless You Win</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-300" />
                  <span>Local {page.cityName} Attorneys</span>
                </div>
              </div>

              <CallbackButton
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg font-semibold"
              >
                Get Your Free Case Review
              </CallbackButton>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content Column */}
              <div className="lg:col-span-2">
                {/* Intro */}
                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {page.introHook}
                  </p>
                </div>

                {/* When You Need a Lawyer */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                    When You Should Talk to a Lawyer
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Not every car accident requires an attorney. But these situations usually benefit from legal guidance:
                  </p>
                  <ul className="space-y-4">
                    {page.whyYouNeedLawyer.map((reason, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Info Box */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
                  <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Gavel className="w-6 h-6" />
                    {page.stateFull} Law: What You Need to Know
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                      <p className="font-semibold text-blue-800">Statute of Limitations</p>
                      <p>Personal Injury: {page.statuteOfLimitations.personalInjury}</p>
                      <p>Property Damage: {page.statuteOfLimitations.propertyDamage}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">Fault System</p>
                      <p>{page.faultSystem === 'at-fault' ? 'At-Fault State' : page.faultSystem === 'no-fault' ? 'No-Fault State' : 'Choice No-Fault'}</p>
                      <p>{page.comparativeNegligence === 'pure' ? 'Pure Comparative Negligence' : page.comparativeNegligence === 'contributory' ? 'Contributory Negligence' : 'Modified Comparative Negligence'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="font-semibold text-blue-800">Minimum Insurance Requirements</p>
                      <p>${page.minimumCoverage.bodilyInjuryPerPerson.toLocaleString()}/${page.minimumCoverage.bodilyInjuryPerAccident.toLocaleString()}/${page.minimumCoverage.propertyDamage.toLocaleString()} (Bodily Injury per person/per accident/Property Damage)</p>
                    </div>
                  </div>
                </div>

                {/* Common Case Types */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Car className="w-8 h-8 text-blue-600" />
                    Types of Cases We Handle in {page.cityName}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {page.commonCaseTypes.map((caseType, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                        <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{caseType}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What to Expect */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-green-600" />
                    What to Expect When You Call
                  </h2>
                  <div className="space-y-4">
                    {page.whatToExpect.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Link to City Info Page */}
                {cityInfoPage && (
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Local Traffic Information
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Learn about dangerous roads, accident hotspots, and local traffic patterns in {page.cityName}.
                    </p>
                    <Link
                      href={`/locations/${stateSlug}/${citySlug}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View {page.cityName} Accident Information
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}

                {/* FAQ Section */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {faqItems.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-700">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Don't Wait to Get Help
                  </h2>
                  <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                    Evidence disappears. Witnesses forget. Insurance companies use delay tactics.
                    The sooner you understand your options, the better positioned you'll be.
                  </p>
                  <CallbackButton
                    className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg rounded-lg font-semibold"
                  >
                    Get Your Free Case Review
                  </CallbackButton>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Lead Form */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-blue-600 text-white p-4 text-center">
                      <h3 className="text-xl font-bold">Free Case Evaluation</h3>
                      <p className="text-blue-100 text-sm">No Fee Unless You Win</p>
                    </div>
                    <div className="p-4">
                      <LeadForm defaultState={page.stateAbbreviation} />
                    </div>
                  </div>

                  {/* Trust Box */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Why Choose Us</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">No upfront costs or hidden fees</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Local {page.cityName} attorneys</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">Experience with {page.stateFull} accident law</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">We handle insurance companies for you</span>
                      </li>
                    </ul>
                  </div>

                  {/* Quick Contact */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <Phone className="w-10 h-10 text-green-600 mx-auto mb-3" />
                    <p className="text-gray-700 mb-2">Prefer to talk now?</p>
                    <CallbackButton
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold w-full"
                    >
                      Request a Call Back
                    </CallbackButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Cities */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Car Accident Lawyers in Other {page.stateFull} Cities
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {getLawyerPagesForState(stateSlug)
                .filter(p => p.slug !== citySlug)
                .map(city => (
                  <Link
                    key={city.slug}
                    href={`/car-accident-lawyer/${stateSlug}/${city.slug}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    {city.cityName}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
