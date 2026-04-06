import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"
import { ambilDaftarPejabat, buatPejabat } from "@/lib/layanan-pejabat"

export async function GET(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json({ message: "Akses ditolak." }, { status: 401 })
    }
    const data = await ambilDaftarPejabat(false)
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil pejabat:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json({ message: "Akses ditolak." }, { status: 401 })
    }
    const body = await request.json().catch(() => null)
    if (!body?.nama?.trim() || !body?.jabatan?.trim()) {
      return NextResponse.json({ message: "Nama dan jabatan wajib diisi." }, { status: 400 })
    }
    const data = await buatPejabat({
      nama: body.nama,
      jabatan: body.jabatan,
      singkatan: body.singkatan,
      email: body.email,
      telepon: body.telepon,
      bidangList: Array.isArray(body.bidangList) ? body.bidangList : [],
      fotoUrl: body.fotoUrl,
      urutan: body.urutan !== undefined ? Number(body.urutan) : 99,
      aktif: body.aktif !== undefined ? Boolean(body.aktif) : true,
    })
    return NextResponse.json({ message: "Pejabat berhasil ditambahkan.", data }, { status: 201 })
  } catch (error) {
    console.error("Gagal buat pejabat:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
