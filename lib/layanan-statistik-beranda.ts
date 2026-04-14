import { pastikanPrismaSiap, prisma } from "@/lib/prisma"

export type DataStatistikBeranda = {
  totalTaruna: number
  totalAlumni: number
  tahunPengabdian: number
  totalPengunjung: number
}

const NILAI_BAWAAN: DataStatistikBeranda = {
  totalTaruna: 1735,
  totalAlumni: 15000,
  tahunPengabdian: 64,
  totalPengunjung: 0,
}

function angkaAman(input: unknown, fallback: number) {
  const nilai = Number(input)
  if (!Number.isFinite(nilai) || nilai < 0) return fallback
  return Math.floor(nilai)
}

export async function ambilStatistikBeranda(): Promise<DataStatistikBeranda> {
  await pastikanPrismaSiap()

  const data = await prisma.statistikBeranda.upsert({
    where: { idStatistik: 1 },
    create: {
      idStatistik: 1,
      ...NILAI_BAWAAN,
    },
    update: {},
    select: {
      totalTaruna: true,
      totalAlumni: true,
      tahunPengabdian: true,
      totalPengunjung: true,
    },
  })

  return data
}

export async function perbaruiStatistikBeranda(input: Partial<DataStatistikBeranda>) {
  await pastikanPrismaSiap()

  const lama = await ambilStatistikBeranda()

  const data = await prisma.statistikBeranda.upsert({
    where: { idStatistik: 1 },
    create: {
      idStatistik: 1,
      totalTaruna: angkaAman(input.totalTaruna, lama.totalTaruna),
      totalAlumni: angkaAman(input.totalAlumni, lama.totalAlumni),
      tahunPengabdian: angkaAman(input.tahunPengabdian, lama.tahunPengabdian),
      totalPengunjung: angkaAman(input.totalPengunjung, lama.totalPengunjung),
    },
    update: {
      totalTaruna: angkaAman(input.totalTaruna, lama.totalTaruna),
      totalAlumni: angkaAman(input.totalAlumni, lama.totalAlumni),
      tahunPengabdian: angkaAman(input.tahunPengabdian, lama.tahunPengabdian),
      totalPengunjung: angkaAman(input.totalPengunjung, lama.totalPengunjung),
    },
    select: {
      totalTaruna: true,
      totalAlumni: true,
      tahunPengabdian: true,
      totalPengunjung: true,
    },
  })

  return data
}

export async function tambahTotalPengunjung() {
  await pastikanPrismaSiap()

  // Pastikan record ada dulu
  await ambilStatistikBeranda()

  const data = await prisma.statistikBeranda.update({
    where: { idStatistik: 1 },
    data: {
      totalPengunjung: {
        increment: 1
      }
    },
    select: {
      totalPengunjung: true
    }
  })

  return data
}
