import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Portal Masuk - POLTEKIMIPAS",
  description:
    "Masuk ke portal layanan POLTEKIMIPAS - Politeknik Imigrasi Pemasyarakatan, Kementerian Imigrasi dan Pemasyarakatan RI.",
  robots: { index: false, follow: false },
}

export default function LoginUserLayout({ children }: { children: ReactNode }) {
  return children
}
