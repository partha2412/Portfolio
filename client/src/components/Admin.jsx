import React, { useState, useEffect } from 'react';
import { fetchPortfolioData, updatePortfolioData } from '../services/api';

export function Admin({ onSaveSuccess }) {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const [statusMsg, setStatusMsg] = useState({
        type: '',
        text: ''
    });

    const [jsonText, setJsonText] = useState('');
    const [jsonError, setJsonError] = useState('');

    useEffect(() => {
        fetchPortfolioData()
            .then((data) => {
                setFormData(data);
                setJsonText(JSON.stringify(data, null, 2));
                setLoading(false);
            })
            .catch(() => {
                showStatus('error', 'Failed to load portfolio data.');
                setLoading(false);
            });
    }, []);

    // -----------------------------
    // STATUS TOAST
    // -----------------------------
    const showStatus = (type, text) => {
        setStatusMsg({ type, text });

        setTimeout(() => {
            setStatusMsg({ type: '', text: '' });
        }, 4000);
    };

    // -----------------------------
    // PROFILE
    // -----------------------------
    const handleProfileChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            profile: {
                ...prev.profile,
                [name]: value
            }
        }));
    };

    // -----------------------------
    // SKILLS
    // -----------------------------
    const handleSkillCategoryChange = (index, value) => {
        const updatedSkills = [...formData.skills];

        updatedSkills[index] = {
            ...updatedSkills[index],
            category: value
        };

        setFormData((prev) => ({
            ...prev,
            skills: updatedSkills
        }));
    };

    const handleSkillChange = (categoryIndex, skillIndex, value) => {
        const updatedSkills = [...formData.skills];

        const updatedItems = [...updatedSkills[categoryIndex].items];

        updatedItems[skillIndex] = value;

        updatedSkills[categoryIndex] = {
            ...updatedSkills[categoryIndex],
            items: updatedItems
        };

        setFormData((prev) => ({
            ...prev,
            skills: updatedSkills
        }));
    };

    const addSkill = (categoryIndex) => {
        const updatedSkills = [...formData.skills];

        updatedSkills[categoryIndex] = {
            ...updatedSkills[categoryIndex],
            items: [
                ...(updatedSkills[categoryIndex].items || []),
                'New Skill'
            ]
        };

        setFormData((prev) => ({
            ...prev,
            skills: updatedSkills
        }));
    };

    const removeSkill = (categoryIndex, skillIndex) => {
        const updatedSkills = [...formData.skills];

        updatedSkills[categoryIndex] = {
            ...updatedSkills[categoryIndex],
            items: updatedSkills[categoryIndex].items.filter(
                (_, index) => index !== skillIndex
            )
        };

        setFormData((prev) => ({
            ...prev,
            skills: updatedSkills
        }));
    };

    const addSkillCategory = () => {
        setFormData((prev) => ({
            ...prev,
            skills: [
                ...(prev.skills || []),
                {
                    category: 'New Category',
                    items: []
                }
            ]
        }));
    };

    const removeSkillCategory = (index) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    // -----------------------------
    // PROJECTS
    // -----------------------------
    const handleProjectChange = (index, field, value) => {
        const updatedProjects = [...formData.projects];

        updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: value
        };

        setFormData((prev) => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const handleProjectTechnologies = (index, value) => {
        const technologies = value
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

        handleProjectChange(index, 'technologies', technologies);
    };

    const addProject = () => {
        const newProject = {
            id: Date.now().toString(),
            title: 'New Project',
            description: '',
            technologies: [],
            githubUrl: '',
            liveUrl: '',
            imageUrl: ''
        };

        setFormData((prev) => ({
            ...prev,
            projects: [...(prev.projects || []), newProject]
        }));
    };

    const removeProject = (index) => {
        setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }));
    };

    // -----------------------------
    // EXPERIENCE
    // -----------------------------
    const handleExperienceChange = (index, field, value) => {
        const updated = [...formData.experiences];

        updated[index] = {
            ...updated[index],
            [field]: value
        };

        setFormData((prev) => ({
            ...prev,
            experiences: updated
        }));
    };

    const addExperience = () => {
        setFormData((prev) => ({
            ...prev,
            experiences: [
                ...(prev.experiences || []),
                {
                    role: '',
                    company: '',
                    duration: '',
                    description: ''
                }
            ]
        }));
    };

    const removeExperience = (index) => {
        setFormData((prev) => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    };

    // -----------------------------
    // EDUCATION
    // -----------------------------
    const handleEducationChange = (index, field, value) => {
        const updated = [...formData.education];

        updated[index] = {
            ...updated[index],
            [field]: value
        };

        setFormData((prev) => ({
            ...prev,
            education: updated
        }));
    };

    const addEducation = () => {
        setFormData((prev) => ({
            ...prev,
            education: [
                ...(prev.education || []),
                {
                    degree: '',
                    institution: '',
                    year: '',
                    details: ''
                }
            ]
        }));
    };

    const removeEducation = (index) => {
        setFormData((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    // -----------------------------
    // JSON EDITOR
    // -----------------------------
    const handleJsonChange = (value) => {
        setJsonText(value);

        try {
            JSON.parse(value);
            setJsonError('');
        } catch {
            setJsonError('Invalid JSON');
        }
    };

    const applyJson = () => {
        try {
            const parsed = JSON.parse(jsonText);

            setFormData(parsed);
            setJsonError('');

            showStatus('success', 'JSON applied successfully.');
        } catch {
            setJsonError('Invalid JSON. Please fix it before applying.');
        }
    };

    const formatJson = () => {
        try {
            const parsed = JSON.parse(jsonText);

            setJsonText(JSON.stringify(parsed, null, 2));
            setJsonError('');
        } catch {
            setJsonError('Cannot format invalid JSON.');
        }
    };

    // -----------------------------
    // SAVE
    // -----------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setStatusMsg({ type: '', text: '' });

        try {
            await updatePortfolioData(formData);

            setJsonText(JSON.stringify(formData, null, 2));

            showStatus(
                'success',
                'Portfolio updated successfully!'
            );

            if (onSaveSuccess) {
                onSaveSuccess();
            }
        } catch (error) {
            showStatus(
                'error',
                error?.message || 'Failed to update portfolio.'
            );
        } finally {
            setSaving(false);
        }
    };

    // -----------------------------
    // LOADING
    // -----------------------------
    if (loading) {
        return (
            <div className="admin-loading">
                Loading Admin Panel...
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="admin-error">
                Failed to load data.
            </div>
        );
    }

    const tabs = [
        'profile',
        'skills',
        'projects',
        'experiences',
        'education',
        'json'
    ];

    return (
        <div className="admin-container">

            {/* TOP RIGHT STATUS TOAST */}
            {statusMsg.text && (
                <div
                    className={`admin-toast ${statusMsg.type}`}
                    role="alert"
                >
                    <span className="admin-toast-icon">
                        {statusMsg.type === 'success' ? '✓' : '!'}
                    </span>

                    <span>
                        {statusMsg.text}
                    </span>
                </div>
            )}

            {/* HEADER */}
            <header className="admin-header">
                <div>
                    <p className="admin-eyebrow">
                        Portfolio Management
                    </p>

                    <h2>
                        Admin Dashboard
                    </h2>

                    <p className="admin-subtitle">
                        Manage your portfolio content from one place.
                    </p>
                </div>

                <div className="admin-save-status">
                    <span className="status-dot"></span>
                    Connected
                </div>
            </header>

            {/* NAVIGATION */}
            <div className="admin-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        className={`tab-btn ${activeTab === tab ? 'active' : ''
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'json'
                            ? 'JSON Editor'
                            : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <form
                onSubmit={handleSubmit}
                className="admin-form"
            >

                {/* ================= PROFILE ================= */}
                {activeTab === 'profile' && (
                    <div className="tab-content">

                        <div className="tab-section-header">
                            <div>
                                <h3>Profile Information</h3>
                                <p>
                                    Manage your personal portfolio information.
                                </p>
                            </div>
                        </div>

                        <div className="profile-preview">
                            <div className="profile-avatar">
                                {formData.profile?.avatarUrl ? (
                                    <img
                                        src={formData.profile.avatarUrl}
                                        alt="Profile"
                                    />
                                ) : (
                                    <span>
                                        {formData.profile?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || 'P'}
                                    </span>
                                )}
                            </div>

                            <div>
                                <strong>
                                    {formData.profile?.name || 'Your Name'}
                                </strong>

                                <p>
                                    {formData.profile?.title ||
                                        'Your title'}
                                </p>
                            </div>
                        </div>

                        <div className="form-grid">

                            <div className="form-group">
                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        formData.profile?.name || ''
                                    }
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Title</label>

                                <input
                                    type="text"
                                    name="title"
                                    value={
                                        formData.profile?.title || ''
                                    }
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Status</label>

                                <input
                                    type="text"
                                    name="status"
                                    value={
                                        formData.profile?.status || ''
                                    }
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        formData.profile?.email || ''
                                    }
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>GitHub URL</label>

                                <input
                                    type="url"
                                    name="github"
                                    value={
                                        formData.profile?.github || ''
                                    }
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>LinkedIn URL</label>

                                <input
                                    type="url"
                                    name="linkedin"
                                    value={
                                        formData.profile?.linkedin || ''
                                    }
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Profile Photo URL</label>

                                <input
                                    type="text"
                                    name="avatarUrl"
                                    placeholder="https://..."
                                    value={
                                        formData.profile?.avatarUrl || ''
                                    }
                                    onChange={handleProfileChange}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>CV / Resume URL</label>

                                <input
                                    type="text"
                                    name="resumeUrl"
                                    placeholder="https://..."
                                    value={
                                        formData.profile?.resumeUrl || ''
                                    }
                                    onChange={handleProfileChange}
                                />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Bio</label>

                            <textarea
                                name="bio"
                                rows="6"
                                value={
                                    formData.profile?.bio || ''
                                }
                                onChange={handleProfileChange}
                            />
                        </div>

                    </div>
                )}

                {/* ================= SKILLS ================= */}
                {activeTab === 'skills' && (
                    <div className="tab-content">

                        <div className="tab-section-header">
                            <div>
                                <h3>Skills</h3>
                                <p>
                                    Manage your skills by category.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={addSkillCategory}
                            >
                                + Add Category
                            </button>
                        </div>

                        {formData.skills?.map((skillGroup, categoryIndex) => (
                            <div
                                className="admin-card"
                                key={categoryIndex}
                            >
                                <div className="card-header">

                                    <input
                                        className="category-title-input"
                                        value={
                                            skillGroup.category || ''
                                        }
                                        onChange={(e) =>
                                            handleSkillCategoryChange(
                                                categoryIndex,
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="btn-danger"
                                        onClick={() =>
                                            removeSkillCategory(
                                                categoryIndex
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                                <div className="skills-editor">

                                    {skillGroup.items?.map(
                                        (skill, skillIndex) => (
                                            <div
                                                className="skill-input-row"
                                                key={skillIndex}
                                            >
                                                <input
                                                    type="text"
                                                    value={skill}
                                                    onChange={(e) =>
                                                        handleSkillChange(
                                                            categoryIndex,
                                                            skillIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    className="btn-danger small"
                                                    onClick={() =>
                                                        removeSkill(
                                                            categoryIndex,
                                                            skillIndex
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )
                                    )}

                                </div>

                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() =>
                                        addSkill(categoryIndex)
                                    }
                                >
                                    + Add Skill
                                </button>

                            </div>
                        ))}

                    </div>
                )}

                {/* ================= PROJECTS ================= */}
                {activeTab === 'projects' && (
                    <div className="tab-content">

                        <div className="tab-section-header">
                            <div>
                                <h3>Projects</h3>
                                <p>
                                    Manage projects displayed on your portfolio.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={addProject}
                            >
                                + Add Project
                            </button>
                        </div>

                        {formData.projects?.map((proj, idx) => (
                            <div
                                key={proj.id || idx}
                                className="admin-card"
                            >

                                <div className="card-header">
                                    <h4>
                                        Project #{idx + 1}
                                    </h4>

                                    <button
                                        type="button"
                                        className="btn-danger"
                                        onClick={() =>
                                            removeProject(idx)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>

                                {proj.imageUrl && (
                                    <div className="project-image-preview">
                                        <img
                                            src={proj.imageUrl}
                                            alt={proj.title}
                                        />
                                    </div>
                                )}

                                <div className="form-grid">

                                    <div className="form-group">
                                        <label>Title</label>

                                        <input
                                            type="text"
                                            value={proj.title || ''}
                                            onChange={(e) =>
                                                handleProjectChange(
                                                    idx,
                                                    'title',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Project ID</label>

                                        <input
                                            type="text"
                                            value={proj.id || ''}
                                            onChange={(e) =>
                                                handleProjectChange(
                                                    idx,
                                                    'id',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Technologies</label>

                                        <input
                                            type="text"
                                            placeholder="React, Node.js, MongoDB"
                                            value={
                                                Array.isArray(
                                                    proj.technologies
                                                )
                                                    ? proj.technologies.join(
                                                        ', '
                                                    )
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                handleProjectTechnologies(
                                                    idx,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>GitHub URL</label>

                                        <input
                                            type="url"
                                            value={
                                                proj.githubUrl || ''
                                            }
                                            onChange={(e) =>
                                                handleProjectChange(
                                                    idx,
                                                    'githubUrl',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Live URL</label>

                                        <input
                                            type="url"
                                            value={
                                                proj.liveUrl || ''
                                            }
                                            onChange={(e) =>
                                                handleProjectChange(
                                                    idx,
                                                    'liveUrl',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Project Image URL</label>

                                        <input
                                            type="text"
                                            placeholder="https://..."
                                            value={
                                                proj.imageUrl || ''
                                            }
                                            onChange={(e) =>
                                                handleProjectChange(
                                                    idx,
                                                    'imageUrl',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                </div>

                                <div className="form-group full-width">
                                    <label>Description</label>

                                    <textarea
                                        rows="4"
                                        value={
                                            proj.description || ''
                                        }
                                        onChange={(e) =>
                                            handleProjectChange(
                                                idx,
                                                'description',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                            </div>
                        ))}

                    </div>
                )}

                {/* ================= EXPERIENCE ================= */}
                {activeTab === 'experiences' && (
                    <div className="tab-content">

                        <div className="tab-section-header">
                            <div>
                                <h3>Experience</h3>
                                <p>
                                    Manage your professional experience.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={addExperience}
                            >
                                + Add Experience
                            </button>
                        </div>

                        {formData.experiences?.map((experience, idx) => (
                            <div
                                className="admin-card"
                                key={idx}
                            >

                                <div className="card-header">
                                    <h4>
                                        Experience #{idx + 1}
                                    </h4>

                                    <button
                                        type="button"
                                        className="btn-danger"
                                        onClick={() =>
                                            removeExperience(idx)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>

                                <div className="form-grid">

                                    <div className="form-group">
                                        <label>Role</label>

                                        <input
                                            type="text"
                                            value={
                                                experience.role || ''
                                            }
                                            onChange={(e) =>
                                                handleExperienceChange(
                                                    idx,
                                                    'role',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Company</label>

                                        <input
                                            type="text"
                                            value={
                                                experience.company || ''
                                            }
                                            onChange={(e) =>
                                                handleExperienceChange(
                                                    idx,
                                                    'company',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Duration</label>

                                        <input
                                            type="text"
                                            value={
                                                experience.duration || ''
                                            }
                                            onChange={(e) =>
                                                handleExperienceChange(
                                                    idx,
                                                    'duration',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                </div>

                                <div className="form-group full-width">
                                    <label>Description</label>

                                    <textarea
                                        rows="4"
                                        value={
                                            experience.description || ''
                                        }
                                        onChange={(e) =>
                                            handleExperienceChange(
                                                idx,
                                                'description',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                            </div>
                        ))}

                    </div>
                )}

                {/* ================= EDUCATION ================= */}
                {activeTab === 'education' && (
                    <div className="tab-content">

                        <div className="tab-section-header">
                            <div>
                                <h3>Education</h3>
                                <p>
                                    Manage your academic information.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={addEducation}
                            >
                                + Add Education
                            </button>
                        </div>

                        {formData.education?.map((education, idx) => (
                            <div
                                className="admin-card"
                                key={idx}
                            >

                                <div className="card-header">
                                    <h4>
                                        Education #{idx + 1}
                                    </h4>

                                    <button
                                        type="button"
                                        className="btn-danger"
                                        onClick={() =>
                                            removeEducation(idx)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>

                                <div className="form-grid">

                                    <div className="form-group">
                                        <label>Degree</label>

                                        <input
                                            type="text"
                                            value={
                                                education.degree || ''
                                            }
                                            onChange={(e) =>
                                                handleEducationChange(
                                                    idx,
                                                    'degree',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Year</label>

                                        <input
                                            type="text"
                                            value={
                                                education.year || ''
                                            }
                                            onChange={(e) =>
                                                handleEducationChange(
                                                    idx,
                                                    'year',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Institution</label>

                                        <input
                                            type="text"
                                            value={
                                                education.institution || ''
                                            }
                                            onChange={(e) =>
                                                handleEducationChange(
                                                    idx,
                                                    'institution',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                </div>

                                <div className="form-group full-width">
                                    <label>Details</label>

                                    <textarea
                                        rows="3"
                                        value={
                                            education.details || ''
                                        }
                                        onChange={(e) =>
                                            handleEducationChange(
                                                idx,
                                                'details',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                            </div>
                        ))}

                    </div>
                )}

                {/* ================= JSON ================= */}
                {activeTab === 'json' && (
                    <div className="tab-content">

                        <div className="tab-section-header">
                            <div>
                                <h3>Advanced JSON Editor</h3>

                                <p>
                                    Edit the complete portfolio data directly.
                                </p>
                            </div>

                            <div className="json-actions">

                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={formatJson}
                                >
                                    Format JSON
                                </button>

                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={applyJson}
                                >
                                    Apply JSON
                                </button>

                            </div>
                        </div>

                        <div
                            className={`json-status ${jsonError
                                    ? 'invalid'
                                    : 'valid'
                                }`}
                        >
                            {jsonError
                                ? jsonError
                                : 'Valid JSON'}
                        </div>

                        <textarea
                            className="code-textarea"
                            rows="30"
                            value={jsonText}
                            onChange={(e) =>
                                handleJsonChange(e.target.value)
                            }
                        />

                    </div>
                )}

                {/* ================= SAVE BAR ================= */}
                <div className="admin-footer">

                    <div className="footer-info">
                        <span className="status-dot"></span>

                        Changes are saved to your backend.
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={saving}
                    >
                        {saving
                            ? 'Saving...'
                            : 'Save All Changes'}
                    </button>

                </div>

            </form>
        </div>
    );
}