import { createHash } from "node:crypto"
import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from "mysql2/promise"

const KONFIGURASI_DB = {
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: (process.env.DB_NAME ?? "poltekimipas").replace(/[^a-zA-Z0-9_]/g, "") || "poltekimipas",
}

let poolDatabase: Pool | null = null
let inisialisasiSkemaPromise: Promise<void> | null = null

const beritaAwal = [
  {
    judul: "Upacara Pelantikan Taruna Baru Angkatan XXXII POLTEKIMIPAS",
    slug: "upacara-pelantikan-taruna-baru-angkatan-xxxii-poltekip",
    kategori: "Kegiatan Taruna",
    ringkasan:
      "Sebanyak 350 taruna dan taruni baru resmi dilantik dalam upacara yang dihadiri langsung oleh Menteri Imigrasi dan Pemasyarakatan RI.",
    isiPenuh:
      "Politeknik Imigrasi Pemasyarakatan melantik taruna baru angkatan XXXII dalam upacara resmi kampus. Kegiatan ini menegaskan komitmen kampus mencetak SDM pemasyarakatan yang berintegritas.",
    penulis: "Biro Humas POLTEKIMIPAS",
    gambarUrl: "/images/berita/gallery-1.jpg",
    tanggalTerbit: "2026-02-28 08:00:00",
    estimasiBacaMenit: 4,
    tagList: ["Pelantikan", "Taruna Baru", "Upacara"],
    adalahPenting: 1,
    prioritasPenting: 90,
  },
  {
    judul: "Workshop Penulisan Karya Ilmiah untuk Dosen dan Taruna",
    slug: "workshop-penulisan-karya-ilmiah-untuk-dosen-dan-taruna",
    kategori: "Akademik",
    ringkasan:
      "POLTEKIMIPAS menyelenggarakan workshop penulisan karya ilmiah bertaraf internasional bekerja sama dengan Universitas Indonesia.",
    isiPenuh:
      "Workshop difokuskan pada peningkatan kualitas publikasi ilmiah dosen dan taruna. Materi meliputi metodologi riset, teknik sitasi, dan strategi submit jurnal bereputasi.",
    penulis: "Dr. Budi Santoso, M.Ed.",
    gambarUrl: "/images/berita/news-2.jpg",
    tanggalTerbit: "2026-02-15 09:00:00",
    estimasiBacaMenit: 5,
    tagList: ["Workshop", "Karya Ilmiah", "Akademik"],
    adalahPenting: 1,
    prioritasPenting: 80,
  },
  {
    judul: "Kunjungan Kerja Dirjen Pemasyarakatan ke Kampus POLTEKIMIPAS",
    slug: "kunjungan-kerja-dirjen-pemasyarakatan-ke-kampus-poltekip",
    kategori: "Kebijakan",
    ringkasan:
      "Direktur Jenderal Pemasyarakatan melakukan kunjungan kerja untuk meninjau fasilitas pendidikan dan sarana prasarana kampus.",
    isiPenuh:
      "Kunjungan ini menjadi bagian dari penguatan sinergi antara kampus dan pemangku kebijakan. Berbagai fasilitas pembelajaran praktik ditinjau langsung untuk peningkatan mutu.",
    penulis: "Tim Humas POLTEKIMIPAS",
    gambarUrl: "/images/berita/news-3.jpg",
    tanggalTerbit: "2026-02-05 10:00:00",
    estimasiBacaMenit: 3,
    tagList: ["Kunjungan", "Dirjen Pemasyarakatan", "Fasilitas"],
    adalahPenting: 1,
    prioritasPenting: 70,
  },
]

function hashKataSandiAwal(kataSandi: string): string {
  return createHash("sha256").update(kataSandi).digest("hex")
}

