export const personalInfo = {
    name: "Sudip",
    title: "Full Stack JavaScript Developer",
    tagline: "Building modern web experiences with React, Next.js & Node.js",
    bio: "I'm a passionate Full Stack JavaScript Developer with hands-on experience building scalable web applications using the MERN stack, Next.js, and NestJS. I enjoy working across the entire stack — from crafting pixel-perfect UIs to designing robust REST APIs and database schemas.",
    email: "sudippaudel6561@gmail.com",
    github: "https://github.com/sudip-gt",
    linkedin: "https://www.linkedin.com/in/sudip-paudel-78537b289",
    cvUrl: "/cv.pdf",
};

// Map tech names to DevIcon CSS class names.
// Add new entries here when you add new techs to techStack — no component changes needed.
export const devIconMap: Record<string, string> = {
    "HTML5": "devicon-html5-plain colored",
    "CSS3": "devicon-css3-plain colored",
    "JavaScript": "devicon-javascript-plain colored",
    "TypeScript": "devicon-typescript-plain colored",
    "React": "devicon-react-original colored",
    "Next.js": "devicon-nextjs-plain",
    "Redux Toolkit": "devicon-redux-original colored",
    "Tailwind CSS": "devicon-tailwindcss-plain colored",
    "Node.js": "devicon-nodejs-plain colored",
    "Express.js": "devicon-express-original",
    "NestJS": "devicon-nestjs-plain colored",
    "MongoDB": "devicon-mongodb-plain colored",
    "PostgreSQL": "devicon-postgresql-plain colored",
    "MySQL": "devicon-mysql-plain colored",
    "Prisma": "devicon-prisma-original",
    "Git": "devicon-git-plain colored",
    "GitHub": "devicon-github-original",
    "Docker": "devicon-docker-plain colored",
};

export const techStack = {
    frontend: [
        { name: "HTML5", icon: "html" },
        { name: "CSS3", icon: "css" },
        { name: "JavaScript", icon: "js" },
        { name: "TypeScript", icon: "ts" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Redux Toolkit", icon: "redux" },
        { name: "Tailwind CSS", icon: "tailwind" },
    ],
    backend: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express.js", icon: "express" },
        { name: "NestJS", icon: "nestjs" },
        { name: "REST APIs", icon: "api" },
    ],
    database: [
        { name: "MongoDB", icon: "mongodb" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MySQL", icon: "mysql" },
        { name: "Prisma", icon: "prisma" },
        { name: "Mongoose", icon: "mongoose" },
    ],
    tools: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Docker", icon: "docker" },
        { name: "Cloudinary", icon: "cloudinary" },
        { name: "Supabase", icon: "supabase" },
    ],
};

export const projects = [
    {
        id: 1,
        title: "Developer Portfolio",
        description:
            "A modern, responsive portfolio website built with Next.js App Router and Tailwind CSS. Features smooth animations, dark theme, SEO optimization, and a contact form.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        githubUrl: "https://github.com/yourusername/portfolio",
        liveUrl: "https://yourportfolio.vercel.app",
        category: "fullstack",
    },
    {
        id: 2,
        title: "Drag & Drop TODO App",
        description:
            "A feature-rich TODO application with drag-and-drop task reordering, priority labels, and persistent storage via localStorage. Clean UI with smooth interactions.",
        techStack: ["React", "TypeScript", "Tailwind CSS", "localStorage"],
        githubUrl: "https://github.com/yourusername/todo-app",
        liveUrl: "https://todo-app-demo.vercel.app",
        category: "frontend",
    },
    {
        id: 3,
        title: "Profile Management System",
        description:
            "A full-stack profile management system with user authentication, profile photo upload via Cloudinary, and CRUD operations. Built with a NestJS backend and React frontend.",
        techStack: ["React", "NestJS", "MongoDB", "Cloudinary", "JWT"],
        githubUrl: "https://github.com/yourusername/profile-management",
        liveUrl: null,
        category: "fullstack",
    },
];

export const experience = [
    {
        id: 1,
        role: "STEAM Officer",
        organization: "Community Organization",
        period: "2022 – Present",
        description:
            "Facilitated STEAM (Science, Technology, Engineering, Art, Mathematics) programs and workshops for students. Mentored young learners in technology and programming fundamentals.",
        highlights: [
            "Organized and led tech workshops for 50+ students",
            "Introduced programming concepts using hands-on projects",
            "Coordinated with educators to integrate STEAM into curriculum",
        ],
    },
    {
        id: 2,
        role: "Self-Taught Full Stack Developer",
        organization: "Independent Learning",
        period: "2021 – Present",
        description:
            "Committed to continuous learning and staying current with modern web development technologies. Built multiple projects to solidify skills across the full stack.",
        highlights: [
            "Mastered MERN stack (MongoDB, Express.js, React, Node.js)",
            "Learned Next.js App Router, Server Components and Server Actions",
            "Explored NestJS for scalable backend architecture",
            "Practiced Docker containerization and deployment workflows",
        ],
    },
];

export const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Tech Stack", href: "#techstack" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];
