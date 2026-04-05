export function buatSlugDariTeks(teks: string): string {
  const hasil = teks
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

  return hasil || "berita"
}

export function parseDaftarTag(input: string | string[] | null | undefined): string[] {
  if (!input) {
    return []
  }

  if (Array.isArray(input)) {
    return input
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 15)
  }

  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 15)
}

export function formatTanggalIndonesia(input: string | Date): string {
  const tanggal = typeof input === "string" ? new Date(input) : input
  if (Number.isNaN(tanggal.getTime())) {
    return "-"
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(tanggal)
}
