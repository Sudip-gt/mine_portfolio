"use client";

import { personalInfo } from "@/data/portfolio";
import { useContactForm } from "@/hooks/useContactForm";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const contactDetails = [
  {
    icon: <MailIcon />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <GithubIcon />,
    label: "GitHub",
    value: "sudip-gt",
    href: personalInfo.github,
  },
  {
    icon: <LinkedinIcon />,
    label: "LinkedIn",
    value: "Sudip Paudel",
    href: personalInfo.linkedin,
  },
];

export default function Contact() {
  const { form, status, serverMessage, onSubmit } = useContactForm();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <section id="contact" className="section-padding bg-[#0f0f0f]">
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
            Get in touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Contact Me
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Have a project in mind, want to collaborate, or just want to say hi?
            My inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactDetails.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-[#27272a] hover:border-indigo-500/40 transition-colors group"
              >
                <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">{item.label}</p>
                  <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Availability badge */}
            <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-green-400">
                  Available for opportunities
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1.5">
                Open to full-time roles and freelance projects.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 sm:p-8 rounded-2xl bg-[#1a1a1a] border border-[#27272a] space-y-5"
            >
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Name
                </label>
                <input
                  id="contact-name"
                  {...register("name")}
                  placeholder="Your name"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border text-zinc-200 placeholder-zinc-600 text-sm outline-none transition-colors focus:border-indigo-500",
                    errors.name ? "border-red-500/60" : "border-[#27272a]"
                  )}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Email
                </label>
                <input
                  id="contact-email"
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border text-zinc-200 placeholder-zinc-600 text-sm outline-none transition-colors focus:border-indigo-500",
                    errors.email ? "border-red-500/60" : "border-[#27272a]"
                  )}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border text-zinc-200 placeholder-zinc-600 text-sm outline-none transition-colors focus:border-indigo-500 resize-none",
                    errors.message ? "border-red-500/60" : "border-[#27272a]"
                  )}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>

              {/* Success / Error message */}
              {status === "success" && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                  ✓ {serverMessage}
                </div>
              )}
              {status === "error" && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  ✗ {serverMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
