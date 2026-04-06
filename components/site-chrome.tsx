"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SearchOverlay from "@/components/search-overlay"
import RouteTransition from "@/components/route-transition"

const HIDDEN_PATHS = ["/login-user", "/admin"]

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  const showSiteNav = !HIDDEN_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )

  return (
    <>
      {showSiteNav && (
        <>
          <Navbar
            onSearchOpen={() => setSearchOpen(true)}
            suspendScrollHide={searchOpen}
          />
          <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
      )}
      <RouteTransition>
        <div>{children}</div>
      </RouteTransition>
      {showSiteNav && <Footer />}
    </>
  )
}
