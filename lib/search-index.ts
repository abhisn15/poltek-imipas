import { daftarDosen } from "@/lib/data-dosen"

export type JenisHasilPencarian =
  | "berita"
  | "blog"
  | "jurnal"
  | "perpustakaan"
  | "dosen"
  | "pejabat"
  | "halaman"

export type FilterJenisPencarian = JenisHasilPencarian | "semua"

export type ItemPencarian = {
  id: string
  jenis: JenisHasilPencarian
  judul: string
  deskripsi: string
  href: string
  meta: string
  kataKunci: string[]
}

export const LABEL_JENIS_PENCARIAN: Record<JenisHasilPencarian, string> = {
  berita: "Berita",
  blog: "Blog",
  jurnal: "Jurnal",
  perpustakaan: "Perpustakaan",
  dosen: "Dosen",
  pejabat: "Pejabat",
  halaman: "Halaman",
}

export const PILIHAN_FILTER_PENCARIAN: Array<{ value: FilterJenisPencarian; label: string }> = [
  { value: "semua", label: "Semua" },
  { value: "berita", label: "Berita" },
  { value: "blog", label: "Blog" },
  { value: "jurnal", label: "Jurnal" },
  { value: "perpustakaan", label: "Perpustakaan" },
  { value: "dosen", label: "Dosen" },
  { value: "pejabat", label: "Pejabat" },
  { value: "halaman", label: "Halaman" },
]

const indeksBlog: ItemPencarian[] = [
  {
    id: "blog-transformasi-digital",
    jenis: "blog",
    judul: "Transformasi Digital dalam Sistem Pemasyarakatan Indonesia",
    deskripsi:
      "Tulisan editorial tentang perubahan tata kelola pemasyarakatan melalui penerapan teknologi digital.",
    href: "/blog/transformasi-digital-sistem-pemasyarakatan",
    meta: "Blog · Teknologi · Dr. Haryono, M.Si.",
    kataKunci: ["digitalisasi", "teknologi", "pemasyarakatan", "smart prison"],
  },
  {
    id: "blog-pendekatan-humanis",
    jenis: "blog",
    judul: "Pendekatan Humanis dalam Bimbingan Kemasyarakatan",
    deskripsi:
      "Pembahasan pendekatan humanis untuk rehabilitasi, reintegrasi sosial, dan pembinaan berbasis empati.",
    href: "/blog/pendekatan-humanis-bimbingan-kemasyarakatan",
    meta: "Blog · Pendidikan · Dra. Siti Rahayu, M.Hum.",
    kataKunci: ["humanis", "rehabilitasi", "bimbingan", "kemasyarakatan"],
  },
]

