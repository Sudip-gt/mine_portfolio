"use client";

import { navLinks, personalInfo } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

function openCommandPalette() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", ctrlKey: true, metaKey: true, bubbles: true })
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const NAVBAR_HEIGHT = 64; // matches h-16
    // Trigger line: 30% down the viewport — feels natural for "what am I reading"
    const TRIGGER_RATIO = 0.3;

    let rafId: number | null = null;

    const update = () => {
      const currentScroll = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Scroll progress
      setScrolled(currentScroll > 20);
      setScrollProgress(documentHeight > 0 ? (currentScroll / documentHeight) * 100 : 0);

      // Active section — use live getBoundingClientRect for accuracy
      const triggerY = NAVBAR_HEIGHT + window.innerHeight * TRIGGER_RATIO;
      let bestHref = navLinks[0]?.href ?? "#hero";
      let bestDist = Infinity;

      for (const link of navLinks) {
        const el = document.querySelector(link.href) as HTMLElement | null;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Only consider sections whose top edge is above the trigger line
        if (rect.top <= triggerY) {
          const dist = triggerY - rect.top;
          if (dist < bestDist) {
            bestDist = dist;
            bestHref = link.href;
          }
        }
      }

      setActiveSection(bestHref);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0f0f0f]/90 backdrop-blur-md border-b border-[#27272a] shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="absolute top-0 left-0 h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-violet-500 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="text-xl font-bold text-white hover:text-indigo-400 transition-colors"
        >
          {scrolled ? "SP" : personalInfo.name}
          <span className="text-indigo-400">.</span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-sm transition-colors relative group",
                  activeSection === link.href ? "text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-indigo-400 transition-all duration-300",
                    activeSection === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={openCommandPalette}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-500 rounded-md transition-colors font-mono"
            aria-label="Open command palette"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M9 9h6M9 12h6M9 15h4" />
            </svg>
            <span>Search</span>
            <kbd className="ml-1 px-1 py-0.5 bg-zinc-800 rounded text-[10px] text-zinc-500">⌘K</kbd>
          </button>
          <a
          href={personalInfo.cvUrl}
          download
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
        >
          Download CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#27272a]">
          <ul className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "w-full text-left text-sm transition-colors py-2",
                    activeSection === link.href ? "text-white" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={personalInfo.cvUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
