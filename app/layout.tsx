import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import SiteChrome from "@/components/site-chrome"

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
  title: "POLTEKIMIPAS - Politeknik Imigrasi dan Pemasyarakatan",
  description:
    "Politeknik Imigrasi dan Pemasyarakatan (Poltekimipas) merupakan perguruan tinggi kedinasan di bawah Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia yang menyelenggarakan pendidikan vokasi di bidang keimigrasian dan pemasyarakatan. Poltekimipas hadir sebagai hasil integrasi dari Politeknik Imigrasi (Poltekim) dan Politeknik Ilmu Pemasyarakatan (Poltekip), dengan tujuan mencetak sumber daya manusia yang profesional, berintegritas, dan kompeten dalam mendukung pelaksanaan tugas keimigrasian serta sistem pemasyarakatan di Indonesia. Melalui kurikulum berbasis praktik, disiplin tinggi, serta pembinaan karakter, Poltekimipas berkomitmen menghasilkan lulusan yang siap mengabdi kepada negara, menjunjung tinggi hukum, serta memberikan pelayanan publik yang prima.",
  keywords: [
    "POLTEKIMIPAS",
    "Politeknik Imigrasi dan Pemasyarakatan",
    "Politeknik Imigrasi",
    "Politeknik Pemasyarakatan",
    "Poltekim",
    "Poltekip",
    "Kementerian Hukum dan HAM",
    "Perguruan Tinggi Kedinasan",
    "Pendidikan Vokasi",
    "Imigrasi",
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
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
