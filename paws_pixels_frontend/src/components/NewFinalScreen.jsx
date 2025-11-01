// RenditionDetails.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Download } from "lucide-react";
import pawLogo from "../assets/logo_pap.png";
import "../styles/downloadPage.min.css";
import dog_photo from "../assets/dog_golden.jpg";
import DownloadImage from "./DownloadImage";
import final_fused_image from "../assets/gemini_second_output.png";
const SRC = dog_photo;
export default function NewFinalScreen() {
  // You can tweak these defaults or load from props/api later
  const [caption, setCaption] = useState(
    "Hanging out with my favorite furball 🐾"
  );
  const STATIC_NARRATION =
    "The sunniest of smiles tells the whole story: this dog is on cloud nine! With a full belly from his favorite meal and the sheer joy of a long walk still buzzing in his paws, he's a happy blur of golden energy. Every wag of his tail is an invitation—it's going to be a playful afternoon of fetch and fun!";
  const [userNarration, setUserNarration] = useState(""); // user-added narration/description

  const [fused, setFused] = useState(""); // dataURL of fused result
  const [copied, setCopied] = useState(false);

  // What "Copy Caption" should copy
  const captionForCopy = useMemo(() => {
    return userNarration.trim()
      ? `${caption}\n\n${userNarration.trim()}`
      : caption;
  }, [caption, userNarration]);

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(captionForCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  // ----- Canvas helpers -----
  function loadImage(url) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = url;
    });
  }

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

  function wrapLines(ctx, text, maxWidth) {
    if (!text) return [];
    const words = text.split(/\s+/);
    const lines = [];
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  // ----- Fuse Image (caption + optional user narration) -----
  async function fuseImage() {
    const img = await loadImage(SRC);

    const outW = 1280;
    const outH =
      Math.round((img.naturalHeight / img.naturalWidth) * outW) || 853;

    const scale = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement("canvas");
    canvas.width = outW * scale;
    canvas.height = outH * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    // Draw image cover with slight upward bias
    const iw = img.naturalWidth,
      ih = img.naturalHeight;
    const rImg = iw / ih,
      rOut = outW / outH;
    let sx, sy, sw, sh;
    if (rImg > rOut) {
      sh = ih;
      sw = Math.round(sh * rOut);
      sx = Math.round((iw - sw) / 2);
      sy = 0;
    } else {
      sw = iw;
      sh = Math.round(sw / rOut);
      sx = 0;
      sy = Math.round((ih - sh) / 5);
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);

    // Text metrics
    const pad = 24;
    const maxTextWidth = outW - pad * 2;
    const centerX = outW / 2;

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 6;
    ctx.fillStyle = "#fff";

    // Measure lines first to size gradient panel
    const captionFont =
      "700 36px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial";
    const noteFont =
      "600 20px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial";
    const lhCaption = 42;
    const lhNote = 26;
    const gap = userNarration.trim() ? 10 : 0;

    ctx.font = captionFont;
    const captionLines = wrapLines(ctx, caption, maxTextWidth);

    ctx.font = noteFont;
    const noteLines = userNarration.trim()
      ? wrapLines(ctx, userNarration.trim(), maxTextWidth)
      : [];

    const totalTextHeight =
      captionLines.length * lhCaption + gap + noteLines.length * lhNote;

    // Dynamic gradient panel behind text
    const panelPadY = 20;
    const panelH = totalTextHeight + panelPadY * 1.8;
    const panelTop = outH - panelH - pad / 2;

    const grd = ctx.createLinearGradient(0, panelTop, 0, outH);
    grd.addColorStop(0, "rgba(0,0,0,0.00)");
    grd.addColorStop(1, "rgba(0,0,0,0.62)");
    ctx.fillStyle = grd;
    roundRect(ctx, pad, panelTop, outW - pad * 2, panelH, 22);
    ctx.fill();

    // Draw text
    let y = outH - panelH + panelPadY;
    ctx.fillStyle = "#fff";

    ctx.font = captionFont;
    for (const line of captionLines) {
      ctx.fillText(line, centerX, y);
      y += lhCaption;
    }

    if (noteLines.length) {
      y += gap;
      ctx.font = noteFont;
      for (const line of noteLines) {
        ctx.fillText(line, centerX, y);
        y += lhNote;
      }
    }

    setFused(canvas.toDataURL("image/jpeg", 0.95));
  }

  // Download fused image
  const downloadFused = () => {
    if (!fused) return;
    const a = document.createElement("a");
    a.href = fused;
    a.download = "fused.jpg";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="cf-page">
      {/* Header (same) */}
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
          {/* Left: original + fused preview + download */}
          <div className="cf-left">
            <div className="cf-photo">
              <img src={SRC} alt="Original" />
            </div>

            <div className="cf-photo">
              <img src={final_fused_image} alt="Fused result" />
              {/* {fused ? (
                <img src={final_fused_image} alt="Fused result" />
              ) : (
                <div className="cf-empty">Fused image will appear here</div>
              )} */}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <button
                className="rd-btn rd-btn-primary"
                onClick={downloadFused}
                disabled={!fused}
                title={
                  fused
                    ? "Download fused image"
                    : "Create the fused image first"
                }
              >
                <Download size={16} /> Download
              </button>
            </div>
          </div>

          {/* Right: UPDATED editor */}
          <div className="cf-right">
            <div className="cf-panel">
              {/* 1) Editable caption textbox */}
              <div
                className="cf-label"
                style={{ fontWeight: 700, fontSize: "larger" }}
              >
                Caption
              </div>
              <input
                className="cf-input"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Type your caption…"
              />

              {/* 2) Non-editable narration (given text) */}
              <div
                className="cf-label"
                style={{ fontWeight: 700, fontSize: "larger" }}
              >
                Narration
              </div>
              <textarea
                className="cf-textarea cf-textarea-readonly"
                value={STATIC_NARRATION}
                readOnly
                rows={6}
              />

              {/* 3) User narration input box */}
              <div
                className="cf-label"
                style={{
                  fontWeight: 700,
                  fontSize: "larger",
                  marginTop: "12px",
                }}
              >
                Add your narration
              </div>
              <textarea
                className="cf-textarea"
                placeholder="Write your description or narration…"
                rows={5}
                value={userNarration}
                onChange={(e) => setUserNarration(e.target.value)}
              />

              {/* 4) Action buttons */}
              <div className="cf-actions">
                <button className="rd-btn" onClick={copyCaption}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy Caption"}
                </button>
                <button className="rd-btn rd-btn-primary" onClick={fuseImage}>
                  Submit
                </button>
                <button className="rd-btn rd-btn-primary" onClick={fuseImage}>
                  Fuse Image
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
