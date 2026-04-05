import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"
import { hapusBerita, perbaruiBerita } from "@/lib/layanan-berita"
import { ekstrakTeksDariHtml, sanitasiHtmlBerita } from "@/lib/sanitasi-html-berita"
import { parseDaftarTag } from "@/lib/teks"

type KonteksRoute = {
  params: Promise<{ id: string }>
}

function parseId(input: string): number | null {
  const hasil = Number(input)
  if (!Number.isInteger(hasil) || hasil <= 0) {
    return null
  }
  return hasil
}

function parseBooleanNilai(input: unknown): boolean | undefined {
  if (input === undefined || input === null || input === "") {
    return undefined
  }
  if (typeof input === "boolean") {
    return input
  }
  if (typeof input === "number") {
    return input === 1
  }
  if (typeof input === "string") {
    return input === "true" || input === "1"
  }
  return undefined
}

export async function DELETE(request: NextRequest, context: KonteksRoute) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json(
        { message: "Akses ditolak. Silakan login sebagai admin." },
        { status: 401 },
      )
    }

    const { id } = await context.params
    const idBerita = parseId(id)
    if (!idBerita) {
      return NextResponse.json({ message: "ID berita tidak valid." }, { status: 400 })
    }

    const berhasil = await hapusBerita(idBerita)
    if (!berhasil) {
      return NextResponse.json({ message: "Berita tidak ditemukan." }, { status: 404 })
    }

    return NextResponse.json({ message: "Berita berhasil dihapus." })
  } catch (error) {
    console.error("Gagal hapus berita:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest, context: KonteksRoute) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json(
        { message: "Akses ditolak. Silakan login sebagai admin." },
        { status: 401 },
      )
    }

    const { id } = await context.params
    const idBerita = parseId(id)
    if (!idBerita) {
      return NextResponse.json({ message: "ID berita tidak valid." }, { status: 400 })
    }

    const body = await request.json().catch(() => null)
    const isiPenuhMentah = typeof body?.isiPenuh === "string" ? body.isiPenuh.trim() : undefined
    const isiPenuhTersanitasi =
      isiPenuhMentah === undefined ? undefined : sanitasiHtmlBerita(isiPenuhMentah)

    if (isiPenuhTersanitasi !== undefined && !ekstrakTeksDariHtml(isiPenuhTersanitasi)) {
      return NextResponse.json(
        { message: "Isi berita tidak boleh kosong." },
        { status: 400 },
      )
    }

    const dataBaru = await perbaruiBerita(idBerita, {
      judul: typeof body?.judul === "string" ? body.judul.trim() : undefined,
      ringkasan: typeof body?.ringkasan === "string" ? body.ringkasan.trim() : undefined,
      isiPenuh: isiPenuhTersanitasi,
      kategori: typeof body?.kategori === "string" ? body.kategori.trim() : undefined,
      penulis: typeof body?.penulis === "string" ? body.penulis.trim() : undefined,
      gambarUrl: typeof body?.gambarUrl === "string" ? body.gambarUrl.trim() : undefined,
      tagList: body?.tagList ? parseDaftarTag(body.tagList) : undefined,
      estimasiBacaMenit:
        body?.estimasiBacaMenit === undefined ? undefined : Math.max(1, Number(body.estimasiBacaMenit)),
      adalahPenting: parseBooleanNilai(body?.adalahPenting),
      prioritasPenting:
        body?.prioritasPenting === undefined ? undefined : Number(body.prioritasPenting),
      statusPublikasi:
        body?.statusPublikasi === "draft" || body?.statusPublikasi === "terbit"
          ? body.statusPublikasi
          : undefined,
      tanggalTerbit:
        typeof body?.tanggalTerbit === "string" && body.tanggalTerbit.trim()
          ? body.tanggalTerbit.trim()
          : undefined,
    })

    if (!dataBaru) {
      return NextResponse.json({ message: "Berita tidak ditemukan." }, { status: 404 })
    }

    return NextResponse.json({
      message: "Berita berhasil diperbarui.",
      data: dataBaru,
    })
  } catch (error) {
    console.error("Gagal perbarui berita:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
