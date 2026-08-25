import React from 'react';

export const Experience = ({ experiences = [] }) => {
    if (!experiences.length) return null;

    return (
        <section id="experience" className="section">
            <h2>Work Experience</h2>
            <div className="timeline">
                {experiences.map((exp, idx) => (
                    <div key={idx} className="timeline-item">
                        <div className="timeline-header">
                            <h3>{exp.role}</h3>
                            <span className="timeline-date">{exp.duration}</span>
                        </div>
                        <h4 className="company-name">{exp.company}</h4>
                        <p>{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};