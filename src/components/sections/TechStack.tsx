"use client";

import { StaggerContainer, StaggerItem } from "@/components/animations";
import { techStack } from "@/data/portfolio";
import { motion } from "framer-motion";

const categories = [
  { key: "frontend", label: "Frontend", color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/30", dot: "bg-blue-400" },
  { key: "backend", label: "Backend", color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30", dot: "bg-green-400" },
  { key: "database", label: "Database", color: "from-orange-500/20 to-amber-500/20", border: "border-orange-500/30", dot: "bg-orange-400" },
  { key: "tools", label: "Tools & DevOps", color: "from-purple-500/20 to-violet-500/20", border: "border-purple-500/30", dot: "bg-purple-400" },
] as const;

// Map tech names to DevIcon class names
const devIconMap: Record<string, string> = {
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

function TechBadge({ name }: { name: string }) {
  const iconClass = devIconMap[name];
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#0f0f0f] border border-[#27272a] hover:border-indigo-500/50 transition-all duration-200 hover:scale-105 group">
      {iconClass ? (
        <i className={`${iconClass} text-xl`} />
      ) : (
        <span className="w-5 h-5 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs text-indigo-400 font-bold">
          {name[0]}
        </span>
      )}
      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="techstack" className="section-padding bg-[#111111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
            What I work with
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Tech Stack
          </h2>
        </motion.div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const items = techStack[cat.key];
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${cat.color} border ${cat.border} backdrop-blur-sm`}
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-5">
                  <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                  <h3 className="text-white font-semibold">{cat.label}</h3>
                  <span className="ml-auto text-xs text-zinc-500">
                    {items.length} technologies
                  </span>
                </div>

                {/* Badges */}
                <StaggerContainer className="flex flex-wrap gap-2" delay={i * 0.1}>
                  {items.map((tech) => (
                    <StaggerItem key={tech.name}>
                      <TechBadge name={tech.name} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
