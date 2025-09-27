'use client'

import { useState } from 'react'
import { login, signup, requestPasswordReset } from "./actions";
import { EmailPasswordForm } from "@/app/components/EmailPasswordForm";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [requestReset, setRequestReset] = useState(false)

  return (
    <>
      <h1>{isSignUp ? 'Sign Up' : 'Log In'}</h1>
      <EmailPasswordForm 
        buttonAction={isSignUp ? signup : login} 
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
