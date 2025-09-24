// app/layout.tsx (Server Component)
import "./globals.css"
import Navbar from "./components/Navbar"
import { createClient } from "./utils/server"
import { Toaster } from "sonner"

// Reading cookies() or headers() already makes this segment dynamic.
// If you prefer, you can be explicit:
// export const dynamic = "force-dynamic"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body>
        {/* Pass only what you need (never raw tokens) */}
        <Navbar user={user ? { name: user.email } : null} />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}