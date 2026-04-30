"use client";

import { navLinks, projects } from "@/data/portfolio";
import { useEffect, useMemo, useRef, useState } from "react";

type SearchGroup = "Sections" | "Projects" | "Commands";

type SearchItem = {
  id: string;
  label: string;
  command: string;
  group: SearchGroup;
  keywords: string[];
  action: () => void;
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function matchesSearch(item: SearchItem, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const haystack = [item.label, item.command, ...item.keywords].join(" ").toLowerCase();
  return q.split(/\s+/).every((part) => haystack.includes(part));
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>(["ls"]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<SearchItem[]>(() => {
    const sections: SearchItem[] = navLinks.map((link) => ({
      id: `section-${link.href}`,
      label: link.label,
      command: `cd ${link.href.replace("#", "")}/`,
      group: "Sections",
      keywords: [link.label.toLowerCase(), "navigate", "section"],
      action: () => {
        onClose();
        scrollToSection(link.href.replace("#", ""));
      },
    }));

    const projectItems: SearchItem[] = projects.map((p) => ({
      id: `project-${p.id}`,
      label: p.title,
      command: `open ${p.title.toLowerCase().replace(/\s+/g, "-")}`,
      group: "Projects",
      keywords: [...p.techStack.map((t) => t.toLowerCase()), p.category],
      action: () => {
        onClose();
        if (p.githubUrl) window.open(p.githubUrl, "_blank", "noopener,noreferrer");
      },
    }));

    const commands: SearchItem[] = [
      {
        id: "cmd-ls",
        label: "List all sections",
        command: "ls",
        group: "Commands",
        keywords: ["list", "sections", "all"],
        action: () => setHistory((h) => [...h, "ls"]),
      },
      {
        id: "cmd-clear",
        label: "Clear terminal history",
        command: "clear",
        group: "Commands",
        keywords: ["clear", "reset", "history"],
        action: () => setHistory([]),
      },
    ];

    return [...commands, ...sections, ...projectItems];
  }, [onClose]);

  const filteredItems = useMemo<SearchItem[]>(() => {
    const q = query.trim().toLowerCase();

    if (!q || q === "ls") {
      return items.filter((item) => item.group !== "Commands" || item.command === "ls");
    }
    if (q === "clear") {
      return items.filter((item) => item.command === "clear");
    }
    if (q.startsWith("cd ")) {
      return items.filter(
        (item) => item.group === "Sections" && matchesSearch(item, q.slice(3))
      );
    }
    if (q.startsWith("open ")) {
      return items.filter(
        (item) => item.group === "Projects" && matchesSearch(item, q.slice(5))
      );
    }
    return items.filter((item) => matchesSearch(item, q));
  }, [items, query]);

  // Focus input when opened (DOM side-effect only — no setState here)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  // Merged query setter — resets selection index whenever query changes
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  };

  const runItem = (item: SearchItem | undefined) => {
    if (!item) return;
    setHistory((h) => [...h, item.command]);
    item.action();
      if (item.command !== "clear") handleQueryChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestion = filteredItems[selectedIndex];
      if (suggestion) setQuery(suggestion.command);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const q = query.trim().toLowerCase();
      if (q === "clear") {
        setHistory([]);
        handleQueryChange("");
        return;
      }
      runItem(filteredItems[selectedIndex] ?? filteredItems[0]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Group label styling
  const groupColors: Record<SearchGroup, string> = {
    Sections: "text-indigo-400",
    Projects: "text-violet-400",
    Commands: "text-zinc-500",
  };

  // Group items for display
  const grouped = filteredItems.reduce<{ group: SearchGroup; items: (SearchItem & { index: number })[] }[]>(
    (acc, item, index) => {
      const existing = acc.find((g) => g.group === item.group);
      if (existing) {
        existing.items.push({ ...item, index });
      } else {
        acc.push({ group: item.group, items: [{ ...item, index }] });
      }
      return acc;
    },
    []
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[580px] rounded-xl border border-zinc-700/60 bg-[#111111] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-[#0f0f0f]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            <span className="text-indigo-400">sudip</span>
            <span className="text-zinc-600">@</span>
            <span className="text-violet-400">portfolio</span>
            <span className="text-zinc-600">:</span>
            <span className="text-zinc-300">~/search</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono"
          >
            Esc
          </button>
        </div>

        {/* Terminal history */}
        <div className="px-4 pt-3 pb-1 space-y-1 font-mono text-sm">
          {history.slice(-3).map((entry, i) => (
            <div key={`${entry}-${i}`} className="text-zinc-500">
              <span className="text-indigo-400">$</span>{" "}
              <span className="text-zinc-400">{entry}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 pb-3 font-mono text-sm">
          <span className="text-indigo-400 shrink-0">$</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-zinc-200 placeholder:text-zinc-600 outline-none"
            placeholder="ls  |  cd about/  |  open project-name"
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800 mx-4" />

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto p-2 scrollbar-thin">
          {filteredItems.length === 0 ? (
            <div className="px-3 py-5 text-sm text-zinc-500 text-center font-mono">
              No matches for{" "}
              <span className="text-indigo-400">&quot;{query}&quot;</span>
            </div>
          ) : (
            grouped.map(({ group, items: groupItems }) => (
              <div key={group} className="mb-1">
                <div className={`px-3 py-1 text-[10px] uppercase tracking-widest font-mono ${groupColors[group]}`}>
                  {group}
                </div>
                {groupItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => runItem(item)}
                    onMouseEnter={() => setSelectedIndex(item.index)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                      item.index === selectedIndex
                        ? "bg-indigo-600/20 text-zinc-100"
                        : "text-zinc-400 hover:bg-zinc-800/60"
                    }`}
                  >
                    <span className="text-sm">{item.label}</span>
                    <span className="text-xs font-mono text-zinc-600">{item.command}</span>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-zinc-800 bg-[#0f0f0f]">
          {[
            { key: "↑↓", label: "navigate" },
            { key: "↵", label: "select" },
            { key: "Tab", label: "autocomplete" },
            { key: "Esc", label: "close" },
          ].map(({ key, label }) => (
            <span key={key} className="flex items-center gap-1 text-[11px] text-zinc-600">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[10px]">{key}</kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
