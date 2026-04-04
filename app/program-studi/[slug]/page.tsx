"use client"

import { useState, useEffect } from "react"
import { Shield, Wrench, Users, ArrowLeft, ArrowRight, BookOpen, Award, Clock, Users2, MapPin, Phone, Mail, FileText, Download, CheckCircle, Target, TrendingUp, UserCheck } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const programDetails = {
  "administrasi-keimigrasian": {
    icon: FileText,
    title: "Administrasi Keimigrasian",
    subtitle: "Program Studi Unggulan dengan Akreditasi Baik",
    description:
      "Program studi Administrasi Keimigrasian dirancang untuk menghasilkan tenaga profesional yang kompeten dalam bidang administrasi keimigrasian, manajemen dokumen, dan layanan administratif di lingkungan imigrasi.",
    akreditasi: "Terakreditasi Baik",
    durasi: "4 Tahun (8 Semester)",
    kuota: 120,
    jenjang: "Diploma IV (Sarjana Terapan)",
    gelar: "S.Tr.Im (Sarjana Terapan Imigrasi)",
    
    visi: "Menjadi program studi unggulan dalam pengembangan ilmu pengetahuan dan teknologi di bidang administrasi keimigrasian yang berintegritas, inovatif, dan berwawasan global pada tahun 2030.",
    
    misi: [
      "Menyelenggarakan pendidikan vokasi yang berkualitas dalam bidang administrasi keimigrasian",
      "Mengembangkan penelitian applied research yang berkontribusi pada kemajuan dunia keimigrasian",
      "Melaksanakan pengabdian kepada masyarakat dalam rangka meningkatkan kualitas layanan keimigrasian",
      "Membangun jaringan kerjasama dengan institusi keimigrasian dan industri terkait"
    ],
    
    kompetensi: [
      {
        title: "Kompetensi Inti",
        items: [
          "Administrasi Keimigrasian",
          "Manajemen Dokumen",
          "Layanan Administratif",
          "Prosedur Imigrasi"
        ]
      },
      {
        title: "Kompetensi Pendukung",
        items: [
          "Kepemimpinan dan Manajemen SDM",
          "Analisis Sistem Keimigrasian",
          "Evaluasi Program Keimigrasian",
          "Manajemen Risiko dan Keamanan"
        ]
      }
    ],
    
    kurikulum: [
      "Pengantar Administrasi Keimigrasian",
      "Hukum Keimigrasian",
      "Prosedur Imigrasi",
      "Manajemen Dokumen Perjalanan",
      "Sistem Informasi Keimigrasian",
      "Etika Profesi Keimigrasian",
      "Praktik Kerja Lapangan"
    ],
    
    prospek: [
      "Staf Administrasi Keimigrasian",
      "Analis Keimigrasian",
      "Manajemen Layanan Keimigrasian",
      "Staf Kantor Imigrasi",
      "Konsultan Keimigrasian"
    ],
    
    fasilitas: [
      "Laboratorium Administrasi Keimigrasian",
      "Ruang Simulasi Prosedur Imigrasi",
      "Sistem Informasi Keimigrasian",
      "Perpustakaan Khusus Keimigrasian",
      "Ruang Praktik Administratif"
    ],
    
    biaya: {
      spp: "Rp 450.000/semester",
      praktik: "Rp 600.000/semester",
      alat: "Rp 1.800.000 (sekali)",
      total: "Rp 5.100.000/tahun"
    },
    
    kontak: {
      email: "administrasi@poltekimipas.ac.id",
      telepon: "(021) 1234-5676",
      lokasi: "Gedung A, Lantai 1"
    }
  },
  "hukum-keimigrasian": {
    icon: Shield,
    title: "Hukum Keimigrasian",
    subtitle: "Program Studi Unggulan dengan Akreditasi Baik",
    description:
      "Program studi Hukum Keimigrasian dirancang untuk menghasilkan sarjana hukum yang kompeten dalam bidang hukum keimigrasian, hukum internasional, dan praktik penegakan hukum di bidang keimigrasian.",
    akreditasi: "Terakreditasi Baik",
    durasi: "4 Tahun (8 Semester)",
    kuota: 115,
    jenjang: "Diploma IV (Sarjana Terapan)",
    gelar: "S.Tr.Hk (Sarjana Terapan Hukum)",
    
    visi: "Menjadi program studi unggulan dalam pengembangan ilmu hukum keimigrasian yang berintegritas, inovatif, dan berwawasan global pada tahun 2030.",
    
    misi: [
      "Menyelenggarakan pendidikan hukum keimigrasian yang berkualitas",
      "Mengembangkan penelitian hukum keimigrasian yang berkontribusi",
      "Melaksanakan pengabdian kepada masyarakat dalam bidang hukum",
      "Membangun jaringan kerjasama dengan institusi hukum dan keimigrasian"
    ],
    
    kompetensi: [
      {
        title: "Kompetensi Inti",
        items: [
          "Hukum Imigrasi",
          "Hukum Internasional",
          "Legislasi Imigrasi",
          "Praktik Penegakan Hukum"
        ]
      },
      {
        title: "Kompetensi Pendukung",
        items: [
          "Analisis Kebijakan Imigrasi",
          "Prosedur Hukum Imigrasi",
          "Hukum Administrasi Imigrasi",
          "Etika Profesi Hukum"
        ]
      }
    ],
    
    kurikulum: [
      "Pengantar Hukum Keimigrasian",
      "Hukum Internasional Imigrasi",
      "Hukum Administrasi Imigrasi",
      "Prosedur Imigrasi Indonesia",
      "Hukum Keimigrasian Umum",
      "Praktik Peradilan Semu",
      "Etika Profesi Hukum"
    ],
    
    prospek: [
      "Praktik Hukum Keimigrasian",
      "Analis Kebijakan Imigrasi",
      "Staf Hukum di Kedutaan/Konsulat",
      "Advokat Imigrasi",
      "Jaksa"
    ],
    
    fasilitas: [
      "Laboratorium Hukum Keimigrasian",
      "Ruang Peradilan Semu",
      "Perpustakaan Hukum Internasional",
      "Ruang Sidang",
      "Database Legislasi Imigrasi"
    ],
    
    biaya: {
      spp: "Rp 500.000/semester",
      praktik: "Rp 700.000/semester",
      alat: "Rp 2.000.000 (sekali)",
      total: "Rp 5.400.000/tahun"
    },
    
    kontak: {
      email: "hukum@poltekimipas.ac.id",
      telepon: "(021) 1234-5677",
      lokasi: "Gedung A, Lantai 2"
    }
  },
  "manajemen-teknologi-keimigrasian": {
    icon: Users2,
    title: "Manajemen Teknologi Keimigrasian",
    subtitle: "Program Studi Unggulan dengan Akreditasi Baik",
    description:
      "Program studi Manajemen Teknologi Keimigrasian dirancang untuk menghasilkan manajer yang mampu mengintegrasikan teknologi informasi dalam operasional keimigrasian modern.",
    akreditasi: "Terakreditasi Baik",
    durasi: "4 Tahun (8 Semester)",
    kuota: 110,
    jenjang: "Diploma IV (Sarjana Terapan)",
    gelar: "S.Tr.TI (Sarjana Terapan Teknologi Informasi)",
    
    visi: "Menjadi program studi unggulan dalam pengembangan teknologi informasi keimigrasian yang berintegritas, inovatif, dan berwawasan global pada tahun 2030.",
    
    misi: [
      "Menyelenggarakan pendidikan manajemen TI keimigrasian yang berkualitas",
      "Mengembangkan penelitian TI keimigrasian yang berkontribusi",
      "Melaksanakan pengabdian kepada masyarakat dalam bidang TI",
      "Membangun jaringan kerjasama dengan institusi TI dan keimigrasian"
    ],
    
    kompetensi: [
      {
        title: "Kompetensi Inti",
        items: [
          "Manajemen TI",
          "Sistem Informasi Keimigrasian",
          "Teknologi Operasional",
          "Digital Imigrasi"
        ]
      },
      {
        title: "Kompetensi Pendukung",
        items: [
          "Basis Data Keimigrasian",
          "Manajemen Proyek TI",
          "Keamanan Siber Keimigrasian",
          "Analisis Sistem"
        ]
      }
    ],
    
    kurikulum: [
      "Sistem Informasi Manajemen",
      "Teknologi Operasional Keimigrasian",
      "Basis Data Keimigrasian",
      "Manajemen Proyek TI",
      "Keamanan Siber Keimigrasian",
      "Digital Imigrasi",
      "Etika Profesi TI"
    ],
    
    prospek: [
      "Manajer Sistem Informasi Keimigrasian",
      "Analis Kebijakan Imigrasi Digital",
      "Manajemen Operasional Keimigrasian",
      "Kepala Kantor Imigrasi",
      "Konsultan Teknologi Keimigrasian"
    ],
    
    fasilitas: [
      "Laboratorium Sistem Informasi",
      "Rangkaian Jaringan Keimigrasian",
      "Cloud Computing Lab",
      "Database Server",
      "Ruang Praktik TI"
    ],
    
    biaya: {
      spp: "Rp 550.000/semester",
      praktik: "Rp 800.000/semester",
      alat: "Rp 2.500.000 (sekali)",
      total: "Rp 6.300.000/tahun"
    },
    
    kontak: {
      email: "ti@poltekimipas.ac.id",
      telepon: "(021) 1234-5675",
      lokasi: "Gedung A, Lantai 3"
    }
  },
  "manajemen-pemasyarakatan": {
    icon: Shield,
    title: "D-IV Manajemen Pemasyarakatan",
    subtitle: "Program Studi Unggulan dengan Akreditasi Baik Sekali",
    description:
      "Program studi D-IV Manajemen Pemasyarakatan dirancang untuk menghasilkan tenaga profesional yang kompeten dalam bidang manajemen lembaga pemasyarakatan, pengelolaan warga binaan, dan administrasi pemasyarakatan secara komprehensif.",
    akreditasi: "Terakreditasi Baik Sekali",
    durasi: "4 Tahun (8 Semester)",
    kuota: 120,
    jenjang: "Diploma IV (Sarjana Terapan)",
    gelar: "S.Tr.PK (Sarjana Terapan Pemasyarakatan)",
    
    visi: "Menjadi program studi unggulan dalam pengembangan ilmu pengetahuan dan teknologi di bidang manajemen pemasyarakatan yang berintegritas, inovatif, dan berwawasan global pada tahun 2030.",
    
    misi: [
      "Menyelenggarakan pendidikan vokasi yang berkualitas dalam bidang manajemen pemasyarakatan",
      "Mengembangkan penelitian applied research yang berkontribusi pada kemajuan dunia pemasyarakatan",
      "Melaksanakan pengabdian kepada masyarakat dalam rangka meningkatkan kualitas layanan pemasyarakatan",
      "Membangun jaringan kerjasama dengan institusi pemasyarakatan dan industri terkait"
    ],
    
    kompetensi: [
      {
        title: "Kompetensi Inti",
        items: [
          "Manajemen Lembaga Pemasyarakatan",
          "Administrasi dan Kearsipan Pemasyarakatan",
          "Pengelolaan Warga Binaan",
          "Kebijakan dan Regulasi Pemasyarakatan"
        ]
      },
      {
        title: "Kompetensi Pendukung",
        items: [
          "Kepemimpinan dan Manajemen SDM",
          "Analisis Sistem Pemasyarakatan",
          "Evaluasi Program Pembinaan",
          "Manajemen Risiko dan Keamanan"
        ]
      }
    ],
    
    kurikulum: [
      "Semester 1-2: Mata Kuliah Dasar (Pengantar Hukum, Sistem Pemasyarakatan, Manajemen Umum)",
      "Semester 3-4: Mata Kuliah Inti (Manajemen LP, Administrasi Pemasyarakatan, Pembinaan Warga Binaan)",
      "Semester 5-6: Mata Kuliah Lanjutan (Kebijakan Publik, Manajemen SDM, Evaluasi Program)",
      "Semester 7-8: Magang dan Tugas Akhir"
    ],
    
    fasilitas: [
      "Ruang Kelas Ber-AC dan Multimedia",
      "Laboratorium Manajemen Pemasyarakatan",
      "Perpustakaan Digital dan Fisik",
      "Simulasi Lembaga Pemasyarakatan",
      "Ruang Diskusi dan Seminar",
      "Hotspot Area dan E-Learning"
    ],
    
    prospek: [
      "Kepala Lembaga Pemasyarakatan",
      "Kepala Subsi Administrasi",
      "Kepala Urusan Pembinaan",
      "Analis Kebijakan Pemasyarakatan",
      "Manajer SDM Pemasyarakatan",
      "Konsultan Pemasyarakatan"
    ],
    
    biaya: {
      spp: "Rp 500.000/semester",
      praktik: "Rp 750.000/semester",
      alat: "Rp 2.000.000 (sekali)",
      total: "Rp 6.000.000/tahun"
    },
    
    kontak: {
      email: "manajemen@poltekimipas.ac.id",
      telepon: "(021) 1234-5678",
      lokasi: "Gedung A, Lantai 3"
    }
  },
  
  "teknik-pemasyarakatan": {
    icon: Wrench,
    title: "D-IV Teknik Pemasyarakatan",
    subtitle: "Program Studi Inovatif dengan Fokus Teknologi Keamanan",
    description:
      "Program studi D-IV Teknik Pemasyarakatan berfokus pada penguasaan teknologi keamanan, sistem pengawasan modern, dan teknik pengelolaan fasilitas pemasyarakatan yang efektif dan efisien.",
    akreditasi: "Terakreditasi Baik Sekali",
    durasi: "4 Tahun (8 Semester)",
    kuota: 115,
    jenjang: "Diploma IV (Sarjana Terapan)",
    gelar: "S.Tr.TK (Sarjana Terapan Teknik)",
    
    visi: "Menjadi program studi terdepan dalam pengembangan teknologi dan rekayasa bidang keamanan pemasyarakatan yang mendukung sistem pemasyarakatan modern dan berkelanjutan.",
    
    misi: [
      "Menyelenggarakan pendidikan vokasi teknologi pemasyarakatan yang berkualitas",
      "Mengembangkan inovasi teknologi keamanan dan pengawasan pemasyarakatan",
      "Melaksanakan penelitian applied research di bidang teknik pemasyarakatan",
      "Membangun kerjasama dengan industri teknologi dan institusi pemasyarakatan"
    ],
    
    kompetensi: [
      {
        title: "Kompetensi Inti",
        items: [
          "Teknologi Keamanan Pemasyarakatan",
          "Sistem Pengawasan Modern",
          "Teknik Fasilitas Pemasyarakatan",
          "Maintenance Alat Pengaman"
        ]
      },
      {
        title: "Kompetensi Pendukung",
        items: [
          "Desain Sistem Keamanan",
          "Analisis Risiko Teknis",
          "IoT untuk Pemasyarakatan",
          "Manajemen Proyek Teknik"
        ]
      }
    ],
    
    kurikulum: [
      "Semester 1-2: Mata Kuliah Dasar (Fisika, Matematika, Dasar Teknik, Pengantar Pemasyarakatan)",
      "Semester 3-4: Mata Kuliah Inti (Teknik Keamanan, Sistem Kontrol, Elektronika)",
      "Semester 5-6: Mata Kuliah Lanjutan (IoT, CCTV, Biometrik, Manajemen Fasilitas)",
      "Semester 7-8: Magang dan Tugas Akhir"
    ],
    
    fasilitas: [
      "Laboratorium Teknik Keamanan",
      "Workshop Pemeliharaan Alat",
      "Lab Elektronika dan IoT",
      "Simulasi Fasilitas Pemasyarakatan",
      "Ruang Praktik Teknik",
      "Studio Desain Teknik"
    ],
    
    prospek: [
      "Kepala Subsi Keamanan",
      "Teknisi Alat Pengaman",
      "Analis Sistem Keamanan",
      "Manajer Fasilitas Pemasyarakatan",
      "Konsultan Teknik Pemasyarakatan",
      "Wirausahawan Teknologi Keamanan"
    ],
    
    biaya: {
      spp: "Rp 600.000/semester",
      praktik: "Rp 1.000.000/semester",
      alat: "Rp 3.500.000 (sekali)",
      total: "Rp 6.600.000/tahun"
    },
    
    kontak: {
      email: "teknik@poltekimipas.ac.id",
      telepon: "(021) 1234-5679",
      lokasi: "Gedung B, Lantai 2"
    }
  },
  
  "bimbingan-pemasyarakatan": {
    icon: UserCheck,
    title: "D-IV Bimbingan Pemasyarakatan",
    subtitle: "Program Studi Unggulan dengan Akreditasi Baik",
    description:
      "Program studi Bimbingan Pemasyarakatan dirancang untuk menghasilkan tenaga ahli dalam bidang pembimbingan dan pendampingan klien pemasyarakatan, rehabilitasi sosial, dan reintegrasi masyarakat.",
    akreditasi: "Terakreditasi Baik",
    durasi: "4 Tahun (8 Semester)",
    kuota: 115,
    jenjang: "Diploma IV (Sarjana Terapan)",
    gelar: "S.Tr.Ps (Sarjana Terapan Pemasyarakatan)",
    
    visi: "Menjadi program studi unggulan dalam pengembangan ilmu pengetahuan dan teknologi di bidang bimbingan pemasyarakatan yang berintegritas, inovatif, dan berwawasan global pada tahun 2030.",
    
    misi: [
      "Menyelenggarakan pendidikan vokasi yang berkualitas dalam bidang bimbingan pemasyarakatan",
      "Mengembangkan penelitian applied research yang berkontribusi pada kemajuan dunia pemasyarakatan",
      "Melaksanakan pengabdian kepada masyarakat dalam rangka meningkatkan kualitas layanan bimbingan",
      "Membangun jaringan kerjasama dengan institusi pemasyarakatan dan lembaga terkait"
    ],
    
    kompetensi: [
      {
        title: "Kompetensi Inti",
        items: [
          "Bimbingan dan Konseling",
          "Rehabilitasi Sosial",
          "Reintegrasi Masyarakat",
          "Psikologi Pemasyarakatan"
        ]
      },
      {
        title: "Kompetensi Pendukung",
        items: [
          "Teknik Konseling Individual",
          "Manajemen Kasus",
          "Assessment Psikologis",
          "Program Intervensi"
        ]
      }
    ],
    
    kurikulum: [
      "Psikologi Pemasyarakatan",
      "Teknik Bimbingan Konseling",
      "Rehabilitasi Sosial",
      "Manajemen Kasus",
      "Psikologi Kriminal",
      "Etika Profesi Bimbingan",
      "Metode Penelitian Sosial",
      "Praktikum Bimbingan"
    ],
    
    prospek: [
      "Pembimbing Narapidana",
      "Konselor Rehabilitasi Sosial",
      "Staf Lembaga Pemasyarakatan",
      "Analis Perilaku Klien",
      "Koordinator Program Reintegrasi"
    ],
    
    fasilitas: [
      "Laboratorium Konseling",
      "Ruang Simulasi Bimbingan",
      "Pusat Riset Perilaku",
      "Area Diskusi Kelompok",
      "Perpustakaan Khusus Psikologi"
    ],
    
    biaya: {
      spp: "Rp 600.000/semester",
      praktik: "Rp 800.000/semester",
      alat: "Rp 2.500.000 (sekali)",
      total: "Rp 5.900.000/tahun"
    },
    
    kontak: {
      email: "bimbingan@poltekimipas.ac.id",
      telepon: "(021) 1234-5680",
      lokasi: "Gedung C, Lantai 1"
    }
  }
}

