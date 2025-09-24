'use client'

import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

const Home = () => {
  const searchParams = useSearchParams()
  const hasShownToast = useRef(false)
  
  useEffect(() => {
    console.log('searchParams', searchParams)
    const message = searchParams.get('message')
    if (message === 'check-email' && !hasShownToast.current) {
      console.log('message', message)
      hasShownToast.current = true
      toast.success('Check your email for a confirmation link!')
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <p>Welcome to your app!</p>
      </div>
    </div>
  )
}

export default Home