"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <button
      onClick={scrollTop}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-primary-foreground shadow-xl transition-all duration-300 hover:bg-gold hover:text-navy-dark ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      aria-label="Kembali ke atas"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
