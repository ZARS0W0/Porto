"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1.5,
  cooldownTime = 0.75,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const animationFrameRef = React.useRef<number>();
  const filterId = React.useMemo(() => `gooey-filter-${Math.random().toString(36).substr(2, 9)}`, []);

  React.useEffect(() => {
    if (texts.length === 0) return;
    
    let textIndex = texts.length - 1;
    let morph = 0;
    let cooldown = cooldownTime;
    let lastTime = performance.now();

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;
      
      const eased = fraction * fraction * (3 - 2 * fraction);
      
      text2Ref.current.style.filter = `blur(${Math.min(8 / eased - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(eased, 0.4) * 100}%`;

      const reverseFraction = 1 - eased;
      text1Ref.current.style.filter = `blur(${Math.min(8 / reverseFraction - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(reverseFraction, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      
      const shouldIncrementIndex = cooldown > 0;
      cooldown -= deltaTime;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[0];
      text2Ref.current.textContent = texts[1 % texts.length];
      doCooldown();
    }

    lastTime = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative w-full min-h-[80px] md:min-h-[100px] lg:min-h-[120px] flex items-center justify-center overflow-hidden", className)}>
      <svg className="absolute h-0 w-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center w-full relative"
        style={{ filter: `url(#${filterId})` }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-white font-bold whitespace-nowrap",
            textClassName || "text-4xl md:text-6xl lg:text-7xl"
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-white font-bold whitespace-nowrap",
            textClassName || "text-4xl md:text-6xl lg:text-7xl"
          )}
        />
      </div>
    </div>
  );
}

