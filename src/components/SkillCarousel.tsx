"use client";

import { devIconMap, techStack } from "@/data/portfolio";
import { useEffect, useState } from "react";

// Only show skills that have a DevIcon mapped
const carouselSkills = [
  ...techStack.frontend,
  ...techStack.backend,
  ...techStack.database,
  ...techStack.tools,
].filter((tech) => devIconMap[tech.name]);

const COUNT = carouselSkills.length;
// Responsive radius: smaller on mobile
const RADIUS_DESKTOP = Math.round((145 * COUNT) / (2 * Math.PI));
const RADIUS_MOBILE = Math.round((90 * COUNT) / (2 * Math.PI));
const PERSPECTIVE_DESKTOP = RADIUS_DESKTOP * 4.5;
const PERSPECTIVE_MOBILE = RADIUS_MOBILE * 4.5;
const DURATION = COUNT * 1.8;

export default function SkillCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setIsMobile(mediaQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    sync();
    mediaQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      mediaQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  const RADIUS = isMobile ? RADIUS_MOBILE : RADIUS_DESKTOP;
  const PERSPECTIVE = isMobile ? PERSPECTIVE_MOBILE : PERSPECTIVE_DESKTOP;
  const cardSize = isMobile ? 90 : 128;

  if (reducedMotion) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {carouselSkills.map((tech) => (
          <div
            key={tech.name}
            className="min-w-[112px] shrink-0 rounded-xl border border-zinc-700/50 bg-[#1a1a1a] px-3 py-4 text-center"
          >
            <i className={`${devIconMap[tech.name]} text-[1.6rem] leading-none`} />
            <p className="mt-2 text-[11px] font-medium text-zinc-400 leading-tight">{tech.name}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes carousel-spin {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(-360deg); }
        }
        .carousel-track {
          transform-style: preserve-3d;
          animation: carousel-spin ${DURATION}s linear infinite;
          will-change: transform;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full" style={{ height: isMobile ? 120 : 168, perspective: PERSPECTIVE, perspectiveOrigin: "50% 50%" }}>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-[#111111] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-[#111111] to-transparent" />

        <div
          className="carousel-track absolute"
          style={{
            width: cardSize,
            height: cardSize,
            top: "50%",
            left: "50%",
            marginLeft: -(cardSize / 2),
            marginTop: -(cardSize / 2),
          }}
        >
          {carouselSkills.map((tech, i) => {
            const angle = (360 / COUNT) * i;
            return (
              <div
                key={tech.name}
                className={`absolute flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border border-zinc-700/50 bg-[#1a1a1a] cursor-default select-none`}
                style={{
                  width: cardSize,
                  height: cardSize,
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                }}
              >
                <i className={`${devIconMap[tech.name]} text-[1.5rem] sm:text-[2rem] leading-none`} />
                <span className="text-[9px] sm:text-[11px] font-medium text-zinc-400 text-center px-1.5 sm:px-2 leading-tight">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-[11px] text-zinc-600 mt-1 select-none">
        hover to pause · {COUNT} technologies
      </p>
    </>
  );
}
