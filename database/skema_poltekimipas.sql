CREATE DATABASE IF NOT EXISTS `poltekimipas`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `poltekimipas`;

CREATE TABLE IF NOT EXISTS akun_admin (
  id_admin INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nama_pengguna VARCHAR(80) NOT NULL UNIQUE,
  nama_lengkap VARCHAR(140) NOT NULL,
  kata_sandi_hash CHAR(64) NOT NULL,
  peran ENUM('superadmin', 'admin') NOT NULL DEFAULT 'superadmin',
  aktif TINYINT(1) NOT NULL DEFAULT 1,
  dibuat_pada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_admin)
);

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
);

CREATE TABLE IF NOT EXISTS role_pengguna (
  id_role INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nama_role VARCHAR(80) NOT NULL UNIQUE,
  deskripsi VARCHAR(255) NULL,
  dibuat_pada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_role)
);

CREATE TABLE IF NOT EXISTS kategori_berita (
  id_kategori INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nama_kategori VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(130) NOT NULL UNIQUE,
  aktif TINYINT(1) NOT NULL DEFAULT 1,
  dibuat_pada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_kategori)
);

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
);

INSERT INTO akun_admin (nama_pengguna, nama_lengkap, kata_sandi_hash, peran, aktif)
VALUES ('superadmin', 'Super Admin POLTEKIMIPAS', 'e34f92a20532a873cb3184398070b4b82a8fa29cf48572c203dc5f0fa6158231', 'superadmin', 1)
ON DUPLICATE KEY UPDATE nama_pengguna = nama_pengguna;

INSERT INTO role_pengguna (nama_role, deskripsi)
VALUES
  ('superadmin', 'Role tertinggi dengan akses penuh (punya segalanya)'),
  ('editor_berita', 'Mengelola konten berita'),
  ('editor_blog', 'Mengelola konten blog'),
  ('viewer_dashboard', 'Melihat ringkasan dashboard')
ON DUPLICATE KEY UPDATE deskripsi = VALUES(deskripsi);

INSERT INTO kategori_berita (nama_kategori, slug, aktif)
VALUES
  ('Kegiatan Taruna', 'kegiatan-taruna', 1),
  ('Akademik', 'akademik', 1),
  ('Kebijakan', 'kebijakan', 1),
  ('Prestasi', 'prestasi', 1),
  ('Kerjasama', 'kerjasama', 1),
  ('Pengumuman', 'pengumuman', 1)
ON DUPLICATE KEY UPDATE aktif = VALUES(aktif);
