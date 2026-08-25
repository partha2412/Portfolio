// src/components/Hero.jsx
import React, { useState } from 'react';
export const Hero = ({ profile }) => {
    const [isDownloading, setIsDownloading] = useState(false);

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
            a.download = 'CV.pdf';
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
            window.open(profile.resumeUrl, '_blank');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <header className="hero">
            <div className="hero-text">
                <span className="badge">{profile.status}</span>
                <h1>{profile.name}</h1>
                <h2>{profile.title}</h2>
                <p>{profile.bio}</p>
                <div className="social-links">
                    {profile.github && (
                        <a href={profile.github} target="_blank" rel="noreferrer" className="social-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            <span>GitHub</span>
                        </a>
                    )}

                    {profile.linkedin && (
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                            <span>LinkedIn</span>
                        </a>
                    )}

                    {profile.resumeUrl && (
                        <button
                            onClick={handleDownloadCV}
                            disabled={isDownloading}
                            className={`btn btn-cv ${isDownloading ? 'loading' : ''}`}
                        >
                            {isDownloading ? (
                                <>
                                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="2" x2="12" y2="6" />
                                        <line x1="12" y1="18" x2="12" y2="22" />
                                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                                        <line x1="2" y1="12" x2="6" y2="12" />
                                        <line x1="18" y1="12" x2="22" y2="12" />
                                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                                    </svg>
                                    <span>Downloading...</span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    <span>Download CV</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            <div className="hero-image-wrapper">
                <img
                    src={profile.avatarUrl || "/pfp.avif"}
                    alt={profile.name}
                    className="hero-avatar"
                    width="400"
                    height="400"
                    fetchPriority="high"
                    decoding="async"
                />
            </div>
        </header>
    );
};