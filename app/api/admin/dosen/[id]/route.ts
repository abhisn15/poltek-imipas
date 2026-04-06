import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"
import { perbaruiDosen, hapusDosen } from "@/lib/layanan-dosen"

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
    const idDosen = parseId(id)
    if (!idDosen) return NextResponse.json({ message: "ID tidak valid." }, { status: 400 })

    const body = await request.json().catch(() => null)
    const data = await perbaruiDosen(idDosen, {
      nama: body?.nama,
      gelar: body?.gelar,
      jabatan: body?.jabatan,
      bidangKeahlianList: Array.isArray(body?.bidangKeahlianList) ? body.bidangKeahlianList : undefined,
      deskripsi: body?.deskripsi,
      email: body?.email,
      ruang: body?.ruang,
      fotoUrl: body?.fotoUrl,
      jurnalList: Array.isArray(body?.jurnalList) ? body.jurnalList : undefined,
      aktif: body?.aktif !== undefined ? Boolean(body.aktif) : undefined,
      urutan: body?.urutan !== undefined ? Number(body.urutan) : undefined,
    })
    if (!data) return NextResponse.json({ message: "Dosen tidak ditemukan." }, { status: 404 })
    return NextResponse.json({ message: "Dosen berhasil diperbarui.", data })
  } catch (error) {
    console.error("Gagal perbarui dosen:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: KonteksRoute) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) return NextResponse.json({ message: "Akses ditolak." }, { status: 401 })

    const { id } = await context.params
    const idDosen = parseId(id)
    if (!idDosen) return NextResponse.json({ message: "ID tidak valid." }, { status: 400 })

    const berhasil = await hapusDosen(idDosen)
    if (!berhasil) return NextResponse.json({ message: "Dosen tidak ditemukan." }, { status: 404 })
    return NextResponse.json({ message: "Dosen berhasil dihapus." })
  } catch (error) {
    console.error("Gagal hapus dosen:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
