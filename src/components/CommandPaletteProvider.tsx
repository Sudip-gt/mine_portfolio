"use client";

import { useEffect, useState } from "react";
import CommandPalette from "./CommandPalette";

export default function CommandPaletteProvider() {
  const [isOpen, setIsOpen] = useState(false);
  // Increment on every open to reset CommandPalette's internal state via key prop
  const [openCount, setOpenCount] = useState(0);

  const handleOpen = () => {
    setOpenCount((c) => c + 1);
    setIsOpen(true);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handleOpen();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandPalette key={openCount} isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
}
