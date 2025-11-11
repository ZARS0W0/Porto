import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Interactive3D } from "@/components/sections/Interactive3D";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Timeline } from "@/components/sections/Timeline";
import { GlobalCosmicBackground } from "@/components/ui/global-cosmic-background";

export default function Home() {
  return (
    <main className="min-h-screen transition-colors duration-500 relative">
      <GlobalCosmicBackground />
      
      <Navigation />
      <Hero />
      <Skills />
      <div id="interactive3d" className="section-padding relative transition-colors duration-500">
        <div className="content-container">
          <Interactive3D />
        </div>
      </div>
      <Timeline />
      <About />
      <Contact />
    </main>
  );
}

