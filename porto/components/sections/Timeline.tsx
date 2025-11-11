'use client'

import { Code, FileText, User, Clock, Rocket, CheckCircle } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Learning",
    date: "2020",
    content: "Started my journey in programming with Python and web development fundamentals.",
    category: "Foundation",
    icon: Code,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Web Development",
    date: "2021",
    content: "Mastered React, Next.js, and modern web frameworks. Built multiple full-stack applications.",
    category: "Web",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Systems Programming",
    date: "2022",
    content: "Dived into C++ and C# for system-level programming and enterprise applications.",
    category: "Systems",
    icon: Rocket,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Embedded Systems",
    date: "2023",
    content: "Explored Arduino and IoT development, creating smart devices and automation systems.",
    category: "Embedded",
    icon: CheckCircle,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 5,
    title: "Full Stack",
    date: "2024",
    content: "Combining all skills to build comprehensive solutions across multiple platforms.",
    category: "Integration",
    icon: User,
    relatedIds: [4],
    status: "in-progress" as const,
    energy: 60,
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="section-padding px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
      <div className="content-container relative z-20">
        <div className="text-center mb-8">
          <h2 className="heading-unified text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-100 to-white dark:from-neutral-200 dark:via-neutral-100 dark:to-white from-neutral-800 via-neutral-700 to-neutral-900 transition-all duration-500">
            My Journey
          </h2>
          <p className="text-neutral-400 dark:text-neutral-400 text-neutral-600 text-base md:text-lg max-w-2xl mx-auto transition-colors duration-500">
            An interactive timeline of my development journey. Click on any node to explore.
          </p>
        </div>
        <div className="relative h-[600px] md:h-[700px] w-full">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </div>
    </section>
  )
}

