import { NextResponse } from "next/server"
import { tambahTotalPengunjung } from "@/lib/layanan-statistik-beranda"

export async function POST() {
  try {
    const data = await tambahTotalPengunjung()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[API_VISIT_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
