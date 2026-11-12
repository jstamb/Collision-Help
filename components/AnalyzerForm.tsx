'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CheckCircle, Loader2, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const FormSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(5, 'Zip code is required'),
  accidentDescription: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must agree to continue' }) }),
  hp_verify: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

export default function AnalyzerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      consent: true,
      hp_verify: '',
    }
  })

  const formValues = watch()

  const onSubmit = async (data: FormSchemaType) => {
    setIsSubmitting(true)
    setErrorMessage('')

    const note = data.accidentDescription?.trim()
    const accidentDetails = [
      note || 'Submitted from the damage analyzer. No written description.',
      `ZIP: ${data.zip}`,
    ].join('\n')

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          accidentDetails,
          state: data.state,
          stateName: data.state,
          source: 'ai_damage_analyzer',
          timestamp: new Date().toISOString(),
          hp_verify: data.hp_verify ?? '',
        }),
      })

      const result = await res.json()

      if (res.ok && result.success) {
        setSuccess(true)
      } else {
        setErrorMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-slate-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Request received</h2>
        <p className="text-slate-600">
          Thank you, {formValues.name}. We will contact you at {formValues.email} and {formValues.phone} about your accident.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-8 py-4">
        <span className="text-sm font-semibold text-white/90 uppercase tracking-wide">
          Accident follow-up
        </span>
      </div>

      <div className="p-6 md:p-8">
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-slate-900">Where should we reach you?</h3>
            <p className="text-slate-500">Send your details and we will follow up about your accident. Photo upload is not available yet.</p>
          </div>

          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="hp_verify">Leave blank</label>
            <input
              id="hp_verify"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('hp_verify')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <Input {...register('name')} placeholder="John Doe" autoComplete="name" />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <Input {...register('email')} placeholder="john@example.com" type="email" autoComplete="email" />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Phone Number</label>
              <Input {...register('phone')} placeholder="(555) 123-4567" type="tel" autoComplete="tel" />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">State</label>
              <select
                {...register('state')}
                autoComplete="address-level1"
                className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <option value="">Select State</option>
                {STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Zip Code</label>
              <Input {...register('zip')} placeholder="12345" maxLength={10} autoComplete="postal-code" />
              {errors.zip && <p className="text-red-500 text-xs">{errors.zip.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Brief Description (Optional)</label>
            <textarea
              {...register('accidentDescription')}
              placeholder="Tell us what happened (e.g., 'I was rear-ended at a stoplight')"
              className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer">
              <input
                type="checkbox"
                {...register('consent')}
                className="mt-1 w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <span className="text-xs text-slate-500">
                By checking this box, I verify that I am over 18 and agree to the Terms of Service and Privacy Policy. I consent to be contacted about my accident by email and phone.
              </span>
            </label>
            {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm" role="alert">{errorMessage}</p>
          )}

          <div className="flex justify-end pt-6 border-t border-slate-100">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Sending <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
              ) : (
                <>Request a call back <Phone className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
