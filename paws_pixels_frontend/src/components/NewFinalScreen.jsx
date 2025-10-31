// src/pages/GeneratedImagePageStatic.jsx
import React, { useMemo, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import pawLogo from "../assets/logo_pap.png";
import "../styles/newFinalScreen.min.css";
import dog_golden from "../assets/dog_golden.jpg";
const SRC = dog_golden; // Replace with actual image URL or prop

export default function NewFinalScreen() {
  // Base caption + user inputs
  const baseCaption = "Hanging out with my favorite furball 🐾";
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState(""); // e.g. "#pets #cute #golden #fetch"
  const [fused, setFused] = useState(""); // dataURL of fused result
  const [copied, setCopied] = useState(false);

  // Final caption (two lines: main + tags)
  const captionMain = useMemo(
    () => (desc.trim() ? `${baseCaption} ${desc.trim()}` : baseCaption),
    [baseCaption, desc]
  );
  const captionTags = useMemo(() => tags.trim(), [tags]);
  const captionForCopy = useMemo(
    () => (captionTags ? `${captionMain}\n${captionTags}` : captionMain),
    [captionMain, captionTags]
  );

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(captionForCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  function loadImage(url) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = url;
    });
  }

  // Draw rounded rectangle helper
  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  // Fuse: draw image, bottom fade, then text
  async function fuseImage() {
    const img = await loadImage(SRC);

    // Output width/height (keep landscape feel)
    const outW = 1280;
    const outH =
      Math.round((img.naturalHeight / img.naturalWidth) * outW) || 853;

    const c = document.createElement("canvas");
    c.width = outW;
    c.height = outH;
    const ctx = c.getContext("2d");

    // Draw image (cover)
    const iw = img.naturalWidth,
      ih = img.naturalHeight;
    const rImg = iw / ih,
      rOut = outW / outH;
    let sx, sy, sw, sh;
    if (rImg > rOut) {
      // too wide: crop width
      sh = ih;
      sw = Math.round(sh * rOut);
      sx = Math.round((iw - sw) / 2);
      sy = 0;
    } else {
      // too tall: crop height
      sw = iw;
      sh = Math.round(sw / rOut);
      sx = 0;
      sy = Math.round((ih - sh) / 5); // nudge up to favor faces
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);

    // Bottom gradient panel for text
    const pad = 24;
    const panelH = 120;
    const grd = ctx.createLinearGradient(0, outH - panelH, 0, outH);
    grd.addColorStop(0, "rgba(0,0,0,0.0)");
    grd.addColorStop(1, "rgba(0,0,0,0.55)");
    ctx.fillStyle = grd;
    roundRect(ctx, pad, outH - panelH - pad / 2, outW - pad * 2, panelH, 22);
    ctx.fill();

    // Draw caption text (centered)
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 6;
    const centerX = outW / 2;

    // Main line
    ctx.font =
      "700 36px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial";
    ctx.fillText(captionMain, centerX, outH - 40);

    // Tags line (optional)
    if (captionTags) {
      ctx.font =
        "600 18px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial";
      ctx.fillText(captionTags, centerX, outH - 16);
    }

    setFused(c.toDataURL("image/jpeg", 0.95));
  }

  return (
    <div className="cf-page">
      {/* Header (same look) */}
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

      <main className="cf-main">
        <section className="cf-grid">
          {/* Left: original + fused preview */}
          <div className="cf-left">
            <div className="cf-photo">
              <img src={SRC} alt="Original" />
            </div>

            <div className="cf-photo">
              {fused ? (
                <img src={fused} alt="Fused result" />
              ) : (
                <div className="cf-empty">Fused image will appear here</div>
              )}
            </div>
          </div>

          {/* Right: editor */}
          <div className="cf-right">
            <div className="cf-panel">
              <div className="cf-label">Caption:</div>
              <div className="cf-preview">{captionMain}</div>

              <input
                className="cf-input"
                type="text"
                placeholder="Add Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />

              <textarea
                className="cf-textarea"
                placeholder="Add hashtag, and other information"
                rows={6}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <div className="cf-actions">
                <button className="rd-btn" onClick={copyCaption}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy Caption"}
                </button>
                <button className="rd-btn rd-btn-primary" onClick={fuseImage}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
