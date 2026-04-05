import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilDetailBeritaPublik } from "@/lib/layanan-berita"

type KonteksRoute = {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, context: KonteksRoute) {
  try {
    const { slug } = await context.params
    const naikkanDilihat = request.nextUrl.searchParams.get("naikkanDilihat") !== "0"

    const data = await ambilDetailBeritaPublik(slug, { naikkanDilihat })
    if (!data) {
      return NextResponse.json({ message: "Berita tidak ditemukan." }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil detail berita publik:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
