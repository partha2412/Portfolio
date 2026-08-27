// src/components/Hero.jsx
import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Hero = ({ profile }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const textRef = useScrollAnimation();
  const imgRef = useScrollAnimation();

  if (!profile) return null;

  const handleDownloadCV = async (e) => {
    e.preventDefault();
    if (isDownloading || !profile?.resumeUrl) return;
    setIsDownloading(true);

    try {
      const response = await fetch(profile.resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${profile.name?.replace(/\s+/g, '_') || 'CV'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(profile.resumeUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <header className="hero">

      {/* ---- Text side ---- */}
      <div className="hero-text fade-in" ref={textRef}>
        {profile.status && (
          <div className="hero-badge">
            <span className="badge-dot" />
            {profile.status}
          </div>
        )}

        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-bio">{profile.bio}</p>

        <div className="hero-actions">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>
          )}

          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          )}

          {profile.resumeUrl && (
            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className="btn-primary"
              type="button"
            >
              {isDownloading ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin-ring 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Downloading…
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ---- Avatar side ---- */}
      <div className="hero-avatar-wrapper fade-in fade-in-delay-2" ref={imgRef}>
        <div className="hero-avatar-glow" />
        <div className="hero-avatar-ring">
          <img
            src={profile.avatarUrl || '/pfp.avif'}
            alt={profile.name}
            className="hero-avatar"
            width="294"
            height="294"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

    </header>
  );
};