const indeksJurnal: ItemPencarian[] = [
  {
    id: "jurnal-analisis-efektivitas",
    jenis: "jurnal",
    judul: "Analisis Efektivitas Program Pembinaan Narapidana di Lapas Kelas I",
    deskripsi:
      "Kajian efektivitas pembinaan narapidana beserta indikator perubahan perilaku dan reintegrasi sosial.",
    href: "/jurnal/analisis-efektivitas-program-pembinaan-narapidana",
    meta: "Jurnal · Manajemen Pemasyarakatan · 2026",
    kataKunci: ["pembinaan", "narapidana", "lapas", "efektivitas"],
  },
  {
    id: "jurnal-iot-keamanan",
    jenis: "jurnal",
    judul: "Penerapan Sistem Keamanan Berbasis IoT pada Lembaga Pemasyarakatan",
    deskripsi:
      "Implementasi IoT, sensor, dan monitoring real-time untuk peningkatan keamanan lembaga pemasyarakatan.",
    href: "/jurnal/penerapan-sistem-keamanan-berbasis-iot",
    meta: "Jurnal · Teknik Pemasyarakatan · 2026",
    kataKunci: ["iot", "keamanan", "monitoring", "teknologi"],
  },
  {
    id: "jurnal-bimbingan-anak",
    jenis: "jurnal",
    judul: "Model Bimbingan Kemasyarakatan untuk Anak Berkonflik dengan Hukum",
    deskripsi:
      "Model bimbingan terpadu untuk anak berkonflik hukum dengan fokus rehabilitasi dan penurunan residivitas.",
    href: "/jurnal/model-bimbingan-kemasyarakatan-anak-berkonflik-hukum",
    meta: "Jurnal · Bimbingan Kemasyarakatan · 2025",
    kataKunci: ["anak", "bimbingan", "rehabilitasi", "residivitas"],
  },
  {
    id: "jurnal-evaluasi-asimilasi",
    jenis: "jurnal",
    judul: "Evaluasi Kebijakan Asimilasi dan Integrasi di Masa Pandemi",
    deskripsi:
      "Analisis kebijakan asimilasi-integrasi, tantangan implementasi, dan dampak terhadap tata kelola pemasyarakatan.",
    href: "/jurnal/evaluasi-kebijakan-asimilasi-integrasi-pandemi",
    meta: "Jurnal · Manajemen Pemasyarakatan · 2025",
    kataKunci: ["asimilasi", "integrasi", "kebijakan", "pandemi"],
  },
  {
    id: "jurnal-optimalisasi-pengawasan",
    jenis: "jurnal",
    judul: "Optimalisasi Pengawasan Berbasis Teknologi di Balai Pemasyarakatan",
    deskripsi:
      "Pengawasan berbasis GPS, electronic monitoring, dan dashboard analitik untuk efisiensi operasional.",
    href: "/jurnal/optimalisasi-pengawasan-berbasis-teknologi-balai-pemasyarakatan",
    meta: "Jurnal · Teknik Pemasyarakatan · 2025",
    kataKunci: ["pengawasan", "gps", "electronic monitoring", "balai pemasyarakatan"],
  },
]

const indeksPerpustakaan: ItemPencarian[] = [
  {
    id: "buku-hukum-pemasyarakatan",
    jenis: "perpustakaan",
    judul: "Hukum Pemasyarakatan Indonesia: Teori dan Praktik",
    deskripsi: "Referensi komprehensif hukum pemasyarakatan dari aspek teoretis hingga implementasi praktis.",
    href: "/perpustakaan/hukum-pemasyarakatan-indonesia-teori-dan-praktik",
    meta: "Perpustakaan · Hukum Pemasyarakatan",
    kataKunci: ["hukum", "regulasi", "pemasyarakatan"],
  },
  {
    id: "buku-manajemen-lapas-modern",
    jenis: "perpustakaan",
    judul: "Manajemen Lembaga Pemasyarakatan Modern",
    deskripsi: "Panduan manajemen lembaga pemasyarakatan dengan pendekatan modern dan berbasis teknologi.",
    href: "/perpustakaan/manajemen-lembaga-pemasyarakatan-modern",
    meta: "Perpustakaan · Manajemen",
    kataKunci: ["manajemen", "operasional", "leadership"],
  },
  {
    id: "buku-teknologi-keamanan",
    jenis: "perpustakaan",
    judul: "Teknologi Keamanan untuk Lembaga Pemasyarakatan",
    deskripsi: "Eksplorasi IoT, AI, dan smart surveillance untuk peningkatan keamanan.",
    href: "/perpustakaan/teknologi-keamanan-lembaga-pemasyarakatan",
    meta: "Perpustakaan · Teknologi",
    kataKunci: ["iot", "ai", "surveillance", "keamanan"],
  },
  {
    id: "buku-modul-bimbingan",
    jenis: "perpustakaan",
    judul: "Modul Pelatihan Bimbingan Kemasyarakatan",
    deskripsi: "Modul praktis pembinaan dan konseling untuk rehabilitasi berbasis komunitas.",
    href: "/perpustakaan/modul-pelatihan-bimbingan-kemasyarakatan",
    meta: "Perpustakaan · Modul Pelatihan",
    kataKunci: ["bimbingan", "konseling", "pelatihan"],
  },
  {
    id: "buku-perspektif-ham",
    jenis: "perpustakaan",
    judul: "Sistem Pemasyarakatan: Perspektif HAM",
    deskripsi: "Analisis sistem pemasyarakatan dari sudut pandang hak asasi manusia.",
    href: "/perpustakaan/sistem-pemasyarakatan-perspektif-ham",
    meta: "Perpustakaan · Hukum Pemasyarakatan",
    kataKunci: ["ham", "hak asasi", "narapidana"],
  },
  {
    id: "buku-panduan-pengawasan",
    jenis: "perpustakaan",
    judul: "Panduan Teknis Pengawasan Lembaga Pemasyarakatan",
    deskripsi: "Panduan SOP dan praktik pengawasan untuk operasional lembaga pemasyarakatan.",
    href: "/perpustakaan/panduan-teknis-pengawasan-lembaga-pemasyarakatan",
    meta: "Perpustakaan · Modul Pelatihan",
    kataKunci: ["pengawasan", "sop", "operasional"],
  },
  {
    id: "buku-manajemen-sdm",
    jenis: "perpustakaan",
    judul: "Manajemen SDM di Lingkungan Pemasyarakatan",
    deskripsi: "Strategi pengelolaan SDM, pengembangan kompetensi, dan manajemen kinerja petugas.",
    href: "/perpustakaan/manajemen-sdm-lingkungan-pemasyarakatan",
    meta: "Perpustakaan · Manajemen",
    kataKunci: ["sdm", "kinerja", "pelatihan"],
  },
  {
    id: "buku-smart-surveillance",
    jenis: "perpustakaan",
    judul: "Smart Surveillance: Penerapan AI dalam Pengawasan",
    deskripsi: "Implementasi computer vision dan AI untuk sistem pengawasan modern.",
    href: "/perpustakaan/smart-surveillance-penerapan-ai-pengawasan",
    meta: "Perpustakaan · Teknologi",
    kataKunci: ["smart surveillance", "ai", "computer vision"],
  },
]

