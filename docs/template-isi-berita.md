# Template Isi Berita (Siap Salin)

## Cara Isi di Admin
1. Buka `Admin > Berita`.
2. Isi `Judul`, `Kategori`, `Ringkasan`, lalu tulis konten di editor.
3. Upload `Thumbnail`.
4. Atur `Status` jadi `terbit`.
5. Jika mau masuk marquee navbar: centang `Tampilkan sebagai berita penting` dan isi `Prioritas Marquee` (misal `90`).
6. Klik `Simpan Berita`.

## Contoh 1 - Berita Akademik
### Judul
Pelantikan Taruna Baru Tahun Akademik 2026

### Ringkasan
POLTEKIMIPAS resmi melantik taruna baru tahun akademik 2026 sebagai bagian dari penguatan SDM pemasyarakatan dan keimigrasian.

### Isi Berita (salin ke editor)
```html
<h2>Pelantikan Taruna Baru Tahun Akademik 2026</h2>
<p>Politeknik Imigrasi dan Pemasyarakatan (POLTEKIMIPAS) menyelenggarakan pelantikan taruna baru tahun akademik 2026 dengan khidmat.</p>
<p>Kegiatan ini menjadi langkah awal pembinaan karakter, disiplin, dan kompetensi taruna dalam mendukung pelayanan publik di bidang keimigrasian dan pemasyarakatan.</p>

<h3>Pokok Kegiatan</h3>
<ul>
  <li>Upacara pelantikan dan pengambilan sumpah.</li>
  <li>Penyampaian arahan pimpinan kampus.</li>
  <li>Pengenalan budaya akademik dan etika profesi.</li>
</ul>

<blockquote>“Taruna POLTEKIMIPAS diharapkan menjadi insan yang cerdas, berintegritas, dan berdedikasi.”</blockquote>

<p>Seluruh rangkaian kegiatan berjalan tertib dan mendapat dukungan penuh dari unsur pimpinan serta civitas akademika.</p>
```

### Tag (pisah koma)
Taruna, Akademik, Pelantikan

### Penulis
Biro Humas POLTEKIMIPAS

### Estimasi Baca
4

### Pengaturan Marquee
- Tampilkan sebagai berita penting: Ya
- Prioritas Marquee: 90

## Contoh 2 - Berita Kegiatan Dosen
### Judul
Workshop Karya Ilmiah untuk Dosen dan Taruna

### Ringkasan
Workshop penulisan karya ilmiah dilaksanakan untuk meningkatkan kualitas riset, publikasi, dan budaya akademik di lingkungan POLTEKIMIPAS.

### Isi Berita (salin ke editor)
```html
<h2>Workshop Karya Ilmiah untuk Dosen dan Taruna</h2>
<p>POLTEKIMIPAS mengadakan workshop karya ilmiah sebagai upaya peningkatan kapasitas akademik dosen dan taruna.</p>
<p>Materi mencakup teknik penyusunan naskah ilmiah, strategi publikasi, serta penggunaan referensi yang benar.</p>

<h3>Materi Utama</h3>
<ol>
  <li>Pemilihan topik riset yang relevan.</li>
  <li>Struktur penulisan karya ilmiah.</li>
  <li>Etika publikasi dan sitasi.</li>
</ol>

<p>Peserta mengikuti sesi praktik dan pendampingan langsung untuk menyusun draft awal karya ilmiah.</p>
```

### Tag (pisah koma)
Dosen, Riset, Workshop

### Penulis
Tim Akademik POLTEKIMIPAS

### Estimasi Baca
5

### Pengaturan Marquee
- Tampilkan sebagai berita penting: Ya
- Prioritas Marquee: 80

## Catatan Prioritas Marquee
- Angka lebih besar tampil lebih atas.
- Contoh urutan: `100` > `90` > `80`.
- Hanya berita `terbit` + `penting` yang muncul di navbar marquee.
