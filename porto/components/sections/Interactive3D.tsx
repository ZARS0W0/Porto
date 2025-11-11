'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
export function Interactive3D() {
  return (
    <Card className="w-full h-[500px] bg-transparent border border-white/10 relative overflow-hidden backdrop-blur-sm z-20">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full">
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-100 to-white dark:from-neutral-200 dark:via-neutral-100 dark:to-white from-neutral-800 via-neutral-700 to-neutral-900 transition-all duration-500">
            Interactive 3D
          </h1>
          <p className="mt-4 text-neutral-300 dark:text-neutral-300 text-neutral-700 max-w-lg transition-colors duration-500">
            Experience my portfolio through immersive 3D interactions. 
            This showcases my ability to integrate cutting-edge technologies 
            and create engaging user experiences.
          </p>
        </div>

        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}

