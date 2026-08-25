import React from 'react';
import '../project.css';
export const Projects = ({ projects = [] }) => {
    return (
        <section id="projects" className="section">
            <h2>Featured Projects</h2>
            <div className="projects-grid">
                {projects.map((project) => (
                    <div key={project._id || project.id} className="project-card">
                        {project.imageUrl && (
                            <img src={project.imageUrl} alt={project.title} className="project-img" />
                        )}
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>

                            <div className="tags">
                                {project.technologies?.map((tech, idx) => (
                                    <span key={idx} className="tag">{tech}</span>
                                ))}
                            </div>

                            <div className="project-links">
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noreferrer">Code</a>
                                )}
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-small">Live Demo</a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};