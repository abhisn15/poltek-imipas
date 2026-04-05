"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Lock, Shield, User } from "lucide-react"

function LoginUserContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const redirectPath = searchParams.get("redirect") || "/admin"

  useEffect(() => {
    let aktif = true

    const cekSesi = async () => {
      try {
        const response = await fetch("/api/admin/sesi", {
          method: "GET",
          cache: "no-store",
        })
        if (response.ok && aktif) {
          router.replace(redirectPath)
        }
      } catch {
        // abaikan, user tetap di halaman login
      }
    }

    cekSesi()
    return () => {
      aktif = false
    }
  }, [redirectPath, router])

  const prosesLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/masuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identitas: identifier,
          kataSandi: password,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.message ?? "Login gagal.")
      }

      router.replace(redirectPath)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        .login-page-root {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          min-height: 100dvh;
          background: #0a1628;
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .login-page-root {
            grid-template-columns: 1.05fr 0.95fr;
          }
        }
        .login-visual {
          position: relative;
          min-height: 220px;
          overflow: hidden;
        }
        .login-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,22,40,0.25) 0%, rgba(10,22,40,0.9) 100%);
        }
        .login-visual-content {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          padding: 24px;
          color: #fff;
        }
        @media (min-width: 1024px) {
          .login-visual-content {
            padding: 34px;
          }
        }
        .login-visual-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c9a34f;
          border: 1px solid rgba(201,163,79,0.35);
          border-radius: 999px;
          padding: 4px 10px;
          background: rgba(201,163,79,0.1);
          margin-bottom: 10px;
        }
        .login-form-wrap {
          background: linear-gradient(180deg, #f8f6f2 0%, #ffffff 45%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px 28px;
        }
        .login-card {
          width: min(100%, 430px);
        }
        .login-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #1b3a6b;
          text-decoration: none;
          margin-bottom: 18px;
        }
        .login-back:hover {
          color: #c9a84c;
        }
        .login-title {
          font-size: 1.4rem;
          margin: 0 0 5px;
          color: #0f2647;
          font-weight: 700;
        }
        .login-sub {
          margin: 0 0 18px;
          font-size: 13px;
          color: #5a6b7f;
          line-height: 1.55;
        }
        .login-field {
          margin-bottom: 12px;
        }
        .login-label {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #1b2a4a;
        }
        .login-input-wrap {
          position: relative;
        }
        .login-input-icon {
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          pointer-events: none;
        }
        .login-input {
          width: 100%;
          height: 44px;
          border: 1px solid #d6dde6;
          border-radius: 10px;
          background: #fff;
          padding: 0 12px 0 38px;
          font-size: 14px;
          color: #1b2a4a;
          outline: none;
        }
        .login-input:focus {
          border-color: #1b3a6b;
          box-shadow: 0 0 0 3px rgba(27,58,107,0.12);
        }
        .login-password-toggle {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: #64748b;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          cursor: pointer;
        }
        .login-submit {
          width: 100%;
          height: 44px;
          border: none;
          border-radius: 10px;
          margin-top: 4px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(140deg, #15325d 0%, #2a5298 100%);
          box-shadow: 0 6px 18px rgba(21,50,93,0.35);
          cursor: pointer;
        }
        .login-submit:disabled {
          opacity: 0.75;
          cursor: wait;
        }
      `}</style>

      <div className="login-page-root">
        <div className="login-visual">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority
          />
          <div className="login-visual-content">
            <span className="login-visual-badge">
              <Shield className="h-3 w-3" />
              Admin Resmi
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: "DM Serif Display, serif",
                fontWeight: 400,
                fontSize: "clamp(1.3rem, 3vw, 2rem)",
              }}
            >
              Portal Superadmin POLTEKIMIPAS
            </h2>
            <p style={{ margin: "8px 0 0", fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
              Akses dashboard manajemen berita, role, dan ringkasan traffic web.
            </p>
          </div>
        </div>

        <div className="login-form-wrap">
          <div className="login-card">
            <Link href="/" className="login-back">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke beranda
            </Link>

            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/icon.svg"
                alt="Logo POLTEKIMIPAS"
                width={46}
                height={46}
                style={{ filter: "drop-shadow(0 2px 8px rgba(201,168,76,0.35))" }}
              />
              <div>
                <h1 className="login-title">Masuk Superadmin</h1>
                <p className="login-sub" style={{ marginBottom: 0 }}>
                  Sesi login aktif selama 1 bulan.
                </p>
              </div>
            </div>

            <form onSubmit={prosesLogin} noValidate>
              <div className="login-field">
                <label className="login-label" htmlFor="identifier">
                  Username Admin
                </label>
                <div className="login-input-wrap">
                  <User className="login-input-icon h-4 w-4" />
                  <input
                    id="identifier"
                    name="identifier"
                    autoComplete="username"
                    className="login-input"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    placeholder="contoh: superadmin"
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label className="login-label" htmlFor="password">
                  Kata Sandi
                </label>
                <div className="login-input-wrap">
                  <Lock className="login-input-icon h-4 w-4" />
                  <input
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    className="login-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan kata sandi"
                    required
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword((lama) => !lama)}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="mb-3 rounded-lg border border-[#f0cccc] bg-[#fff5f5] px-3 py-2 text-xs text-[#a12727]">
                  {error}
                </p>
              )}

              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? "Memproses..." : "Masuk ke Dashboard"}
              </button>
            </form>

            <div className="mt-4 rounded-lg border border-[#e5e9f1] bg-[#f8fafc] px-3 py-2 text-xs text-[#5a6b7f]">
              Akun awal: <strong>superadmin</strong> | Kata sandi awal: <strong>superadmin123</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function LoginUserPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0a1628] text-sm text-white/75">
          Memuat portal login...
        </div>
      }
    >
      <LoginUserContent />
    </Suspense>
  )
}
