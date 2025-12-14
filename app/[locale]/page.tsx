import React from 'react'
import { Clock, FileText, Shield, CheckCircle2 } from 'lucide-react'
import LeadForm from '@/components/LeadForm'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                Available Nationwide
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                Dealing with Insurance After an Accident?
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                We help you navigate claims, repairs, and total loss disputes. Upload your photos and get expert guidance within 24 hours. No obligation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Free Evaluation</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Data Encrypted</span>
                </div>
              </div>
            </div>
            
            {/* Form Container */}
            <div className="relative z-10">
               <div className="absolute inset-0 bg-brand-500/10 blur-3xl transform rotate-3 scale-95 -z-10 rounded-3xl"></div>
               <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Stress-Free Process</h2>
            <p className="text-slate-600">We handle the complexity so you can focus on recovering.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: FileText, 
                title: "1. Tell Us What Happened", 
                desc: "Answer a few simple questions about the accident and vehicle involved." 
              },
              { 
                icon: Clock, 
                title: "2. Upload Photos", 
                desc: "Securely upload photos of damage. Our system analyzes severity instantly." 
              },
              { 
                icon: Shield, 
                title: "3. Get Expert Guidance", 
                desc: "Receive a personalized roadmap for your insurance claim or repair process." 
              }
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}