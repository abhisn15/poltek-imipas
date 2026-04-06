// Static search index — data yang tersedia dari sumber statis (bukan DB)
// Digunakan oleh API pencarian terpadu & komponen pencarian

export type HasilPencarian = {
  tipe: "berita" | "jurnal" | "dosen" | "blog" | "prodi"
  judul: string
  deskripsi: string
  href: string
  kategori?: string
  meta?: string
}

// ── Program Studi ───────────────────────────────────────────────────────────
export const indeksProdi: HasilPencarian[] = [
  {
    tipe: "prodi",
    judul: "Administrasi Keimigrasian",
    deskripsi:
      "Program studi yang mempersiapkan tenaga profesional dalam bidang administrasi keimigrasian, manajemen dokumen, dan layanan administratif di lingkungan imigrasi.",
    href: "/program-studi/administrasi-keimigrasian",
    kategori: "Imigrasi",
    meta: "administrasi dokumen prosedur imigrasi",
  },
  {
    tipe: "prodi",
    judul: "Hukum Keimigrasian",
    deskripsi:
      "Program studi yang fokus pada hukum keimigrasian, hukum internasional, dan legislasi imigrasi serta praktik penegakan hukum.",
    href: "/program-studi/hukum-keimigrasian",
    kategori: "Imigrasi",
    meta: "hukum imigrasi internasional legislasi penegakan",
  },
  {
    tipe: "prodi",
    judul: "Manajemen Teknologi Keimigrasian",
    deskripsi:
      "Program studi yang menggabungkan manajemen dengan teknologi informasi untuk mendukung operasional keimigrasian modern.",
    href: "/program-studi/manajemen-teknologi-keimigrasian",
    kategori: "Imigrasi",
    meta: "teknologi manajemen sistem informasi digital",
  },
  {
    tipe: "prodi",
    judul: "Teknik Pemasyarakatan",
    deskripsi:
      "Program studi yang mempelajari aspek teknis operasional lembaga pemasyarakatan, keamanan, dan sarana prasarana.",
    href: "/program-studi/teknik-pemasyarakatan",
    kategori: "Pemasyarakatan",
    meta: "teknik keamanan sarana prasarana lapas",
  },
  {
    tipe: "prodi",
    judul: "Bimbingan Pemasyarakatan",
    deskripsi:
      "Program studi yang fokus pada rehabilitasi, konseling, dan pendampingan warga binaan pemasyarakatan.",
    href: "/program-studi/bimbingan-pemasyarakatan",
    kategori: "Pemasyarakatan",
    meta: "bimbingan rehabilitasi konseling warga binaan reintegrasi",
  },
  {
    tipe: "prodi",
    judul: "Manajemen Pemasyarakatan",
    deskripsi:
      "Program studi yang mempersiapkan pemimpin dan manajer profesional di lingkungan lembaga pemasyarakatan.",
    href: "/program-studi/manajemen-pemasyarakatan",
    kategori: "Pemasyarakatan",
    meta: "manajemen kepemimpinan tata kelola lapas",
  },
]

// ── Dosen ────────────────────────────────────────────────────────────────────
export const indeksDosen: HasilPencarian[] = [
  {
    tipe: "dosen",
    judul: "Haryono, Dr., M.Si.",
    deskripsi:
      "Ketua Program Studi Manajemen Pemasyarakatan. Fokus riset pada efektivitas pembinaan berbasis kompetensi serta tata kelola pemasyarakatan modern.",
    href: "/profile/dosen/haryono",
    kategori: "Manajemen Pemasyarakatan",
    meta: "manajemen lapas pembinaan narapidana evaluasi program",
  },
  {
    tipe: "dosen",
    judul: "Ahmad Fauzi, M.T.",
    deskripsi:
      "Koordinator Laboratorium Teknologi Pemasyarakatan. Mengembangkan penerapan teknologi terintegrasi untuk keamanan dan efisiensi operasional.",
    href: "/profile/dosen/ahmad-fauzi",
    kategori: "Teknik Pemasyarakatan",
    meta: "IoT keamanan CCTV integrasi sistem teknologi",
  },
  {
    tipe: "dosen",
    judul: "Siti Rahayu, Dra., M.Hum.",
    deskripsi:
      "Dosen Senior Bimbingan Kemasyarakatan. Mendorong pendekatan rehabilitatif berbasis keluarga dan komunitas untuk menekan residivisme.",
    href: "/profile/dosen/siti-rahayu",
    kategori: "Bimbingan Kemasyarakatan",
    meta: "konseling rehabilitasi sosial anak berhadapan hukum",
  },
  {
    tipe: "dosen",
    judul: "Bambang Supriyadi, S.H., M.H.",
    deskripsi:
      "Dosen Kebijakan Pemasyarakatan. Riset kebijakan pemasyarakatan adaptif, termasuk evaluasi kebijakan pada kondisi darurat nasional.",
    href: "/profile/dosen/bambang-supriyadi",
    kategori: "Manajemen Pemasyarakatan",
    meta: "kebijakan publik hukum pemasyarakatan manajemen krisis",
  },
  {
    tipe: "dosen",
    judul: "Eko Prasetyo, S.T., M.Kom.",
    deskripsi:
      "Dosen Sistem Informasi Pemasyarakatan. Mengarahkan pengembangan platform analitik untuk pengambilan keputusan berbasis data.",
    href: "/profile/dosen/eko-prasetyo",
    kategori: "Teknik Pemasyarakatan",
    meta: "data analytics sistem monitoring transformasi digital",
  },
  {
    tipe: "dosen",
    judul: "Wulandari, Dr.",
    deskripsi:
      "Dosen Psikologi Pemasyarakatan. Mengembangkan metode assessment psikologis untuk program pembinaan yang lebih personal.",
    href: "/profile/dosen/wulandari",
    kategori: "Bimbingan Kemasyarakatan",
    meta: "psikologi forensik assessment risiko intervensi perilaku",
  },
]

