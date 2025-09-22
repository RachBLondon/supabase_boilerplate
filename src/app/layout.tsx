// app/layout.tsx (Server Component)
import "./globals.css"
// import { getSession } from "@/lib/auth" // your server fn
import Navbar from "./components/Navbar"

// Reading cookies() or headers() already makes this segment dynamic.
// If you prefer, you can be explicit:
// export const dynamic = "force-dynamic"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const session = await getSession() // { user?: { id, name, image }, expires?: string }

  return (
    <html lang="en">
      <body>
        {/* Pass only what you need (never raw tokens) */}
        <Navbar user={{ name: "User" }} />
        {children}
      </body>
    </html>
  )
}