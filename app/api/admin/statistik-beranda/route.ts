import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"
import { ambilStatistikBeranda, perbaruiStatistikBeranda } from "@/lib/layanan-statistik-beranda"

export async function GET(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json({ message: "Akses ditolak." }, { status: 401 })
    }

    const data = await ambilStatistikBeranda()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal mengambil statistik beranda:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await ambilAdminTerotentikasi(request)
    if (!admin) {
      return NextResponse.json({ message: "Akses ditolak." }, { status: 401 })
    }
    if (admin.peran !== "superadmin") {
      return NextResponse.json({ message: "Hanya superadmin yang dapat mengubah statistik." }, { status: 403 })
    }

    const body = await request.json().catch(() => null)
    const data = await perbaruiStatistikBeranda({
      totalTaruna: body?.totalTaruna,
      totalAlumni: body?.totalAlumni,
      tahunPengabdian: body?.tahunPengabdian,
    })

    return NextResponse.json({ message: "Statistik beranda berhasil diperbarui.", data })
  } catch (error) {
    console.error("Gagal memperbarui statistik beranda:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
