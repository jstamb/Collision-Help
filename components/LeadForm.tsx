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
  Upload, 
  X, 
  CheckCircle, 
  Car, 
  Truck, 
  AlertTriangle, 
  ShieldCheck,
  Calendar,
  Camera,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn, formatFileSize } from '@/lib/utils'

// --- Types & Schemas ---

const Step1Schema = z.object({
  rearEnded: z.enum(['yes', 'no', 'not_sure']),
  vehicleType: z.string().min(1, 'Please select a vehicle type'),
})

const Step3Schema = z.object({
  concerns: z.array(z.string()).min(1, 'Please select at least one concern'),
  dateRange: z.string().min(1, 'Please select when this happened'),
})

const Step4Schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(5, 'Zip code is required'),
  bestTime: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "You must agree to continue" }) }),
})

// Combined Schema for Validation
const CombinedSchema = Step1Schema.merge(Step3Schema).merge(Step4Schema)

type FormSchemaType = z.infer<typeof CombinedSchema>

interface UploadedPhoto {
  path: string
  url: string
  size: number
  filename: string
  id: string
}

// --- Components ---

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

export default function LeadForm({ defaultState }: { defaultState?: string }) {
  const [step, setStep] = useState(1)
  const [leadId, setLeadId] = useState<string>('')
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Initialize Lead ID
  useEffect(() => {
    const stored = localStorage.getItem('mva_lead_id')
    if (stored) {
      setLeadId(stored)
    } else {
      const newId = uuidv4()
      setLeadId(newId)
      localStorage.setItem('mva_lead_id', newId)
    }
  }, [])

  // Form State using Combined Schema
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm<FormSchemaType>({
    resolver: zodResolver(CombinedSchema),
    defaultValues: {
      concerns: [],
      state: defaultState || '',
      consent: true
    }
  })

  const formValues = watch()

  // Navigation Logic
  const nextStep = async () => {
    let isValid = false
    if (step === 1) isValid = await trigger(['rearEnded', 'vehicleType'])
    if (step === 2) isValid = true // Photos are optional
    if (step === 3) isValid = await trigger(['concerns', 'dateRange'])
    
    if (isValid) {
      setStep(s => s + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setStep(s => s - 1)
    window.scrollTo(0, 0)
  }

  // Photo Upload Handler
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
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const removePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id))
  }

  // Final Submission
  const onSubmit = async (data: FormSchemaType) => {
    setIsSubmitting(true)
    try {
      const payload = {
        leadId,
        landingPage: window.location.pathname,
        timestamp: new Date().toISOString(),
        accident_details: {
          rear_ended: data.rearEnded,
          vehicle_type: data.vehicleType,
          date_range: data.dateRange,
          concerns: data.concerns,
        },
        contact: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          state: data.state,
          zip: data.zip,
          best_time: data.bestTime,
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
        localStorage.removeItem('mva_lead_id') // Clear session
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
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Request Received</h2>
        <p className="text-slate-600 mb-8">
          Thank you, {formValues.name}. We have received your details and photos. An expert will review your case and contact you at {formValues.phone} shortly.
        </p>
        <Button onClick={() => window.location.reload()}>Return Home</Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
          Case Evaluation
        </span>
        <span className="text-sm text-slate-400">Step {step} of 4</span>
      </div>

      <div className="p-6 md:p-8">
        <ProgressDots current={step} total={4} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-lg font-medium text-slate-900 block">
                    Were you hit from behind?
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {['yes', 'no', 'not_sure'].map((opt) => (
                      <label 
                        key={opt}
                        className={cn(
                          "cursor-pointer border rounded-xl p-4 text-center hover:bg-slate-50 transition-all",
                          watch('rearEnded') === opt 
                            ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500" 
                            : "border-slate-200"
                        )}
                      >
                        <input 
                          type="radio" 
                          value={opt} 
                          {...register('rearEnded')} 
                          className="sr-only" 
                        />
                        <span className="capitalize font-medium text-slate-700">
                          {opt.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.rearEnded && <p className="text-red-500 text-sm">{errors.rearEnded.message}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-medium text-slate-900 block">
                    What type of vehicle hit you?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'car', label: 'Car', icon: Car },
                      { id: 'truck', label: 'Truck/SUV', icon: Truck },
                      { id: 'commercial', label: 'Commercial', icon: ShieldCheck },
                      { id: 'other', label: 'Other', icon: AlertTriangle }
                    ].map(({ id, label, icon: Icon }) => (
                      <label 
                        key={id}
                        className={cn(
                          "cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 hover:bg-slate-50 transition-all",
                          watch('vehicleType') === id 
                            ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500" 
                            : "border-slate-200"
                        )}
                      >
                        <input 
                          type="radio" 
                          value={id} 
                          {...register('vehicleType')} 
                          className="sr-only" 
                        />
                        <Icon className={cn("w-8 h-8", watch('vehicleType') === id ? "text-brand-600" : "text-slate-400")} />
                        <span className="text-sm font-medium text-slate-700">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType.message}</p>}
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
                  <h3 className="text-xl font-semibold text-slate-900">Upload Accident Photos</h3>
                  <p className="text-slate-500">Photos of vehicle damage increase your claim success rate.</p>
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
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Click to upload or drag and drop</p>
                      <p className="text-sm text-slate-500 mt-1">JPG, PNG, HEIC (Max 10MB)</p>
                    </div>
                  </div>
                </div>

                {isUploading && (
                  <div className="flex items-center justify-center text-brand-600 gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Uploading secure photos...</span>
                  </div>
                )}

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200">
                        <img src={photo.url} alt="Uploaded evidence" className="w-full h-24 object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-lg font-medium text-slate-900 block">
                    What is your biggest concern right now?
                  </label>
                  <div className="space-y-3">
                    {[
                      "Getting my car repaired properly",
                      "Insurance says my car is totaled",
                      "Insurance is taking too long",
                      "I may have been injured",
                      "Other"
                    ].map((concern) => (
                      <label key={concern} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input
                          type="checkbox"
                          value={concern}
                          {...register('concerns')}
                          className="w-5 h-5 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                        />
                        <span className="text-slate-700">{concern}</span>
                      </label>
                    ))}
                  </div>
                  {errors.concerns && <p className="text-red-500 text-sm">{errors.concerns.message}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-medium text-slate-900 block">
                    When did the accident happen?
                  </label>
                  <select
                    {...register('dateRange')}
                    className="w-full h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <option value="">Select timeframe...</option>
                    <option value="today">Today</option>
                    <option value="this_week">This Week</option>
                    <option value="this_month">This Month</option>
                    <option value="older">Over a month ago</option>
                  </select>
                  {errors.dateRange && <p className="text-red-500 text-sm">{errors.dateRange.message}</p>}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <Input {...register('name')} placeholder="John Doe" />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <Input {...register('phone')} placeholder="(555) 123-4567" type="tel" />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <Input {...register('email')} placeholder="john@example.com" type="email" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
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
                   <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer">
                     <input 
                        type="checkbox" 
                        {...register('consent')}
                        className="mt-1 w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                      />
                      <span className="text-xs text-slate-500">
                        By checking this box, I verify that I am over 18 and agree to the Terms of Service and Privacy Policy. I consent to receive emails, calls, and text messages from Collision Help and its network of partners at the number provided.
                      </span>
                   </label>
                   {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}
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
            
            {step < 4 ? (
              <Button type="button" onClick={nextStep} size="lg">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Processing <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                ) : (
                  <>Get Help Now <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}