"use client"

import { useState, useEffect } from "react"
import { X, Cookie } from "lucide-react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("cookie-dismissed")
      if (!dismissed) setVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem("cookie-dismissed", "true")
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg animate-fade-in-up rounded-xl border border-border bg-card p-4 shadow-2xl sm:left-4 sm:right-auto">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="mb-3 text-sm leading-relaxed text-foreground">
            Website ini menggunakan cookie untuk pengalaman terbaik. Dengan melanjutkan, Anda menyetujui penggunaan cookie.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={dismiss}
              className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-navy-light"
            >
              Terima
            </button>
            <button
              onClick={dismiss}
              className="rounded-lg px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Tolak
            </button>
          </div>
        </div>
        <button
          onClick={dismiss}
          className="self-start text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
