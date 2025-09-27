'use server'

import { createClient } from '../../utils/server'

export async function verifyResetToken(token: string) {
  console.log('verifyResetToken called with token:', token)
  const supabase = await createClient()

  const { error } = await supabase.auth.verifyOtp({
    type: 'recovery',
    token_hash: token,
  })

  console.log('verifyOtp result:', { error: error?.message, hasError: !!error })
  return { isValid: !error, error: error?.message }
}

export async function resetPassword(formData: FormData, token: string) {
  const supabase = await createClient()
  
  const password = formData.get('password') as string


  if (!password || !token) {
    return { success: false, error: 'Missing password or token' }
  }

  // Verify token first
  const { error: verifyError } = await supabase.auth.verifyOtp({
    type: 'recovery',
    token_hash: token,
  })

  if (verifyError) {
    return { success: false, error: 'Invalid or expired token' }
  }

  // Update password
  const { error: updateError } = await supabase.auth.updateUser({
    password: password
  })

  if (updateError) {
    return { success: false, error: updateError.message }
  }

  return { success: true }
}

export async function requestReset(formData: FormData) {
}