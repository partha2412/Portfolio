import React from 'react';
import "../skills.css";;
export const Skills = ({ skills = [] }) => {
    return (
        <section id="skills" className="section">
            <h2>Technical Skills</h2>
            <div className="skills-container">
                {skills.map((skillGroup, idx) => (
                    <div key={idx} className="skill-category">
                        <h3>{skillGroup.category}</h3>
                        <ul>
                            {skillGroup.items.map((item, itemIdx) => (
                                <li key={itemIdx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};