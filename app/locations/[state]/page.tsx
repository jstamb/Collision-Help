import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { states, StateData } from '@/content/locations/states'
import LeadForm from '@/components/LeadForm'
import { Shield, MapPin, Info } from 'lucide-react'

// Static Generation Params
export async function generateStaticParams() {
  return states.map((state) => ({
    state: state.slug,
  }))
}

// Metadata
export async function generateMetadata({ params }: { params: { state: string } }) {
  const state = states.find((s) => s.slug === params.state)
  if (!state) return {}
  
  return {
    title: `Car Accident Help in ${state.name} | MVA Assist`,
    description: state.metaDescription,
  }
}

export default function StatePage({ params }: { params: { state: string } }) {
  const stateData = states.find((s) => s.slug === params.state)

  if (!stateData) {
    notFound()
  }

  // Schema.org Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `MVA Assist - ${stateData.name}`,
    "areaServed": {
      "@type": "State",
      "name": stateData.name
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* State Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8">
           <Link href="/" className="text-sm text-slate-500 hover:text-brand-600 mb-4 inline-block">← Back to National</Link>
           <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
             Car Accident Help in <span className="text-brand-600">{stateData.name}</span>
           </h1>
           <p className="text-lg text-slate-600 max-w-2xl">
             Local guidance for insurance claims, repairs, and settlements specifically for {stateData.name} residents.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Facts Card */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-600" />
                {stateData.name} Accident Facts
              </h2>
              <dl className="grid sm:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <dt className="text-sm text-slate-500 mb-1">Fault System</dt>
                  <dd className="font-semibold text-slate-900">
                    {stateData.atFault ? "At-Fault State" : "No-Fault State"}
                  </dd>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <dt className="text-sm text-slate-500 mb-1">Statute of Limitations</dt>
                  <dd className="font-semibold text-slate-900">{stateData.statuteOfLimitations}</dd>
                </div>
              </dl>
            </div>

            {/* Embedded Form */}
            <div className="bg-brand-50 p-1 rounded-2xl">
              <div className="bg-white p-6 rounded-xl">
                 <h2 className="text-2xl font-bold text-center mb-6">Get Your Free Case Review</h2>
                 <LeadForm defaultState={stateData.abbreviation} />
              </div>
            </div>

            {/* Content Section */}
            <div className="prose prose-slate max-w-none">
              <h3>Understanding {stateData.name} Insurance Laws</h3>
              <p>
                When dealing with an accident in {stateData.name}, it is crucial to understand local regulations. 
                {stateData.atFault 
                  ? " Since this is an at-fault state, the person responsible for the accident is liable for damages." 
                  : " As a no-fault state, your own insurance provider typically covers your initial medical expenses regardless of who caused the accident."}
              </p>
              <h3>Major Cities Served</h3>
              <ul className="grid grid-cols-2 gap-2 not-prose">
                {stateData.majorCities.map(city => (
                  <li key={city} className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
               <div className="bg-brand-900 text-white p-8 rounded-xl shadow-lg">
                 <Shield className="w-10 h-10 mb-4 text-brand-300" />
                 <h3 className="text-xl font-bold mb-2">Need Immediate Help?</h3>
                 <p className="text-brand-100 mb-6">
                   Don't let insurance companies delay your claim. Get expert advice today.
                 </p>
                 <a href="#form" className="block text-center w-full bg-white text-brand-900 font-bold py-3 rounded-lg hover:bg-brand-50 transition-colors">
                   Start Evaluation
                 </a>
               </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}