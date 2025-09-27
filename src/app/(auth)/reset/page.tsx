'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { EmailPasswordForm } from '@/app/components/EmailPasswordForm'
import { verifyResetToken, resetPassword } from './reset'

const Reset = () => {
  const searchParams = useSearchParams()
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)


  const handleReset = async (formData: FormData) => {
    const token = searchParams.get('token')
    if (!token) return

    formData.append('token', token)
    const result = await resetPassword(formData, token)
    
    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.error || 'Failed to reset password')
    }
  }

  if (success) {
    return <div>Password reset successfully! You can now log in.</div>
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <EmailPasswordForm buttonAction={handleReset} text="Reset Password"/>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}

export default Reset