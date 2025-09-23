import React from 'react'
import { createClient } from '../../utils/server'



export default async function Profile() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return <p>Not logged in </p>
  }
  return <p>Hello {data.user.email}</p>
}
