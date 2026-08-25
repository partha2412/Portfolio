// src/components/Contact.jsx
import React, { useState } from 'react';

export const Contact = ({ profile }) => {
    // Extract dynamic profile properties with safe fallbacks    
    const email = profile?.email || profile?.profile?.email || "example@domain.com";
    const linkedin = profile?.linkedin || profile?.profile?.linkedin || "https://linkedin.com";

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="contact-container">

                {/* Left Column: Direct Contacts */}
                <div className="contact-info">
                    <h2>Let's Connect</h2>
                    <p className="contact-subtitle">
                        Whether you have a question, a project proposal, or just want to discuss new opportunities, feel free to reach out.
                    </p>

                    <div className="contact-cards">
                        {/* Mail Card */}
                        <a href={`mailto:${email}`} className="contact-card">
                            <span className="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </span>
                            <div>
                                <span className="contact-label">Email</span>
                                <span className="contact-value">{email}</span>
                            </div>
                        </a>

                        {/* LinkedIn Card */}
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
                            <span className="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect width="4" height="12" x="2" y="9" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </span>
                            <div>
                                <span className="contact-label">LinkedIn</span>
                                <span className="contact-value">{linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Right Column: Direct Message Form */}
                <div className="contact-form-wrapper">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <h3>Send a Direct Message</h3>

                        {submitted && (
                            <div className="form-status-msg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <span>Message sent successfully! I'll get back to you soon.</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                required
                                placeholder="Write your message here..."
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-submit">
                            <span>Send Message</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};