async function jalankanInisialisasiSkema() {
  const koneksiAwal = await mysql.createConnection({
    host: KONFIGURASI_DB.host,
    port: KONFIGURASI_DB.port,
    user: KONFIGURASI_DB.user,
    password: KONFIGURASI_DB.password,
  })

  try {
    await koneksiAwal.execute(
      `CREATE DATABASE IF NOT EXISTS \`${KONFIGURASI_DB.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    )
    await koneksiAwal.query(`USE \`${KONFIGURASI_DB.database}\``)

    await koneksiAwal.execute(`
      CREATE TABLE IF NOT EXISTS akun_admin (
        id_admin INT UNSIGNED NOT NULL AUTO_INCREMENT,
        nama_pengguna VARCHAR(80) NOT NULL UNIQUE,
        nama_lengkap VARCHAR(140) NOT NULL,
        kata_sandi_hash CHAR(64) NOT NULL,
        peran ENUM('superadmin', 'admin') NOT NULL DEFAULT 'superadmin',
        aktif TINYINT(1) NOT NULL DEFAULT 1,
        dibuat_pada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id_admin)
      )
    `)

    await koneksiAwal.execute(`
      CREATE TABLE IF NOT EXISTS sesi_admin (
        id_sesi CHAR(64) NOT NULL,
        id_admin INT UNSIGNED NOT NULL,
        ip_pengguna VARCHAR(60) NULL,
        agen_pengguna VARCHAR(255) NULL,
        dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        kedaluwarsa_pada DATETIME NOT NULL,
        PRIMARY KEY (id_sesi),
        INDEX idx_sesi_admin_id_admin (id_admin),
        INDEX idx_sesi_admin_kedaluwarsa (kedaluwarsa_pada),
        CONSTRAINT fk_sesi_admin_id_admin
          FOREIGN KEY (id_admin) REFERENCES akun_admin(id_admin)
          ON DELETE CASCADE
      )
    `)

    await koneksiAwal.execute(`
      CREATE TABLE IF NOT EXISTS role_pengguna (
        id_role INT UNSIGNED NOT NULL AUTO_INCREMENT,
        nama_role VARCHAR(80) NOT NULL UNIQUE,
        deskripsi VARCHAR(255) NULL,
        dibuat_pada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id_role)
      )
    `)

    await koneksiAwal.execute(`
      CREATE TABLE IF NOT EXISTS kategori_berita (
        id_kategori INT UNSIGNED NOT NULL AUTO_INCREMENT,
        nama_kategori VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(130) NOT NULL UNIQUE,
        aktif TINYINT(1) NOT NULL DEFAULT 1,
        dibuat_pada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id_kategori)
      )
    `)

    await koneksiAwal.execute(`
      CREATE TABLE IF NOT EXISTS berita (
        id_berita INT UNSIGNED NOT NULL AUTO_INCREMENT,
        judul VARCHAR(220) NOT NULL,
        slug VARCHAR(260) NOT NULL UNIQUE,
        ringkasan TEXT NOT NULL,
        isi_penuh LONGTEXT NOT NULL,
        kategori VARCHAR(100) NOT NULL,
        penulis VARCHAR(120) NOT NULL,
        gambar_url VARCHAR(255) NULL,
        tag_json LONGTEXT NULL,
        estimasi_baca_menit INT UNSIGNED NOT NULL DEFAULT 4,
        jumlah_dilihat INT UNSIGNED NOT NULL DEFAULT 0,
        adalah_penting TINYINT(1) NOT NULL DEFAULT 0,
        prioritas_penting INT NOT NULL DEFAULT 0,
        status_publikasi ENUM('draft', 'terbit') NOT NULL DEFAULT 'terbit',
        tanggal_terbit DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        dibuat_pada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        diubah_pada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id_berita),
        INDEX idx_berita_terbit (tanggal_terbit),
        INDEX idx_berita_penting (adalah_penting, prioritas_penting),
        INDEX idx_berita_status (status_publikasi)
      )
    `)

    await koneksiAwal.execute(
      `
      INSERT INTO akun_admin (nama_pengguna, nama_lengkap, kata_sandi_hash, peran, aktif)
      VALUES (?, ?, ?, 'superadmin', 1)
      ON DUPLICATE KEY UPDATE
        nama_pengguna = nama_pengguna
      `,
      ["superadmin", "Super Admin POLTEKIMIPAS", hashKataSandiAwal("superadmin123")],
    )

    await koneksiAwal.execute(
      `
      INSERT INTO role_pengguna (nama_role, deskripsi)
      VALUES
        ('superadmin', 'Role tertinggi dengan akses penuh (punya segalanya)'),
        ('editor_berita', 'Mengelola konten berita'),
        ('editor_blog', 'Mengelola konten blog'),
        ('viewer_dashboard', 'Melihat ringkasan dashboard')
      ON DUPLICATE KEY UPDATE
        deskripsi = VALUES(deskripsi)
      `,
    )

    await koneksiAwal.execute(
      `
      INSERT INTO kategori_berita (nama_kategori, slug, aktif)
      VALUES
        ('Kegiatan Taruna', 'kegiatan-taruna', 1),
        ('Akademik', 'akademik', 1),
        ('Kebijakan', 'kebijakan', 1),
        ('Prestasi', 'prestasi', 1),
        ('Kerjasama', 'kerjasama', 1),
        ('Pengumuman', 'pengumuman', 1)
      ON DUPLICATE KEY UPDATE
        aktif = VALUES(aktif)
      `,
    )

    for (const item of beritaAwal) {
      await koneksiAwal.execute(
        `
        INSERT INTO berita
          (judul, slug, ringkasan, isi_penuh, kategori, penulis, gambar_url, tag_json, estimasi_baca_menit, jumlah_dilihat, adalah_penting, prioritas_penting, status_publikasi, tanggal_terbit)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, 'terbit', ?)
        ON DUPLICATE KEY UPDATE
          gambar_url = VALUES(gambar_url)
        `,
        [
          item.judul,
          item.slug,
          item.ringkasan,
          item.isiPenuh,
          item.kategori,
          item.penulis,
          item.gambarUrl,
          JSON.stringify(item.tagList),
          item.estimasiBacaMenit,
          item.adalahPenting,
          item.prioritasPenting,
          item.tanggalTerbit,
        ],
      )
    }
  } finally {
    await koneksiAwal.end()
  }
}

export async function pastikanSkemaSiap() {
  if (!inisialisasiSkemaPromise) {
    inisialisasiSkemaPromise = jalankanInisialisasiSkema().catch((error) => {
      inisialisasiSkemaPromise = null
      throw error
    })
  }
  await inisialisasiSkemaPromise
}

export function ambilPoolDatabase(): Pool {
  if (!poolDatabase) {
    poolDatabase = mysql.createPool({
      host: KONFIGURASI_DB.host,
      port: KONFIGURASI_DB.port,
      user: KONFIGURASI_DB.user,
      password: KONFIGURASI_DB.password,
      database: KONFIGURASI_DB.database,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
      timezone: "Z",
    })
  }
  return poolDatabase
}

export async function kueriDaftar<T extends RowDataPacket[]>(
  sql: string,
  parameter: unknown[] = [],
): Promise<T> {
  await pastikanSkemaSiap()
  const [rows] = await ambilPoolDatabase().query<T>(sql, parameter)
  return rows
}

export async function kueriEksekusi(
  sql: string,
  parameter: unknown[] = [],
): Promise<ResultSetHeader> {
  await pastikanSkemaSiap()
  const [hasil] = await ambilPoolDatabase().query<ResultSetHeader>(sql, parameter)
  return hasil
}
