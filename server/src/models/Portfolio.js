// backend/src/models/Portfolio.js
const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
    {
        profile: {
            status: { type: String, default: 'Available for work' },
            name: { type: String, required: true },
            title: { type: String, required: true },
            bio: { type: String, default: '' },
            avatarUrl: { type: String, default: '' },
            github: { type: String, default: '' },
            linkedin: { type: String, default: '' },
            resumeUrl: { type: String, default: '' },
            email: { type: String, required: true },
        },
        skills: [
            {
                category: { type: String, required: true },
                items: [{ type: String }],
            },
        ],
        projects: [
            {
                id: { type: String },
                title: { type: String, required: true },
                description: { type: String },
                technologies: [{ type: String }],
                githubUrl: { type: String },
                liveUrl: { type: String },
                imageUrl: { type: String },
            },
        ],
        experiences: [
            {
                role: { type: String, required: true },
                company: { type: String, required: true },
                duration: { type: String },
                description: { type: String },
            },
        ],
        education: [
            {
                degree: { type: String, required: true },
                institution: { type: String, required: true },
                year: { type: String },
                details: { type: String },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);