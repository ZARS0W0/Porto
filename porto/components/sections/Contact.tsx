'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Github, MessageCircle } from 'lucide-react'

const socialLinks: Array<{
  name: string
  icon: typeof Mail | typeof Github | typeof MessageCircle
  href: string
  username?: string
  color: string
  bgColor: string
}> = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:tayef323@gmail.com',
    color: 'from-blue-300 to-cyan-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/ZARS0W0',
    color: 'from-purple-300 to-indigo-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    name: 'Discord',
    icon: MessageCircle,
    href: '#',
    username: 'zartain0844',
    color: 'from-indigo-300 to-blue-400',
    bgColor: 'bg-indigo-500/10'
  }
]

export function Contact() {
  return (
    <section id="contact" className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
      <div className="content-container max-w-4xl relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="heading-unified text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-100 to-white dark:from-neutral-200 dark:via-neutral-100 dark:to-white from-neutral-800 via-neutral-700 to-neutral-900 transition-all duration-500">
            Let's Connect
          </h2>
          <p className="text-neutral-400 dark:text-neutral-400 text-neutral-600 text-base md:text-lg max-w-2xl mx-auto transition-colors duration-500">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name === 'Discord' ? (
                  <Card 
                    className="card-unified cursor-pointer group h-full"
                    onClick={() => {
                      navigator.clipboard.writeText(link.username || '')
                      alert(`Discord username copied: ${link.username}`)
                    }}
                  >
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[120px]">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white dark:text-white text-neutral-900 group-hover:text-neutral-300 dark:group-hover:text-neutral-300 group-hover:text-neutral-700 transition-all duration-500">
                        {link.name}
                      </span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-400 text-neutral-600 mt-1 leading-tight transition-colors duration-500">{link.username}</span>
                    </CardContent>
                  </Card>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full"
                  >
                    <Card className="card-unified cursor-pointer group h-full">
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[120px]">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-white dark:text-white text-neutral-900 group-hover:text-neutral-300 dark:group-hover:text-neutral-300 group-hover:text-neutral-700 transition-all duration-500">
                          {link.name}
                        </span>
                      </CardContent>
                    </Card>
                  </a>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="card-unified">
            <CardContent className="p-8">
              <p className="text-neutral-300 dark:text-neutral-300 text-neutral-700 text-base md:text-lg mb-4 transition-colors duration-500">
                Have a project in mind or want to collaborate?
              </p>
              <a
                href="mailto:tayef323@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-100 transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20"
              >
                <Mail className="w-5 h-5" />
                Get In Touch
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

