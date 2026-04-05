import type {
  Berita as ModelBerita,
  Prisma,
  StatusPublikasi,
} from "@/prisma/generated/client_next"

import { prisma, pastikanPrismaSiap } from "@/lib/prisma"
import { buatSlugDariTeks, parseDaftarTag } from "@/lib/teks"

export type StatusPublikasiBerita = "draft" | "terbit"

export type DataBerita = {
  idBerita: number
  judul: string
  slug: string
  ringkasan: string
  isiPenuh: string
  kategori: string
  penulis: string
  gambarUrl: string | null
  tagList: string[]
  estimasiBacaMenit: number
  jumlahDilihat: number
  adalahPenting: boolean
  prioritasPenting: number
  statusPublikasi: StatusPublikasiBerita
  tanggalTerbit: string
  dibuatPada: string
  diubahPada: string
}

export type InputBuatBerita = {
  judul: string
  ringkasan: string
  isiPenuh: string
  kategori: string
  penulis: string
  gambarUrl?: string | null
  tagList?: string[]
  estimasiBacaMenit?: number
  adalahPenting?: boolean
  prioritasPenting?: number
  statusPublikasi?: StatusPublikasiBerita
  tanggalTerbit?: string
}

export type DataKategoriBerita = {
  idKategori: number
  namaKategori: string
  slug: string
  aktif: boolean
}

function parseTagJson(input: string | null): string[] {
  if (!input) {
    return []
  }

  try {
    const parsed = JSON.parse(input)
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === "string").slice(0, 15)
    }
  } catch {
    return []
  }

  return []
}

function mapBerita(data: ModelBerita): DataBerita {
  return {
    idBerita: data.idBerita,
    judul: data.judul,
    slug: data.slug,
    ringkasan: data.ringkasan,
    isiPenuh: data.isiPenuh,
    kategori: data.kategori,
    penulis: data.penulis,
    gambarUrl: data.gambarUrl,
    tagList: parseTagJson(data.tagJson),
    estimasiBacaMenit: data.estimasiBacaMenit,
    jumlahDilihat: data.jumlahDilihat,
    adalahPenting: data.adalahPenting,
    prioritasPenting: data.prioritasPenting,
    statusPublikasi: data.statusPublikasi,
    tanggalTerbit: data.tanggalTerbit.toISOString(),
    dibuatPada: data.dibuatPada.toISOString(),
    diubahPada: data.diubahPada.toISOString(),
  }
}

function mapKategori(data: {
  idKategori: number
  namaKategori: string
  slug: string
  aktif: boolean
}): DataKategoriBerita {
  return {
    idKategori: data.idKategori,
    namaKategori: data.namaKategori,
    slug: data.slug,
    aktif: data.aktif,
  }
}

async function cariSlugUnik(judul: string, idDikecualikan?: number): Promise<string> {
  await pastikanPrismaSiap()

  const slugDasar = buatSlugDariTeks(judul)
  let slugKandidat = slugDasar
  let urutan = 2

  while (true) {
    const ada = await prisma.berita.findFirst({
      where: {
        slug: slugKandidat,
        ...(idDikecualikan ? { NOT: { idBerita: idDikecualikan } } : {}),
      },
      select: { idBerita: true },
    })

    if (!ada) {
      return slugKandidat
    }

    slugKandidat = `${slugDasar}-${urutan}`
    urutan += 1
  }
}

export async function ambilDaftarBeritaPublik(input: {
  cari?: string
  kategori?: string
  halaman?: number
  batas?: number
}) {
  await pastikanPrismaSiap()

  const halaman = Math.max(1, input.halaman ?? 1)
  const batas = Math.min(24, Math.max(1, input.batas ?? 6))
  const skip = (halaman - 1) * batas

  const where: Prisma.BeritaWhereInput = {
    statusPublikasi: "terbit",
  }

  if (input.kategori && input.kategori !== "Semua") {
    where.kategori = input.kategori
  }

  if (input.cari?.trim()) {
    const kataKunci = input.cari.trim()
    where.OR = [
      { judul: { contains: kataKunci } },
      { ringkasan: { contains: kataKunci } },
      { isiPenuh: { contains: kataKunci } },
    ]
  }

  const [totalData, daftar] = await prisma.$transaction([
    prisma.berita.count({ where }),
    prisma.berita.findMany({
      where,
      orderBy: { tanggalTerbit: "desc" },
      skip,
      take: batas,
    }),
  ])

  return {
    totalData,
    halaman,
    batas,
    totalHalaman: Math.max(1, Math.ceil(totalData / batas)),
    data: daftar.map(mapBerita),
  }
}

