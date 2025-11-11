'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Lightbulb, Rocket, Heart } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Attention to detail in every line of code and every design decision.',
    color: 'from-blue-300 to-cyan-400'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Constantly exploring new technologies and creative solutions to complex problems.',
    color: 'from-amber-300 to-yellow-400'
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Building fast, efficient, and scalable applications that deliver exceptional user experiences.',
    color: 'from-purple-300 to-indigo-400'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Genuine love for coding and creating solutions that make a difference.',
    color: 'from-pink-300 to-rose-400'
  }
]

export function About() {
  return (
    <section id="about" className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
      <div className="content-container relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="heading-unified text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-100 to-white dark:from-neutral-200 dark:via-neutral-100 dark:to-white from-neutral-800 via-neutral-700 to-neutral-900 transition-all duration-500">
            About Me
          </h2>
          <p className="text-neutral-400 dark:text-neutral-400 text-neutral-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed transition-colors duration-500">
            I&apos;m a versatile developer with a passion for creating impactful solutions. 
            My journey spans from web development to embedded systems, allowing me to 
            approach problems from multiple perspectives and deliver comprehensive solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <Card className="card-unified hover:scale-105 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white dark:text-white text-neutral-900 mb-2 transition-colors duration-500">
                      {value.title}
                    </h3>
                    <p className="text-sm text-neutral-400 dark:text-neutral-400 text-neutral-600 transition-colors duration-500">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card className="card-unified">
            <CardContent className="p-8">
              <h3 className="heading-unified text-2xl text-white dark:text-white text-neutral-900 mb-4 transition-colors duration-500">What I Do</h3>
              <ul className="space-y-3 text-neutral-300 dark:text-neutral-300 text-neutral-700 transition-colors duration-500">
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Develop full-stack web applications with modern frameworks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Build Python applications for automation and data processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Create high-performance C++ solutions for system-level programming</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Develop C# applications for enterprise and desktop solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Design and implement Arduino-based IoT and embedded systems</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-unified">
            <CardContent className="p-8">
              <h3 className="heading-unified text-2xl text-white dark:text-white text-neutral-900 mb-4 transition-colors duration-500">My Approach</h3>
              <ul className="space-y-3 text-neutral-300 dark:text-neutral-300 text-neutral-700 transition-colors duration-500">
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Start with understanding the problem deeply</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Choose the right technology for each challenge</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Write clean, maintainable, and well-documented code</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Test thoroughly and optimize for performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white dark:text-white text-neutral-900 mt-1 transition-colors duration-500">▹</span>
                  <span>Continuously learn and adapt to new technologies</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

