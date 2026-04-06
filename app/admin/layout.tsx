"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Newspaper,
  ShieldUser,
  BookText,
  Library,
  LogOut,
  Menu,
  X,
  Award,
  GraduationCap,
} from "lucide-react"

type DataAdmin = {
  idAdmin: number
  namaPengguna: string
  namaLengkap: string
  peran: "superadmin" | "admin"
}

const menuAdmin = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, group: "Umum" },
  { href: "/admin/berita", label: "Berita", icon: Newspaper, group: "Konten" },
  { href: "/admin/blog", label: "Blog", icon: BookText, group: "Konten" },
  { href: "/admin/jurnal", label: "Jurnal", icon: Library, group: "Konten" },
  { href: "/admin/pejabat", label: "Pejabat", icon: Award, group: "Profil" },
  { href: "/admin/dosen", label: "Dosen", icon: GraduationCap, group: "Profil" },
  { href: "/admin/role-user", label: "Role User", icon: ShieldUser, group: "Pengaturan" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [admin, setAdmin] = useState<DataAdmin | null>(null)
  const [memuatSesi, setMemuatSesi] = useState(true)
  const [menuMobileBuka, setMenuMobileBuka] = useState(false)

  const judulHalaman = useMemo(() => {
    const item = menuAdmin.find((menu) => pathname === menu.href || pathname.startsWith(menu.href + "/"))
    return item?.label ?? "Dashboard"
  }, [pathname])

  useEffect(() => {
    let aktif = true

    const cekSesi = async () => {
      try {
        const response = await fetch("/api/admin/sesi", {
          method: "GET",
          cache: "no-store",
        })

        if (!response.ok) {
          router.replace(`/login-user?redirect=${encodeURIComponent(pathname || "/admin")}`)
          return
        }

        const payload = await response.json()
        if (aktif) {
          setAdmin(payload?.data ?? null)
        }
      } catch {
        router.replace(`/login-user?redirect=${encodeURIComponent(pathname || "/admin")}`)
      } finally {
        if (aktif) {
          setMemuatSesi(false)
        }
      }
    }

    cekSesi()
    return () => {
      aktif = false
    }
  }, [pathname, router])

  const prosesLogout = async () => {
    try {
      await fetch("/api/admin/keluar", { method: "POST" })
    } finally {
      router.replace("/login-user")
    }
  }

  if (memuatSesi) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#081426] text-white">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-[#c9a84c] border-t-transparent" />
          <p className="text-sm text-white/70">Menyiapkan dashboard admin...</p>
        </div>
      </div>
    )
  }

  if (!admin) {
    return null
  }

  return (
    <>
      <style>{`
        .admin-bg {
          background: linear-gradient(180deg, #f5f7fb 0%, #eef2f7 100%);
          min-height: 100vh;
        }
        .admin-shell {
          display: grid;
          grid-template-columns: 286px minmax(0, 1fr);
          min-height: 100vh;
          align-items: start;
        }
        .admin-sidebar {
          background: linear-gradient(180deg, #0b1b33 0%, #102341 100%);
          color: white;
          border-right: 1px solid rgba(201, 168, 76, 0.2);
          padding: 18px 14px 22px;
          position: sticky;
          top: 0;
          align-self: start;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 32;
          box-shadow: 8px 0 24px rgba(11, 27, 51, 0.14);
        }
        .admin-sidebar::-webkit-scrollbar {
          width: 8px;
        }
        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.18);
          border-radius: 999px;
        }
        .admin-brand {
          display: block;
          text-decoration: none;
          color: white;
          padding: 12px 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201, 168, 76, 0.18);
          margin-bottom: 18px;
        }
        .admin-menu-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          margin-bottom: 4px;
        }
        .admin-menu-link:hover {
          background: rgba(255,255,255,0.06);
          color: white;
        }
        .admin-menu-link.active {
          background: rgba(201, 168, 76, 0.18);
          color: #f5d994;
          border: 1px solid rgba(201, 168, 76, 0.38);
        }
        .admin-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 100vh;
        }
        .admin-topbar {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-bottom: 1px solid #dde4ef;
          padding: 0 18px;
          position: sticky;
          top: 0;
          z-index: 20;
        }
        .admin-main {
          padding: 20px;
        }
        .admin-mobile-btn {
          display: none;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border: 1px solid #d6dde6;
          border-radius: 10px;
          background: #fff;
          color: #1b3a6b;
        }
        .admin-mobile-panel {
          display: none;
        }
        @media (max-width: 1024px) {
          .admin-shell {
            grid-template-columns: 1fr;
          }
          .admin-sidebar {
            display: none;
          }
          .admin-mobile-btn {
            display: inline-flex;
          }
          .admin-mobile-panel {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(4,10,20,0.45);
            z-index: 45;
          }
          .admin-mobile-card {
            width: min(85vw, 320px);
            height: 100%;
            background: linear-gradient(180deg, #0b1b33 0%, #102341 100%);
            border-right: 1px solid rgba(201,168,76,0.22);
            padding: 16px 12px;
            color: #fff;
          }
        }
      `}</style>

      <div className="admin-bg">
        <div className="admin-shell">
          <aside className="admin-sidebar">
            <Link href="/" className="admin-brand">
              <div className="text-sm font-bold tracking-wider">
                POLTEKIMIPAS
              </div>
              <div className="mt-1 text-xs text-white/65">
                Panel Superadmin
              </div>
            </Link>

            <nav>
              {["Umum", "Konten", "Profil", "Pengaturan"].map((group) => {
                const items = menuAdmin.filter((m) => m.group === group)
                return (
                  <div key={group} className="mb-3">
                    <div className="mb-1 px-2 text-[10px] font-bold uppercase tracking-wider text-white/30">{group}</div>
                    {items.map((item) => {
                      const Icon = item.icon
                      const aktif = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href + "/"))
                      return (
                        <Link key={item.href} href={item.href} className={`admin-menu-link ${aktif ? "active" : ""}`}>
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )
              })}
            </nav>

            <button
              type="button"
              onClick={prosesLogout}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#c9a84c]/40 bg-[#c9a84c]/15 px-3 py-2 text-sm font-medium text-[#f5d994]"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </aside>

          <section className="admin-content">
            <header className="admin-topbar">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="admin-mobile-btn"
                  onClick={() => setMenuMobileBuka((value) => !value)}
                  aria-label="Buka menu admin"
                >
                  {menuMobileBuka ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-[#1b2a4a]">{judulHalaman}</h1>
                  <p className="text-xs text-[#5a6b7f]">Manajemen konten website</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-semibold text-[#1b2a4a]">{admin.namaLengkap}</div>
                <div className="text-xs text-[#5a6b7f]">{admin.peran}</div>
              </div>
            </header>

            <main className="admin-main">{children}</main>
          </section>
        </div>

        {menuMobileBuka && (
          <div className="admin-mobile-panel" onClick={() => setMenuMobileBuka(false)}>
            <div className="admin-mobile-card" onClick={(event) => event.stopPropagation()}>
              <div className="mb-3 text-xs uppercase tracking-widest text-[#e8c97a]">Menu Admin</div>
              <nav>
                {["Umum", "Konten", "Profil", "Pengaturan"].map((group) => {
                  const items = menuAdmin.filter((m) => m.group === group)
                  return (
                    <div key={group} className="mb-3">
                      <div className="mb-1 px-2 text-[10px] font-bold uppercase tracking-wider text-white/30">{group}</div>
                      {items.map((item) => {
                        const Icon = item.icon
                        const aktif = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href + "/"))
                        return (
                          <Link key={item.href} href={item.href} className={`admin-menu-link ${aktif ? "active" : ""}`} onClick={() => setMenuMobileBuka(false)}>
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  )
                })}
              </nav>
              <button
                type="button"
                onClick={prosesLogout}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#c9a84c]/40 bg-[#c9a84c]/15 px-3 py-2 text-sm font-medium text-[#f5d994]"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
