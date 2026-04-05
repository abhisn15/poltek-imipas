import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"
import { ambilKategoriBerita, tambahKategoriBerita } from "@/lib/layanan-berita"

export async function GET(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json(
        { message: "Akses ditolak. Silakan login sebagai admin." },
        { status: 401 },
      )
    }

    const data = await ambilKategoriBerita()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil kategori berita:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json(
        { message: "Akses ditolak. Silakan login sebagai admin." },
        { status: 401 },
      )
    }

    const body = await request.json().catch(() => null)
    const namaKategori = String(body?.namaKategori ?? "").trim()

    if (!namaKategori) {
      return NextResponse.json(
        { message: "Nama kategori wajib diisi." },
        { status: 400 },
      )
    }

    const data = await tambahKategoriBerita(namaKategori)
    return NextResponse.json(
      {
        message: "Kategori berhasil ditambahkan.",
        data,
      },
      { status: 201 },
    )
  } catch (error) {
    const pesan = error instanceof Error ? error.message : "Terjadi kesalahan pada server."
    console.error("Gagal tambah kategori berita:", error)
    return NextResponse.json({ message: pesan }, { status: 500 })
  }
}