export async function ambilSemuaBeritaAdmin() {
  await pastikanPrismaSiap()

  const daftar = await prisma.berita.findMany({
    orderBy: { dibuatPada: "desc" },
  })

  return daftar.map(mapBerita)
}

export async function ambilDetailBeritaPublik(slug: string, opsi?: { naikkanDilihat?: boolean }) {
  await pastikanPrismaSiap()

  const berita = await prisma.berita.findFirst({
    where: {
      slug,
      statusPublikasi: "terbit",
    },
  })

  if (!berita) {
    return null
  }

  let hasil = berita
  if (opsi?.naikkanDilihat !== false) {
    hasil = await prisma.berita.update({
      where: { idBerita: berita.idBerita },
      data: {
        jumlahDilihat: { increment: 1 },
      },
    })
  }

  return mapBerita(hasil)
}

export async function ambilDetailBeritaById(idBerita: number) {
  await pastikanPrismaSiap()

  const berita = await prisma.berita.findUnique({
    where: { idBerita },
  })

  return berita ? mapBerita(berita) : null
}

export async function tambahBerita(input: InputBuatBerita) {
  await pastikanPrismaSiap()

  const slug = await cariSlugUnik(input.judul)
  const tagList = parseDaftarTag(input.tagList)

  const beritaBaru = await prisma.berita.create({
    data: {
      judul: input.judul,
      slug,
      ringkasan: input.ringkasan,
      isiPenuh: input.isiPenuh,
      kategori: input.kategori,
      penulis: input.penulis,
      gambarUrl: input.gambarUrl ?? null,
      tagJson: JSON.stringify(tagList),
      estimasiBacaMenit: Math.max(1, input.estimasiBacaMenit ?? 4),
      adalahPenting: Boolean(input.adalahPenting),
      prioritasPenting: input.prioritasPenting ?? 0,
      statusPublikasi: (input.statusPublikasi ?? "terbit") as StatusPublikasi,
      tanggalTerbit: input.tanggalTerbit ? new Date(input.tanggalTerbit) : new Date(),
    },
  })

  return mapBerita(beritaBaru)
}

export async function perbaruiBerita(
  idBerita: number,
  input: Partial<InputBuatBerita> & { statusPublikasi?: StatusPublikasiBerita },
) {
  await pastikanPrismaSiap()

  const dataAwal = await prisma.berita.findUnique({
    where: { idBerita },
  })

  if (!dataAwal) {
    return null
  }

  const judulBaru = input.judul?.trim() || dataAwal.judul
  const slugBaru = judulBaru !== dataAwal.judul ? await cariSlugUnik(judulBaru, idBerita) : dataAwal.slug
  const tagListBaru = input.tagList ? parseDaftarTag(input.tagList) : parseTagJson(dataAwal.tagJson)

  const beritaBaru = await prisma.berita.update({
    where: { idBerita },
    data: {
      judul: judulBaru,
      slug: slugBaru,
      ringkasan: input.ringkasan ?? dataAwal.ringkasan,
      isiPenuh: input.isiPenuh ?? dataAwal.isiPenuh,
      kategori: input.kategori ?? dataAwal.kategori,
      penulis: input.penulis ?? dataAwal.penulis,
      gambarUrl: input.gambarUrl === undefined ? dataAwal.gambarUrl : input.gambarUrl,
      tagJson: JSON.stringify(tagListBaru),
      estimasiBacaMenit: Math.max(1, input.estimasiBacaMenit ?? dataAwal.estimasiBacaMenit),
      adalahPenting: input.adalahPenting ?? dataAwal.adalahPenting,
      prioritasPenting: input.prioritasPenting ?? dataAwal.prioritasPenting,
      statusPublikasi: (input.statusPublikasi ?? dataAwal.statusPublikasi) as StatusPublikasi,
      tanggalTerbit: input.tanggalTerbit ? new Date(input.tanggalTerbit) : dataAwal.tanggalTerbit,
    },
  })

  return mapBerita(beritaBaru)
}