const indeksPejabat: ItemPencarian[] = [
  {
    id: "pejabat-andika",
    jenis: "pejabat",
    judul: "Prof. Dr. Andika Prasetyo, M.Si.",
    deskripsi: "Rektor POLTEKIMIPAS",
    href: "/profile/pimpinan",
    meta: "Pejabat · Rektor",
    kataKunci: ["rektor", "pimpinan", "pejabat"],
  },
  {
    id: "pejabat-rina",
    jenis: "pejabat",
    judul: "Dr. Rina Kartika, M.H.",
    deskripsi: "Wakil Rektor Bidang Akademik",
    href: "/profile/pimpinan",
    meta: "Pejabat · Wakil Rektor",
    kataKunci: ["wakil rektor", "akademik"],
  },
  {
    id: "pejabat-budi",
    jenis: "pejabat",
    judul: "Dr. Ir. Budi Santoso, M.T.",
    deskripsi: "Wakil Rektor Bidang Umum & Keuangan",
    href: "/profile/pimpinan",
    meta: "Pejabat · Wakil Rektor",
    kataKunci: ["wakil rektor", "keuangan", "umum"],
  },
  {
    id: "pejabat-maya",
    jenis: "pejabat",
    judul: "Dr. Maya Novitasari, M.Psi.",
    deskripsi: "Wakil Rektor Bidang Kemahasiswaan",
    href: "/profile/pimpinan",
    meta: "Pejabat · Wakil Rektor",
    kataKunci: ["wakil rektor", "kemahasiswaan"],
  },
  {
    id: "pejabat-arif",
    jenis: "pejabat",
    judul: "Brigjen (Purn.) H. Arif Nugroho, S.H.",
    deskripsi: "Direktur Pembinaan Taruna",
    href: "/profile/pimpinan",
    meta: "Pejabat · Direktur",
    kataKunci: ["direktur", "pembinaan", "taruna"],
  },
  {
    id: "pejabat-dwi",
    jenis: "pejabat",
    judul: "Dr. Dwi Kurniawan, M.Kom.",
    deskripsi: "Direktur Sistem Informasi & Inovasi",
    href: "/profile/pimpinan",
    meta: "Pejabat · Direktur",
    kataKunci: ["direktur", "sistem informasi", "inovasi"],
  },
]

