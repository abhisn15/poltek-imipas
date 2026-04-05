import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"
import { ambilRingkasanDashboard } from "@/lib/layanan-berita"
import { bersihkanSesiKadaluarsa } from "@/lib/otentikasi-admin"

export async function GET(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json(
        { message: "Akses ditolak. Silakan login sebagai admin." },
        { status: 401 },
      )
    }

    // housekeeping ringan agar tabel sesi tetap bersih
    await bersihkanSesiKadaluarsa()

    const data = await ambilRingkasanDashboard()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil ringkasan dashboard:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
