"use client"

import { useEffect, useState } from "react"

export default function SplashIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<
    "initial" | "logo-in" | "text-in" | "tagline-in" | "split" | "done"
  >("initial")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo-in"), 300)
    const t2 = setTimeout(() => setPhase("text-in"), 1100)
    const t3 = setTimeout(() => setPhase("tagline-in"), 2300)
    const t4 = setTimeout(() => setPhase("split"), 3500)
    const t5 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 4700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [onComplete])

  if (phase === "done") return null

  const isSplit = phase === "split"
  const textVisible = phase !== "initial" && phase !== "logo-in"
  const taglineVisible = phase === "tagline-in" || isSplit

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');

        @keyframes splash-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }

        @keyframes hex-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,163,79,0.4), 0 0 0 0 rgba(201,163,79,0.15); }
          50% { box-shadow: 0 0 0 10px rgba(201,163,79,0), 0 0 0 20px rgba(201,163,79,0); }
        }

        @keyframes underline-draw {
          from { width: 0; opacity: 0; }
          to { width: 120px; opacity: 1; }
        }

        @keyframes curtain-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .splash-curtain-left,
        .splash-curtain-right {
          background: #0a1628;
          position: absolute;
          top: 0;
          height: 100%;
          width: 50%;
          transition: transform 1200ms cubic-bezier(0.76, 0, 0.24, 1);
        }
        .splash-curtain-left { left: 0; }
        .splash-curtain-right { right: 0; }

        .splash-hex {
          width: 80px;
          height: 80px;
          background: linear-gradient(145deg, #c9a34f 0%, #e8c97a 45%, #a8782a 100%);
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: hex-pulse 2s ease-in-out infinite;
        }
        .splash-hex::before {
          content: '';
          position: absolute;
          inset: 3px;
          background: #0a1628;
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
        }
        .splash-monogram {
          position: relative;
          z-index: 1;
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: #c9a34f;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        @media (min-width: 768px) {
          .splash-hex { width: 96px; height: 96px; }
          .splash-monogram { font-size: 30px; }
        }

        .splash-underline {
          height: 2px;
          background: linear-gradient(90deg, #c9a34f, #e8c97a, #c9a34f);
          border-radius: 2px;
          margin: 12px auto 0;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, opacity 0.5s ease 0.3s;
        }

        .splash-dot-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(201,168,76,0.35) 1px, transparent 0);
          background-size: 24px 24px;
          pointer-events: none;
          transition: opacity 1200ms;
        }

        .splash-center-seam {
          position: absolute;
          top: 0;
          left: 50%;
          height: 100%;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom, transparent 10%, #c9a34f 40%, #c9a34f 60%, transparent 90%);
          transition: opacity 500ms;
        }
      `}</style>

      <div
        className="fixed inset-0 z-[200] pointer-events-none"
        aria-hidden="true"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Left curtain */}
        <div
          className="splash-curtain-left"
          style={{ transform: isSplit ? "translateX(-100%)" : "translateX(0)" }}
        />

        {/* Right curtain */}
        <div
          className="splash-curtain-right"
          style={{ transform: isSplit ? "translateX(100%)" : "translateX(0)" }}
        />

        {/* Dot pattern overlay */}
        <div
          className="splash-dot-pattern"
          style={{ opacity: isSplit ? 0 : 1 }}
        />

        {/* Gold seam */}
        <div
          className="splash-center-seam"
          style={{ opacity: isSplit ? 0 : 0.3 }}
        />

        {/* Center content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: isSplit ? 0 : 1,
            transition: "opacity 700ms ease",
          }}
        >
          {/* Logo from SVG */}
          <div
            style={{
              transform: phase === "initial" ? "scale(0) rotate(-120deg)" : "scale(1) rotate(0deg)",
              opacity: phase === "initial" ? 0 : 1,
              transition: "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 500ms ease",
            }}
          >
            <img 
              src="/icon.svg" 
              alt="POLTEKIMIPAS Logo" 
              style={{
                width: "80px",
                height: "80px",
                filter: "drop-shadow(0 0 20px rgba(201,163,79,0.4))"
              }}
            />
          </div>

          {/* POLTEKIMIPAS — letter-by-letter, exactly matching navbar */}
          <div className="mt-7 flex items-center gap-0.5 overflow-hidden">
            {"POLTEKIMIPAS".split("").map((char, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(22px, 5vw, 40px)",
                  letterSpacing: "0.15em",
                  color: i === 7 || i === 8
                    ? "#c9a34f"   /* "MI" highlighted gold — matches navbar */
                    : "#ffffff",
                  display: "inline-block",
                  transform: textVisible ? "translateY(0) rotateX(0deg)" : "translateY(100%) rotateX(90deg)",
                  opacity: textVisible ? 1 : 0,
                  transition: "transform 500ms ease, opacity 400ms ease",
                  transitionDelay: `${i * 75}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Gold underline */}
          <div
            className="splash-underline"
            style={{
              width: textVisible ? "120px" : "0px",
              opacity: textVisible ? 1 : 0,
            }}
          />

          {/* Full name — matches navbar logo-text-sub */}
          <p
            style={{
              marginTop: "16px",
              fontSize: "clamp(10px, 2vw, 12px)",
              fontWeight: 500,
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              transform: taglineVisible ? "translateY(0)" : "translateY(14px)",
              opacity: taglineVisible ? 1 : 0,
              transition: "transform 700ms ease, opacity 700ms ease",
            }}
          >
            Politeknik Ilmu Pemasyarakatan
          </p>

          {/* Tagline */}
          <p
            style={{
              marginTop: "6px",
              fontSize: "clamp(10px, 2vw, 12px)",
              letterSpacing: "0.2em",
              color: "rgba(201,163,79,0.8)",
              transform: taglineVisible ? "translateY(0)" : "translateY(14px)",
              opacity: taglineVisible ? 1 : 0,
              transition: "transform 700ms ease 200ms, opacity 700ms ease 200ms",
            }}
          >
            Cerdas · Berintegritas · Berdedikasi
          </p>

          {/* Ministry label */}
          <p
            style={{
              marginTop: "4px",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              transform: taglineVisible ? "translateY(0)" : "translateY(14px)",
              opacity: taglineVisible ? 1 : 0,
              transition: "transform 700ms ease 350ms, opacity 700ms ease 350ms",
            }}
          >
            Kementerian Imigrasi dan Pemasyarakatan RI
          </p>

          {/* Loading dots */}
          <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "8px" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#c9a34f",
                  opacity: isSplit ? 0 : 0.6,
                  animation:
                    phase !== "initial" && !isSplit
                      ? `splash-dot 1.2s ease-in-out ${i * 0.2}s infinite`
                      : "none",
                  transition: "opacity 300ms",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}