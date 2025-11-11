'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Code2, 
  Globe, 
  Cpu, 
  FileCode, 
  Microchip,
  Database,
  Terminal,
  GitBranch,
  Layers,
  Zap
} from 'lucide-react'

const skills = [
  {
    name: 'Python',
    icon: Code2,
    color: 'from-amber-300 to-yellow-400',
    bgColor: 'bg-amber-500/10',
    description: 'Data science, automation, and backend development'
  },
  {
    name: 'Web Development',
    icon: Globe,
    color: 'from-blue-300 to-cyan-400',
    bgColor: 'bg-blue-500/10',
    description: 'React, Next.js, TypeScript, and modern frameworks'
  },
  {
    name: 'C++',
    icon: Cpu,
    color: 'from-purple-300 to-indigo-400',
    bgColor: 'bg-purple-500/10',
    description: 'System programming and performance-critical applications'
  },
  {
    name: 'C#',
    icon: FileCode,
    color: 'from-violet-300 to-purple-400',
    bgColor: 'bg-violet-500/10',
    description: '.NET development and enterprise applications'
  },
  {
    name: 'Arduino',
    icon: Microchip,
    color: 'from-emerald-300 to-teal-400',
    bgColor: 'bg-emerald-500/10',
    description: 'Embedded systems and IoT projects'
  },
  {
    name: 'Database',
    icon: Database,
    color: 'from-orange-300 to-red-400',
    bgColor: 'bg-orange-500/10',
    description: 'SQL, NoSQL, and data management'
  },
  {
    name: 'DevOps',
    icon: Terminal,
    color: 'from-pink-300 to-rose-400',
    bgColor: 'bg-pink-500/10',
    description: 'CI/CD, Docker, and deployment automation'
  },
  {
    name: 'Version Control',
    icon: GitBranch,
    color: 'from-slate-300 to-gray-400',
    bgColor: 'bg-slate-500/10',
    description: 'Git, GitHub, and collaborative development'
  },
  {
    name: 'Architecture',
    icon: Layers,
    color: 'from-cyan-300 to-blue-400',
    bgColor: 'bg-cyan-500/10',
    description: 'System design and scalable solutions'
  },
  {
    name: 'Performance',
    icon: Zap,
    color: 'from-yellow-300 to-amber-400',
    bgColor: 'bg-yellow-500/10',
    description: 'Optimization and high-performance computing'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export function Skills() {
  return (
    <section id="skills" className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
      <div className="content-container relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="heading-unified text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-100 to-white dark:from-neutral-200 dark:via-neutral-100 dark:to-white from-neutral-800 via-neutral-700 to-neutral-900 transition-all duration-500">
            Skills & Technologies
          </h2>
          <p className="text-neutral-400 dark:text-neutral-400 text-neutral-600 text-base md:text-lg max-w-2xl mx-auto transition-colors duration-500">
            A diverse toolkit for building solutions across different domains
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div key={skill.name} variants={itemVariants}>
                <Card className="card-unified hover:scale-105 group cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

