"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronDown } from "lucide-react"
import Link from "next/link"

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/#tentang" },
  {
    label: "Program Studi",
    href: "/program-studi",
    children: [
      { label: "Administrasi Keimigrasian", href: "/program-studi/administrasi-keimigrasian" },
      { label: "Hukum Keimigrasian", href: "/program-studi/hukum-keimigrasian" },
      { label: "Manajemen Teknologi Keimigrasian", href: "/program-studi/manajemen-teknologi-keimigrasian" },
      { label: "Manajemen Pemasyarakatan", href: "/program-studi/manajemen-pemasyarakatan" },
      { label: "Teknik Pemasyarakatan", href: "/program-studi/teknik-pemasyarakatan" },
      { label: "Bimbingan Pemasyarakatan", href: "/program-studi/bimbingan-pemasyarakatan" },
    ],
  },
  { label: "Berita", href: "/berita" },
  { label: "Blog", href: "/blog" },
  { label: "Jurnal", href: "/jurnal" },
  { label: "Perpustakaan", href: "/perpustakaan" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Pengumuman", href: "/pengumuman" },
]

interface NavbarProps {
  onSearchOpen: () => void
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeLink, setActiveLink] = useState("Beranda")
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

        .navbar-root { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* ─── TOPBAR ─── */
        .topbar {
          background: #0a1628;
          border-bottom: 1px solid rgba(201,163,79,0.15);
          padding: 6px 0;
          font-size: 11px;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.45);
        }
        .topbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
          overflow: hidden;
          min-width: 0;
        }
        .topbar-badge {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(201,163,79,0.1);
          border: 1px solid rgba(201,163,79,0.2);
          color: #c9a34f;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 3px;
        }
        .topbar-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .topbar-divider {
          width: 1px;
          height: 12px;
          background: rgba(255,255,255,0.1);
        }
        /* Mobile topbar: hide long text & date */
        @media (max-width: 640px) {
          .topbar-text { display: none; }
          .topbar-badge { display: none; }
          .topbar-date { display: none !important; }
          .topbar-divider { display: none; }
          .topbar-left::after {
            content: 'POLTEKIMIPAS';
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.1em;
            color: rgba(255,255,255,0.35);
          }
        }
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: 1px solid rgba(201,163,79,0.25);
          color: rgba(201,163,79,0.7);
          border-radius: 4px;
          padding: 3px 8px;
          font-size: 11px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s;
        }
        .lang-btn:hover {
          background: rgba(201,163,79,0.1);
          color: #c9a34f;
          border-color: rgba(201,163,79,0.5);
        }

        /* ─── MAIN NAV ─── */
        .main-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
        }
        .nav-body {
          background: rgba(10, 22, 40, 0.85);
          padding: 12px 0;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid transparent;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        @media (max-width: 480px) {
          .nav-inner { padding: 0 14px; gap: 10px; }
        }

        /* ─── LOGO — improved ─── */
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-mark {
          position: relative;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
        }
        /* Outer hex shape via clip-path */
        .logo-hex {
          width: 42px;
          height: 42px;
          background: linear-gradient(145deg, #c9a34f 0%, #e8c97a 45%, #a8782a 100%);
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 1px rgba(201,163,79,0.4), 0 4px 16px rgba(201,163,79,0.25);
          position: relative;
        }
        .logo-hex::before {
          content: '';
          position: absolute;
          inset: 2px;
          background: #0a1628;
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
        }
        .logo-monogram {
          position: relative;
          z-index: 1;
          font-family: 'DM Serif Display', serif;
          font-size: 15px;
          font-weight: 400;
          color: #c9a34f;
          letter-spacing: -0.02em;
          line-height: 1;
          /* PI as stylized monogram */
        }
        .logo-text-group { display: flex; flex-direction: column; gap: 2px; }
        /* Hide logo text on very small phones to avoid overflow */
        @media (max-width: 360px) {
          .logo-text-group { display: none; }
        }
        .logo-text-main {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.1em;
          line-height: 1;
        }
        .logo-text-sub {
          font-size: 9.5px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.04em;
          line-height: 1;
        }
        /* Gold accent underline on logo text */
        .logo-text-main span {
          color: #c9a34f;
        }

        /* ─── DESKTOP LINKS ─── */
        .desktop-links {
          display: none;
          align-items: center;
          gap: 1px;
        }
        @media (min-width: 1024px) { .desktop-links { display: flex; } }

        .nav-item { position: relative; }

        .nav-link-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          padding: 7px 12px;
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: 0.01em;
          position: relative;
        }
        .nav-link-btn:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.06);
        }

        /* ── Active state: gold underline bar ── */
        .nav-link-btn.active {
          color: #c9a34f;
          font-weight: 600;
        }
        .nav-link-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: linear-gradient(90deg, #c9a34f, #e8c97a);
          border-radius: 2px 2px 0 0;
        }
        .nav-link-btn.dropdown-active {
          color: #c9a34f;
          background: rgba(201,163,79,0.08);
        }

        .chevron {
          width: 13px; height: 13px;
          color: rgba(255,255,255,0.35);
          transition: transform 0.25s, color 0.2s;
          flex-shrink: 0;
        }
        .nav-link-btn.dropdown-active .chevron { color: #c9a34f; }
        .chevron.open { transform: rotate(180deg); }

        /* ─── DROPDOWN with notch ─── */
        .dropdown-wrap {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          animation: dropIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 16px 40px rgba(0,0,0,0.55));
        }
        /* The notch/arrow */
        .dropdown-notch {
          width: 14px;
          height: 8px;
          margin: 0 auto;
          position: relative;
          /* triangle pointing up */
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          background: rgba(201,163,79,0.35);
          margin-bottom: -1px;
        }
        .dropdown-notch-inner {
          position: absolute;
          top: 1.5px;
          left: 1px;
          right: 1px;
          bottom: 0;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          background: #0e1e38;
        }
        .dropdown-menu {
          background: #0e1e38;
          border: 1px solid rgba(201,163,79,0.18);
          border-radius: 12px;
          padding: 6px;
          min-width: 230px;
          overflow: hidden;
        }
        /* Top gold accent line inside dropdown */
        .dropdown-menu::before {
          content: '';
          display: block;
          height: 2px;
          background: linear-gradient(90deg, #c9a34f, transparent);
          margin: 0 6px 6px;
          border-radius: 1px;
          opacity: 0.6;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.15s;
          position: relative;
        }
        .dropdown-item::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(201,163,79,0.3);
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
        }
        .dropdown-item:hover {
          color: #ffffff;
          background: rgba(201,163,79,0.09);
        }
        .dropdown-item:hover::before {
          background: #c9a34f;
          transform: scale(1.3);
        }

        /* ─── ACTIONS ─── */
        .actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        /* ── Search pill button ── */
        .search-pill {
          display: none; /* shown only on desktop via media query below */
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 6px 14px 6px 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .search-pill:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(201,163,79,0.35);
          color: rgba(255,255,255,0.75);
        }
        .search-pill-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(201,163,79,0.15);
          color: #c9a34f;
          flex-shrink: 0;
        }
        .search-pill-kbd {
          margin-left: 4px;
          padding: 1px 5px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          font-family: monospace;
        }
        /* Desktop: show pill, hide icon */
        @media (min-width: 1024px) {
          .search-pill { display: flex; }
          .search-icon-btn { display: none !important; }
        }
        /* Mobile: hide pill, show icon */
        @media (max-width: 1023px) {
          .search-pill { display: none !important; }
          .search-icon-btn { display: flex; }
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 9px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.55);
          transition: all 0.2s;
        }
        .icon-btn:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.9);
        }
        .actions-divider {
          width: 1px; height: 20px;
          background: rgba(255,255,255,0.1);
          margin: 0 2px;
        }
        .mobile-menu-btn { display: flex; }
        @media (min-width: 1024px) { .mobile-menu-btn { display: none; } }

        /* ─── MOBILE MENU ─── */
        .mobile-menu {
          background: #0a1628;
          border-top: 1px solid rgba(201,163,79,0.12);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu.open { max-height: 1200px; }
        @media (min-width: 1024px) { .mobile-menu { display: none; } }

        .mobile-menu-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 10px 16px 20px;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: all 0.15s;
          margin-bottom: 2px;
          width: 100%;
          background: transparent;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer;
          text-align: left;
        }
        .mobile-link:hover { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.9); }
        .mobile-link.active {
          background: rgba(201,163,79,0.08);
          color: #c9a34f;
          font-weight: 600;
        }
        /* Active left bar */
        .mobile-link.active { border-left: 2px solid #c9a34f; padding-left: 12px; }

        .mobile-link-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .mobile-chevron {
          width: 14px; height: 14px;
          color: rgba(255,255,255,0.3);
          transition: transform 0.25s;
          flex-shrink: 0;
        }
        .mobile-chevron.open { transform: rotate(180deg); color: #c9a34f; }

        /* Collapsible sub-menu */
        .mobile-sub {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin: 0 0 4px 14px;
        }
        .mobile-sub.open { max-height: 400px; }

        .mobile-sub-inner {
          padding: 4px 0 4px 14px;
          border-left: 1px solid rgba(201,163,79,0.2);
          margin-top: 2px;
        }
        .mobile-sub-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: all 0.15s;
          margin-bottom: 1px;
        }
        .mobile-sub-link::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(201,163,79,0.25);
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .mobile-sub-link:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.04);
        }
        .mobile-sub-link:hover::before { background: #c9a34f; }

        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 6px 14px;
        }

        /* Hamburger morph animation */
        .hamburger-line {
          display: block;
          width: 18px; height: 1.5px;
          background: rgba(255,255,255,0.7);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        .hamburger-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 9px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .hamburger-wrap:hover { background: rgba(255,255,255,0.08); }
        .hamburger-wrap.open .hamburger-line:nth-child(1) {
          transform: translateY(5.5px) rotate(45deg);
          background: #c9a34f;
        }
        .hamburger-wrap.open .hamburger-line:nth-child(2) {
          opacity: 0; transform: scaleX(0);
        }
        .hamburger-wrap.open .hamburger-line:nth-child(3) {
          transform: translateY(-5.5px) rotate(-45deg);
          background: #c9a34f;
        }
      `}</style>

      <nav className="main-nav navbar-root">

        {/* ── Top bar ── */}
        <div className="topbar">
          <div className="topbar-inner">
            <div className="topbar-left">
              <span className="topbar-badge">Official</span>
              <span className="topbar-text">Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia</span>
            </div>
            <div className="topbar-right">
              <span className="topbar-date" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                {new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* ── Main nav body ── */}
        <div className="nav-body">
          <div className="nav-inner" ref={dropdownRef}>

            {/* Logo */}
            <Link href="/" className="logo-wrap">
              <img 
                src="/icon.svg" 
                alt="POLTEKIMIPAS Logo" 
                style={{
                  width: "42px",
                  height: "42px",
                  filter: "drop-shadow(0 0 8px rgba(201,163,79,0.3))"
                }}
              />
              <div className="logo-text-group">
                <div className="logo-text-main">POLTEKI<span>MI</span>PAS</div>
                <div className="logo-text-sub">Politeknik Imigrasi Pemasyarakatan</div>
              </div>
            </Link>

            {/* Desktop links — only render on desktop */}
            {!isMobile && (
            <div className="desktop-links">
              {navItems.map((item) => (
                <div key={item.href} className="nav-item">
                  {item.children ? (
                    <>
                      <button
                        className={`nav-link-btn ${activeDropdown === item.label ? "dropdown-active" : ""}`}
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown className={`chevron ${activeDropdown === item.label ? "open" : ""}`} />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="dropdown-wrap">
                          <div className="dropdown-notch">
                            <div className="dropdown-notch-inner" />
                          </div>
                          <div className="dropdown-menu">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="dropdown-item"
                                onClick={() => { setActiveDropdown(null); setActiveLink(item.label) }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`nav-link-btn ${activeLink === item.label ? "active" : ""}`}
                      onClick={() => setActiveLink(item.label)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            )}

            {/* Actions */}
            <div className="actions">
              {/* Search pill — desktop only */}
              {!isMobile && (
                <button className="search-pill" onClick={onSearchOpen}>
                  <span className="search-pill-icon">
                    <Search style={{ width: 12, height: 12 }} />
                  </span>
                  Cari sesuatu...
                </button>
              )}

              {/* Search icon — mobile only */}
              {isMobile && (
                <button className="icon-btn" onClick={onSearchOpen} aria-label="Cari">
                  <Search style={{ width: 16, height: 16 }} />
                </button>
              )}

              <div className="actions-divider" />

              {/* Hamburger — mobile only */}
              {isMobile && (
                <button
                  className={`hamburger-wrap ${mobileOpen ? "open" : ""}`}
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Menu"
                >
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
          <div className="mobile-menu-inner">
            {navItems.map((item, i) => {
              const hasChildren = !!item.children
              const isExpanded = mobileExpanded === item.label
              const isActive = activeLink === item.label

              return (
                <div key={item.href}>
                  {i === 3 && <div className="mobile-divider" />}

                  {hasChildren ? (
                    /* Collapsible toggle for items with children */
                    <button
                      className={`mobile-link ${isActive ? "active" : ""}`}
                      onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                    >
                      {item.label}
                      <div className="mobile-link-right">
                        {item.children && (
                          <span style={{
                            fontSize: '10px',
                            color: 'rgba(255,255,255,0.25)',
                            fontWeight: 400,
                          }}>
                            {item.children.length}
                          </span>
                        )}
                        <ChevronDown className={`mobile-chevron ${isExpanded ? "open" : ""}`} />
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`mobile-link ${isActive ? "active" : ""}`}
                      onClick={() => { setMobileOpen(false); setActiveLink(item.label) }}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Collapsible sub-items */}
                  {hasChildren && (
                    <div className={`mobile-sub ${isExpanded ? "open" : ""}`}>
                      <div className="mobile-sub-inner">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="mobile-sub-link"
                            onClick={() => { setMobileOpen(false); setActiveLink(item.label) }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </nav>
    </>
  )
}