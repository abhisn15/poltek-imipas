import path from "node:path"
import { mkdir, writeFile } from "node:fs/promises"
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

function hostPrivat(host: string): boolean {
  const normalized = host.trim().toLowerCase()
  if (!normalized) return true

  if (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized.endsWith(".local")
  ) {
    return true
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(normalized)) {
    if (
      normalized.startsWith("10.") ||
      normalized.startsWith("127.") ||
      normalized.startsWith("169.254.") ||
      normalized.startsWith("192.168.") ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(normalized)
    ) {
      return true
    }
  }

  if (normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe80")) {
    return true
  }

  return false
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
    const kandidatUrl = String(body?.url ?? "").trim()

    if (!kandidatUrl) {
      return NextResponse.json(
        { message: "URL gambar wajib diisi." },
        { status: 400 },
      )
    }

    let urlObj: URL
    try {
      urlObj = new URL(kandidatUrl)
    } catch {
      return NextResponse.json(
        { message: "URL gambar tidak valid." },
        { status: 400 },
      )
    }

    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return NextResponse.json(
        { message: "Hanya URL http/https yang diizinkan." },
        { status: 400 },
      )
    }

    if (hostPrivat(urlObj.hostname)) {
      return NextResponse.json(
        { message: "Host URL gambar tidak diizinkan." },
        { status: 400 },
      )
    }

    const response = await fetch(urlObj.toString(), {
      method: "GET",
      redirect: "follow",
      headers: {
        Accept: "image/*",
        "User-Agent": "POLTEKIMIPAS-ImageFetcher/1.0",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        { message: "Gagal mengambil gambar dari URL tersebut." },
        { status: 400 },
      )
    }

    const contentType = response.headers.get("content-type")?.split(";")[0].trim().toLowerCase() || ""
    if (!contentType.startsWith("image/")) {
      return NextResponse.json(
        { message: "URL yang ditempel bukan file gambar." },
        { status: 400 },
      )
    }

    const contentLengthRaw = response.headers.get("content-length")
    const contentLength = contentLengthRaw ? Number(contentLengthRaw) : 0
    if (Number.isFinite(contentLength) && contentLength > BATAS_UKURAN_BYTE) {
      return NextResponse.json(
        { message: "Ukuran gambar melebihi batas 8 MB." },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    if (!buffer.byteLength || buffer.byteLength > BATAS_UKURAN_BYTE) {
      return NextResponse.json(
        { message: "Ukuran gambar harus antara 1 byte hingga 8 MB." },
        { status: 400 },
      )
    }

    const extMime = extDariMime(contentType)
    const extUrl = path.extname(urlObj.pathname).toLowerCase()
    const ekstensi = EKSTENSI_GAMBAR.has(extMime)
      ? extMime
      : EKSTENSI_GAMBAR.has(extUrl)
        ? extUrl
        : ""

    if (!ekstensi) {
      return NextResponse.json(
        { message: "Format gambar dari URL belum didukung." },
        { status: 400 },
      )
    }

    await mkdir(FOLDER_GAMBAR_BERITA, { recursive: true })

    const namaFile = `${Date.now()}-${randomUUID().slice(0, 8)}${ekstensi}`
    const pathSimpan = path.join(FOLDER_GAMBAR_BERITA, namaFile)
    await writeFile(pathSimpan, buffer)

    return NextResponse.json({
      message: "Gambar dari URL berhasil disimpan.",
      data: {
        namaFile,
        url: `/images/berita/${namaFile}`,
      },
    })
  } catch (error) {
    console.error("Gagal ambil gambar dari URL:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}

