export const mockData = {
    profile: {
        status: "Available for work",
        name: "Partha Singh",
        title: "Full-Stack Engineer & AI/ML Developer",
        bio: "Building robust web applications, data-driven systems, and intelligent agent workflows.",
        avatarUrl: '/pfp.avif',//"https://cdn.vectorstock.com/i/500p/13/44/gray-man-placeholder-portrait-vector-23511344.jpg",
        github: "https://github.com/partha2412",
        linkedin: "https://www.linkedin.com/in/partha-singh-a1b810376/",
        resumeUrl: "https://example.com/resume.pdf",
        email: "parthasingh35@gmail.com"
    },
    skills: [
        {
            category: "Frontend",
            items: ["React.js", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS"]
        },
        {
            category: "Backend & DB",
            items: ["Node.js", "Express.js", "Python", "MongoDB", "PostgreSQL"]
        },
        {
            category: "AI & Analytics",
            items: ["Machine Learning", "Data Analysis", "Python", "REST APIs"]
        } // Fixed trailing comma here
    ],
    projects: [
        {
            id: "1",
            title: "Portfolio Web Application",
            description: "Full-stack personal portfolio built with React and Express.",
            technologies: ["React", "Node.js", "Express"],
            githubUrl: "https://github.com/partha2412/portfolio",
            liveUrl: "https://portfolio.vercel.app",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: "2",
            title: "AI Agent Workflow Engine",
            description: "Automated workflow automation tool using AI integrations.",
            technologies: ["Python", "Node.js", "FastAPI"],
            githubUrl: "https://github.com/partha2412/ai-agent",
            liveUrl: "https://portfolio.vercel.app",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
        }
    ],
    experiences: [
        {
            role: "Machine Learning Intern",
            company: "Intigrityfactor Innovations",
            duration: "July 2026 - Present",
            description: "Developed and optimized machine learning pipelines for analytical workflows."
        }
    ],
    education: [
        {
            degree: "B.Tech in Computer Science & Engineering (AI/ML)",
            institution: "Techno International New Town",
            year: "Pursuing",
            details: "Specializing in Artificial Intelligence and Machine Learning."
        } // Fixed trailing comma and extra empty space here
    ]
};