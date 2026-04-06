export type JurnalDosen = {
  id: number
  judul: string
  tahun: string
  program: string
  ringkasan: string
  pdfUrl: string
}

export type ProfilDosen = {
  slug: string
  nama: string
  gelar: string
  jabatan: string
  bidangKeahlian: string[]
  deskripsi: string
  email: string
  ruang: string
  fotoUrl?: string | null
  jurnal: JurnalDosen[]
}

const PDF_DUMMY_URL = "/pdfs/pratinjau-jurnal.pdf"

export const daftarDosen: ProfilDosen[] = [
  {
    slug: "haryono",
    nama: "Haryono",
    gelar: "Dr., M.Si.",
    jabatan: "Ketua Program Studi Manajemen Pemasyarakatan",
    bidangKeahlian: ["Manajemen Lapas", "Pembinaan Narapidana", "Evaluasi Program"],
    deskripsi:
      "Fokus riset pada efektivitas pembinaan berbasis kompetensi serta tata kelola pemasyarakatan modern.",
    email: "haryono@poltekimipas.ac.id",
    ruang: "Gedung A, Ruang 2.13",
    fotoUrl: null,
    jurnal: [
      {
        id: 101,
        judul: "Analisis Efektivitas Program Pembinaan Narapidana di Lapas Kelas I",
        tahun: "2026",
        program: "Manajemen Pemasyarakatan",
        ringkasan: "Kajian dampak program pembinaan terhadap perubahan perilaku dan kesiapan reintegrasi sosial.",
        pdfUrl: PDF_DUMMY_URL,
      },
      {
        id: 102,
        judul: "Model Monitoring Reintegrasi Narapidana Berbasis Indikator Kinerja",
        tahun: "2025",
        program: "Manajemen Pemasyarakatan",
        ringkasan: "Pengembangan kerangka pemantauan pasca-bebas dengan indikator terukur.",
        pdfUrl: PDF_DUMMY_URL,
      },
    ],
  },
  {
    slug: "ahmad-fauzi",
    nama: "Ahmad Fauzi",
    gelar: "M.T.",
    jabatan: "Koordinator Laboratorium Teknologi Pemasyarakatan",
    bidangKeahlian: ["IoT Keamanan", "CCTV Cerdas", "Integrasi Sistem"],
    deskripsi:
      "Mengembangkan penerapan teknologi terintegrasi untuk penguatan keamanan dan efisiensi operasional.",
    email: "ahmad.fauzi@poltekimipas.ac.id",
    ruang: "Gedung B, Ruang Lab 1",
    fotoUrl: null,
    jurnal: [
      {
        id: 201,
        judul: "Penerapan Sistem Keamanan Berbasis IoT pada Lembaga Pemasyarakatan",
        tahun: "2026",
        program: "Teknik Pemasyarakatan",
        ringkasan: "Implementasi sensor, AI kamera, dan dashboard real-time untuk deteksi dini insiden.",
        pdfUrl: PDF_DUMMY_URL,
      },
      {
        id: 202,
        judul: "Optimalisasi Pengawasan Berbasis Teknologi di Balai Pemasyarakatan",
        tahun: "2025",
        program: "Teknik Pemasyarakatan",
        ringkasan: "Efektivitas GPS tracking dan electronic monitoring pada pengawasan klien pemasyarakatan.",
        pdfUrl: PDF_DUMMY_URL,
      },
    ],
  },
  {
    slug: "siti-rahayu",
    nama: "Siti Rahayu",
    gelar: "Dra., M.Hum.",
    jabatan: "Dosen Senior Bimbingan Kemasyarakatan",
    bidangKeahlian: ["Konseling Pemasyarakatan", "Rehabilitasi Sosial", "Anak Berhadapan Hukum"],
    deskripsi:
      "Mendorong pendekatan rehabilitatif berbasis keluarga dan komunitas untuk menekan residivisme.",
    email: "siti.rahayu@poltekimipas.ac.id",
    ruang: "Gedung C, Ruang 1.07",
    fotoUrl: null,
    jurnal: [
      {
        id: 301,
        judul: "Model Bimbingan Kemasyarakatan untuk Anak Berkonflik dengan Hukum",
        tahun: "2025",
        program: "Bimbingan Kemasyarakatan",
        ringkasan: "Perancangan model intervensi komprehensif untuk menurunkan tingkat pengulangan tindak pidana.",
        pdfUrl: PDF_DUMMY_URL,
      },
      {
        id: 302,
        judul: "Pendekatan Restorative Justice pada Pembinaan Berbasis Komunitas",
        tahun: "2024",
        program: "Bimbingan Kemasyarakatan",
        ringkasan: "Kajian praktik pemulihan relasi sosial sebagai strategi pembinaan jangka panjang.",
        pdfUrl: PDF_DUMMY_URL,
      },
    ],
  },
  {
    slug: "bambang-supriyadi",
    nama: "Bambang Supriyadi",
    gelar: "S.H., M.H.",
    jabatan: "Dosen Kebijakan Pemasyarakatan",
    bidangKeahlian: ["Kebijakan Publik", "Hukum Pemasyarakatan", "Manajemen Krisis"],
    deskripsi:
      "Riset kebijakan pemasyarakatan adaptif, termasuk evaluasi kebijakan pada kondisi darurat nasional.",
    email: "bambang.supriyadi@poltekimipas.ac.id",
    ruang: "Gedung A, Ruang 3.05",
    fotoUrl: null,
    jurnal: [
      {
        id: 401,
        judul: "Evaluasi Kebijakan Asimilasi dan Integrasi di Masa Pandemi",
        tahun: "2025",
        program: "Manajemen Pemasyarakatan",
        ringkasan: "Analisis kebijakan asimilasi terhadap keamanan, kesehatan, dan reintegrasi sosial.",
        pdfUrl: PDF_DUMMY_URL,
      },
      {
        id: 402,
        judul: "Kerangka Tata Kelola Krisis pada Lembaga Pemasyarakatan",
        tahun: "2024",
        program: "Manajemen Pemasyarakatan",
        ringkasan: "Rekomendasi model respons kelembagaan untuk situasi krisis berisiko tinggi.",
        pdfUrl: PDF_DUMMY_URL,
      },
    ],
  },
  {
    slug: "eko-prasetyo",
    nama: "Eko Prasetyo",
    gelar: "S.T., M.Kom.",
    jabatan: "Dosen Sistem Informasi Pemasyarakatan",
    bidangKeahlian: ["Data Analytics", "Sistem Monitoring", "Transformasi Digital"],
    deskripsi:
      "Mengarahkan pengembangan platform analitik untuk mendukung pengambilan keputusan berbasis data.",
    email: "eko.prasetyo@poltekimipas.ac.id",
    ruang: "Gedung B, Ruang 2.09",
    fotoUrl: null,
    jurnal: [
      {
        id: 501,
        judul: "Desain Dashboard Analitik Operasional Lapas Berbasis KPI",
        tahun: "2025",
        program: "Teknik Pemasyarakatan",
        ringkasan: "Perancangan dashboard KPI untuk mempercepat evaluasi kinerja operasional harian.",
        pdfUrl: PDF_DUMMY_URL,
      },
      {
        id: 502,
        judul: "Strategi Integrasi Data Pemasyarakatan untuk Monitoring Terpadu",
        tahun: "2024",
        program: "Teknik Pemasyarakatan",
        ringkasan: "Model integrasi lintas-unit untuk meningkatkan akurasi data dan percepatan respons.",
        pdfUrl: PDF_DUMMY_URL,
      },
    ],
  },
  {
    slug: "wulandari",
    nama: "Wulandari",
    gelar: "Dr.",
    jabatan: "Dosen Psikologi Pemasyarakatan",
    bidangKeahlian: ["Psikologi Forensik", "Assessment Risiko", "Intervensi Perilaku"],
    deskripsi:
      "Mengembangkan metode assessment psikologis untuk mendukung program pembinaan yang lebih personal.",
    email: "wulandari@poltekimipas.ac.id",
    ruang: "Gedung C, Ruang 2.11",
    fotoUrl: null,
    jurnal: [
      {
        id: 601,
        judul: "Model Assessment Risiko untuk Penyusunan Program Pembinaan Individual",
        tahun: "2026",
        program: "Bimbingan Kemasyarakatan",
        ringkasan: "Pendekatan assessment multi-dimensi guna memetakan kebutuhan intervensi perilaku.",
        pdfUrl: PDF_DUMMY_URL,
      },
      {
        id: 602,
        judul: "Pendekatan Behavioral Coaching pada Narapidana Usia Produktif",
        tahun: "2025",
        program: "Bimbingan Kemasyarakatan",
        ringkasan: "Efektivitas coaching perilaku dalam peningkatan disiplin dan kesiapan kerja.",
        pdfUrl: PDF_DUMMY_URL,
      },
    ],
  },
]

export function ambilProfilDosen(slug: string) {
  return daftarDosen.find((item) => item.slug === slug) ?? null
}

