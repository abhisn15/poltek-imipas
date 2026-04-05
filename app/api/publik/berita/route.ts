import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilDaftarBeritaPublik } from "@/lib/layanan-berita"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const kategori = searchParams.get("kategori") ?? undefined
    const cari = searchParams.get("cari") ?? undefined
    const halaman = Number(searchParams.get("halaman") ?? 1)
    const batas = Number(searchParams.get("batas") ?? 6)

    const data = await ambilDaftarBeritaPublik({
      kategori,
      cari,
      halaman: Number.isFinite(halaman) ? halaman : 1,
      batas: Number.isFinite(batas) ? batas : 6,
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil berita publik:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
