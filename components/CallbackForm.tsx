'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

const FormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  accidentDetails: z.string().min(10, 'Please provide some details about your accident'),
  state: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface CallbackFormProps {
  isOpen: boolean
  onClose: () => void
  state?: string
  stateName?: string
}

export default function CallbackForm({ isOpen, onClose, state, stateName }: CallbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      state: state || '',
    }
  })

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const onSubmit = async (data: FormSchemaType) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          state: state || data.state,
          stateName: stateName,
          source: 'callback_form',
          timestamp: new Date().toISOString(),
        })
      })

      const result = await res.json()

      if (res.ok && result.success) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setSubmitStatus('idle')
    setErrorMessage('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Request a Call Back</h2>
              {stateName && (
                <p className="text-sm text-brand-100">{stateName} Accident Help</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Request Received!</h3>
              <p className="text-slate-600 mb-6">
                We'll call you back as soon as possible to discuss your accident case.
              </p>
              <Button onClick={handleClose}>Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <p className="text-sm text-slate-600 mb-4">
                Fill out this quick form and we'll connect you with an experienced accident professional who can help with your claim.
              </p>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register('name')}
                  placeholder="John Smith"
                  className={cn(errors.name && 'border-red-500')}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register('phone')}
                  type="tel"
                  placeholder="(555) 123-4567"
                  className={cn(errors.phone && 'border-red-500')}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>

              {/* Email (optional) */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Email <span className="text-slate-400">(optional)</span>
                </label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="john@example.com"
                  className={cn(errors.email && 'border-red-500')}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Accident Details */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Tell us about your accident <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('accidentDetails')}
                  placeholder="When did it happen? What type of collision? Any injuries?"
                  rows={3}
                  className={cn(
                    "flex w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    errors.accidentDetails && 'border-red-500'
                  )}
                />
                {errors.accidentDetails && (
                  <p className="text-red-500 text-xs">{errors.accidentDetails.message}</p>
                )}
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4 mr-2" />
                    Request Call Back
                  </>
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                By submitting, you agree to our Privacy Policy and consent to be contacted about your case.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
