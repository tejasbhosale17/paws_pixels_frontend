import React, { useMemo } from "react";
import { Dog, Download, Eye } from "lucide-react";
import "../styles/renditions.min.css";
import DogPhoto from "../assets/dog_golden.jpg";
import pawLogo from "../assets/logo_pap.png";
// Use one source image for all renditions (can be any URL)
const SRC = DogPhoto;

const RENDITIONS = [
  { id: "square", w: 1, h: 1, label: "1:1 • Square", src: SRC },
  { id: "portrait", w: 4, h: 5, label: "4:5 • Portrait", src: SRC },
  { id: "land", w: 16, h: 9, label: "16:9 • Landscape", src: SRC },
  { id: "story", w: 9, h: 16, label: "9:16 • Story", src: SRC },
];

// Keep card visual weight similar by equalizing area across ratios.
function widthFor(w, h) {
  const ratio = w / h;
  const BASE_AREA = 300 * 300; // tweak if you want bigger/smaller cards
  const raw = Math.sqrt(BASE_AREA * ratio); // width that gives ~equal area
  return Math.max(260, Math.min(520, Math.round(raw)));
}

export default function Renditions() {
  const cards = useMemo(
    () =>
      RENDITIONS.map((r) => ({
        ...r,
        cardWidth: widthFor(r.w, r.h),
        aspect: `${r.w} / ${r.h}`,
      })),
    []
  );

  const downloadImage = async (src, name = "image.jpg") => {
    const resp = await fetch(src, { mode: "cors" });
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: name,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rd-page">
      <header className="rd-header">
        <div className="rd-logo">
          <img src={pawLogo} alt="Paws & Pixels logo" className="pf-logo-img" />
          <span className="rd-logo-text">Paws &amp; Pixels</span>
        </div>
        <nav className="rd-nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact Us</a>
          <button className="rd-signin">Sign in</button>
        </nav>
      </header>

      <main className="rd-main">
        <section className="rd-hero">
          <h1 className="rd-title">Smart auto-crop &amp; social renditions</h1>
          <p className="rd-subtitle">
            We keep your pet in focus and generate platform-ready crops
            automatically.
          </p>
        </section>

        <section className="rd-renditions">
          {cards.map((c) => (
            <article
              key={c.id}
              className="rd-card"
              style={{ width: `${c.cardWidth}px` }}
            >
              {/* The media box ENFORCES the target ratio */}
              <div className="rd-media" style={{ aspectRatio: c.aspect }}>
                <img
                  src={c.src}
                  alt={c.label}
                  style={{ objectFit: "cover", objectPosition: "50% 30%" }}
                />
              </div>

              <div className="rd-caption">{c.label}</div>

              <div className="rd-actions">
                <button
                  className="rd-btn"
                  onClick={() =>
                    window.open(c.src, "_blank", "noopener,noreferrer")
                  }
                  aria-label={`View ${c.label}`}
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  className="rd-btn rd-btn-primary"
                  onClick={() => downloadImage(c.src, `${c.id}.jpg`)}
                  aria-label={`Download ${c.label}`}
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
