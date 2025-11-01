import React, { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import pawLogo from "../assets/logo_pap.png";
import "../styles/finalCaption.min.css";
import dog_photo from "../assets/dog_golden.jpg";
import dog_photo_gemini from "../assets/dog_socialmedia_ready.png";
// Hard-coded demo image (swap for yours)

export default function FinalChanges() {
  const IMG = dog_photo;
  const IMG_gemini = dog_photo_gemini;

  const baseCaption = "Hanging out with my favorite furball 🐾";
  const tags = ["pets", "cute", "golden", "fetch"];
  const moods = ["playful", "sunny", "energetic"];
  const [value, setValue] = useState(() => baseCaption);
  return (
    <div className="cf-page">
      {/* Header (kept same as your other pages) */}
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

      {/* Main */}
      <main className="cf-main">
        <section className="cf-grid">
          {/* Left column: original + fused preview (static) */}
          <div className="cf-left">
            <figure className="cf-photo">
              <img src={IMG} alt="Original" />
            </figure>

            <figure className="cf-photo cf-photo-fused">
              <img src={IMG_gemini} alt="Fused preview" />
            </figure>
            {/* <div className="download-img">
              <button
                className="rd-btn rd-btn-primary"
                style={{ marginLeft: "40%" }}
              >
                Download Image
              </button>
            </div> */}
          </div>

          {/* Right column: caption panel (static UI) */}
          <div className="cf-right">
            <div className="cf-panel">
              <div className="cf-cap-label">Caption:</div>

              <div className="cf-cap-preview">
                <input
                  className="cf-input"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="cf-cap-preview">Description/ Narrative</div>
              <div className="p" style={{ marginBottom: "40px" }}>
                The sunniest of smiles tells the whole story: this dog is on
                cloud nine! With a full belly from his favorite meal and the
                sheer joy of a long walk still buzzing in his paws, he's a happy
                blur of golden energy. Every wag of his tail is an
                invitation—it's going to be a playful afternoon of fetch and
                fun!
              </div>

              <div
                className="p-your-input"
                style={{ marginBottom: "10px", color: "gray" }}
              >
                your input optional
              </div>
              <input
                className="cf-input"
                type="text"
                rows={15}
                placeholder="Add description or narrative (optional)"
              ></input>
              {/* <textarea
                className="cf-textarea"
                rows={7}
                placeholder="Add hashtag, and other information"
                readOnly
              /> */}

              <div className="cf-actions">
                <button className="rd-btn">Copy Description</button>
                <button className="rd-btn">Save</button>
                <button className="rd-btn rd-btn-primary">Fuse Image</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
