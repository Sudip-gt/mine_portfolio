"use client";

import { devIconMap, techStack } from "@/data/portfolio";

// Only show skills that have a DevIcon mapped
const carouselSkills = [
  ...techStack.frontend,
  ...techStack.backend,
  ...techStack.database,
  ...techStack.tools,
].filter((tech) => devIconMap[tech.name]);

const COUNT = carouselSkills.length;
// Space each card ~145px apart around the cylinder
const RADIUS = Math.round((145 * COUNT) / (2 * Math.PI));
// Perspective well beyond the radius for a natural 3D look
const PERSPECTIVE = RADIUS * 4.5;
// ~1.8 seconds per card for a comfortable spin speed
const DURATION = COUNT * 1.8;

export default function SkillCarousel() {
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

      <div className="relative w-full" style={{ height: 168, perspective: PERSPECTIVE, perspectiveOrigin: "50% 50%" }}>
        {/* Fade edges so cards gracefully enter/exit */}
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
                className="absolute w-[128px] h-[128px] flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-700/50 bg-[#1a1a1a] cursor-default select-none"
                style={{ transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)` }}
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
