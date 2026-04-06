require("dotenv").config({ quiet: true })

const { createHash } = require("node:crypto")
const { PrismaClient } = require("./generated/client_next")

const prisma = new PrismaClient()

function hashKataSandi(kataSandi) {
  return createHash("sha256").update(kataSandi).digest("hex")
}

function buatSlug(teks) {
  return teks
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

// ────────────────────────────────────────
// DATA SEED: PEJABAT
// ────────────────────────────────────────
const dataPejabat = [
  {
    nama: "Prof. Dr. Hadi Purnomo, M.Si.",
    jabatan: "Rektor POLTEKIMIPAS",
    singkatan: "HP",
    email: "rektor@poltekimipas.ac.id",
    telepon: "(021) 5252-001",
    bidangList: ["Kebijakan Institusi", "Pengembangan SDM", "Kerjasama Internasional"],
    fotoUrl: null,
    urutan: 1,
    aktif: true,
  },
  {
    nama: "Dr. Rina Kusumawati, M.Pd.",
    jabatan: "Wakil Rektor I Bidang Akademik",
    singkatan: "RK",
    email: "warek1@poltekimipas.ac.id",
    telepon: "(021) 5252-002",
    bidangList: ["Akademik", "Kurikulum", "Penelitian"],
    fotoUrl: null,
    urutan: 2,
    aktif: true,
  },
  {
    nama: "Drs. Agus Santoso, M.M.",
    jabatan: "Wakil Rektor II Bidang Administrasi & Keuangan",
    singkatan: "AS",
    email: "warek2@poltekimipas.ac.id",
    telepon: "(021) 5252-003",
    bidangList: ["Keuangan", "Administrasi Umum", "Sarana Prasarana"],
    fotoUrl: null,
    urutan: 3,
    aktif: true,
  },
  {
    nama: "Dr. Surya Atmaja, S.H., M.H.",
    jabatan: "Wakil Rektor III Bidang Kemahasiswaan",
    singkatan: "SA",
    email: "warek3@poltekimipas.ac.id",
    telepon: "(021) 5252-004",
    bidangList: ["Kemahasiswaan", "Alumni", "Karir & Pengembangan"],
    fotoUrl: null,
    urutan: 4,
    aktif: true,
  },
  {
    nama: "Irma Dewi Lestari, S.T., M.T.",
    jabatan: "Direktur Teknologi Informasi",
    singkatan: "ID",
    email: "dit.ti@poltekimipas.ac.id",
    telepon: "(021) 5252-010",
    bidangList: ["Transformasi Digital", "Sistem Informasi", "Keamanan Siber"],
    fotoUrl: null,
    urutan: 5,
    aktif: true,
  },
  {
    nama: "Bambang Hariyadi, S.E., M.Ak.",
    jabatan: "Kepala Biro Keuangan",
    singkatan: "BH",
    email: "biro.keuangan@poltekimipas.ac.id",
    telepon: "(021) 5252-020",
    bidangList: ["Anggaran", "Akuntansi", "Pelaporan Keuangan"],
    fotoUrl: null,
    urutan: 6,
    aktif: true,
  },
]

// ────────────────────────────────────────
// DATA SEED: DOSEN
// ────────────────────────────────────────
const PDF_DUMMY = "/pdfs/pratinjau-jurnal.pdf"

const dataDosen = [
  {
    nama: "Haryono",
    gelar: "Dr., M.Si.",
    jabatan: "Ketua Program Studi Manajemen Pemasyarakatan",
    bidangKeahlianList: ["Manajemen Lapas", "Pembinaan Narapidana", "Evaluasi Program"],
    deskripsi: "Fokus riset pada efektivitas pembinaan berbasis kompetensi serta tata kelola pemasyarakatan modern.",
    email: "haryono@poltekimipas.ac.id",
    ruang: "Gedung A, Ruang 2.13",
    fotoUrl: null,
    urutan: 1,
    aktif: true,
    jurnalList: [
      {
        id: 101,
        judul: "Analisis Efektivitas Program Pembinaan Narapidana di Lapas Kelas I",
        tahun: "2026",
        program: "Manajemen Pemasyarakatan",
        ringkasan: "Kajian dampak program pembinaan terhadap perubahan perilaku dan kesiapan reintegrasi sosial.",
        pdfUrl: PDF_DUMMY,
      },
      {
        id: 102,
        judul: "Model Monitoring Reintegrasi Narapidana Berbasis Indikator Kinerja",
        tahun: "2025",
        program: "Manajemen Pemasyarakatan",
        ringkasan: "Pengembangan kerangka pemantauan pasca-bebas dengan indikator terukur.",
        pdfUrl: PDF_DUMMY,
      },
    ],
  },
  {
    nama: "Ahmad Fauzi",
    gelar: "M.T.",
    jabatan: "Koordinator Laboratorium Teknologi Pemasyarakatan",
    bidangKeahlianList: ["IoT Keamanan", "CCTV Cerdas", "Integrasi Sistem"],
    deskripsi: "Mengembangkan penerapan teknologi terintegrasi untuk penguatan keamanan dan efisiensi operasional.",
    email: "ahmad.fauzi@poltekimipas.ac.id",
    ruang: "Gedung B, Ruang Lab 1",
    fotoUrl: null,
    urutan: 2,
    aktif: true,
    jurnalList: [
      {
        id: 201,
        judul: "Penerapan Sistem Keamanan Berbasis IoT pada Lembaga Pemasyarakatan",
        tahun: "2026",
        program: "Teknik Pemasyarakatan",
        ringkasan: "Implementasi sensor, AI kamera, dan dashboard real-time untuk deteksi dini insiden.",
        pdfUrl: PDF_DUMMY,
      },
      {
        id: 202,
        judul: "Optimalisasi Pengawasan Berbasis Teknologi di Balai Pemasyarakatan",
        tahun: "2025",
        program: "Teknik Pemasyarakatan",
        ringkasan: "Efektivitas GPS tracking dan electronic monitoring pada pengawasan klien pemasyarakatan.",
        pdfUrl: PDF_DUMMY,
      },
    ],
  },
  {
    nama: "Siti Rahayu",
    gelar: "Dra., M.Hum.",
    jabatan: "Dosen Senior Bimbingan Kemasyarakatan",
    bidangKeahlianList: ["Konseling Pemasyarakatan", "Rehabilitasi Sosial", "Anak Berhadapan Hukum"],
    deskripsi: "Mendorong pendekatan rehabilitatif berbasis keluarga dan komunitas untuk menekan residivisme.",
    email: "siti.rahayu@poltekimipas.ac.id",
    ruang: "Gedung C, Ruang 1.07",
    fotoUrl: null,
    urutan: 3,
    aktif: true,
    jurnalList: [
      {
        id: 301,
        judul: "Model Bimbingan Kemasyarakatan untuk Anak Berkonflik dengan Hukum",
        tahun: "2025",
        program: "Bimbingan Kemasyarakatan",
        ringkasan: "Perancangan model intervensi komprehensif untuk menurunkan tingkat pengulangan tindak pidana.",
        pdfUrl: PDF_DUMMY,
      },
      {
        id: 302,
        judul: "Pendekatan Restorative Justice pada Pembinaan Berbasis Komunitas",
        tahun: "2024",
        program: "Bimbingan Kemasyarakatan",
        ringkasan: "Kajian praktik pemulihan relasi sosial sebagai strategi pembinaan jangka panjang.",
        pdfUrl: PDF_DUMMY,
      },
    ],
  },
  {
    nama: "Bambang Supriyadi",
    gelar: "S.H., M.H.",
    jabatan: "Dosen Kebijakan Pemasyarakatan",
    bidangKeahlianList: ["Kebijakan Publik", "Hukum Pemasyarakatan", "Manajemen Krisis"],
    deskripsi: "Riset kebijakan pemasyarakatan adaptif, termasuk evaluasi kebijakan pada kondisi darurat nasional.",
    email: "bambang.supriyadi@poltekimipas.ac.id",
    ruang: "Gedung A, Ruang 3.05",
    fotoUrl: null,
    urutan: 4,
    aktif: true,
    jurnalList: [
      {
        id: 401,
        judul: "Evaluasi Kebijakan Asimilasi dan Integrasi di Masa Pandemi",
        tahun: "2025",
        program: "Manajemen Pemasyarakatan",
        ringkasan: "Analisis kebijakan asimilasi terhadap keamanan, kesehatan, dan reintegrasi sosial.",
        pdfUrl: PDF_DUMMY,
      },
      {
        id: 402,
        judul: "Kerangka Tata Kelola Krisis pada Lembaga Pemasyarakatan",
        tahun: "2024",
        program: "Manajemen Pemasyarakatan",
        ringkasan: "Rekomendasi model respons kelembagaan untuk situasi krisis berisiko tinggi.",
        pdfUrl: PDF_DUMMY,
      },
    ],
  },
  {
    nama: "Eko Prasetyo",
    gelar: "S.T., M.Kom.",
    jabatan: "Dosen Sistem Informasi Pemasyarakatan",
    bidangKeahlianList: ["Data Analytics", "Sistem Monitoring", "Transformasi Digital"],
    deskripsi: "Mengarahkan pengembangan platform analitik untuk mendukung pengambilan keputusan berbasis data.",
    email: "eko.prasetyo@poltekimipas.ac.id",
    ruang: "Gedung B, Ruang 2.09",
    fotoUrl: null,
    urutan: 5,
    aktif: true,
    jurnalList: [
      {
        id: 501,
        judul: "Desain Dashboard Analitik Operasional Lapas Berbasis KPI",
        tahun: "2025",
        program: "Teknik Pemasyarakatan",
        ringkasan: "Perancangan dashboard KPI untuk mempercepat evaluasi kinerja operasional harian.",
        pdfUrl: PDF_DUMMY,
      },
      {
        id: 502,
        judul: "Strategi Integrasi Data Pemasyarakatan untuk Monitoring Terpadu",
        tahun: "2024",
        program: "Teknik Pemasyarakatan",
        ringkasan: "Model integrasi lintas-unit untuk meningkatkan akurasi data dan percepatan respons.",
        pdfUrl: PDF_DUMMY,
      },
    ],
  },
  {
    nama: "Wulandari",
    gelar: "Dr.",
    jabatan: "Dosen Psikologi Pemasyarakatan",
    bidangKeahlianList: ["Psikologi Forensik", "Assessment Risiko", "Intervensi Perilaku"],
    deskripsi: "Mengembangkan metode assessment psikologis untuk mendukung program pembinaan yang lebih personal.",
    email: "wulandari@poltekimipas.ac.id",
    ruang: "Gedung C, Ruang 2.11",
    fotoUrl: null,
    urutan: 6,
    aktif: true,
    jurnalList: [
      {
        id: 601,
        judul: "Model Assessment Risiko untuk Penyusunan Program Pembinaan Individual",
        tahun: "2026",
        program: "Bimbingan Kemasyarakatan",
        ringkasan: "Pendekatan assessment multi-dimensi guna memetakan kebutuhan intervensi perilaku.",
        pdfUrl: PDF_DUMMY,
      },
      {
        id: 602,
        judul: "Pendekatan Behavioral Coaching pada Narapidana Usia Produktif",
        tahun: "2025",
        program: "Bimbingan Kemasyarakatan",
        ringkasan: "Efektivitas coaching perilaku dalam peningkatan disiplin dan kesiapan kerja.",
        pdfUrl: PDF_DUMMY,
      },
    ],
  },
]

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

  // ── SEED PEJABAT ──────────────────────────────────────────────────────
  console.log("Seeding pejabat...")
  for (const item of dataPejabat) {
    // Cari berdasarkan nama unik (nama + jabatan combo)
    const ada = await prisma.pejabat.findFirst({
      where: { nama: item.nama, jabatan: item.jabatan },
      select: { idPejabat: true },
    })
    if (ada) {
      await prisma.pejabat.update({
        where: { idPejabat: ada.idPejabat },
        data: {
          singkatan: item.singkatan,
          email: item.email,
          telepon: item.telepon,
          bidangJson: JSON.stringify(item.bidangList),
          fotoUrl: item.fotoUrl,
          urutan: item.urutan,
          aktif: item.aktif,
        },
      })
      console.log(`  ↻ Diperbarui: ${item.nama}`)
    } else {
      await prisma.pejabat.create({
        data: {
          nama: item.nama,
          jabatan: item.jabatan,
          singkatan: item.singkatan,
          email: item.email,
          telepon: item.telepon,
          bidangJson: JSON.stringify(item.bidangList),
          fotoUrl: item.fotoUrl,
          urutan: item.urutan,
          aktif: item.aktif,
        },
      })
      console.log(`  + Dibuat: ${item.nama}`)
    }
  }

  // ── SEED DOSEN ────────────────────────────────────────────────────────
  console.log("Seeding dosen...")
  for (const item of dataDosen) {
    const slug = buatSlug(item.nama)
    const ada = await prisma.dosen.findUnique({ where: { slug }, select: { idDosen: true } })
    if (ada) {
      await prisma.dosen.update({
        where: { idDosen: ada.idDosen },
        data: {
          nama: item.nama,
          gelar: item.gelar,
          jabatan: item.jabatan,
          bidangKeahlianJson: JSON.stringify(item.bidangKeahlianList),
          deskripsi: item.deskripsi,
          email: item.email,
          ruang: item.ruang,
          fotoUrl: item.fotoUrl,
          jurnalJson: JSON.stringify(item.jurnalList),
          urutan: item.urutan,
          aktif: item.aktif,
        },
      })
      console.log(`  ↻ Diperbarui: ${item.nama}`)
    } else {
      await prisma.dosen.create({
        data: {
          slug,
          nama: item.nama,
          gelar: item.gelar,
          jabatan: item.jabatan,
          bidangKeahlianJson: JSON.stringify(item.bidangKeahlianList),
          deskripsi: item.deskripsi,
          email: item.email,
          ruang: item.ruang,
          fotoUrl: item.fotoUrl,
          jurnalJson: JSON.stringify(item.jurnalList),
          urutan: item.urutan,
          aktif: item.aktif,
        },
      })
      console.log(`  + Dibuat: ${item.nama}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Seed Prisma selesai: admin, pejabat, dan dosen berhasil ditanamkan.")
  })
  .catch(async (error) => {
    console.error("Seed Prisma gagal:", error)
    await prisma.$disconnect()
    process.exit(1)
  })
