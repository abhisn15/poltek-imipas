"use client"

import { useState, useEffect, useCallback } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

import SplashIntro from "@/components/splash-intro"
import Navbar from "@/components/navbar"
import AnnouncementTicker from "@/components/announcement-ticker"
import Hero from "@/components/hero"
import About from "@/components/about"
import Programs from "@/components/programs"
import News from "@/components/news"
import Blog from "@/components/blog"
import Journal from "@/components/journal"
import Library from "@/components/library"
import Gallery from "@/components/gallery"
import Announcements from "@/components/announcements"
import Footer from "@/components/footer"
import SearchOverlay from "@/components/search-overlay"
import CookieBanner from "@/components/cookie-banner"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  useScrollReveal()

  // Lock scroll while splash is active
  useEffect(() => {
    if (!splashDone) {
      document.body.classList.add("splash-active")
    } else {
      document.body.classList.remove("splash-active")
    }
    return () => document.body.classList.remove("splash-active")
  }, [splashDone])

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true)
  }, [])

  return (
    <>
      {!splashDone && <SplashIntro onComplete={handleSplashComplete} />}
      <main
        className="transition-opacity duration-700"
        style={{ opacity: splashDone ? 1 : 0 }}
      >
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
        <AnnouncementTicker />
        <Hero />
        <About />
        <Programs />
        <News />
        <Blog />
        <Journal />
        <Library />
        <Gallery />
        <Announcements />
        <Footer />
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        <CookieBanner />
        <BackToTop />
      </main>
    </>
  )
}
