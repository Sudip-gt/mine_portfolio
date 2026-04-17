"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

function GithubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowDownIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

const roles = [
  "Full Stack Developer",
  "React & Next.js Engineer",
  "Node.js & NestJS Developer",
  "MERN Stack Developer",
];

const particles = [
  { id: 1, left: "10%", top: "20%", size: 3, duration: 4, delay: 0 },
  { id: 2, left: "85%", top: "15%", size: 2, duration: 5, delay: 0.5 },
  { id: 3, left: "25%", top: "75%", size: 4, duration: 6, delay: 1 },
  { id: 4, left: "70%", top: "60%", size: 2, duration: 4.5, delay: 1.5 },
  { id: 5, left: "50%", top: "10%", size: 3, duration: 5.5, delay: 0.8 },
  { id: 6, left: "90%", top: "80%", size: 2, duration: 4, delay: 2 },
  { id: 7, left: "15%", top: "50%", size: 3, duration: 6, delay: 0.3 },
  { id: 8, left: "60%", top: "85%", size: 2, duration: 5, delay: 1.2 },
];

function fadeUpVariant(delay: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0f0f]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated glow blobs */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-40"
        animate={{
          background: [
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-400/30 pointer-events-none"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          {...fadeUpVariant(0.1)}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-medium text-indigo-400 border border-indigo-400/30 rounded-full bg-indigo-400/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Open to opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUpVariant(0.2)}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
        >
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Cycling role */}
        <motion.div
          {...fadeUpVariant(0.35)}
          className="h-10 flex items-center justify-center mb-6"
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={roleIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-xl sm:text-2xl font-medium text-zinc-400"
            >
              {roles[roleIndex]}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 text-indigo-400"
              >
                |
              </motion.span>
            </motion.h2>
          </AnimatePresence>
        </motion.div>

        {/* Tagline */}
        <motion.p
          {...fadeUpVariant(0.5)}
          className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUpVariant(0.65)}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <motion.button
            onClick={() => scrollTo("#projects")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
          >
            View Projects
          </motion.button>
          <motion.a
            href={personalInfo.cvUrl}
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 border border-zinc-700 hover:border-indigo-400 text-zinc-300 hover:text-white text-sm font-medium rounded-lg transition-colors"
          >
            Download CV
          </motion.a>
          <motion.button
            onClick={() => scrollTo("#contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 border border-zinc-700 hover:border-indigo-400 text-zinc-300 hover:text-white text-sm font-medium rounded-lg transition-colors"
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          {...fadeUpVariant(0.8)}
          className="flex items-center justify-center gap-5 mb-14"
        >
          {[
            { href: personalInfo.github, label: "GitHub", icon: <GithubIcon size={22} /> },
            { href: personalInfo.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={22} /> },
            { href: `mailto:${personalInfo.email}`, label: "Email", icon: <MailIcon size={22} /> },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-zinc-500 hover:text-indigo-400 transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll down indicator */}
        <motion.button
          onClick={() => scrollTo("#about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
          className="text-zinc-600 hover:text-zinc-400 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDownIcon size={22} />
        </motion.button>
      </div>
    </section>
  );
}
