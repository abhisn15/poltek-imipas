"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SearchOverlay from "@/components/search-overlay"
import RouteTransition from "@/components/route-transition"

const HIDDEN_PATHS = ["/login-user", "/admin"]

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    // Catat pengunjung jika belum ada di session storage
    if (!sessionStorage.getItem("has_visited")) {
      fetch("/api/publik/visit", { method: "POST" })
        .then((res) => {
          if (res.ok) {
            sessionStorage.setItem("has_visited", "true")
          }
        })
        .catch((err) => console.error("Gagal mencatat kunjungan", err))
    }
  }, [])

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
