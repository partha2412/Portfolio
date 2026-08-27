// src/components/Contact.jsx
import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const Contact = ({ profile }) => {
  const email = profile?.email || 'example@domain.com';
  const linkedin = profile?.linkedin || 'https://linkedin.com';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' }); // 'success' | 'error' | 'loading'

  const headRef = useScrollAnimation();
  const formRef = useScrollAnimation();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.type === 'loading') return;

    setStatus({ type: 'loading', text: '' });

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error (${res.status})`);
      }

      setStatus({ type: 'success', text: "Message sent! I'll get back to you soon." });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Failed to send. Please try emailing directly.' });
    }
  };

  const isLoading = status.type === 'loading';

  return (
    <section>
      <div className="contact-layout">

        {/* Left column */}
        <div className="fade-in" ref={headRef}>
          <span className="section-label">Get in touch</span>
          <h2 className="contact-left-heading">Let's work together</h2>
          <p className="contact-tagline">
            Whether you have a project idea, a question, or just want to say hi — I'd love to hear from you.
          </p>

          <div className="contact-method-cards">
            <a href={`mailto:${email}`} className="contact-method-card">
              <span className="contact-method-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <div>
                <span className="contact-method-label">Email</span>
                <span className="contact-method-value">{email}</span>
              </div>
            </a>

            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact-method-card">
              <span className="contact-method-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </span>
              <div>
                <span className="contact-method-label">LinkedIn</span>
                <span className="contact-method-value">
                  {linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right column — form */}
        <div className="contact-form-card fade-in fade-in-delay-2" ref={formRef}>
          <p className="contact-form-title">Send a message</p>

          {status.text && (
            <div className={`form-status ${status.type}`}>
              {status.type === 'success' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
              {status.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="c-name">Name</label>
              <input
                id="c-name"
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message"
                name="message"
                rows="4"
                required
                placeholder="What's on your mind?"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin-ring 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};