export default function ProgramDetailPage() {
  const params = useParams()
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const slug = params.slug as string
  const program = programDetails[slug as keyof typeof programDetails]

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Program tidak ditemukan</h1>
          <Link href="/program-studi" className="text-gold hover:underline">Kembali ke Program Studi</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        .program-detail-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--background, #fff);
          color: var(--foreground, #1B2A4A);
          min-height: 100vh;
        }

        /* Reading progress */
        .reading-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #1B3A6B, #C9A84C);
          z-index: 100;
          transition: width 0.1s linear;
        }

        /* Hero section */
        .program-hero {
          background: linear-gradient(135deg, #1B3A6B 0%, #2C4F7C 100%);
          position: relative;
          overflow: hidden;
        }

        .program-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .program-hero-content {
          position: relative;
          z-index: 1;
        }

        /* Icon wrapper */
        .icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        /* Section styles */
        .section {
          padding: 80px 0;
        }

        .section-light {
          background: #f8fafc;
        }

        .section-white {
          background: white;
        }

        /* Card styles */
        .info-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          height: 100%;
        }

        .info-card h3 {
          color: #1B3A6B;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Badge styles */
        .badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-right: 8px;
          margin-bottom: 8px;
        }

        .badge-navy {
          background: #1B3A6B;
          color: white;
        }

        .badge-gold {
          background: #C9A84C;
          color: white;
        }

        .badge-success {
          background: #0F766E;
          color: white;
        }

        /* List styles */
        .feature-list {
          list-style: none;
          padding: 0;
        }

        .feature-list li {
          padding: 12px 0;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .feature-list li:last-child {
          border-bottom: none;
        }

        .feature-list li .icon {
          color: #C9A84C;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Grid layouts */
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        /* Button styles */
        .btn-primary {
          background: #1B3A6B;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: #2C4F7C;
          transform: translateX(4px);
        }

        .btn-secondary {
          background: #C9A84C;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #B3943A;
          transform: translateX(4px);
        }

        /* Back button */
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
          margin-bottom: 24px;
        }

        .back-button:hover {
          color: white;
        }

        /* Contact card */
        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .contact-item:last-child {
          border-bottom: none;
        }

        .contact-item .icon {
          color: #1B3A6B;
          flex-shrink: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .section {
            padding: 60px 0;
          }
          
          .grid-2, .grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="program-detail-root">
        {/* Reading progress */}
        <div className="reading-progress" style={{ width: `${scrollProgress}%` }} />

        {/* Hero Section */}
        <section className="program-hero py-20">
          <div className="program-hero-content max-w-7xl mx-auto px-4">
            <Link href="/program-studi" className="back-button">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Program Studi
            </Link>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="icon-wrapper">
                  <program.icon className="h-10 w-10" />
                </div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  Program Studi
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  {program.title}
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  {program.subtitle}
                </p>
                <p className="text-white/80 leading-relaxed">
                  {program.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="badge badge-navy">
                    <Award className="h-4 w-4 inline mr-1" />
                    {program.akreditasi}
                  </span>
                  <span className="badge badge-gold">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {program.durasi}
                  </span>
                  <span className="badge badge-success">
                    <Users2 className="h-4 w-4 inline mr-1" />
                    Kuota: {program.kuota}
                  </span>
                </div>
              </div>
              
              <div className="grid-2">
                <div className="info-card text-center">
                  <div className="text-2xl font-bold text-navy mb-2">{program.jenjang}</div>
                  <div className="text-gray-600">Jenjang</div>
                </div>
                <div className="info-card text-center">
                  <div className="text-2xl font-bold text-gold mb-2">{program.gelar}</div>
                  <div className="text-gray-600">Gelar Lulusan</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="section section-light">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid-2">
              <div className="info-card">
                <h3><Target className="h-5 w-5" /> Visi</h3>
                <p className="text-gray-700 leading-relaxed">{program.visi}</p>
              </div>
              
              <div className="info-card">
                <h3><TrendingUp className="h-5 w-5" /> Misi</h3>
                <ul className="feature-list">
                  {program.misi.map((item, index) => (
                    <li key={index}>
                      <CheckCircle className="h-5 w-5 icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Kompetensi */}
        <section className="section section-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Kompetensi Lulusan</h2>
            <div className="grid-2">
              {program.kompetensi.map((kompetensi, index) => (
                <div key={index} className="info-card">
                  <h3><BookOpen className="h-5 w-5" /> {kompetensi.title}</h3>
                  <ul className="feature-list">
                    {kompetensi.items.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle className="h-5 w-5 icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kurikulum */}
        <section className="section section-light">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Struktur Kurikulum</h2>
            <div className="info-card">
              <ul className="feature-list">
                {program.kurikulum.map((item, index) => (
                  <li key={index}>
                    <BookOpen className="h-5 w-5 icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Fasilitas */}
        <section className="section section-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Fasilitas Pendukung</h2>
            <div className="grid-3">
              {program.fasilitas.map((fasilitas, index) => (
                <div key={index} className="info-card text-center">
                  <CheckCircle className="h-8 w-8 text-gold mx-auto mb-3" />
                  <p>{fasilitas}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prospek Karir */}
        <section className="section section-light">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Prospek Karir</h2>
            <div className="grid-3">
              {program.prospek.map((prospek, index) => (
                <div key={index} className="info-card text-center">
                  <Target className="h-8 w-8 text-navy mx-auto mb-3" />
                  <p>{prospek}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biaya Pendidikan */}
        <section className="section section-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Biaya Pendidikan</h2>
            <div className="grid-2">
              <div className="info-card">
                <h3><FileText className="h-5 w-5" /> Rincian Biaya per Semester</h3>
                <ul className="feature-list">
                  <li>
                    <span className="font-semibold">SPP:</span> {program.biaya.spp}
                  </li>
                  <li>
                    <span className="font-semibold">Praktik:</span> {program.biaya.praktik}
                  </li>
                  <li>
                    <span className="font-semibold">Alat (sekali):</span> {program.biaya.alat}
                  </li>
                  <li className="border-t pt-4">
                    <span className="font-bold text-navy">Total per tahun:</span> {program.biaya.total}
                  </li>
                </ul>
              </div>
              
              <div className="info-card">
                <h3><Phone className="h-5 w-5" /> Kontak Program Studi</h3>
                <div className="space-y-3">
                  <div className="contact-item">
                    <Mail className="h-5 w-5 icon" />
                    <span>{program.kontak.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone className="h-5 w-5 icon" />
                    <span>{program.kontak.telepon}</span>
                  </div>
                  <div className="contact-item">
                    <MapPin className="h-5 w-5 icon" />
                    <span>{program.kontak.lokasi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section-light">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-navy mb-6">Siap Bergabung dengan {program.title}?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Dapatkan informasi lengkap tentang pendaftaran, persyaratan, dan jadwal seleksi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="btn-primary">
                <FileText className="h-4 w-4" />
                Panduan Pendaftaran
              </a>
              <a href="#" className="btn-secondary">
                <Download className="h-4 w-4" />
                Download Brosur
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
