import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "POLTEKIMIPAS - Politeknik Ilmu Pemasyarakatan",
  description:
    "Politeknik Ilmu Pemasyarakatan (POLTEKIMIPAS) - Perguruan Tinggi Vokasi di bawah Kementerian Imigrasi dan Pemasyarakatan RI. Cerdas, Berintegritas, Berdedikasi.",
  keywords: [
    "POLTEKIMIPAS",
    "Politeknik Ilmu Pemasyarakatan",
    "Kemenimipas",
    "Perguruan Tinggi",
    "Pemasyarakatan",
  ],
}

export const viewport: Viewport = {
  themeColor: "#1B3A6B",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
