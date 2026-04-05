require("dotenv").config({ quiet: true })

const { createHash } = require("node:crypto")
const { PrismaClient } = require("./generated/client_next")

const prisma = new PrismaClient()

function hashKataSandi(kataSandi) {
  return createHash("sha256").update(kataSandi).digest("hex")
}

async function main() {
  const kategoriDefault = [
    "Kegiatan Taruna",
    "Akademik",
    "Kebijakan",
    "Prestasi",
    "Kerjasama",
    "Pengumuman",
  ]

  for (const namaKategori of kategoriDefault) {
    const slug = namaKategori
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

    await prisma.kategoriBerita.upsert({
      where: { namaKategori },
      update: { aktif: true, slug },
      create: {
        namaKategori,
        slug,
        aktif: true,
      },
    })
  }

  await prisma.rolePengguna.upsert({
    where: { namaRole: "superadmin" },
    update: {
      deskripsi: "Role tertinggi dengan akses penuh (punya segalanya)",
    },
    create: {
      namaRole: "superadmin",
      deskripsi: "Role tertinggi dengan akses penuh (punya segalanya)",
    },
  })

  await prisma.akunAdmin.upsert({
    where: { namaPengguna: "superadmin" },
    update: {
      namaLengkap: "Super Admin POLTEKIMIPAS",
      kataSandiHash: hashKataSandi("superadmin123"),
      peran: "superadmin",
      aktif: true,
    },
    create: {
      namaPengguna: "superadmin",
      namaLengkap: "Super Admin POLTEKIMIPAS",
      kataSandiHash: hashKataSandi("superadmin123"),
      peran: "superadmin",
      aktif: true,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Seed Prisma selesai: user statis superadmin aktif.")
  })
  .catch(async (error) => {
    console.error("Seed Prisma gagal:", error)
    await prisma.$disconnect()
    process.exit(1)
  })
