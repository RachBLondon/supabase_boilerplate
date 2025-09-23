import Link from "next/link"
import { logout } from "../(auth)/logout/actions"
// import { MobileMenuButton } from "./navbar.client"

export function Navbar({ user }: { user: { name?: string } | null }) {
  return (
    <header className="px-4 py-3 flex items-center justify-between">
      <Link href="/">Brand</Link>
      <nav className="flex gap-4">
        {user ? (
            <>
            <Link href="/profile">Profile</Link>
            <Link href="/practice">Practice</Link>
            <Link href="/progress">Progress</Link>
            <Link href="/materials">Materials</Link>
            <form action={logout}>
              <button type="submit">Log out</button>
            </form>
          </>
        ) : (
          <Link href="/login">Log in</Link>
        )}
      </nav>
      {/* <MobileMenuButton /> */}
    </header>
  )
}

export default Navbar;