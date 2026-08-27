// src/components/Projects.jsx
import React from 'react';
import '../project.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Projects = ({ projects = [] }) => {
  const headRef = useScrollAnimation();

  return (
    <section>
      <div className="fade-in" ref={headRef}>
        <span className="section-label">Work</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of things I've built.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <ProjectCard key={project._id || project.id || idx} project={project} delay={idx} />
        ))}
      </div>
    </section>
  );
};

function ProjectCard({ project, delay }) {
  const ref = useScrollAnimation();
  const hasImage = Boolean(project.imageUrl);
  const hasLinks = project.githubUrl || project.liveUrl;

  return (
    <div
      className={`project-card fade-in fade-in-delay-${Math.min(delay + 1, 5)}`}
      ref={ref}
    >
      {/* Image with hover overlay */}
      {hasImage && (
        <div className="project-image-wrap">
          <img src={project.imageUrl} alt={project.title} loading="lazy" />
          {hasLinks && (
            <div className="project-image-overlay">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link-btn github">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link-btn live">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Card body */}
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        {project.description && (
          <p className="project-desc">{project.description}</p>
        )}

        {project.technologies?.length > 0 && (
          <div className="project-tech-tags">
            {project.technologies.map((tech, i) => (
              <span key={i} className="project-tech-tag">{tech}</span>
            ))}
          </div>
        )}

        {/* Footer links — shown when there's no image overlay */}
        {!hasImage && hasLinks && (
          <div className="project-footer-links">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                </svg>
                Source Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}