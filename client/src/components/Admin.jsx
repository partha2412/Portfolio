import React, { useState, useEffect } from 'react';
import { fetchPortfolioData, updatePortfolioData } from '../services/api';

export function Admin({ onSaveSuccess }) {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchPortfolioData()
            .then((data) => {
                setFormData(data);
                setLoading(false);
            })
            .catch((err) => {
                setStatusMsg({ type: 'error', text: 'Failed to load portfolio data.' });
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="admin-loading">Loading Admin Panel...</div>;
    if (!formData) return <div className="admin-error">Failed to load data.</div>;

    // --- Handlers for Profile ---
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            profile: { ...prev.profile, [name]: value },
        }));
    };

    // --- Handlers for Dynamic Lists (Projects) ---
    const handleProjectChange = (index, field, value) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[index][field] = value;
        setFormData((prev) => ({ ...prev, projects: updatedProjects }));
    };

    const addProject = () => {
        const newProj = {
            id: Date.now().toString(),
            title: 'New Project',
            description: '',
            technologies: [],
            githubUrl: '',
            liveUrl: '',
            imageUrl: ''
        };
        setFormData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
    };

    const removeProject = (index) => {
        const updated = formData.projects.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, projects: updated }));
    };

    // --- Form Submission ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setStatusMsg({ type: '', text: '' });

        try {
            await updatePortfolioData(formData);
            setStatusMsg({ type: 'success', text: 'Portfolio updated successfully!' });
            if (onSaveSuccess) onSaveSuccess();
        } catch (error) {
            setStatusMsg({ type: 'error', text: 'Failed to update portfolio.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h2>Admin Dashboard</h2>
                {statusMsg.text && (
                    <div className={`status-badge ${statusMsg.type}`}>
                        {statusMsg.text}
                    </div>
                )}
            </header>

            {/* Navigation Tabs */}
            <div className="admin-tabs">
                {['profile', 'skills', 'projects', 'experiences', 'education'].map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                    <div className="tab-content">
                        <h3>Profile Information</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.profile?.name || ''}
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.profile?.title || ''}
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <input
                                    type="text"
                                    name="status"
                                    value={formData.profile?.status || ''}
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.profile?.email || ''}
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>GitHub URL</label>
                                <input
                                    type="text"
                                    name="github"
                                    value={formData.profile?.github || ''}
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>LinkedIn URL</label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={formData.profile?.linkedin || ''}
                                    onChange={handleProfileChange}
                                />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Bio</label>
                            <textarea
                                name="bio"
                                rows="4"
                                value={formData.profile?.bio || ''}
                                onChange={handleProfileChange}
                            />
                        </div>
                    </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <div className="tab-content">
                        <div className="tab-section-header">
                            <h3>Projects</h3>
                            <button type="button" className="btn-secondary" onClick={addProject}>
                                + Add Project
                            </button>
                        </div>

                        {formData.projects?.map((proj, idx) => (
                            <div key={proj.id || idx} className="admin-card">
                                <div className="card-header">
                                    <h4>Project #{idx + 1}: {proj.title}</h4>
                                    <button
                                        type="button"
                                        className="btn-danger"
                                        onClick={() => removeProject(idx)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            value={proj.title}
                                            onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Technologies (comma separated)</label>
                                        <input
                                            type="text"
                                            placeholder="React, Node.js, Express"
                                            value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || ''}
                                            onChange={(e) => {
                                                const techArray = e.target.value.split(',').map(item => item.trim());
                                                handleProjectChange(idx, 'technologies', techArray);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>GitHub URL</label>
                                        <input
                                            type="text"
                                            value={proj.githubUrl}
                                            onChange={(e) => handleProjectChange(idx, 'githubUrl', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Live URL</label>
                                        <input
                                            type="text"
                                            value={proj.liveUrl}
                                            onChange={(e) => handleProjectChange(idx, 'liveUrl', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group full-width">
                                    <label>Description</label>
                                    <textarea
                                        rows="2"
                                        value={proj.description}
                                        onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* SKILLS, EXPERIENCES & EDUCATION TABS (Can be similarly mapped) */}
                {(activeTab === 'skills' || activeTab === 'experiences' || activeTab === 'education') && (
                    <div className="tab-content">
                        <h3>Edit {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                        <p className="hint">JSON editing for complex arrays:</p>
                        <textarea
                            rows="12"
                            className="code-textarea"
                            value={JSON.stringify(formData[activeTab], null, 2)}
                            onChange={(e) => {
                                try {
                                    const parsed = JSON.parse(e.target.value);
                                    setFormData((prev) => ({ ...prev, [activeTab]: parsed }));
                                } catch (err) {
                                    // Keep typing intact while invalid JSON
                                }
                            }}
                        />
                    </div>
                )}

                {/* Save Bar */}
                <div className="admin-footer">
                    <button type="submit" className="btn-primary" disabled={saving}>
                        {saving ? 'Saving to Backend...' : 'Save All Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}