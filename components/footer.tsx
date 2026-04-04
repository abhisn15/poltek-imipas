"use client"

import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter } from "lucide-react"

const sitemapLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Program Studi", href: "#program-studi" },
  { label: "Berita", href: "#berita" },
  { label: "Blog", href: "#blog" },
  { label: "Jurnal Ilmiah", href: "#jurnal" },
  { label: "Perpustakaan", href: "#perpustakaan" },
  { label: "Galeri", href: "#galeri" },
  { label: "Pengumuman", href: "#pengumuman" },
]

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "Twitter / X", href: "#", icon: Twitter },
]

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

        .footer-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #070f1e;
          color: rgba(255,255,255,0.7);
          position: relative;
          overflow: hidden;
        }

        /* Decorative glow blobs */
        .footer-root::before {
          content: '';
          position: absolute;
          top: -80px;
          left: -80px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(201,163,79,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-root::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: -60px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(201,163,79,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Top accent line */
        .footer-accent-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(201,163,79,0.6) 30%, #c9a34f 50%, rgba(201,163,79,0.6) 70%, transparent 100%);
        }

        .footer-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 24px 48px;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          gap: 48px 40px;
          grid-template-columns: 1fr;
        }

        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 1.8fr 1.2fr 1.2fr 1fr; }
        }

        /* Brand column */
        .footer-logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          text-decoration: none;
        }

        .footer-logo-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #c9a34f 0%, #e8c97a 50%, #b8892f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #0a1628;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(201,163,79,0.3);
          position: relative;
          overflow: hidden;
        }

        .footer-logo-badge::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
        }

        .footer-logo-name {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.08em;
          line-height: 1;
        }

        .footer-logo-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.04em;
          margin-top: 3px;
        }

        .footer-desc {
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255,255,255,0.45);
          margin-bottom: 20px;
          max-width: 280px;
        }

        .footer-tagline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(201,163,79,0.6);
          font-weight: 600;
          text-transform: uppercase;
        }

        .footer-tagline::before,
        .footer-tagline::after {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: rgba(201,163,79,0.35);
        }

        /* Section heading */
        .footer-heading {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c9a34f;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(201,163,79,0.15);
        }

        /* Contact items */
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .contact-item {
          display: flex;
          gap: 11px;
          align-items: flex-start;
        }

        .contact-icon-wrap {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(201,163,79,0.08);
          border: 1px solid rgba(201,163,79,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .contact-text {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
        }

        /* Sitemap */
        .sitemap-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px 12px;
        }

        .sitemap-link {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          padding: 5px 0;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          border-radius: 4px;
        }

        .sitemap-link::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(201,163,79,0.3);
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .sitemap-link:hover {
          color: #c9a34f;
        }

        .sitemap-link:hover::before {
          background: #c9a34f;
        }

        /* Social links */
        .social-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          text-decoration: none;
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .social-link:hover {
          background: rgba(201,163,79,0.08);
          border-color: rgba(201,163,79,0.2);
          color: #c9a34f;
        }

        .social-link:hover .social-icon {
          color: #c9a34f;
        }

        .social-icon {
          color: rgba(255,255,255,0.3);
          transition: color 0.2s;
          flex-shrink: 0;
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent);
          margin: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* Bottom bar */
        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 640px) {
          .footer-bottom { flex-direction: row; }
        }

        .footer-bottom-text {
          font-size: 11.5px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.01em;
        }

        .footer-bottom-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-bottom-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(201,163,79,0.3);
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-accent-bar" />

        <div className="footer-main">
          <div className="footer-grid">

            {/* Brand */}
            <div>
              <a href="#beranda" className="footer-logo-wrap">
                <div className="footer-logo-badge">P</div>
                <div>
                  <div className="footer-logo-name">POLTEKIMIPAS</div>
                  <div className="footer-logo-sub">Politeknik Imigrasi Pemasyarakatan</div>
                </div>
              </a>
              <p className="footer-desc">
                Perguruan Tinggi Kedinasan di bawah Kementerian Imigrasi dan
                Pemasyarakatan Republik Indonesia, mencetak SDM unggul di bidang pemasyarakatan.
              </p>
              <div className="footer-tagline">
                Cerdas · Berintegritas · Berdedikasi
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="footer-heading">Kontak</div>
              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-icon-wrap">
                    <MapPin style={{ width: 14, height: 14, color: "#c9a34f" }} />
                  </div>
                  <span className="contact-text">
                    Jl. Raya Gandul No.4, Cinere,<br />Depok, Jawa Barat 16514
                  </span>
                </div>
                <div className="contact-item">
                  <div className="contact-icon-wrap">
                    <Phone style={{ width: 14, height: 14, color: "#c9a34f" }} />
                  </div>
                  <span className="contact-text">(021) 7530442</span>
                </div>
                <div className="contact-item">
                  <div className="contact-icon-wrap">
                    <Mail style={{ width: 14, height: 14, color: "#c9a34f" }} />
                  </div>
                  <span className="contact-text">info@poltekimipas.ac.id</span>
                </div>
              </div>
            </div>

            {/* Sitemap */}
            <div>
              <div className="footer-heading">Peta Situs</div>
              <div className="sitemap-grid">
                {sitemapLinks.map((link) => (
                  <a key={link.href} href={link.href} className="sitemap-link">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="footer-heading">Sosial Media</div>
              <div className="social-list">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} className="social-link">
                    <Icon className="social-icon" style={{ width: 15, height: 15 }} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span className="footer-bottom-text">
            &copy; {new Date().getFullYear()} Politeknik Imigrasi Pemasyarakatan. Hak Cipta Dilindungi.
          </span>
          <div className="footer-bottom-right">
            <span className="footer-bottom-text">Kementerian Imigrasi dan Pemasyarakatan</span>
            <div className="footer-bottom-dot" />
            <span className="footer-bottom-text">Republik Indonesia</span>
          </div>
        </div>
      </footer>
    </>
  )
}