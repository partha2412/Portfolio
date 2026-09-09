// src/components/Education.jsx
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Education = ({ education = [] }) => {
  const headRef = useScrollAnimation();

  if (!education.length) return null;

  return (
    <section>
      <div className="fade-in" ref={headRef}>
        <span className="section-label">Background</span>
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">
          Academic foundations that shaped my thinking.
        </p>
      </div>

      <div className="education-grid">
        {education.map((edu, idx) => (
          <EduCard key={idx} edu={edu} delay={idx} />
        ))}
      </div>
    </section>
  );
};

function EduCard({ edu, delay }) {
  const ref = useScrollAnimation();
  return (
    <div
      className={`edu-card fade-in fade-in-delay-${Math.min(delay + 1, 5)}`}
      ref={ref}
    >
      <h3 className="edu-degree">{edu.degree}</h3>
      <p className="edu-institution">{edu.institution}</p>
      {edu.year && <span className="edu-year">{edu.year}</span>}
      {edu.details && <p className="edu-details">{edu.details}</p>}
    </div>
  );
}