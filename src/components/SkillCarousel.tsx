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
const RADIUS_DESKTOP = Math.round((145 * COUNT) / (2 * Math.PI));
const PERSPECTIVE_DESKTOP = RADIUS_DESKTOP * 4.5;
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

  // Mobile: smooth marquee strip — works naturally with touch scroll
  if (isMobile) {
    const MARQUEE_DURATION = COUNT * 1.6;
    return (
      <>
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            gap: 10px;
            width: max-content;
            animation: marquee ${MARQUEE_DURATION}s linear infinite;
            will-change: transform;
          }
          .marquee-track:hover,
          .marquee-track:active,
          .marquee-track:focus-within {
            animation-play-state: paused;
          }
        `}</style>

        <div className="relative w-full overflow-hidden" aria-label="Skills marquee">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-[#111111] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-[#111111] to-transparent" />

          <div className="marquee-track py-2">
            {[...carouselSkills, ...carouselSkills].map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="w-[86px] h-[86px] shrink-0 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-zinc-700/50 bg-[#1a1a1a] cursor-default select-none"
              >
                <i className={`${devIconMap[tech.name]} text-[1.6rem] leading-none`} />
                <span className="text-[9px] font-medium text-zinc-400 text-center px-1.5 leading-tight">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[11px] text-zinc-600 mt-1 select-none">
          {COUNT} technologies
        </p>
      </>
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

      <div className="relative w-full" style={{ height: 168, perspective: PERSPECTIVE_DESKTOP, perspectiveOrigin: "50% 50%" }}>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#111111] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#111111] to-transparent" />

        <div
          className="carousel-track absolute"
          style={{
            width: 128,
            height: 128,
            top: "50%",
            left: "50%",
            marginLeft: -64,
            marginTop: -64,
          }}
        >
          {carouselSkills.map((tech, i) => {
            const angle = (360 / COUNT) * i;
            return (
              <div
                key={tech.name}
                className="absolute flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-700/50 bg-[#1a1a1a] cursor-default select-none"
                style={{
                  width: 128,
                  height: 128,
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS_DESKTOP}px)`,
                }}
              >
                <i className={`${devIconMap[tech.name]} text-[2rem] leading-none`} />
                <span className="text-[11px] font-medium text-zinc-400 text-center px-2 leading-tight">
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
