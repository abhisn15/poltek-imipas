import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import {
  buatSesiAdminBaru,
  DURASI_SESI_SATU_BULAN_DETIK,
  NAMA_COOKIE_SESI_ADMIN,
  validasiKredensialAdmin,
} from "@/lib/otentikasi-admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const identitas = String(body?.identitas ?? "").trim()
    const kataSandi = String(body?.kataSandi ?? "").trim()

    if (!identitas || !kataSandi) {
      return NextResponse.json(
        { message: "Identitas dan kata sandi wajib diisi." },
        { status: 400 },
      )
    }

    const admin = await validasiKredensialAdmin(identitas, kataSandi)
    if (!admin) {
      return NextResponse.json(
        { message: "Kredensial tidak valid." },
        { status: 401 },
      )
    }

    const ipPengguna = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null
    const agenPengguna = request.headers.get("user-agent") ?? null
    const sesi = await buatSesiAdminBaru({
      idAdmin: admin.idAdmin,
      ipPengguna,
      agenPengguna,
    })

    const response = NextResponse.json({
      message: "Login berhasil.",
      data: admin,
    })

    response.cookies.set({
      name: NAMA_COOKIE_SESI_ADMIN,
      value: sesi.tokenSesi,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: DURASI_SESI_SATU_BULAN_DETIK,
      expires: sesi.kedaluwarsa,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Gagal proses login admin:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
