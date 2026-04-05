"use client"

import { usePathname } from "next/navigation"

interface RouteTransitionProps {
  children: React.ReactNode
}

const NO_TRANSITION_PATHS = new Set(["/"])

export default function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname() ?? "/"

  if (NO_TRANSITION_PATHS.has(pathname)) {
    return <>{children}</>
  }

  return (
    <div className="route-transition-shell">
      <div
        key={`route-accent-${pathname}`}
        className="route-transition-accent"
        aria-hidden="true"
      >
        <span className="route-transition-brand">POLTEKIMIPAS</span>
      </div>

      <div key={`route-content-${pathname}`} className="route-transition-content">
        {children}
      </div>
    </div>
  )
}
