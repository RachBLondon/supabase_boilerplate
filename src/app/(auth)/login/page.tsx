'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { login, signup, requestPasswordReset } from "./actions";
import { EmailPasswordForm } from "@/app/components/EmailPasswordForm";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [requestReset, setRequestReset] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAuth = async (formData: FormData) => {
    setError(null)
    const action = isSignUp ? signup : login
    const result = await action(formData)
    
    if (result && !result.success) {
      console.log('Auth error:', result.error)
      setError(result.error)
      toast.error(result.error)
    }
  }

  return (
    <>
      <h1>{isSignUp ? 'Sign Up' : 'Log In'}</h1>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <EmailPasswordForm 
        buttonAction={handleAuth} 
        text={isSignUp ? 'Sign up' : 'Log in'} 
      />
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
      </button>

      <button onClick={() => setRequestReset(true)}>Forgot Password?</button>
      {requestReset && (
        <div>
          <h2>Request Reset</h2>
           <EmailPasswordForm 
             buttonAction={requestPasswordReset} 
             text="Request Reset" 
             noPassword={true}
           />
        </div>
      )}
    </>
  );
}