const indeksHalaman: ItemPencarian[] = [
  {
    id: "halaman-beranda",
    jenis: "halaman",
    judul: "Beranda POLTEKIMIPAS",
    deskripsi: "Halaman utama berisi hero, tentang, berita, pengumuman, jurnal, perpustakaan, dan program studi.",
    href: "/",
    meta: "Halaman",
    kataKunci: ["beranda", "home", "poltekimipas"],
  },
  {
    id: "halaman-tentang",
    jenis: "halaman",
    judul: "Tentang, Visi Misi, dan Perjalanan POLTEKIMIPAS",
    deskripsi: "Profil institusi, visi, misi, serta sejarah perjalanan POLTEKIMIPAS.",
    href: "/#tentang",
    meta: "Halaman · Beranda",
    kataKunci: ["tentang", "visi", "misi", "sejarah", "perjalanan"],
  },
  {
    id: "halaman-profil-pejabat",
    jenis: "halaman",
    judul: "Profil Pejabat POLTEKIMIPAS",
    deskripsi: "Halaman profil pejabat kampus: rektor dan jajaran pimpinan.",
    href: "/profile/pimpinan",
    meta: "Halaman · Profil",
    kataKunci: ["profil", "pejabat", "pimpinan"],
  },
  {
    id: "halaman-profil-dosen",
    jenis: "halaman",
    judul: "Profil Dosen POLTEKIMIPAS",
    deskripsi: "Direktori dosen, bidang keahlian, dan publikasi jurnal.",
    href: "/profile/dosen",
    meta: "Halaman · Profil",
    kataKunci: ["profil", "dosen", "jurnal"],
  },
  {
    id: "halaman-galeri",
    jenis: "halaman",
    judul: "Galeri Kegiatan Kampus",
    deskripsi: "Dokumentasi kegiatan POLTEKIMIPAS.",
    href: "/galeri",
    meta: "Halaman",
    kataKunci: ["galeri", "foto", "kegiatan"],
  },
  {
    id: "halaman-pengumuman",
    jenis: "halaman",
    judul: "Pengumuman POLTEKIMIPAS",
    deskripsi: "Daftar pengumuman terbaru dan informasi penting kampus.",
    href: "/pengumuman",
    meta: "Halaman",
    kataKunci: ["pengumuman", "informasi", "penting"],
  },
  {
    id: "halaman-prodi-admim",
    jenis: "halaman",
    judul: "Program Studi Administrasi Keimigrasian",
    deskripsi: "Informasi program studi administrasi keimigrasian.",
    href: "/program-studi/administrasi-keimigrasian",
    meta: "Halaman · Program Studi",
    kataKunci: ["program studi", "imigrasi", "administrasi"],
  },
  {
    id: "halaman-prodi-hukum-imigrasi",
    jenis: "halaman",
    judul: "Program Studi Hukum Keimigrasian",
    deskripsi: "Informasi program studi hukum keimigrasian.",
    href: "/program-studi/hukum-keimigrasian",
    meta: "Halaman · Program Studi",
    kataKunci: ["program studi", "hukum", "imigrasi"],
  },
  {
    id: "halaman-prodi-mtk",
    jenis: "halaman",
    judul: "Program Studi Manajemen Teknologi Keimigrasian",
    deskripsi: "Informasi program studi manajemen teknologi keimigrasian.",
    href: "/program-studi/manajemen-teknologi-keimigrasian",
    meta: "Halaman · Program Studi",
    kataKunci: ["program studi", "manajemen", "teknologi", "imigrasi"],
  },
  {
    id: "halaman-prodi-teknik-pas",
    jenis: "halaman",
    judul: "Program Studi Teknik Pemasyarakatan",
    deskripsi: "Informasi program studi teknik pemasyarakatan.",
    href: "/program-studi/teknik-pemasyarakatan",
    meta: "Halaman · Program Studi",
    kataKunci: ["program studi", "teknik", "pemasyarakatan"],
  },
  {
    id: "halaman-prodi-bimkem",
    jenis: "halaman",
    judul: "Program Studi Bimbingan Pemasyarakatan",
    deskripsi: "Informasi program studi bimbingan pemasyarakatan.",
    href: "/program-studi/bimbingan-pemasyarakatan",
    meta: "Halaman · Program Studi",
    kataKunci: ["program studi", "bimbingan", "pemasyarakatan"],
  },
  {
    id: "halaman-prodi-manpas",
    jenis: "halaman",
    judul: "Program Studi Manajemen Pemasyarakatan",
    deskripsi: "Informasi program studi manajemen pemasyarakatan.",
    href: "/program-studi/manajemen-pemasyarakatan",
    meta: "Halaman · Program Studi",
    kataKunci: ["program studi", "manajemen", "pemasyarakatan"],
  },
]

