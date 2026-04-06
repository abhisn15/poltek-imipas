"use client"

import { Bell, Calendar, ArrowLeft, Megaphone, Download, FileText, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const announcements = [
  {
    id: 1,
    date: "1 Maret 2026",
    title: "Pendaftaran Seleksi Penerimaan Taruna Baru T.A. 2026/2027",
    priority: true,
    description: "Pendaftaran dibuka mulai tanggal 1 Maret 2026 melalui portal resmi SSCASN. Persyaratan dan informasi lengkap dapat diunduh di website resmi.",
    publishDate: "2026-03-01",
    category: "Penerimaan",
    author: "Panitia Penerimaan Taruna Baru",
    attachments: [
      { name: "Panduan Pendaftaran Taruna Baru 2026.pdf", size: "2.5 MB" },
      { name: "Formulir Pendaftaran.docx", size: "156 KB" },
      { name: "Jadwal Seleksi Lengkap.pdf", size: "1.2 MB" }
    ],
    content: `
      <h3 class="text-xl font-bold mb-4 mt-6">PENGUMUMAN</h3>
      <p class="mb-4">Diberitahukan kepada seluruh calon taruna bahwa pendaftaran Seleksi Penerimaan Taruna Baru POLTEKIMIPAS Tahun Akademik 2026/2027 telah resmi dibuka mulai tanggal 1 Maret 2026.</p>
      
      <h3 class="text-xl font-bold mb-4 mt-6">JADWAL PENDAFTARAN</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Pembukaan Pendaftaran:</strong> 1 Maret 2026</li>
        <li><strong>Tutup Pendaftaran Online:</strong> 31 Mei 2026</li>
        <li><strong>Pengumuman Seleksi Administrasi:</strong> 10 Juni 2026</li>
        <li><strong>Tes Akademik:</strong> 20-25 Juni 2026</li>
        <li><strong>Tes Kesehatan dan Jasmani:</strong> 1-15 Juli 2026</li>
        <li><strong>Pengumuman Akhir:</strong> 31 Juli 2026</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">PERSYARATAN UMUM</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Warga Negara Indonesia</li>
        <li>Berusia minimal 17 tahun dan maksimal 21 tahun pada 1 Januari 2027</li>
        <li>Tinggi badan minimal 165 cm (pria) dan 160 cm (wanita)</li>
        <li>Berbadan sehat, tidak buta warna, tidak berkacamata</li>
        <li>Berkelakuan baik (dibuktikan dengan SKCK)</li>
        <li>Tidak pernah terlibat narkoba dan kriminalitas</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">DOKUMEN YANG DIBUTUHKAN</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Akta Kelahiran (legalisir)</li>
        <li>Kartu Keluarga (legalisir)</li>
        <li>Ijazah SMA/SMK/MA (legalisir)</li>
        <li>Surat Keterangan Berkelakuan Baik dari Polres</li>
        <li>Surat Keterangan Sehat dari Rumah Sakit</li>
        <li>Pas foto 4x6 (4 lembar, background biru)</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">CARA PENDAFTARAN</h3>
      <ol class="list-decimal pl-6 mb-4 space-y-2">
        <li>Akses portal SSCASN di sscasn.bkn.go.id</li>
        <li>Buat akun dan lengkapi data diri</li>
        <li>Pilih POLTEKIMIPAS sebagai pilihan institusi</li>
        <li>Upload semua dokumen yang diperlukan</li>
        <li>Cetak kartu pendaftaran</li>
        <li>Ikuti tahapan seleksi sesuai jadwal</li>
      </ol>
      
      <h3 class="text-xl font-bold mb-4 mt-6">KONTAK INFORMASI</h3>
      <p class="mb-4">Untuk informasi lebih lanjut, hubungi:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Website: www.poltekimipas.ac.id</li>
        <li>Email: penerimaan@poltekimipas.ac.id</li>
        <li>Telepon: (021) 1234-5678</li>
        <li>WhatsApp: 0812-3456-7890</li>
      </ul>
    `
  },
  {
    id: 2,
    date: "25 Februari 2026",
    title: "Jadwal Ujian Akhir Semester Genap 2025/2026",
    priority: false,
    description: "Ujian akhir semester genap akan dilaksanakan pada tanggal 15-30 Juni 2026. Jadwal lengkap per program studi telah tersedia.",
    publishDate: "2026-02-25",
    category: "Akademik",
    author: "Bagian Akademik",
    attachments: [
      { name: "Jadwal UAS Semester Genap 2025-2026.pdf", size: "890 KB" },
      { name: "Petunjuk Teknis UAS.pdf", size: "234 KB" }
    ],
    content: `
      <h3 class="text-xl font-bold mb-4 mt-6">JADWAL UJIAN AKHIR SEMESTER</h3>
      <p class="mb-4">Diberitahukan kepada seluruh taruna bahwa Ujian Akhir Semester (UAS) Genap Tahun Akademik 2025/2026 akan dilaksanakan pada:</p>
      
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Periode UAS:</strong> 15 - 30 Juni 2026</li>
        <li><strong>Periode Remedial:</strong> 5 - 10 Juli 2026</li>
        <li><strong>Pengumuman Nilai:</strong> 15 Juli 2026</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">JADWAL PER PROGRAM STUDI</h3>
      <h4 class="text-lg font-semibold mb-3 mt-4">Manajemen Pemasyarakatan</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>15-17 Juni: Mata Kuliah Wajib</li>
        <li>18-19 Juni: Mata Kuliah Pilihan</li>
        <li>20 Juni: Mata Kuliah Praktikum</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-4">Teknik Pemasyarakatan</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>21-23 Juni: Mata Kuliah Wajib</li>
        <li>24-25 Juni: Mata Kuliah Pilihan</li>
        <li>26 Juni: Mata Kuliah Praktikum</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-4">Bimbingan Kemasyarakatan</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>27-28 Juni: Mata Kuliah Wajib</li>
        <li>29 Juni: Mata Kuliah Pilihan</li>
        <li>30 Juni: Mata Kuliah Praktikum</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">TATA TERTIB UJIAN</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Hadir 30 menit sebelum ujian dimulai</li>
        <li>Membawa kartu ujian dan identitas diri</li>
        <li>Menggunakan pakaian dinas lengkap</li>
        <li>Dilarang membawa alat komunikasi</li>
        <li>Dilarang keluar ruangan sebelum waktu selesai</li>
      </ul>
    `
  },
  {
    id: 3,
    date: "20 Februari 2026",
    title: "Pengumuman Hasil Seleksi Beasiswa Unggulan POLTEKIMIPAS",
    priority: false,
    description: "Hasil seleksi beasiswa unggulan tahun akademik 2026/2027 telah diumumkan. Silakan cek nama Anda pada daftar terlampir.",
    publishDate: "2026-02-20",
    category: "Beasiswa",
    author: "Bagian Kemahasiswaan",
    attachments: [
      { name: "Hasil Seleksi Beasiswa Unggulan 2026.pdf", size: "1.5 MB" },
      { name: "Panduan Pencairan Beasiswa.pdf", size: "445 KB" }
    ],
    content: `
      <h3 class="text-xl font-bold mb-4 mt-6">PENGUMUMAN BEASISWA UNGGULAN</h3>
      <p class="mb-4">Bersama ini diumumkan hasil seleksi Beasiswa Unggulan POLTEKIMIPAS Tahun Akademik 2026/2027. Seleksi telah melalui tahapan administrasi, akademik, dan wawancara.</p>
      
      <h3 class="text-xl font-bold mb-4 mt-6">HASIL SELEKSI</h3>
      <p class="mb-4">Dari 150 pendaftar, telah dipilih 50 penerima beasiswa unggulan dengan rincian:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Program Studi Manajemen Pemasyarakatan: 20 orang</li>
        <li>Program Studi Teknik Pemasyarakatan: 20 orang</li>
        <li>Program Studi Bimbingan Kemasyarakatan: 10 orang</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">MANFAAT BEASISWA</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Bebas biaya pendidikan selama 4 semester</li>
        <li>Uang saku bulanan Rp 1.500.000</li>
        <li>Bantuan buku referensi Rp 500.000 per semester</li>
        <li>Program mentoring dan pengembangan soft skill</li>
        <li>Prioritas magang di instansi terkait</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">TATA CARA PENCAIRAN</h3>
      <ol class="list-decimal pl-6 mb-4 space-y-2">
        <li>Mengisi formulir pencairan beasiswa</li>
        <li>Melampirkan bukti rekening bank</li>
        <li>Melakukan konfirmasi ke Bagian Kemahasiswaan</li>
        <li>Pencairan dilakukan setiap awal bulan</li>
      </ol>
      
      <h3 class="text-xl font-bold mb-4 mt-6">KEWAJIBAN PENERIMA BEASISWA</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Mempertahankan IPK minimal 3.50</li>
        <li>Tidak ada nilai C pada mata kuliah apapun</li>
        <li>Aktif mengikuti kegiatan kemahasiswaan</li>
        <li>Membuat laporan kemajuan akademik per semester</li>
      </ul>
    `
  },
  {
    id: 4,
    date: "15 Februari 2026",
    title: "Peringatan Hari Pemasyarakatan ke-62",
    priority: false,
    description: "Rangkaian kegiatan Hari Pemasyarakatan ke-62 akan dilaksanakan pada 27 April 2026 dengan tema 'Pemasyarakatan Berdedikasi untuk Indonesia Maju'.",
    publishDate: "2026-02-15",
    category: "Kegiatan",
    author: "Panitia Hari Pemasyarakatan",
    attachments: [
      { name: "Jadwal Kegiatan HPN ke-62.pdf", size: "678 KB" },
      { name: "Panduan Lomba HPN 2026.pdf", size: "1.2 MB" }
    ],
    content: `
      <h3 class="text-xl font-bold mb-4 mt-6">PERINGATAN HARI PEMASYARAKATAN NASIONAL KE-62</h3>
      <p class="mb-4">Dalam rangka memperingati Hari Pemasyarakatan Nasional ke-62, POLTEKIMIPAS akan menyelenggarakan rangkaian kegiatan dengan tema "Pemasyarakatan Berdedikasi untuk Indonesia Maju".</p>
      
      <h3 class="text-xl font-bold mb-4 mt-6">TEMA DAN SUBTEMA</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Tema Utama:</strong> Pemasyarakatan Berdedikasi untuk Indonesia Maju</li>
        <li><strong>Subtema:</strong> Transformasi Digital Pemasyarakatan</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">RANGKAIAN KEGIATAN</h3>
      <h4 class="text-lg font-semibold mb-3 mt-4">25 April 2026</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>08:00 - Upacara Pembukaan</li>
        <li>10:00 - Seminar Nasional Pemasyarakatan</li>
        <li>13:00 - Pameran Inovasi Pemasyarakatan</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-4">26 April 2026</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>09:00 - Lomba Karya Tulis Ilmiah</li>
        <li>13:00 - Lomba Debat Pemasyarakatan</li>
        <li>16:00 - Bakti Sosial di Masyarakat</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-4">27 April 2026</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>07:00 - Upacara Peringatan HPN ke-62</li>
        <li>10:00 - Penyerahan Penghargaan</li>
        <li>13:00 - Hiburan Rakyat</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">LOMBA DAN KOMPETISI</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Lomba Karya Tulis Ilmiah Pemasyarakatan</li>
        <li>Lomba Debat Pemasyarakatan</li>
        <li>Lomba Inovasi Teknologi Pemasyarakatan</li>
        <li>Lomba Fotografi Pemasyarakatan</li>
        <li>Lomba Video Pendek Pemasyarakatan</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">PESERTA DAN REGISTRASI</h3>
      <p class="mb-4">Kegiatan terbuka untuk:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Seluruh civitas akademika POLTEKIMIPAS</li>
        <li>Praktisi pemasyarakatan se-Indonesia</li>
        <li>Mahasiswa dan umum</li>
      </ul>
      <p class="mb-4">Registrasi dapat dilakukan melalui website resmi HPN ke-62 mulai tanggal 1 Maret 2026.</p>
    `
  },
  {
    id: 5,
    date: "10 Februari 2026",
    title: "Libur Akademik Semester Genap 2025/2026",
    priority: false,
    description: "Libur akademik semester genap dimulai dari tanggal 1 Juli hingga 15 Agustus 2026. Kegiatan pembinaan fisik tetap berjalan sesuai jadwal.",
    publishDate: "2026-02-10",
    category: "Akademik",
    author: "Bagian Akademik",
    attachments: [
      { name: "Kalender Akademik 2025-2026 Lengkap.pdf", size: "3.2 MB" },
      { name: "Jadwal Pembinaan Fisik Liburan.pdf", size: "234 KB" }
    ],
    content: `
      <h3 class="text-xl font-bold mb-4 mt-6">LIBUR AKADEMIK SEMESTER GENAP</h3>
      <p class="mb-4">Diberitahukan kepada seluruh taruna bahwa libur akademik Semester Genap Tahun Akademik 2025/2026 akan dilaksanakan pada:</p>
      
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Mulai Libur:</strong> 1 Juli 2026</li>
        <li><strong>Akhir Libur:</strong> 15 Agustus 2026</li>
        <li><strong>Masuk Kembali:</strong> 16 Agustus 2026</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">KEGIATAN SELAMA LIBUR</h3>
      <h4 class="text-lg font-semibold mb-3 mt-4">Wajib Diikuti:</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Pembinaan fisik: Senin, Rabu, Jumat pukul 06.00-08.00</li>
        <li>Upacara bendera: Senin pukul 07.00</li>
        <li>Inspeksi kamar: Minggu pukul 20.00</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-4">Opsional:</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Program magang instansi</li>
        <li>Kuliah kerja nyata</li>
        <li>Pelatihan keterampilan</li>
        <li>Kegiatan sosial kemasyarakatan</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">TATA TERTIB LIBUR</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Dilarang keluar kampus tanpa izin</li>
        <li>Wajib mengikuti jadwal pembinaan fisik</li>
        <li>Mempertahankan kebersihan kamar</li>
        <li>Menjaga kedisiplinan dan kerapihan</li>
        <li>Melaporkan kegiatan kepada pembina</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-4 mt-6">KONTAK DARURAT</h3>
      <p class="mb-4">Selama libur, untuk keperluan darurat dapat menghubungi:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Pembina Harian: 0812-3456-7890</li>
        <li>Urusan Kesehatan: 0813-4567-8901</li>
        <li>Security Post: (021) 1234-5678</li>
      </ul>
    `
  }
]

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-4 pb-12 pt-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link 
            href="/" 
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          
          <h1 
            className="text-4xl font-bold text-navy mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Pengumuman POLTEKIMIPAS
          </h1>
          
          <div className="mx-auto h-1 w-16 rounded-full bg-gold mb-4" />
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Informasi resmi dan pengumuman penting dari POLTEKIMIPAS untuk civitas akademika dan masyarakat
          </p>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.map((item) => (
            <article
              key={item.id}
              className={`group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg ${
                item.priority
                  ? "border-gold/50 bg-gold/5"
                  : "border-border hover:border-gold/40"
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      item.priority ? "bg-gold text-navy-dark" : "bg-navy/10 text-navy"
                    }`}
                  >
                    {item.priority ? (
                      <Megaphone className="h-5 w-5" />
                    ) : (
                      <Bell className="h-5 w-5" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {item.priority && (
                        <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-dark">
                          Penting
                        </span>
                      )}
                      <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-[10px] font-medium text-navy">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </span>
                    </div>

                    <h2
                      className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-navy"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {item.title}
                    </h2>

                    <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">{item.author}</span>
                      </div>

                      <Link
                        href={`/pengumuman/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-gold"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                {item.attachments && item.attachments.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <FileText className="h-4 w-4" />
                      Lampiran ({item.attachments.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.attachments.map((attachment, index) => (
                        <button
                          key={index}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:border-navy hover:text-navy transition-colors"
                        >
                          <Download className="h-3 w-3" />
                          {attachment.name} ({attachment.size})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
