"use client"

import { useState, useEffect, useCallback } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

import SplashIntro from "@/components/splash-intro"
import AnnouncementTicker from "@/components/announcement-ticker"
import Hero from "@/components/hero"
import About from "@/components/about"
import Programs from "@/components/programs"
import News from "@/components/news"
import Blog from "@/components/blog"
import Journal from "@/components/journal"
import Library from "@/components/library"
import Announcements from "@/components/announcements"
import CookieBanner from "@/components/cookie-banner"
import BackToTop from "@/components/back-to-top"

const SPLASH_STORAGE_KEY = "poltekimipas:splash-seen"

export default function Home() {
  const [splashDone, setSplashDone] = useState(false)
  const [isSplashChecked, setIsSplashChecked] = useState(false)
  useScrollReveal()
  const showSplash = isSplashChecked && !splashDone

  // Show splash only on the first app open; skip it on subsequent visits.
  useEffect(() => {
    try {
      const hasSeenSplash = window.localStorage.getItem(SPLASH_STORAGE_KEY) === "1"
      setSplashDone(hasSeenSplash)
    } catch {
      setSplashDone(false)
    } finally {
      setIsSplashChecked(true)
    }
  }, [])

  // Lock scroll while splash is active
  useEffect(() => {
    if (showSplash) {
      document.body.classList.add("splash-active")
    } else {
      document.body.classList.remove("splash-active")
    }
    return () => document.body.classList.remove("splash-active")
  }, [showSplash])

  const handleSplashComplete = useCallback(() => {
    try {
      window.localStorage.setItem(SPLASH_STORAGE_KEY, "1")
    } catch {
      // no-op: if storage is blocked, fallback remains first-visit behavior
    }
    setSplashDone(true)
  }, [])

  return (
    <>
      {showSplash && <SplashIntro onComplete={handleSplashComplete} />}
      <main
        className="transition-opacity duration-700"
        style={{ opacity: showSplash ? 0 : 1 }}
      >
        <AnnouncementTicker />
        <Hero />
        <About />
        <News />
        <Announcements />
        <Blog />
        <Journal />
        <Library />
        <Programs />
        <CookieBanner />
        <BackToTop />
      </main>
    </>
  )
}
