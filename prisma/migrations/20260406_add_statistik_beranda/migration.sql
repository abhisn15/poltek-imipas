CREATE TABLE `statistik_beranda` (
  `id_statistik` INT UNSIGNED NOT NULL DEFAULT 1,
  `total_taruna` INT UNSIGNED NOT NULL DEFAULT 1735,
  `total_alumni` INT UNSIGNED NOT NULL DEFAULT 15000,
  `tahun_pengabdian` INT UNSIGNED NOT NULL DEFAULT 64,
  `dibuat_pada` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `diubah_pada` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id_statistik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `statistik_beranda` (`id_statistik`, `total_taruna`, `total_alumni`, `tahun_pengabdian`)
VALUES (1, 1735, 15000, 64)
ON DUPLICATE KEY UPDATE
  `total_taruna` = VALUES(`total_taruna`),
  `total_alumni` = VALUES(`total_alumni`),
  `tahun_pengabdian` = VALUES(`tahun_pengabdian`);
