// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-bs-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";
  const logoLight = "assets/images/logo_pap.png";
  const logoDark = "assets/images/logo_dark.png";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body sticky-top shadow-sm">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center fw-bold"
            to="/"
          >
            <img
              id="brandLogo"
              src={isDark ? logoDark : logoLight}
              alt="Paws & Pixels logo"
              height="50"
              width="50"
              className="d-inline-block align-text-top"
            />
            <span className="ms-2">Paws & Pixels</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary ms-lg-2" to="/signin">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <button
                  id="themeToggle"
                  className="btn btn-outline-secondary ms-2"
                  aria-label="Toggle theme"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  <i
                    id="themeIcon"
                    className={`bi ${isDark ? "bi-moon" : "bi-sun"}`}
                  ></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="container py-4">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <h1 className="display-5 fw-bold">
              Auto-caption your pet photos with AI
            </h1>
            <p className="lead">
              Connect <strong>Google Photos</strong> or{" "}
              <strong>Pinterest</strong>. We use
              <strong> Google Vision</strong> to understand each picture and{" "}
              <strong>Gemini</strong> to craft a short caption and mood
              tags—plus <strong>smart auto-crop renditions</strong> for 1:1,
              4:5, 16:9, and 9:16.
            </p>
            <Link to="/signin" className="btn btn-primary">
              Launch Studio
            </Link>
          </div>
          <div className="col-md-6">
            <img
              src="assets/images/banner1_home.png"
              className="img-fluid rounded shadow"
              alt="Computer Vision illustration"
            />
          </div>
        </div>
      </header>

      <section id="how-it-works" className="container py-4">
        <h2 className="h3 mb-4">How it works</h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="display-6 mb-2">
                  <i className="bi bi-link-45deg"></i>
                </div>
                <h3 className="h5">Connect your photos</h3>
                <p className="mb-0">
                  Choose Google Photos or upload a few images to start.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="display-6 mb-2">
                  <i className="bi bi-search"></i>
                </div>
                <h3 className="h5">We analyze each image</h3>
                <p className="mb-0">
                  Vision detects what’s in the photo; Gemini drafts a caption
                  and mood tags.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="display-6 mb-2">
                  <i className="bi bi-crop"></i>
                </div>
                <h3 className="h5">Smart auto-crop</h3>
                <p className="mb-0">
                  Keep your pet centered and generate 1:1, 4:5, 16:9, and 9:16
                  renditions instantly.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="display-6 mb-2">
                  <i className="bi bi-stars"></i>
                </div>
                <h3 className="h5">Copy, filter & export</h3>
                <p className="mb-0">
                  Save favorites, filter by mood, and export captions for
                  posting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <h2 className="h3 mb-4">What you get</h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6">Smart auto-tagging</h3>
                <p className="mb-0">
                  Top labels (e.g., dog, park, ball) from Google Vision to help
                  organize.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6">AI captions</h3>
                <p className="mb-0">
                  Short, social-ready lines for each photo—no writer’s block.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6">Mood tags</h3>
                <p className="mb-0">
                  Quick vibes like <em>playful</em>, <em>sleepy</em>,{" "}
                  <em>outdoor</em> for easy filtering.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6">Auto-crop & renditions</h3>
                <p className="mb-0">
                  Perfect 1:1, 4:5, 16:9, and 9:16 crops—ready for feed, reels,
                  stories, or banners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <h2 className="h3 mb-3">Example output</h2>
        <div className="row g-4 align-items-center">
          <div className="col-md-7">
            <div className="border rounded p-3 bg-body-tertiary">
              <div className="small text-uppercase text-muted mb-2">
                Caption
              </div>
              <div className="fs-5 fw-semibold">
                “Golden retriever on fetch duty.”
              </div>
              <div className="small text-uppercase text-muted mt-3 mb-2">
                Mood tags
              </div>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge text-bg-light">playful</span>
                <span className="badge text-bg-light">outdoor</span>
                <span className="badge text-bg-light">weekend</span>
              </div>
              <div className="small text-uppercase text-muted mt-3 mb-2">
                Labels
              </div>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge text-bg-light">dog</span>
                <span className="badge text-bg-light">frisbee</span>
                <span className="badge text-bg-light">park</span>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src="assets/images/frisbee_gr.jpg"
              className="img-fluid rounded shadow"
              alt="Golden retriever fetching frisbee"
            />
          </div>
        </div>
      </section>

      <section className="container py-4">
        <h2 className="h3 mb-3">Smart auto-crop & social renditions</h2>
        <p className="text-muted mb-4">
          We keep your pet in focus and generate platform-ready crops
          automatically.
        </p>
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <div className="ratio ratio-1x1 rounded shadow overflow-hidden">
              <img
                src="assets/images/frisbee_gr.jpg"
                className="w-100 h-100 object-fit-cover"
                alt="Square crop preview"
              />
            </div>
            <div className="small text-center mt-2">1:1 • Square</div>
          </div>
          <div className="col-6 col-md-3">
            <div
              className="ratio rounded shadow overflow-hidden"
              style={{ "--bs-aspect-ratio": "125%" }}
            >
              <img
                src="assets/images/frisbee_gr.jpg"
                className="w-100 h-100 object-fit-cover"
                alt="4:5 crop preview"
              />
            </div>
            <div className="small text-center mt-2">4:5 • Portrait</div>
          </div>
          <div className="col-6 col-md-3">
            <div className="ratio ratio-16x9 rounded shadow overflow-hidden">
              <img
                src="assets/images/frisbee_gr.jpg"
                className="w-100 h-100 object-fit-cover"
                alt="16:9 crop preview"
              />
            </div>
            <div className="small text-center mt-2">16:9 • Landscape</div>
          </div>
          <div className="col-6 col-md-3">
            <div
              className="ratio rounded shadow overflow-hidden"
              style={{ "--bs-aspect-ratio": "177.78%" }}
            >
              <img
                src="assets/images/frisbee_gr.jpg"
                className="w-100 h-100 object-fit-cover"
                alt="9:16 crop preview"
              />
            </div>
            <div className="small text-center mt-2">9:16 • Story</div>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <h2 className="h3 mb-3">Private by design</h2>
        <ul className="list-unstyled">
          <li className="mb-1">
            • You choose which photos to analyze; nothing else is touched.
          </li>
          <li className="mb-1">
            • Delete results anytime, your library stays yours.
          </li>
          <li className="mb-1">
            • We log processing for transparency (no resale of data).
          </li>
        </ul>
        <div className="d-flex flex-wrap gap-2 mt-3">
          <span className="badge text-bg-light">Google Photos</span>
          <span className="badge text-bg-light">Direct Upload</span>
        </div>
      </section>

      <section className="container py-4">
        <div className="p-4 p-md-5 rounded bg-body-tertiary text-center">
          <h2 className="h3 mb-2">Ready to see your pet pics shine?</h2>
          <p className="mb-3">Connect an album and get captions in seconds.</p>
          <Link to="/signin" className="btn btn-primary btn-lg">
            Launch Studio
          </Link>
        </div>
      </section>

      <footer className="container py-4">
        <div className="d-flex flex-wrap justify-content-between small text-muted">
          <span>© Paws & Pixels</span>
          <span>
            <Link to="/" className="link-secondary me-3">
              Home
            </Link>
            <Link to="/about" className="link-secondary me-3">
              About
            </Link>
            <Link to="/contact" className="link-secondary">
              Contact
            </Link>
          </span>
        </div>
      </footer>
    </>
  );
}
