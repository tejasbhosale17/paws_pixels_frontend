// src/pages/GeneratedImagePage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import pawLogo from "../assets/logo_pap.png"; // adjust the path if needed
import "../styles/downloadImage.min.css";
import dog_socialmedia_ready_photo from "../assets/dog_socialmedia_ready.png";
import { useNavigate } from "react-router-dom";
// ...

export default function DownloadImage() {
  const IMAGE_URL = dog_socialmedia_ready_photo; // Replace with actual image URL
  const download = async () => {
    try {
      // Try to fetch and download (works when CORS allows it)
      const resp = await fetch(IMAGE_URL, { mode: "cors" });
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = FILENAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in a new tab if direct download isn't allowed
      window.open(IMAGE_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="gi-page">
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

      <main className="gi-main">
        <section className="gi-card">
          <div className="gi-media">
            <img src={IMAGE_URL} alt="Generated rendition" />
          </div>

          <div className="gi-actions">
            <button className="rd-btn rd-btn-primary" onClick={download}>
              {/* <Download size={16} /> */}
              Download Image
            </button>
            <button
              className="rd-btn rd-btn-success"
              onClick={download}
              style={{ marginLeft: "6px" }}
            >
              {/* <Download size={16} />  */}
              Edit
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
