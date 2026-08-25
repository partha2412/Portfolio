import React from 'react';

export const Education = ({ education = [] }) => {
    if (!education.length) return null;

    return (
        <section id="education" className="section">
            <h2>Education</h2>
            <div className="education-grid">
                {education.map((edu, idx) => (
                    <div key={idx} className="edu-card">
                        <h3>{edu.degree}</h3>
                        <h4>{edu.institution}</h4>
                        <span className="edu-date">{edu.year}</span>
                        {edu.details && <p>{edu.details}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};