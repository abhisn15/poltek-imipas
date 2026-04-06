import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"
import { perbaruiPejabat, hapusPejabat } from "@/lib/layanan-pejabat"

type KonteksRoute = { params: Promise<{ id: string }> }

function parseId(input: string): number | null {
  const n = Number(input)
  return Number.isInteger(n) && n > 0 ? n : null
}

export async function PATCH(request: NextRequest, context: KonteksRoute) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) return NextResponse.json({ message: "Akses ditolak." }, { status: 401 })

    const { id } = await context.params
    const idPejabat = parseId(id)
    if (!idPejabat) return NextResponse.json({ message: "ID tidak valid." }, { status: 400 })

    const body = await request.json().catch(() => null)
    const data = await perbaruiPejabat(idPejabat, {
      nama: body?.nama,
      jabatan: body?.jabatan,
      singkatan: body?.singkatan,
      email: body?.email,
      telepon: body?.telepon,
      bidangList: Array.isArray(body?.bidangList) ? body.bidangList : undefined,
      fotoUrl: body?.fotoUrl,
      urutan: body?.urutan !== undefined ? Number(body.urutan) : undefined,
      aktif: body?.aktif !== undefined ? Boolean(body.aktif) : undefined,
    })

    if (!data) return NextResponse.json({ message: "Pejabat tidak ditemukan." }, { status: 404 })
    return NextResponse.json({ message: "Pejabat berhasil diperbarui.", data })
  } catch (error) {
    console.error("Gagal perbarui pejabat:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: KonteksRoute) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) return NextResponse.json({ message: "Akses ditolak." }, { status: 401 })

    const { id } = await context.params
    const idPejabat = parseId(id)
    if (!idPejabat) return NextResponse.json({ message: "ID tidak valid." }, { status: 400 })

    const berhasil = await hapusPejabat(idPejabat)
    if (!berhasil) return NextResponse.json({ message: "Pejabat tidak ditemukan." }, { status: 404 })
    return NextResponse.json({ message: "Pejabat berhasil dihapus." })
  } catch (error) {
    console.error("Gagal hapus pejabat:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
