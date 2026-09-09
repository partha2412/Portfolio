// src/components/Experience.jsx
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Experience = ({ experiences = [] }) => {
  const headRef = useScrollAnimation();

  if (!experiences.length) return null;

  return (
    <section>
      <div className="fade-in" ref={headRef}>
        <span className="section-label">Career</span>
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">
          Places I've contributed and what I built there.
        </p>
      </div>

      <div className="timeline">
        {experiences.map((exp, idx) => (
          <ExperienceItem key={idx} exp={exp} delay={idx} />
        ))}
      </div>
    </section>
  );
};

function ExperienceItem({ exp, delay }) {
  const ref = useScrollAnimation();
  return (
    <div
      className={`timeline-item fade-in fade-in-delay-${Math.min(delay + 1, 5)}`}
      ref={ref}
    >
      <span className="timeline-dot" />
      <div className="timeline-content">
        <div className="timeline-header">
          <h3 className="timeline-role">{exp.role}</h3>
          {exp.duration && (
            <span className="timeline-duration">{exp.duration}</span>
          )}
        </div>
        {exp.company && (
          <p className="timeline-company">{exp.company}</p>
        )}
        {exp.description && (
          <p className="timeline-description">{exp.description}</p>
        )}
      </div>
    </div>
  );
}