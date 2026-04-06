import { NextResponse } from "next/server"
import { ambilDaftarPejabat } from "@/lib/layanan-pejabat"

export async function GET() {
  try {
    const data = await ambilDaftarPejabat(true)
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil pejabat publik:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
