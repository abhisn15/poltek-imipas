import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"
import { ambilSemuaBeritaAdmin, tambahBerita } from "@/lib/layanan-berita"
import { ekstrakTeksDariHtml, sanitasiHtmlBerita } from "@/lib/sanitasi-html-berita"
import { parseDaftarTag } from "@/lib/teks"

function parseBooleanNilai(input: unknown): boolean {
  if (typeof input === "boolean") {
    return input
  }
  if (typeof input === "string") {
    return input === "true" || input === "1"
  }
  if (typeof input === "number") {
    return input === 1
  }
  return false
}

export async function GET(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json(
        { message: "Akses ditolak. Silakan login sebagai admin." },
        { status: 401 },
      )
    }

    const data = await ambilSemuaBeritaAdmin()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil berita admin:", error)
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
    const judul = String(body?.judul ?? "").trim()
    const ringkasan = String(body?.ringkasan ?? "").trim()
    const isiPenuhMentah = String(body?.isiPenuh ?? "").trim()
    const isiPenuh = sanitasiHtmlBerita(isiPenuhMentah)
    const kategori = String(body?.kategori ?? "").trim()
    const penulis = String(body?.penulis ?? "").trim() || admin.namaLengkap

    if (!judul || !ringkasan || !ekstrakTeksDariHtml(isiPenuh) || !kategori) {
      return NextResponse.json(
        { message: "Judul, ringkasan, isi, dan kategori wajib diisi." },
        { status: 400 },
      )
    }

    const beritaBaru = await tambahBerita({
      judul,
      ringkasan,
      isiPenuh,
      kategori,
      penulis,
      gambarUrl: String(body?.gambarUrl ?? "").trim() || null,
      tagList: parseDaftarTag(body?.tagList),
      estimasiBacaMenit: Math.max(1, Number(body?.estimasiBacaMenit ?? 4)),
      adalahPenting: parseBooleanNilai(body?.adalahPenting),
      prioritasPenting: Number(body?.prioritasPenting ?? 0),
      statusPublikasi: body?.statusPublikasi === "draft" ? "draft" : "terbit",
      tanggalTerbit: String(body?.tanggalTerbit ?? "").trim() || undefined,
    })

    return NextResponse.json(
      {
        message: "Berita berhasil dibuat.",
        data: beritaBaru,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Gagal buat berita:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
