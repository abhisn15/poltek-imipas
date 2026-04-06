import { NextResponse } from "next/server"
import { ambilDaftarDosen } from "@/lib/layanan-dosen"

export async function GET() {
  try {
    const data = await ambilDaftarDosen(true)
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil dosen publik:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
