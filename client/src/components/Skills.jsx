// src/components/Skills.jsx
import React from 'react';
import '../skills.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Skills = ({ skills = [] }) => {
  const headRef = useScrollAnimation();

  return (
    <section>
      <div className="fade-in" ref={headRef}>
        <span className="section-label">Expertise</span>
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">
          Technologies and tools I use to bring ideas to life.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((skillGroup, idx) => (
          <SkillCard key={idx} skillGroup={skillGroup} delay={idx} />
        ))}
      </div>
    </section>
  );
};

function SkillCard({ skillGroup, delay }) {
  const ref = useScrollAnimation();
  return (
    <div
      className={`skill-card fade-in fade-in-delay-${Math.min(delay + 1, 5)}`}
      ref={ref}
    >
      <p className="skill-card-title">{skillGroup.category}</p>
      <div className="skill-tags">
        {skillGroup.items.map((item, itemIdx) => (
          <span key={itemIdx} className="skill-tag">{item}</span>
        ))}
      </div>
    </div>
  );
}