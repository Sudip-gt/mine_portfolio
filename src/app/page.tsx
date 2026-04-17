import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";

export default function Home() {
  return (
    <div className="bg-[#0f0f0f]">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
}
