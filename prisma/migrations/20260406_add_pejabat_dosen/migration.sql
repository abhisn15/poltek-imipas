-- Migration: tambah tabel pejabat dan dosen
-- Jalankan: npx prisma migrate deploy  ATAU  npx prisma db push

CREATE TABLE IF NOT EXISTS `pejabat` (
  `id_pejabat`  INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `nama`        VARCHAR(160)    NOT NULL,
  `jabatan`     VARCHAR(200)    NOT NULL,
  `singkatan`   VARCHAR(10)     NOT NULL DEFAULT '',
  `email`       VARCHAR(160)    NOT NULL DEFAULT '',
  `telepon`     VARCHAR(30)     NOT NULL DEFAULT '',
  `bidang_json` TEXT            NULL,
  `foto_url`    VARCHAR(255)    NULL,
  `urutan`      INT UNSIGNED    NOT NULL DEFAULT 99,
  `aktif`       TINYINT(1)      NOT NULL DEFAULT 1,
  `dibuat_pada` TIMESTAMP(0)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diubah_pada` TIMESTAMP(0)    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pejabat`),
  INDEX `idx_pejabat_urutan` (`urutan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `dosen` (
  `id_dosen`            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `slug`                VARCHAR(200)    NOT NULL,
  `nama`                VARCHAR(160)    NOT NULL,
  `gelar`               VARCHAR(80)     NOT NULL DEFAULT '',
  `jabatan`             VARCHAR(200)    NOT NULL,
  `bidang_keahlian_json` TEXT           NULL,
  `deskripsi`           TEXT            NOT NULL DEFAULT '',
  `email`               VARCHAR(160)    NOT NULL DEFAULT '',
  `ruang`               VARCHAR(100)    NOT NULL DEFAULT '',
  `foto_url`            VARCHAR(255)    NULL,
  `jurnal_json`         LONGTEXT        NULL,
  `aktif`               TINYINT(1)      NOT NULL DEFAULT 1,
  `urutan`              INT UNSIGNED    NOT NULL DEFAULT 99,
  `dibuat_pada`         TIMESTAMP(0)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diubah_pada`         TIMESTAMP(0)    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_dosen`),
  UNIQUE KEY `dosen_slug_key` (`slug`),
  INDEX `idx_dosen_slug` (`slug`),
  INDEX `idx_dosen_urutan` (`urutan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
