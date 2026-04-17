"use client";

import { CountUp } from "@/components/animations";
import { personalInfo } from "@/data/portfolio";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: "⚛️",
    title: "Frontend Expert",
    desc: "React, Next.js, Redux Toolkit — building fast, responsive UIs",
  },
  {
    icon: "🛠️",
    title: "Backend Developer",
    desc: "Node.js, Express.js, NestJS — scalable REST APIs & server logic",
  },
  {
    icon: "🗄️",
    title: "Database Proficient",
    desc: "MongoDB, PostgreSQL, MySQL with Prisma & Mongoose ORMs",
  },
  {
    icon: "📚",
    title: "Continuous Learner",
    desc: "Self-taught, always exploring new tools and best practices",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
            Get to know me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-zinc-300 text-lg leading-relaxed">
              {personalInfo.bio}
            </p>
            <p className="text-zinc-400 leading-relaxed">
              I started my journey as a self-taught developer, diving deep into
              the <span className="text-indigo-400 font-medium">MERN stack</span> and
              progressively expanding into{" "}
              <span className="text-indigo-400 font-medium">Next.js</span> and{" "}
              <span className="text-indigo-400 font-medium">NestJS</span>. I
              have a strong interest in backend architecture, API design, and
              building end-to-end features independently.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Outside of code, I serve as a{" "}
              <span className="text-indigo-400 font-medium">STEAM Officer</span>,
              where I mentor students and foster interest in technology and
              problem-solving.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { end: 3, suffix: "+", label: "Years Learning" },
                { end: 10, suffix: "+", label: "Projects Built" },
                { end: 2, suffix: "", label: "Tech Stacks" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-indigo-400">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-xl bg-[#1a1a1a] border border-[#27272a] hover:border-indigo-500/50 transition-colors group"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="text-white font-semibold mb-1 group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
