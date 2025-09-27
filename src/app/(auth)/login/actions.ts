'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../utils/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: signupData, error } = await supabase.auth.signUp(data)

  if (error) {
    console.log('Supabase error details:', error.message, error.status)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/?message=check-email')
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  
  if (!email) {
    redirect('/error?message=email-required')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset`,
  })

  if (error) {
    console.log('Password reset error:', error.message)
    redirect('/error?message=reset-failed')
  }

  revalidatePath('/', 'layout')
  redirect('/?message=reset-email-sent')
}