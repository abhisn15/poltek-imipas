import path from "node:path"
import { mkdir, readdir, writeFile } from "node:fs/promises"
import { randomUUID } from "node:crypto"

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ambilAdminTerotentikasi } from "@/lib/api-admin"

const FOLDER_GAMBAR_BERITA = path.join(process.cwd(), "public", "images", "berita")
const EKSTENSI_GAMBAR = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"])
const BATAS_UKURAN_BYTE = 8 * 1024 * 1024

function extDariMime(mimeType: string): string {
  switch (mimeType) {
    case "image/jpeg":
      return ".jpg"
    case "image/png":
      return ".png"
    case "image/webp":
      return ".webp"
    case "image/gif":
      return ".gif"
    case "image/avif":
      return ".avif"
    default:
      return ""
  }
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

    await mkdir(FOLDER_GAMBAR_BERITA, { recursive: true })
    const daftarFile = await readdir(FOLDER_GAMBAR_BERITA, { withFileTypes: true })

    const data = daftarFile
      .filter((item) => item.isFile())
      .map((item) => {
        const ext = path.extname(item.name).toLowerCase()
        return {
          namaFile: item.name,
          ekstensi: ext,
        }
      })
      .filter((item) => EKSTENSI_GAMBAR.has(item.ekstensi))
      .sort((a, b) => a.namaFile.localeCompare(b.namaFile, "id"))
      .map((item) => ({
        namaFile: item.namaFile,
        url: `/images/berita/${item.namaFile}`,
      }))

    return NextResponse.json({
      folder: "/public/images/berita",
      data,
    })
  } catch (error) {
    console.error("Gagal ambil daftar gambar berita:", error)
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

    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "File gambar tidak ditemukan." },
        { status: 400 },
      )
    }

    if (file.size <= 0 || file.size > BATAS_UKURAN_BYTE) {
      return NextResponse.json(
        { message: "Ukuran file harus antara 1 byte hingga 8 MB." },
        { status: 400 },
      )
    }

    const extAsli = path.extname(file.name).toLowerCase()
    const extMime = extDariMime(file.type)
    const ekstensi = EKSTENSI_GAMBAR.has(extAsli) ? extAsli : extMime

    if (!ekstensi || !EKSTENSI_GAMBAR.has(ekstensi)) {
      return NextResponse.json(
        { message: "Format gambar tidak didukung." },
        { status: 400 },
      )
    }

    await mkdir(FOLDER_GAMBAR_BERITA, { recursive: true })

    const namaFile = `${Date.now()}-${randomUUID().slice(0, 8)}${ekstensi}`
    const pathSimpan = path.join(FOLDER_GAMBAR_BERITA, namaFile)
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(pathSimpan, buffer)

    return NextResponse.json({
      message: "Gambar berhasil diunggah.",
      data: {
        namaFile,
        url: `/images/berita/${namaFile}`,
      },
    })
  } catch (error) {
    console.error("Gagal upload gambar berita:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}
