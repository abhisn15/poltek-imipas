"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

import Navbar from "@/components/navbar"
import SearchOverlay from "@/components/search-overlay"
import RouteTransition from "@/components/route-transition"

const HIDDEN_PATHS = ["/login-user", "/admin"]

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  const showSiteNav = !HIDDEN_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )
  const butuhOffsetKonten = showSiteNav && pathname !== "/"

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
        <div className={butuhOffsetKonten ? "site-content-offset" : undefined}>{children}</div>
      </RouteTransition>
    </>
  )
}
