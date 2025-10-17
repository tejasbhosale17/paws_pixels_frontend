// RenditionDetails.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Download } from "lucide-react";
import pawLogo from "../assets/logo_pap.png";
import "../styles/downloadPage.min.css";
import dog_photo from "../assets/dog_golden.jpg";
import DownloadImage from "./DownloadImage";

export default function DownloadPage() {
  // You can tweak these defaults or load from props/api later
  const ratio = { w: 4, h: 5 };
  const label = "4:5 • Portrait";
  const src = dog_photo;
  const baseCaption = "Hanging out with my favorite furball 🐾";
  const tags = ["pets", "cute", "golden", "fetch"];
  const moods = ["playful", "sunny", "energetic"];

  const [extra, setExtra] = useState("");
  const [copied, setCopied] = useState(false);

  const finalCaption = useMemo(() => {
    const add = extra.trim();
    return add ? `${baseCaption} ${add}` : baseCaption;
  }, [baseCaption, extra]);

  const aspect = `${ratio.w} / ${ratio.h}`;

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(finalCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  // Center-biased crop (slightly upward to prefer faces) to the selected ratio, then download
  const cropAndDownload = async () => {
    const img = await loadImage(src);
    const r = ratio.w / ratio.h;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Focal bias (50% x, 35% y) to keep faces that are often a bit higher in the frame
    const fx = 0.5,
      fy = 0.35;

    let cw, ch;
    if (iw / ih > r) {
      // too wide → crop width
      ch = ih;
      cw = Math.round(ch * r);
    } else {
      // too tall → crop height
      cw = iw;
      ch = Math.round(cw / r);
    }

    let x = Math.round(iw * fx - cw / 2);
    let y = Math.round(ih * fy - ch / 2);
    x = Math.max(0, Math.min(iw - cw, x));
    y = Math.max(0, Math.min(ih - ch, y));

    // Output sizes for common social ratios
    let outW = 1080,
      outH = 1080; // default square
    const { w, h } = ratio;
    if (w === 4 && h === 5) {
      outW = 1080;
      outH = 1350;
    } else if (w === 16 && h === 9) {
      outW = 1920;
      outH = 1080;
    } else if (w === 9 && h === 16) {
      outW = 1080;
      outH = 1920;
    } else if (w === 1 && h === 1) {
      outW = 1080;
      outH = 1080;
    } else {
      // generic fallback
      if (r >= 1) {
        outW = 1280;
        outH = Math.round(1280 / r);
      } else {
        outW = 1080;
        outH = Math.round(1080 / r);
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, x, y, cw, ch, 0, 0, outW, outH);

    const url = canvas.toDataURL("image/jpeg", 0.95);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${label.replace(/\s+/g, "_")}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="dl-page">
      {/* Header (same look & logo) */}
      <header className="rd-header">
        <div className="rd-logo">
          <img src={pawLogo} alt="Paws & Pixels" className="rd-logo-img" />
          <span className="rd-logo-text">Paws &amp; Pixels</span>
        </div>
        <nav className="rd-nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact Us</a>
          <button className="rd-signin">Sign in</button>
        </nav>
      </header>

      <main className="dl-main">
        <section className="dl-wrap">
          {/* Left: rendition + meta */}
          <article className="dl-card dl-media-card">
            <div className="dl-media" style={{ aspectRatio: aspect }}>
              <img
                src={src}
                alt={label}
                style={{ objectFit: "cover", objectPosition: "50% 35%" }}
              />
            </div>

            <div className="dl-meta">
              <div className="dl-label">{label}</div>

              <div className="dl-chips">
                {tags.map((t) => (
                  <span key={t} className="dl-chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="dl-chips">
                {moods.map((m) => (
                  <span key={m} className="dl-chip dl-chip-soft">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Right: caption editor */}
          <article className="dl-card dl-editor">
            <h3 className="dl-title">Caption</h3>

            <div className="dl-caption-preview">{finalCaption}</div>

            <label className="dl-label-sm" htmlFor="extra">
              Add to caption
            </label>
            <textarea
              id="extra"
              className="dl-textarea"
              placeholder="Add hashtags, CTA, location…"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              rows={4}
            />

            <div className="dl-actions">
              <button className="rd-btn" onClick={copyCaption}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy Caption"}
              </button>
              <button
                className="rd-btn rd-btn-primary"
                onClick={cropAndDownload}
              >
                {/* <DownloadImage size={16} /> */}
                Generate Image
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
