// src/App.jsx
import React, { useEffect, useState, useCallback } from 'react';

import { fetchPortfolioData } from './services/api';
import { mockData } from './data/initialData';
import { useAccentColor } from './hooks/useAccentColor';
import { useActiveSection } from './hooks/useActiveSection';

import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Admin } from './components/Admin';

import './App.css';
import './admin.css';

const NAV_SECTIONS = ['hero', 'skills', 'projects', 'experience', 'education', 'contact'];
const NAV_LABELS = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export const App = () => {
  const [data, setData] = useState(mockData);
  const [isAdminView, setIsAdminView] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activeSection = useActiveSection(NAV_SECTIONS);
  useAccentColor(data?.profile?.avatarUrl);

  const getData = useCallback(async () => {
    try {
      const result = await fetchPortfolioData();
      if (result) setData(result);
    } catch (error) {
      console.warn('Backend unavailable — showing default data.', error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // Navbar scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = () => setMobileMenuOpen(false);

  const firstName = data?.profile?.name?.split(' ')[0] || 'Portfolio';

  return (
    <div className="portfolio-app">

      {/* ============ NAVBAR ============ */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">

          <a href="#hero" className="nav-logo" onClick={handleNavClick}>
            {firstName}<span>.</span>
          </a>

          {/* Desktop nav links */}
          {!isAdminView && (
            <ul className="nav-links">
              {NAV_SECTIONS.map((id, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={activeSection === id ? 'active' : ''}
                  >
                    {NAV_LABELS[i]}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="nav-right">
            {/* Admin toggle */}
            <button
              type="button"
              className={`admin-toggle-btn${isAdminView ? ' active' : ''}`}
              onClick={() => {
                setIsAdminView((p) => !p);
                setMobileMenuOpen(false);
              }}
              title="Admin panel"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
              </svg>
              {isAdminView ? 'Exit Admin' : 'Admin'}
            </button>

            {/* Mobile hamburger */}
            {!isAdminView && (
              <button
                type="button"
                className={`hamburger-btn${mobileMenuOpen ? ' open' : ''}`}
                onClick={() => setMobileMenuOpen((p) => !p)}
                aria-label="Toggle menu"
              >
                <span />
                <span />
                <span />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {!isAdminView && (
        <div className={`mobile-nav-drawer${mobileMenuOpen ? ' open' : ''}`}>
          {NAV_SECTIONS.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
              onClick={handleNavClick}
            >
              {NAV_LABELS[i]}
            </a>
          ))}
        </div>
      )}

      {/* ============ CONTENT ============ */}
      {isAdminView ? (

        <div style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '4rem' }}>
          <Admin onSaveSuccess={getData} />
        </div>

      ) : (

        <>
          <section id="hero" className="section-wrapper">
            <div className="section-content">
              <Hero profile={data?.profile} />
            </div>
          </section>

          <section id="skills" className="section-wrapper">
            <div className="section-content">
              <Skills skills={data?.skills} />
            </div>
          </section>

          <section id="projects" className="section-wrapper">
            <div className="section-content">
              <Projects projects={data?.projects} />
            </div>
          </section>

          <section id="experience" className="section-wrapper">
            <div className="section-content">
              <Experience experiences={data?.experiences} />
            </div>
          </section>

          <section id="education" className="section-wrapper">
            <div className="section-content">
              <Education education={data?.education} />
            </div>
          </section>

          <section id="contact" className="section-wrapper">
            <div className="section-content">
              <Contact profile={data?.profile} />
            </div>
          </section>

          <footer className="footer">
            <div className="footer-inner">
              Built by {data?.profile?.name || 'Partha Singh'} · {new Date().getFullYear()}
            </div>
          </footer>
        </>
      )}

    </div>
  );
};

export default App;