export function ambilIndexPencarianStatis(): ItemPencarian[] {
  const indeksDosen: ItemPencarian[] = daftarDosen.map((dosen) => ({
    id: `dosen-${dosen.slug}`,
    jenis: "dosen",
    judul: `${dosen.gelar} ${dosen.nama}`.trim(),
    deskripsi: dosen.jabatan,
    href: `/profile/dosen/${dosen.slug}`,
    meta: "Dosen",
    kataKunci: [dosen.nama, dosen.gelar, dosen.jabatan, ...dosen.bidangKeahlian],
  }))

  const indeksJurnalDosen: ItemPencarian[] = daftarDosen.flatMap((dosen) =>
    dosen.jurnal.map((jurnal) => ({
      id: `jurnal-dosen-${dosen.slug}-${jurnal.id}`,
      jenis: "jurnal" as const,
      judul: jurnal.judul,
      deskripsi: `${jurnal.ringkasan} Ditulis oleh ${dosen.nama}.`,
      href: `/profile/dosen/${dosen.slug}`,
      meta: `Jurnal Dosen · ${jurnal.program} · ${jurnal.tahun}`,
      kataKunci: [jurnal.program, jurnal.tahun, dosen.nama, ...dosen.bidangKeahlian],
    })),
  )

  return [
    ...indeksHalaman,
    ...indeksBlog,
    ...indeksJurnal,
    ...indeksPerpustakaan,
    ...indeksPejabat,
    ...indeksDosen,
    ...indeksJurnalDosen,
  ]
}

export function normalisasiTeksPencarian(teks: string): string {
  return teks
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
}

export function pecahTokenKueri(kueri: string): string[] {
  return normalisasiTeksPencarian(kueri)
    .split(" ")
    .map((item) => item.trim())
    .filter(Boolean)
}

export function hitungSkorRelevansi(item: ItemPencarian, kueri: string): number {
  const tokens = pecahTokenKueri(kueri)
  if (tokens.length === 0) {
    return 0
  }

  const judul = normalisasiTeksPencarian(item.judul)
  const deskripsi = normalisasiTeksPencarian(item.deskripsi)
  const meta = normalisasiTeksPencarian(item.meta)
  const kataKunci = normalisasiTeksPencarian(item.kataKunci.join(" "))

  let skor = 0

  for (const token of tokens) {
    let skorToken = 0

    if (judul.startsWith(token)) skorToken = Math.max(skorToken, 20)
    if (judul.includes(token)) skorToken = Math.max(skorToken, 14)
    if (deskripsi.includes(token)) skorToken = Math.max(skorToken, 9)
    if (meta.includes(token)) skorToken = Math.max(skorToken, 7)
    if (kataKunci.includes(token)) skorToken = Math.max(skorToken, 10)

    if (skorToken === 0) {
      return 0
    }

    skor += skorToken
  }

  const kueriNormal = normalisasiTeksPencarian(kueri)
  if (kueriNormal && judul.includes(kueriNormal)) {
    skor += 10
  }
  if (kueriNormal && kataKunci.includes(kueriNormal)) {
    skor += 6
  }

  return skor
}
