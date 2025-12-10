'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import {
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle,
  Camera,
  Loader2,
  Mail,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

const FormSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(5, 'Zip code is required'),
  accidentDescription: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "You must agree to continue" }) }),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface UploadedPhoto {
  path: string
  url: string
  size: number
  filename: string
  id: string
}

const ProgressDots = ({ current, total }: { current: number; total: number }) => (
  <div className="flex justify-center space-x-2 mb-8">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "h-2 rounded-full transition-all duration-300",
          i + 1 === current ? "w-8 bg-brand-600" : "w-2 bg-slate-200",
          i + 1 < current ? "bg-brand-300" : ""
        )}
      />
    ))}
  </div>
)

export default function AnalyzerForm() {
  const [step, setStep] = useState(1)
  const [leadId, setLeadId] = useState<string>('')
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('analyzer_lead_id')
    if (stored) {
      setLeadId(stored)
    } else {
      const newId = uuidv4()
      setLeadId(newId)
      localStorage.setItem('analyzer_lead_id', newId)
    }
  }, [])

  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      consent: true
    }
  })

  const formValues = watch()

  const nextStep = async () => {
    if (step === 1 && photos.length === 0) {
      alert('Please upload at least one photo of your vehicle damage')
      return
    }
    if (step === 1) {
      setStep(2)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setStep(1)
    window.scrollTo(0, 0)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!leadId) return
    setIsUploading(true)

    const formData = new FormData()
    formData.append('leadId', leadId)
    acceptedFiles.forEach(file => {
      formData.append('photos', file)
    })

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (data.success && data.photos) {
        setPhotos(prev => [...prev, ...data.photos])
      }
    } catch (error) {
      console.error('Upload failed', error)
    } finally {
      setIsUploading(false)
    }
  }, [leadId])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/heic': []
    },
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024
  })

  const removePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id))
  }

  const onSubmit = async (data: FormSchemaType) => {
    if (photos.length === 0) {
      alert('Please upload at least one photo')
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        leadId,
        landingPage: '/ai-damage-analyzer',
        timestamp: new Date().toISOString(),
        formType: 'analyzer', // This tells the API to send user report
        accident_details: {
          rear_ended: 'not_sure',
          vehicle_type: 'unknown',
          date_range: 'unknown',
          concerns: ['AI Damage Analysis Request'],
          description: data.accidentDescription || ''
        },
        contact: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          state: data.state,
          zip: data.zip,
          consent: data.consent
        },
        photos: photos.map(p => ({
          url: p.url,
          filename: p.filename,
          size: p.size,
          path: p.path
        }))
      }

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setSuccess(true)
        localStorage.removeItem('analyzer_lead_id')
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
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
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Analysis in Progress!</h2>
        <div className="flex items-center justify-center gap-2 text-brand-600 mb-4">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">AI is analyzing your photos</span>
        </div>
        <p className="text-slate-600 mb-6">
          We're generating your personalized damage analysis report. You'll receive it at <strong>{formValues.email}</strong> within the next few minutes.
        </p>
        <div className="bg-slate-50 rounded-lg p-4 text-left text-sm text-slate-600">
          <p className="font-medium text-slate-900 mb-2">What to expect:</p>
          <ul className="space-y-1">
            <li>• Damage severity assessment</li>
            <li>• Liability analysis based on impact patterns</li>
            <li>• Estimated repair costs</li>
            <li>• Your options for next steps</li>
          </ul>
        </div>
        <p className="text-xs text-slate-400 mt-6">
          Check your spam folder if you don't see the email within 10 minutes.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-8 py-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-white/90 uppercase tracking-wide">
          AI Damage Analyzer
        </span>
        <span className="text-sm text-white/70">Step {step} of 2</span>
      </div>

      <div className="p-6 md:p-8">
        <ProgressDots current={step} total={2} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">Upload Your Accident Photos</h3>
                  <p className="text-slate-500">Clear photos help our AI provide a more accurate analysis</p>
                </div>

                <div
                  {...getRootProps()}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer",
                    isDragActive ? "border-brand-500 bg-brand-50" : "border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Click to upload or drag and drop</p>
                      <p className="text-sm text-slate-500 mt-1">JPG, PNG, HEIC (Max 10MB each)</p>
                    </div>
                  </div>
                </div>

                {isUploading && (
                  <div className="flex items-center justify-center text-brand-600 gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Uploading photos...</span>
                  </div>
                )}

                {photos.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-3">{photos.length} photo(s) uploaded</p>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {photos.map((photo, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-square">
                          <img src={photo.url} alt="Uploaded damage" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(photo.id)}
                            className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
                  <p className="font-medium text-slate-900 mb-2">Tips for best results:</p>
                  <ul className="space-y-1 text-slate-500">
                    <li>• Take photos in good lighting</li>
                    <li>• Include close-ups of all damaged areas</li>
                    <li>• Capture the overall vehicle showing impact location</li>
                    <li>• Include photos of the other vehicle if available</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">Where Should We Send Your Report?</h3>
                  <p className="text-slate-500">We'll email your detailed analysis within minutes</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <Input {...register('name')} placeholder="John Doe" />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <Input {...register('email')} placeholder="john@example.com" type="email" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <Input {...register('phone')} placeholder="(555) 123-4567" type="tel" />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">State</label>
                    <select
                      {...register('state')}
                      className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      <option value="">Select State</option>
                      {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Zip Code</label>
                    <Input {...register('zip')} placeholder="12345" maxLength={10} />
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
                      By checking this box, I verify that I am over 18 and agree to the Terms of Service and Privacy Policy. I consent to receive my damage analysis report and related communications via email.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}
                </div>

                <div className="bg-brand-50 rounded-lg p-4 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-brand-900">Your report will be emailed to you</p>
                    <p className="text-brand-700">Check your inbox (and spam folder) within 5-10 minutes</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-between pt-6 border-t border-slate-100">
            {step > 1 ? (
              <Button type="button" variant="ghost" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            ) : (
              <div></div>
            )}

            {step === 1 ? (
              <Button type="button" onClick={nextStep} size="lg" disabled={photos.length === 0}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Analyzing <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                ) : (
                  <>Get My Free Report <Sparkles className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
