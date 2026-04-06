import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"
import { ambilDaftarDosen, buatDosen } from "@/lib/layanan-dosen"

export async function GET(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) return NextResponse.json({ message: "Akses ditolak." }, { status: 401 })
    const data = await ambilDaftarDosen(false)
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil dosen:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) return NextResponse.json({ message: "Akses ditolak." }, { status: 401 })

    const body = await request.json().catch(() => null)
    if (!body?.nama?.trim() || !body?.jabatan?.trim()) {
      return NextResponse.json({ message: "Nama dan jabatan wajib diisi." }, { status: 400 })
    }
    const data = await buatDosen({
      nama: body.nama,
      gelar: body.gelar,
      jabatan: body.jabatan,
      bidangKeahlianList: Array.isArray(body.bidangKeahlianList) ? body.bidangKeahlianList : [],
      deskripsi: body.deskripsi,
      email: body.email,
      ruang: body.ruang,
      fotoUrl: body.fotoUrl,
      jurnalList: Array.isArray(body.jurnalList) ? body.jurnalList : [],
      aktif: body.aktif !== undefined ? Boolean(body.aktif) : true,
      urutan: body.urutan !== undefined ? Number(body.urutan) : 99,
    })
    return NextResponse.json({ message: "Dosen berhasil ditambahkan.", data }, { status: 201 })
  } catch (error) {
    console.error("Gagal buat dosen:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
