import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminDariTokenSesi, NAMA_COOKIE_SESI_ADMIN } from "@/lib/otentikasi-admin"

export async function GET(request: NextRequest) {
  try {
    const tokenSesi = request.cookies.get(NAMA_COOKIE_SESI_ADMIN)?.value ?? null
    const admin = await ambilAdminDariTokenSesi(tokenSesi)

    if (!admin) {
      return NextResponse.json(
        { message: "Sesi tidak ditemukan atau sudah kedaluwarsa." },
        { status: 401 },
      )
    }

    return NextResponse.json({ data: admin })
  } catch (error) {
    console.error("Gagal cek sesi admin:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
