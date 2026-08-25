import React, { useState, useEffect } from 'react';
import { fetchPortfolioData } from './services/api';
import { mockData } from './data/initialData';

import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Admin } from './components/Admin';

import './admin.css';

export const App = () => {
  const [data, setData] = useState(mockData);
  const [isAdminView, setIsAdminView] = useState(false);

  const getData = async () => {
    try {
      const result = await fetchPortfolioData();
      setData(result);
    } catch (err) {
      console.error("Using fallback data", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="portfolio-app">

      <nav className="navbar">
        <div className="nav-container">

          <span className="logo">
            {data?.profile?.name || "Portfolio"}
          </span>

          <ul className="nav-links">

            {!isAdminView && (
              <>
                <li><a href="#hero">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#contact">Contact</a></li>
              </>
            )}

            <li>
              <button
                onClick={() => setIsAdminView(!isAdminView)}
                className="admin-toggle-btn"
              >
                {isAdminView
                  ? '← Back to Portfolio'
                  : '⚙️ Admin'}
              </button>
            </li>

          </ul>
        </div>
      </nav>

      {isAdminView ? (
        <div style={{ paddingTop: '80px' }}>
          <Admin onSaveSuccess={getData} />
        </div>
      ) : (
        <>
          <section id="hero" className="section-wrapper">
            <div className="section-content">
              <Hero profile={data.profile} />
            </div>
          </section>

          <section id="skills" className="section-wrapper">
            <div className="section-content">
              <Skills skills={data.skills} />
            </div>
          </section>

          <section id="projects" className="section-wrapper">
            <div className="section-content">
              <Projects projects={data.projects} />
            </div>
          </section>

          <section id="experience" className="section-wrapper">
            <div className="section-content">
              <Experience experiences={data.experiences} />
            </div>
          </section>

          <section id="education" className="section-wrapper">
            <div className="section-content">
              <Education education={data.education} />
            </div>
          </section>

          <section id="contact" className="section-wrapper">
            <div className="section-content">
              <Contact profile={data.profile} />
            </div>
          </section>
        </>
      )}

    </div>
  );
};

export default App;