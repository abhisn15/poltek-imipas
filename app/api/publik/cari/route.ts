import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { cariDataStatis, type HasilPencarian } from "@/lib/data-pencarian"

// Try to import berita search — gracefully fallback if DB is unavailable
async function cariBeritaPublik(query: string): Promise<HasilPencarian[]> {
  try {
    const { ambilDaftarBeritaPublik } = await import("@/lib/layanan-berita")
    const data = await ambilDaftarBeritaPublik({ cari: query, batas: 10 })
    return data.items.map((item) => ({
      tipe: "berita" as const,
      judul: item.judul,
      deskripsi: item.ringkasan,
      href: `/berita/${item.slug}`,
      kategori: item.kategori,
      meta: item.tanggalTerbit
        ? new Date(item.tanggalTerbit).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : undefined,
    }))
  } catch {
    // DB might be unavailable — return empty
    return []
  }
}

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q") ?? ""
    const tipe = request.nextUrl.searchParams.get("tipe") ?? "semua"

    if (!q || q.trim().length < 2) {
      return NextResponse.json({ data: [], query: q, total: 0 })
    }

    const query = q.trim()

    // Run berita search (DB) and static search in parallel
    const [hasilBerita, hasilStatis] = await Promise.all([
      tipe === "semua" || tipe === "berita" ? cariBeritaPublik(query) : Promise.resolve([]),
      cariDataStatis(query),
    ])

    // Filter statis by tipe
    const hasilStatisFiltered =
      tipe === "semua"
        ? hasilStatis
        : hasilStatis.filter((item) => item.tipe === tipe)

    const semua = [...hasilBerita, ...hasilStatisFiltered]

    return NextResponse.json({
      data: semua,
      query,
      total: semua.length,
      per_tipe: {
        berita: hasilBerita.length,
        jurnal: hasilStatis.filter((i) => i.tipe === "jurnal").length,
        dosen: hasilStatis.filter((i) => i.tipe === "dosen").length,
        blog: hasilStatis.filter((i) => i.tipe === "blog").length,
        prodi: hasilStatis.filter((i) => i.tipe === "prodi").length,
      },
    })
  } catch (error) {
    console.error("Gagal proses pencarian:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mencari." },
      { status: 500 },
    )
  }
}