// ── Jurnal ───────────────────────────────────────────────────────────────────
export const indeksJurnal: HasilPencarian[] = [
  {
    tipe: "jurnal",
    judul: "Analisis Efektivitas Program Pembinaan Narapidana di Lapas Kelas I",
    deskripsi:
      "Penelitian ini bertujuan untuk menganalisis efektivitas program pembinaan yang telah diimplementasikan di Lembaga Pemasyarakatan Kelas I.",
    href: "/jurnal/analisis-efektivitas-program-pembinaan-narapidana",
    kategori: "Manajemen Pemasyarakatan",
    meta: "Vol. 12 No. 1 · 2026 · Dr. Haryono, M.Si.",
  },
  {
    tipe: "jurnal",
    judul: "Penerapan Sistem Keamanan Berbasis IoT pada Lembaga Pemasyarakatan",
    deskripsi:
      "Penelitian ini mengkaji penerapan teknologi Internet of Things (IoT) dalam sistem keamanan lembaga pemasyarakatan.",
    href: "/jurnal/penerapan-sistem-keamanan-berbasis-iot",
    kategori: "Teknik Pemasyarakatan",
    meta: "Vol. 12 No. 1 · 2026 · Ahmad Fauzi, M.T.",
  },
  {
    tipe: "jurnal",
    judul: "Model Bimbingan Kemasyarakatan untuk Anak Berkonflik dengan Hukum",
    deskripsi:
      "Penelitian ini mengembangkan model bimbingan kemasyarakatan yang efektif untuk anak berkonflik dengan hukum.",
    href: "/jurnal/model-bimbingan-kemasyarakatan-anak-berkonflik-hukum",
    kategori: "Bimbingan Kemasyarakatan",
    meta: "Vol. 11 No. 2 · 2025 · Siti Rahayu, M.Hum.",
  },
  {
    tipe: "jurnal",
    judul: "Pendekatan Restorative Justice pada Pembinaan Berbasis Komunitas",
    deskripsi:
      "Kajian praktik pemulihan relasi sosial sebagai strategi pembinaan jangka panjang yang berkelanjutan.",
    href: "/jurnal/pendekatan-restorative-justice-pembinaan-komunitas",
    kategori: "Bimbingan Kemasyarakatan",
    meta: "Vol. 11 No. 2 · 2025 · Siti Rahayu, M.Hum.",
  },
  {
    tipe: "jurnal",
    judul: "Evaluasi Kebijakan Asimilasi dan Integrasi di Masa Pandemi",
    deskripsi:
      "Analisis kebijakan asimilasi terhadap keamanan, kesehatan, dan reintegrasi sosial narapidana.",
    href: "/jurnal/evaluasi-kebijakan-asimilasi-integrasi",
    kategori: "Manajemen Pemasyarakatan",
    meta: "Vol. 11 No. 1 · 2025 · Bambang Supriyadi, S.H.",
  },
  {
    tipe: "jurnal",
    judul: "Desain Dashboard Analitik Operasional Lapas Berbasis KPI",
    deskripsi:
      "Perancangan dashboard KPI untuk mempercepat evaluasi kinerja operasional harian lembaga pemasyarakatan.",
    href: "/jurnal/desain-dashboard-analitik-operasional-lapas",
    kategori: "Teknik Pemasyarakatan",
    meta: "Vol. 11 No. 1 · 2025 · Eko Prasetyo, M.Kom.",
  },
  {
    tipe: "jurnal",
    judul: "Model Assessment Risiko untuk Penyusunan Program Pembinaan Individual",
    deskripsi:
      "Pendekatan assessment multi-dimensi guna memetakan kebutuhan intervensi perilaku narapidana.",
    href: "/jurnal/model-assessment-risiko-program-pembinaan",
    kategori: "Bimbingan Kemasyarakatan",
    meta: "Vol. 12 No. 1 · 2026 · Dr. Wulandari",
  },
  {
    tipe: "jurnal",
    judul: "Strategi Integrasi Data Pemasyarakatan untuk Monitoring Terpadu",
    deskripsi:
      "Model integrasi lintas-unit untuk meningkatkan akurasi data dan percepatan respons operasional.",
    href: "/jurnal/strategi-integrasi-data-pemasyarakatan",
    kategori: "Teknik Pemasyarakatan",
    meta: "Vol. 10 No. 2 · 2024 · Eko Prasetyo, M.Kom.",
  },
]

