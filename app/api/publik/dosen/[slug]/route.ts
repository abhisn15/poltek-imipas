import { NextResponse } from "next/server"
import { ambilDosenBySlug } from "@/lib/layanan-dosen"

type KonteksRoute = { params: Promise<{ slug: string }> }

export async function GET(_: Request, context: KonteksRoute) {
  try {
    const { slug } = await context.params
    const data = await ambilDosenBySlug(slug)
    if (!data) return NextResponse.json({ message: "Dosen tidak ditemukan." }, { status: 404 })
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil detail dosen:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
