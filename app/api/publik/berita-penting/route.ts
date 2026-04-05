import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilBeritaPentingNavbar } from "@/lib/layanan-berita"

export async function GET(request: NextRequest) {
  try {
    const batas = Number(request.nextUrl.searchParams.get("batas") ?? 6)
    const data = await ambilBeritaPentingNavbar(Number.isFinite(batas) ? batas : 6)
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil berita penting:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
