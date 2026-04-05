import type { NextRequest } from "next/server"

import {
  ambilAdminDariTokenSesi,
  NAMA_COOKIE_SESI_ADMIN,
} from "@/lib/otentikasi-admin"

export async function ambilAdminTerotentikasi(request: NextRequest) {
  const tokenSesi = request.cookies.get(NAMA_COOKIE_SESI_ADMIN)?.value ?? null
  return ambilAdminDariTokenSesi(tokenSesi)
}
