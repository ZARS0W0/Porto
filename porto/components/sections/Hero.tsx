'use client'

import { motion } from 'framer-motion'
import { Code2, Sparkles } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { ThemeToggle } from '@/components/ui/theme-toggle'
export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500">
      
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="absolute top-8 right-8 z-50">
        <ThemeToggle />
      </div>
      
      <div className="relative z-20 content-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-sm text-neutral-200">Full Stack Developer</span>
          </motion.div>

          <div className="mb-8 min-h-[80px] md:min-h-[100px] lg:min-h-[120px] flex items-center justify-center relative w-full overflow-hidden">
            <GooeyText
              texts={["Hi, I'm Tayef", "Developer", "Creator", "Problem Solver"]}
              morphTime={2}
              cooldownTime={1}
              className="font-bold w-full"
              textClassName="text-4xl md:text-6xl lg:text-7xl"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-300 dark:text-neutral-300 text-neutral-700 max-w-3xl mx-auto mb-8 leading-relaxed transition-colors duration-500"
          >
            I craft digital experiences through code. From web applications to embedded systems, 
            I bring ideas to life across multiple platforms and technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 text-neutral-400 dark:text-neutral-400 text-neutral-600 transition-colors duration-500"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>Python</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>Web Development</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>C++</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>C#</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>Arduino</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

