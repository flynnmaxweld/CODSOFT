import { useState } from "react";

const ACCENT = "#2F5D50";
const BG = "#FAFAF8";
const SURFACE = "#FFFFFF";
const TEXT_PRIMARY = "#111111";
const TEXT_SECONDARY = "#6B7280";
const BORDER = "rgba(0,0,0,0.07)";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10.25" stroke={TEXT_PRIMARY} strokeWidth="1.5" />
        <circle cx="11" cy="11" r="3" fill={ACCENT} />
      </svg>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "17px",
          fontWeight: 500,
          letterSpacing: "0.18em",
          color: TEXT_PRIMARY,
          textTransform: "uppercase",
        }}
      >
        Cove
      </span>
    </div>
  );
}

function FeatureRow({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "28px",
        paddingTop: "28px",
        paddingBottom: "28px",
        borderBottom: `1px solid ${BORDER}`,
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          color: ACCENT,
          letterSpacing: "0.06em",
          paddingTop: "3px",
          minWidth: "20px",
        }}
      >
        {number}
      </span>
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: TEXT_PRIMARY,
            marginBottom: "6px",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: TEXT_SECONDARY,
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [hoverGet, setHoverGet] = useState(false);
  const [hoverFinish, setHoverFinish] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "60px 20px 80px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .email-wrap {
          width: 100%;
          max-width: 560px;
        }

        .account-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid ${BORDER};
        }
        .account-row:last-child { border-bottom: none; }

        @media (max-width: 600px) {
          .hero-headline { font-size: 32px !important; }
          .section-pad { padding-left: 28px !important; padding-right: 28px !important; }
          .header-pad { padding: 24px 28px !important; }
          .footer-links { flex-direction: column !important; gap: 12px !important; }
          .cta-inner { padding: 36px 28px !important; }
        }
      `}</style>

      <div className="email-wrap">

        {/* ── Header ── */}
        <div
          className="header-pad"
          style={{
            backgroundColor: SURFACE,
            borderBottom: `1px solid ${BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 48px",
          }}
        >
          <Logo />
          <span
            style={{
              fontSize: "11px",
              color: TEXT_SECONDARY,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Welcome
          </span>
        </div>

        {/* ── Hero ── */}
        <div
          className="section-pad"
          style={{
            backgroundColor: SURFACE,
            padding: "72px 48px 64px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: ACCENT,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "32px",
            }}
          >
            Hello, Alex
          </p>

          <h1
            className="hero-headline"
            style={{
              fontSize: "42px",
              fontWeight: 300,
              color: TEXT_PRIMARY,
              letterSpacing: "-0.035em",
              lineHeight: 1.12,
              marginBottom: "8px",
            }}
          >
            Welcome to
          </h1>
          <h1
            className="hero-headline"
            style={{
              fontSize: "42px",
              fontWeight: 500,
              color: TEXT_PRIMARY,
              letterSpacing: "-0.035em",
              lineHeight: 1.12,
              marginBottom: "28px",
            }}
          >
            Cove.
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: TEXT_SECONDARY,
              lineHeight: 1.8,
              maxWidth: "360px",
              marginBottom: "48px",
              fontWeight: 300,
            }}
          >
            A quieter place to connect, create and discover. Your space is ready.
          </p>

          <button
            onMouseEnter={() => setHoverGet(true)}
            onMouseLeave={() => setHoverGet(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: hoverGet ? "#274e43" : ACCENT,
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
              padding: "14px 32px",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "background-color 0.2s ease",
            }}
          >
            Get Started
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1.5 6H10.5M10.5 6L7 2.5M10.5 6L7 9.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Thin rule ── */}
        <div style={{ backgroundColor: SURFACE, padding: "0 48px" }}>
          <div style={{ height: "1px", backgroundColor: BORDER }} />
        </div>

        {/* ── Features ── */}
        <div
          className="section-pad"
          style={{
            backgroundColor: SURFACE,
            padding: "48px 48px 20px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: TEXT_SECONDARY,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Built for you
          </p>

          <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: "24px" }}>
            <FeatureRow
              number="01"
              title="Privacy First"
              description="Your data is yours. End-to-end encryption on everything you create and share within Cove."
            />
            <FeatureRow
              number="02"
              title="Meaningful Connections"
              description="Find and follow people who genuinely share your curiosity — no engagement traps, no algorithmic distortion."
            />
            <FeatureRow
              number="03"
              title="Distraction Free"
              description="A focused environment without advertisements, infinite scrolls, or attention-hijacking mechanics."
            />
          </div>
        </div>

        {/* ── Account Summary ── */}
        <div
          className="section-pad"
          style={{
            backgroundColor: SURFACE,
            padding: "48px 48px",
          }}
        >
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "48px" }}>
            <p
              style={{
                fontSize: "11px",
                color: TEXT_SECONDARY,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Your Account
            </p>

            <div>
              {[
                { label: "Email address", value: "alex@example.com" },
                { label: "Username", value: "@alex_rivers" },
                {
                  label: "Account status",
                  value: (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: ACCENT }}>
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: ACCENT,
                          display: "inline-block",
                        }}
                      />
                      Active
                    </span>
                  ),
                },
              ].map((row, i) => (
                <div key={i} className="account-row">
                  <span style={{ fontSize: "12px", color: TEXT_SECONDARY, letterSpacing: "0.01em" }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: TEXT_PRIMARY }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          style={{
            backgroundColor: TEXT_PRIMARY,
            padding: "0",
          }}
        >
          <div
            className="cta-inner"
            style={{ padding: "56px 48px" }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Almost there
            </p>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: 300,
                color: "#FFFFFF",
                letterSpacing: "-0.025em",
                lineHeight: 1.25,
                marginBottom: "12px",
              }}
            >
              Complete your profile.
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                maxWidth: "300px",
                marginBottom: "36px",
                fontWeight: 300,
              }}
            >
              Add a photo and a short bio. It takes under two minutes and helps others find you.
            </p>
            <button
              onMouseEnter={() => setHoverFinish(true)}
              onMouseLeave={() => setHoverFinish(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: hoverFinish ? "rgba(255,255,255,0.06)" : "transparent",
                color: "#FFFFFF",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: hoverFinish ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                padding: "13px 28px",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              Finish Setup
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6H10.5M10.5 6L7 2.5M10.5 6L7 9.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="section-pad"
          style={{
            backgroundColor: SURFACE,
            borderTop: `1px solid ${BORDER}`,
            padding: "36px 48px",
          }}
        >
          <div
            className="footer-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              marginBottom: "24px",
            }}
          >
            {["Help Center", "Privacy Policy", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "11px",
                  color: TEXT_SECONDARY,
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = TEXT_PRIMARY)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = TEXT_SECONDARY)}
              >
                {link}
              </a>
            ))}
          </div>

          <p
            style={{
              fontSize: "11px",
              color: "rgba(107,114,128,0.6)",
              lineHeight: 1.7,
              maxWidth: "380px",
            }}
          >
            You received this because you created a Cove account.
            <br />
            © 2026 Cove Technologies, Inc. · San Francisco, CA
            {" · "}
            <a
              href="#"
              style={{
                color: "rgba(107,114,128,0.6)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Unsubscribe
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
