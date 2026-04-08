import { NextResponse } from "next/server"

import { ambilStatistikBeranda } from "@/lib/layanan-statistik-beranda"

export async function GET() {
  try {
    const data = await ambilStatistikBeranda()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal mengambil statistik beranda publik:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
