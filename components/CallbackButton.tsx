'use client'

import React, { useState } from 'react'
import CallbackForm from './CallbackForm'

interface CallbackButtonProps {
  state?: string
  stateName?: string
  className?: string
  children: React.ReactNode
}

export default function CallbackButton({ state, stateName, className, children }: CallbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>
      <CallbackForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        state={state}
        stateName={stateName}
      />
    </>
  )
}
