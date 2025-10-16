import React, { useState } from "react";
import {
  Camera,
  Upload,
  RefreshCw,
  User,
  Settings,
  LogOut,
  Mail,
  MapPin,
  Calendar,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/navigation.min.css";
const NavigationPage = () => {
  const [currentScreen, setCurrentScreen] = useState("connect");
  const [isEditing, setIsEditing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    bio: "Pet lover and content creator sharing adventures with my golden retriever Max and tabby cat Luna 🐾",
  });

  const [editForm, setEditForm] = useState({ ...userInfo });

  const handleSave = () => {
    setUserInfo({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...userInfo });
    setIsEditing(false);
  };

  const samplePhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400",
      labels: ["dog", "frisbee", "park"],
      moods: ["playful", "energetic", "outdoorsy"],
      caption: "Golden retriever on fetch duty.",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
      labels: ["cat", "window", "cushion"],
      moods: ["relaxed", "cozy", "sleepy"],
      caption: "Sunbeam supervisor on break.",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400",
      labels: ["rabbit", "grass", "ears"],
      moods: ["alert", "curious", "gentle"],
      caption: "Garden explorer on the prowl.",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
      labels: ["dog", "puppy", "log"],
      moods: ["goofy", "excited", "friendly"],
      caption: "Tongue out, no doubt.",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
      labels: ["cat", "table", "whiskers"],
      moods: ["curious", "sneaky", "focused"],
      caption: "Who, me? Up to something?",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400",
      labels: ["parrot", "beak", "feathers"],
      moods: ["colorful", "vibrant", "calm"],
      caption: "Feathered friend in full color.",
    },
  ];

  const stats = [
    { label: "Photos Analyzed", value: "247" },
    { label: "Captions Generated", value: "247" },
    { label: "CSV Exports", value: "12" },
    { label: "Favorites", value: "38" },
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const screens = {
    connect: (
      <motion.div
        className="screen"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="header">
          <div className="container">
            <div className="header-content">
              <div className="logo-section">
                <img
                  src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c5/24/63/c5246334-2bc7-bc96-38b6-472cb2f5adb7/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1024x1024bb.png"
                  alt="Paws & Pixels"
                  className="logo"
                />
                <h1>Paws & Pixels</h1>
              </div>
              <button className="icon-btn">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="tabs-nav">
          <div className="container">
            <button className="tab active">All</button>
            <button className="tab">Cats</button>
            <button className="tab">Dogs</button>
            <button className="tab">Other</button>
          </div>
        </div>

        <div className="connect-content">
          <motion.div
            className="connect-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Connect Your Photos</h2>
            <p>Choose where to find your pet photos</p>
          </motion.div>

          <div className="connect-options">
            <motion.button
              className="connect-card"
              onClick={() => setCurrentScreen("syncing")}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="connect-icon google">
                <span>G</span>
              </div>
              <div className="connect-info">
                <h3>Google Photos</h3>
                <p>Access your photo library</p>
              </div>
              <span className="arrow">→</span>
            </motion.button>

            <motion.button
              className="connect-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="connect-icon upload">
                <Upload size={28} />
              </div>
              <div className="connect-info">
                <h3>Upload Files</h3>
                <p>Select photos from your device</p>
              </div>
              <span className="arrow">→</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    ),

    syncing: (
      <motion.div
        className="screen"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="header">
          <div className="container">
            <div className="header-content">
              <div className="logo-section">
                <img
                  src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c5/24/63/c5246334-2bc7-bc96-38b6-472cb2f5adb7/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1024x1024bb.png"
                  alt="Paws & Pixels"
                  className="logo"
                />
                <h1>Paws & Pixels</h1>
              </div>
              <button className="icon-btn">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="tabs-nav">
          <div className="container">
            <button className="tab active">All</button>
            <button className="tab">Cats</button>
            <button className="tab">Dogs</button>
            <button className="tab">Other</button>
          </div>
        </div>

        <div className="syncing-content">
          <motion.div
            className="syncing-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw size={48} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Analyzing Your Photos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Finding pets and generating captions with AI...
          </motion.p>

          <motion.div
            className="syncing-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="processing-info">
              <div className="processing-icon">
                <Camera size={20} />
              </div>
              <span>Processing photos...</span>
            </div>

            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            <p className="processing-note">This may take a moment</p>
          </motion.div>

          <motion.button
            className="btn-primary"
            onClick={() => setCurrentScreen("dashboard")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Dashboard
          </motion.button>
        </div>
      </motion.div>
    ),

    dashboard: (
      <motion.div
        className="screen"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="header">
          <div className="container">
            <div className="header-content">
              <div className="logo-section">
                <img
                  src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c5/24/63/c5246334-2bc7-bc96-38b6-472cb2f5adb7/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1024x1024bb.png"
                  alt="Paws & Pixels"
                  className="logo"
                />
                <h1>Paws & Pixels</h1>
              </div>

              <div className="header-actions">
                <button className="btn-primary">Export CSV</button>
                <button
                  className="icon-btn"
                  onClick={() => setCurrentScreen("profile")}
                >
                  <User size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs-nav">
          <div className="container">
            <button className="tab active">All</button>
            <button className="tab">Cats</button>
            <button className="tab">Dogs</button>
            <button className="tab">Other</button>
          </div>
        </div>

        <div className="filters">
          <div className="container">
            <div className="filter-group">
              <label>Filter by Label:</label>
              <select>
                <option>All Labels</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Filter by Mood:</label>
              <select>
                <option>All Moods</option>
              </select>
            </div>
            <button className="btn-secondary">Clear Filters</button>
          </div>
        </div>

        <div className="container">
          <div className="photo-grid">
            {samplePhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="photo-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
              >
                <div className="photo-image">
                  <img src={photo.url} alt={photo.caption} />
                </div>

                <div className="photo-details">
                  <p className="photo-caption">{photo.caption}</p>

                  <div className="photo-labels">
                    <span className="label-title">Labels:</span>
                    <span className="label-text">
                      {photo.labels.join(", ")}
                    </span>
                  </div>

                  <div className="photo-moods-section">
                    <span className="label-title">Moods:</span>
                    <div className="mood-tags">
                      {photo.moods.map((mood) => (
                        <span key={mood} className="mood-tag">
                          {mood}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    ),

    profile: (
      <motion.div
        className="screen"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="header">
          <div className="container">
            <div className="header-content">
              <div className="logo-section">
                <img
                  src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c5/24/63/c5246334-2bc7-bc96-38b6-472cb2f5adb7/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1024x1024bb.png"
                  alt="Paws & Pixels"
                  className="logo"
                />
                <h1>Paws & Pixels</h1>
              </div>

              <div className="header-actions">
                <button
                  className="icon-btn"
                  onClick={() => setCurrentScreen("settings")}
                >
                  <Settings size={20} />
                </button>
                <button className="icon-btn">
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs-nav">
          <div className="container">
            <button
              className="tab"
              onClick={() => setCurrentScreen("dashboard")}
            >
              All
            </button>
            <button className="tab">Cats</button>
            <button className="tab">Dogs</button>
            <button className="tab">Other</button>
          </div>
        </div>

        <div className="container profile-container">
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="profile-header">
              <div className="profile-left">
                <div className="profile-avatar">
                  <div className="avatar-circle">
                    <User size={48} />
                  </div>
                  <button className="avatar-edit">
                    <Camera size={16} />
                  </button>
                </div>

                <div className="profile-info">
                  {!isEditing ? (
                    <>
                      <h2>{userInfo.name}</h2>
                      <div className="profile-meta">
                        <span>
                          <Mail size={16} /> {userInfo.email}
                        </span>
                        <span>
                          <MapPin size={16} /> {userInfo.location}
                        </span>
                        <span>
                          <Calendar size={16} /> Joined {userInfo.joinDate}
                        </span>
                      </div>
                      <p className="profile-bio">{userInfo.bio}</p>
                    </>
                  ) : (
                    <div className="edit-form">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        placeholder="Email"
                      />
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) =>
                          setEditForm({ ...editForm, location: e.target.value })
                        }
                        placeholder="Location"
                      />
                      <textarea
                        value={editForm.bio}
                        onChange={(e) =>
                          setEditForm({ ...editForm, bio: e.target.value })
                        }
                        placeholder="Bio"
                        rows="2"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-actions">
                {!isEditing ? (
                  <motion.button
                    className="btn-primary"
                    onClick={() => setIsEditing(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit2 size={16} /> Edit Profile
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      className="btn-success"
                      onClick={handleSave}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check size={16} /> Save
                    </motion.button>
                    <motion.button
                      className="btn-secondary"
                      onClick={handleCancel}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={16} /> Cancel
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="connected-accounts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Connected Accounts</h3>
            <div className="account-card">
              <div className="account-info">
                <div className="connect-icon google">
                  <span>G</span>
                </div>
                <div>
                  <h4>Google Photos</h4>
                  <p className="connected-status">
                    ● Connected • Last synced 2 hours ago
                  </p>
                </div>
              </div>
              <button className="btn-danger">Disconnect</button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    ),

    settings: (
      <motion.div
        className="screen"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="header">
          <div className="container">
            <div className="header-content">
              <div className="logo-section">
                <img
                  src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c5/24/63/c5246334-2bc7-bc96-38b6-472cb2f5adb7/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1024x1024bb.png"
                  alt="Paws & Pixels"
                  className="logo"
                />
                <h1>Paws & Pixels</h1>
              </div>

              <button
                className="icon-btn"
                onClick={() => setCurrentScreen("profile")}
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="tabs-nav">
          <div className="container">
            <button
              className="tab"
              onClick={() => setCurrentScreen("dashboard")}
            >
              All
            </button>
            <button className="tab">Cats</button>
            <button className="tab">Dogs</button>
            <button className="tab">Other</button>
          </div>
        </div>

        <div className="container settings-container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Settings
          </motion.h2>

          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3>Account Settings</h3>
            <div className="settings-item">
              <div className="settings-info">
                <Mail size={20} />
                <div>
                  <h4>Email Address</h4>
                  <p>Manage your email preferences</p>
                </div>
              </div>
              <button className="btn-secondary">Edit</button>
            </div>
            <div className="settings-item">
              <div className="settings-info">
                <Key size={20} />
                <div>
                  <h4>Password</h4>
                  <p>Change your password</p>
                </div>
              </div>
              <button className="btn-secondary">Change</button>
            </div>
          </motion.div>

          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Privacy & Security</h3>
            <div className="settings-item">
              <div className="settings-info">
                <Shield size={20} />
                <div>
                  <h4>Data Privacy</h4>
                  <p>Control how your data is used</p>
                </div>
              </div>
              <button className="btn-secondary">Manage</button>
            </div>
          </motion.div>

          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Danger Zone</h3>
            <div className="settings-item danger">
              <div className="settings-info">
                <Trash2 size={20} />
                <div>
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account and all data</p>
                </div>
              </div>
              <button className="btn-danger">Delete</button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    ),
  };

  return (
    <AnimatePresence mode="wait">{screens[currentScreen]}</AnimatePresence>
  );
};

export default NavigationPage;
