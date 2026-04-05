import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import {
  hapusSesiAdmin,
  NAMA_COOKIE_SESI_ADMIN,
} from "@/lib/otentikasi-admin"

export async function POST(request: NextRequest) {
  try {
    const tokenSesi = request.cookies.get(NAMA_COOKIE_SESI_ADMIN)?.value ?? null
    await hapusSesiAdmin(tokenSesi)

    const response = NextResponse.json({ message: "Logout berhasil." })
    response.cookies.set({
      name: NAMA_COOKIE_SESI_ADMIN,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      expires: new Date(0),
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Gagal logout admin:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
