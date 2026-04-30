"use client";

import { projects } from "@/data/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const filters = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
];

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const expandedProject = projects.find((p) => p.id === expandedId) ?? null;

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (expandedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expandedId]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus trap for the expanded dialog
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (expandedId !== null) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => dialogRef.current?.focus(), 0);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [expandedId]);

  const handleDialogKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  return (
    <section id="projects" className="section-padding bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
            What I&apos;ve built
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Projects
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-zinc-400 hover:text-white border border-[#27272a] hover:border-indigo-500/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Project cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layoutId={`project-card-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                onClick={() => setExpandedId(project.id)}
                className="flex flex-col rounded-2xl bg-[#1a1a1a] border border-[#27272a] hover:border-indigo-500/40 transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                {/* Card top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col flex-1 p-6">
                  {/* Category badge */}
                  <span className="inline-block mb-3 px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit capitalize">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description — clamped in card view */}
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs rounded-md bg-[#0f0f0f] border border-[#27272a] text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Click hint */}
                  <div className="flex items-center gap-2 mt-auto text-xs text-zinc-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <path d="M4 14v5a2 2 0 0 0 2 2h5" />
                      <line x1="14" y1="10" x2="21" y2="3" />
                    </svg>
                    Click to expand
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Expanded overlay */}
        <AnimatePresence>
          {expandedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
                onClick={() => setExpandedId(null)}
              />

              {/* Expanded card */}
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="expanded-project-title"
                tabIndex={-1}
                onKeyDown={handleDialogKeyDown}
                className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8 pointer-events-none outline-none"
              >
                <motion.article
                  layoutId={`project-card-${expandedProject.id}`}
                  className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#1a1a1a] border border-indigo-500/40 shadow-2xl shadow-indigo-500/10 pointer-events-auto"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Accent bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-violet-500" />

                  {/* Close button */}
                  <button
                    onClick={() => setExpandedId(null)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors z-10"
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>

                  <div className="p-5 sm:p-8">
                    {/* Category */}
                    <span className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 capitalize">
                      {expandedProject.category}
                    </span>

                    {/* Title */}
                    <h3 id="expanded-project-title" className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {expandedProject.title}
                    </h3>

                    {/* Full description */}
                    <p className="text-base text-zinc-300 leading-relaxed mb-8">
                      {expandedProject.description}
                    </p>

                    {/* Tech stack */}
                    <div className="mb-8">
                      <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {expandedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-sm rounded-lg bg-[#0f0f0f] border border-[#27272a] text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#27272a]">
                      <a
                        href={expandedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <GithubIcon /> View Source
                      </a>
                      {expandedProject.liveUrl && (
                        <a
                          href={expandedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                        >
                          <ExternalLinkIcon /> Live Demo
                        </a>
                      )}
                      <button
                        onClick={() => setExpandedId(null)}
                        className="hidden sm:inline ml-auto text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[10px]">Esc</kbd> to close
                      </button>
                    </div>
                  </div>
                </motion.article>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