export async function hapusBerita(idBerita: number) {
  await pastikanPrismaSiap()

  try {
    await prisma.berita.delete({
      where: { idBerita },
    })
    return true
  } catch {
    return false
  }
}

export async function ambilBeritaPentingNavbar(batas = 6) {
  await pastikanPrismaSiap()

  const daftar = await prisma.berita.findMany({
    where: {
      statusPublikasi: "terbit",
      adalahPenting: true,
    },
    orderBy: [{ prioritasPenting: "desc" }, { tanggalTerbit: "desc" }],
    take: Math.min(10, Math.max(1, batas)),
    select: {
      idBerita: true,
      judul: true,
      slug: true,
      prioritasPenting: true,
    },
  })

  return daftar.map((item) => ({
    idBerita: item.idBerita,
    judul: item.judul,
    judulMarquee: `Penting: ${item.judul}`,
    slug: item.slug,
    prioritasPenting: item.prioritasPenting,
  }))
}

export async function ambilBeritaTerkait(input: {
  kategori: string
  slugAktif: string
  batas?: number
}) {
  await pastikanPrismaSiap()

  const daftar = await prisma.berita.findMany({
    where: {
      statusPublikasi: "terbit",
      kategori: input.kategori,
      slug: { not: input.slugAktif },
    },
    orderBy: { tanggalTerbit: "desc" },
    take: Math.min(6, Math.max(1, input.batas ?? 3)),
  })

  return daftar.map(mapBerita)
}

export async function ambilRingkasanDashboard() {
  await pastikanPrismaSiap()

  const [totalBerita, totalTerbit, totalPenting, totalDilihatRaw, beritaTerbaru] = await prisma.$transaction([
    prisma.berita.count(),
    prisma.berita.count({ where: { statusPublikasi: "terbit" } }),
    prisma.berita.count({
      where: {
        statusPublikasi: "terbit",
        adalahPenting: true,
      },
    }),
    prisma.berita.aggregate({
      where: { statusPublikasi: "terbit" },
      _sum: { jumlahDilihat: true },
    }),
    prisma.berita.findMany({
      orderBy: { dibuatPada: "desc" },
      take: 5,
    }),
  ])

  return {
    totalBerita,
    totalTerbit,
    totalPenting,
    totalDilihat: totalDilihatRaw._sum.jumlahDilihat ?? 0,
    beritaTerbaru: beritaTerbaru.map(mapBerita),
  }
}

export async function ambilKategoriBerita() {
  await pastikanPrismaSiap()

  const daftar = await prisma.kategoriBerita.findMany({
    where: { aktif: true },
    orderBy: { namaKategori: "asc" },
  })

  return daftar.map(mapKategori)
}

export async function tambahKategoriBerita(namaKategori: string) {
  await pastikanPrismaSiap()

  const namaBersih = namaKategori.trim()
  if (!namaBersih) {
    throw new Error("Nama kategori wajib diisi.")
  }

  const slugDasar = buatSlugDariTeks(namaBersih)
  let slugKandidat = slugDasar
  let urutan = 2

  while (true) {
    const duplikatSlug = await prisma.kategoriBerita.findFirst({
      where: { slug: slugKandidat },
      select: { idKategori: true },
    })

    if (!duplikatSlug) {
      break
    }

    slugKandidat = `${slugDasar}-${urutan}`
    urutan += 1
  }

  const kategori = await prisma.kategoriBerita.upsert({
    where: { namaKategori: namaBersih },
    update: { aktif: true },
    create: {
      namaKategori: namaBersih,
      slug: slugKandidat,
      aktif: true,
    },
  })

  return mapKategori(kategori)
}
