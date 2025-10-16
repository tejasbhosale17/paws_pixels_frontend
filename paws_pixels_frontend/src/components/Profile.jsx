import React from "react";
import { motion } from "framer-motion";
import pawLogo from "../assets/logo_pap.png";
import {
  Camera,
  Heart,
  PawPrint,
  Mail,
  MapPin,
  Calendar as CalendarIcon,
  User,
  Edit3,
  ShieldCheck,
  LogOut,
  Trash2,
} from "lucide-react";
import "../styles/profile.min.css";

export default function Profile({
  user = {
    name: "Alex Morgan",
    username: "alexm",
    email: "alex@example.com",
    location: "Austin, TX",
    joined: "Jan 2023",
    plan: "Pro",
    avatar:
      "https://api.dicebear.com/8.x/thumbs/svg?seed=paws&backgroundType=gradientLinear",
    stats: {
      photos: 428,
      pets: 3,
      favorites: 96,
    },
  },
  onEdit = () => console.log("Edit profile"),
  onLogout = () => console.log("Log out"),
  onDelete = () => console.log("Delete account"),
}) {
  return (
    <div className="pf-page">
      <header className="pf-header">
        <div className="pf-logo">
          {/* replaced the emoji box with the image */}
          <img src={pawLogo} alt="Paws & Pixels logo" className="pf-logo-img" />
          <span className="pf-logo-text">Paws &amp; Pixels</span>
        </div>
      </header>

      <main className="pf-main">
        {/* Title */}
        <section className="pf-hero">
          <h1 className="pf-title">Your Profile</h1>
          <p className="pf-subtitle">Basic details and account settings</p>
        </section>

        {/* Profile card */}
        <motion.section
          className="pf-card pf-profile-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="pf-profile-head">
            <img
              className="pf-avatar"
              src={user.avatar}
              alt={`${user.name} avatar`}
            />
            <div className="pf-id">
              <div className="pf-name-row">
                <h2 className="pf-name">{user.name}</h2>
                {/* <span className="pf-plan">
                  <ShieldCheck size={14} />
                  {user.plan}
                </span> */}
              </div>
              <div className="pf-username">@{user.username}</div>
              <div className="pf-meta">
                <span className="pf-meta-item">
                  <Mail size={14} /> {user.email}
                </span>
                <span className="pf-dot">•</span>
                <span className="pf-meta-item">
                  <MapPin size={14} /> {user.location}
                </span>
                <span className="pf-dot">•</span>
                <span className="pf-meta-item">
                  <CalendarIcon size={14} /> Joined {user.joined}
                </span>
              </div>
            </div>

            <button className="pf-edit" onClick={onEdit}>
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          {/* <div className="pf-stats">
            <div className="pf-stat">
              <div className="pf-stat-icon pf-badge-blue">
                <Camera size={18} />
              </div>
              <div className="pf-stat-value">{user.stats.photos}</div>
              <div className="pf-stat-label">Photos</div>
            </div>
            <div className="pf-stat">
              <div className="pf-stat-icon pf-badge-amber">
                <PawPrint size={18} />
              </div>
              <div className="pf-stat-value">{user.stats.pets}</div>
              <div className="pf-stat-label">Pets</div>
            </div>
            <div className="pf-stat">
              <div className="pf-stat-icon pf-badge-rose">
                <Heart size={18} />
              </div>
              <div className="pf-stat-value">{user.stats.favorites}</div>
              <div className="pf-stat-label">Favorites</div>
            </div>
          </div> */}
        </motion.section>

        {/* Account settings */}
        <motion.section
          className="pf-card pf-settings"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
        >
          <h3 className="pf-card-title">Account</h3>
          <div className="pf-list">
            <button className="pf-list-item" onClick={onEdit}>
              <div className="pf-list-left">
                <div className="pf-list-icon">
                  <User size={18} />
                </div>
                <div>
                  <div className="pf-list-title">Profile Information</div>
                  <div className="pf-list-sub">Name, username, avatar</div>
                </div>
              </div>
              <span className="pf-arrow">›</span>
            </button>
            <button className="pf-list-item" onClick={onEdit}>
              <div className="pf-list-left">
                <div className="pf-list-icon">
                  <User size={18} />
                </div>
                <div>
                  <div className="pf-list-title">Settings</div>
                  <div className="pf-list-sub">
                    Display, notifications, font size
                  </div>
                </div>
              </div>
              <span className="pf-arrow">›</span>
            </button>
            <button className="pf-list-item" onClick={onEdit}>
              <div className="pf-list-left">
                <div className="pf-list-icon">
                  <User size={18} />
                </div>
                <div>
                  <div className="pf-list-title">Privacy</div>
                  {/* <div className="pf-list-sub">Name, username, avatar</div> */}
                </div>
              </div>
              <span className="pf-arrow">›</span>
            </button>

            <button className="pf-list-item" onClick={onLogout}>
              <div className="pf-list-left">
                <div className="pf-list-icon">
                  <LogOut size={18} />
                </div>
                <div>
                  <div className="pf-list-title">Log Out</div>
                  <div className="pf-list-sub">Sign out of this device</div>
                </div>
              </div>
              <span className="pf-arrow">›</span>
            </button>
          </div>
        </motion.section>

        {/* Danger zone */}
        {/* <motion.section
          className="pf-card pf-danger"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
        >
          <div className="pf-danger-row">
            <div className="pf-danger-left">
              <div className="pf-danger-title">Delete account</div>
              <div className="pf-danger-sub">This action is permanent</div>
            </div>
            <button className="pf-danger-btn" onClick={onDelete}>
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </motion.section> */}

        {/* Stepper */}
        {/* <nav className="pf-stepper">
          <div className="pf-step">1. Connect</div>
          <div className="pf-step">2. Syncing</div>
          <div className="pf-step pf-step-active">3. Dashboard</div>
        </nav> */}
      </main>
    </div>
  );
}
