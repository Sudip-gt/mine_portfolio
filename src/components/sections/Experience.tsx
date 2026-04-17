"use client";

import { experience } from "@/data/portfolio";
import { motion } from "framer-motion";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
            My journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Experience & Learning
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-[#27272a] to-transparent hidden sm:block" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative sm:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 hidden sm:flex w-12 h-12 rounded-full bg-[#1a1a1a] border-2 border-indigo-500/60 items-center justify-center text-xl shadow-lg shadow-indigo-500/10">
                  {i === 0 ? "🏫" : "💻"}
                </div>

                {/* Card */}
                <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#27272a] hover:border-indigo-500/30 transition-colors duration-300">
                  {/* Role + period */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white">{item.role}</h3>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  {/* Organization */}
                  <p className="text-sm text-indigo-400 font-medium mb-3">
                    {item.organization}
                  </p>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-zinc-400">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                          <CheckIcon />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning mindset banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-violet-900/20 border border-indigo-500/20 text-center"
        >
          <p className="text-2xl mb-2">🚀</p>
          <h3 className="text-white font-semibold mb-1">Always Levelling Up</h3>
          <p className="text-zinc-400 text-sm">
            I believe in learning by building. Every project is an opportunity to explore
            new patterns, tools, and ideas.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