// ── Blog ─────────────────────────────────────────────────────────────────────
export const indeksBlog: HasilPencarian[] = [
  {
    tipe: "blog",
    judul: "Transformasi Digital dalam Sistem Pemasyarakatan Indonesia",
    deskripsi:
      "Perkembangan teknologi digital membawa perubahan signifikan dalam tata kelola lembaga pemasyarakatan. Blog ini membahas tantangan dan peluang digitalisasi.",
    href: "/blog/transformasi-digital-sistem-pemasyarakatan",
    kategori: "Teknologi",
    meta: "Dr. Haryono, M.Si. · 2024",
  },
  {
    tipe: "blog",
    judul: "Pendekatan Humanis dalam Bimbingan Kemasyarakatan",
    deskripsi:
      "Menggali lebih dalam tentang pentingnya pendekatan humanis dalam proses rehabilitasi dan reintegrasi sosial bagi warga binaan.",
    href: "/blog/pendekatan-humanis-bimbingan-kemasyarakatan",
    kategori: "Pendidikan",
    meta: "Dra. Siti Rahayu, M.Hum. · 2024",
  },
  {
    tipe: "blog",
    judul: "Urgensi Pembaruan Regulasi Pemasyarakatan di Era Modern",
    deskripsi:
      "Mengkaji kebutuhan pembaruan regulasi pemasyarakatan untuk mengakomodasi perkembangan hukum dan hak asasi manusia secara global.",
    href: "/blog/urgensi-pembaruan-regulasi-pemasyarakatan",
    kategori: "Kebijakan",
    meta: "Bambang Supriyadi, S.H., M.H. · 2024",
  },
  {
    tipe: "blog",
    judul: "Inovasi Pembelajaran Vokasi di POLTEKIMIPAS",
    deskripsi:
      "Berbagai inovasi dalam metode pembelajaran vokasi yang diterapkan POLTEKIMIPAS untuk mempersiapkan taruna menghadapi dunia kerja.",
    href: "/blog/inovasi-pembelajaran-vokasi-poltekimipas",
    kategori: "Pendidikan",
    meta: "Dr. Haryono, M.Si. · 2024",
  },
  {
    tipe: "blog",
    judul: "Psikologi Forensik: Peran dan Tantangannya",
    deskripsi:
      "Memahami peran psikologi forensik dalam sistem peradilan pidana dan bagaimana ilmu ini mendukung program rehabilitasi.",
    href: "/blog/psikologi-forensik-peran-tantangan",
    kategori: "Psikologi",
    meta: "Dr. Wulandari · 2025",
  },
]

// ── Fungsi Pencarian ──────────────────────────────────────────────────────────

function cocokQuery(haystack: string, query: string): boolean {
  return haystack.toLowerCase().includes(query.toLowerCase())
}

export function cariDataStatis(query: string): HasilPencarian[] {
  if (!query || query.trim().length < 2) return []

  const q = query.trim()
  const semua: HasilPencarian[] = [
    ...indeksProdi,
    ...indeksDosen,
    ...indeksJurnal,
    ...indeksBlog,
  ]

  return semua.filter(
    (item) =>
      cocokQuery(item.judul, q) ||
      cocokQuery(item.deskripsi, q) ||
      cocokQuery(item.meta ?? "", q) ||
      cocokQuery(item.kategori ?? "", q),
  )
}
