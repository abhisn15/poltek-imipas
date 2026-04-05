import { NextResponse } from "next/server"

import { ambilKategoriBerita } from "@/lib/layanan-berita"

export async function GET() {
  try {
    const data = await ambilKategoriBerita()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil kategori berita publik:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
