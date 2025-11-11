"use client";
import React, { useRef, useEffect, useState } from 'react';

interface GlobalCosmicBackgroundProps {
  className?: string;
}

export const GlobalCosmicBackground: React.FC<GlobalCosmicBackgroundProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [sectionProgress, setSectionProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      setScrollY(scroll);
      
      const sections = ['home', 'skills', 'interactive3d', 'timeline', 'about', 'contact'];
      const sectionElements = sections.map(id => {
        const el = document.getElementById(id);
        return el ? { id, top: el.offsetTop, height: el.offsetHeight } : null;
      }).filter(Boolean) as Array<{ id: string; top: number; height: number }>;
      
      const viewportCenter = scroll + window.innerHeight / 2;
      let currentSection = 'home';
      let progress = 0;
      
      for (const section of sectionElements) {
        if (viewportCenter >= section.top && viewportCenter < section.top + section.height) {
          currentSection = section.id;
          progress = (viewportCenter - section.top) / section.height;
          break;
        }
      }
      
      if (sectionElements.length > 0) {
        const firstSection = sectionElements[0];
        const lastSection = sectionElements[sectionElements.length - 1];
        
        if (viewportCenter < firstSection.top) {
          currentSection = firstSection.id;
          progress = 0;
        } else if (viewportCenter >= lastSection.top + lastSection.height) {
          currentSection = lastSection.id;
          progress = 1;
        }
      }
      
      setActiveSection(currentSection);
      setSectionProgress(Math.max(0, Math.min(1, progress)));
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  class WebGLRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram | null = null;
    private vs: WebGLShader | null = null;
    private fs: WebGLShader | null = null;
    private buffer: WebGLBuffer | null = null;
    private scale: number;
    private shaderSource: string;
    private mouseMove = [0, 0];
    private mouseCoords = [0, 0];
    private pointerCoords = [0, 0];
    private nbrOfPointers = 0;
    private scrollOffset = 0;
    private themeIntensity = 0;
    private themeColor = [1.0, 1.0, 1.0];
    private themeSpeed = 1.0;
    private smoothIntensity = 0;
    private smoothSpeed = 1.0;
    private dimension = 0;
    private dimensionProgress = 0;

    private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

    constructor(canvas: HTMLCanvasElement, scale: number) {
      this.canvas = canvas;
      this.scale = scale;
      const glContext = canvas.getContext('webgl2');
      if (!glContext) {
        throw new Error('WebGL2 not supported');
      }
      this.gl = glContext;
      this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
      this.shaderSource = defaultShaderSource;
    }

    updateScroll(offset: number) {
      this.scrollOffset = offset;
    }
    
    updateTheme(intensity: number, color: number[], speed: number) {
      const intensityLerp = 0.03;
      const speedLerp = 0.04;
      
      this.smoothIntensity = this.smoothIntensity + (intensity - this.smoothIntensity) * intensityLerp;
      this.smoothSpeed = this.smoothSpeed + (speed - this.smoothSpeed) * speedLerp;
      
      this.themeIntensity = this.smoothIntensity;
      this.themeColor = color;
      this.themeSpeed = this.smoothSpeed;
    }
    
    updateDimension(dim: number, progress: number) {
      this.dimension = dim;
      this.dimensionProgress = progress;
    }

    updateShader(source: string) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(deltas: number[]) {
      this.mouseMove = deltas;
    }

    updateMouse(coords: number[]) {
      this.mouseCoords = coords;
    }

    updatePointerCoords(coords: number[]) {
      this.pointerCoords = coords;
    }

    updatePointerCount(nbr: number) {
      this.nbrOfPointers = nbr;
    }

    updateScale(scale: number) {
      this.scale = scale;
      this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
    }

    compile(shader: WebGLShader, source: string) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('Shader compilation error:', error);
      }
    }

    test(source: string) {
      let result = null;
      const gl = this.gl;
      const shader = gl.createShader(gl.FRAGMENT_SHADER);
      if (!shader) return result;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        result = gl.getShaderInfoLog(shader);
      }
      gl.deleteShader(shader);
      return result;
    }

    reset() {
      const gl = this.gl;
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs);
          gl.deleteShader(this.vs);
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs);
          gl.deleteShader(this.fs);
        }
        gl.deleteProgram(this.program);
      }
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER);
      this.fs = gl.createShader(gl.FRAGMENT_SHADER);
      if (!this.vs || !this.fs) return;
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);
      this.program = gl.createProgram();
      if (!this.program) return;
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program));
      }
    }

    init() {
      const gl = this.gl;
      const program = this.program;
      if (!program) return;
      
      this.buffer = gl.createBuffer();
      if (!this.buffer) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      (program as any).resolution = gl.getUniformLocation(program, 'resolution');
      (program as any).time = gl.getUniformLocation(program, 'time');
      (program as any).scroll = gl.getUniformLocation(program, 'scroll');
      (program as any).themeIntensity = gl.getUniformLocation(program, 'themeIntensity');
      (program as any).themeColor = gl.getUniformLocation(program, 'themeColor');
      (program as any).themeSpeed = gl.getUniformLocation(program, 'themeSpeed');
      (program as any).dimension = gl.getUniformLocation(program, 'dimension');
      (program as any).dimensionProgress = gl.getUniformLocation(program, 'dimensionProgress');
      (program as any).move = gl.getUniformLocation(program, 'move');
      (program as any).touch = gl.getUniformLocation(program, 'touch');
      (program as any).pointerCount = gl.getUniformLocation(program, 'pointerCount');
      (program as any).pointers = gl.getUniformLocation(program, 'pointers');
    }

    render(now = 0) {
      const gl = this.gl;
      const program = this.program;
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      if (this.buffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      }
      
      gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height);
      gl.uniform1f((program as any).time, now * 1e-3 * this.themeSpeed);
      gl.uniform1f((program as any).scroll, this.scrollOffset * 0.001);
      gl.uniform1f((program as any).themeIntensity, this.themeIntensity);
      gl.uniform3f((program as any).themeColor, this.themeColor[0], this.themeColor[1], this.themeColor[2]);
      gl.uniform1f((program as any).themeSpeed, this.themeSpeed);
      gl.uniform1f((program as any).dimension, this.dimension);
      gl.uniform1f((program as any).dimensionProgress, this.dimensionProgress);
      gl.uniform2f((program as any).move, this.mouseMove[0], this.mouseMove[1]);
      gl.uniform2f((program as any).touch, this.mouseCoords[0], this.mouseCoords[1]);
      gl.uniform1i((program as any).pointerCount, this.nbrOfPointers);
      gl.uniform2fv((program as any).pointers, this.pointerCoords);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }

  class PointerHandler {
    private scale: number;
    private active = false;
    private pointers = new Map<number, number[]>();
    private lastCoords = [0, 0];
    private moves = [0, 0];

    constructor(element: HTMLCanvasElement, scale: number) {
      this.scale = scale;
      
      const map = (element: HTMLCanvasElement, scale: number, x: number, y: number) => 
        [x * scale, element.height - y * scale];

      element.addEventListener('pointerdown', (e) => {
        this.active = true;
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      });

      element.addEventListener('pointerup', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointerleave', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointermove', (e) => {
        if (!this.active) return;
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
      });
    }

    getScale() {
      return this.scale;
    }

    updateScale(scale: number) {
      this.scale = scale;
    }

    get count() {
      return this.pointers.size;
    }

    get move() {
      return this.moves;
    }

    get coords() {
      return this.pointers.size > 0 
        ? Array.from(this.pointers.values()).flat() 
        : [0, 0];
    }

    get first() {
      return this.pointers.values().next().value || this.lastCoords;
    }
  }

  const resize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr);
    }
  };

  const loop = (now: number) => {
    if (!rendererRef.current || !pointersRef.current) return;
    
    rendererRef.current.updateScroll(scrollY);
    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    try {
      rendererRef.current = new WebGLRenderer(canvas, dpr);
      pointersRef.current = new PointerHandler(canvas, dpr);
      
      rendererRef.current.setup();
      rendererRef.current.init();
      
      resize();
      
      const testResult = rendererRef.current.test(defaultShaderSource);
      if (testResult === null) {
        rendererRef.current.updateShader(defaultShaderSource);
      } else {
        console.warn('Shader test failed:', testResult);
      }
      
      animationFrameRef.current = requestAnimationFrame(loop);
    } catch (error) {
      console.error('WebGL initialization error:', error);
    }
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, []);

  const [targetTheme, setTargetTheme] = useState<{ intensity: number; color: [number, number, number]; speed: number } | null>(null);
  const [currentThemeState, setCurrentThemeState] = useState<{ intensity: number; color: [number, number, number]; speed: number }>({
    intensity: 0.3,
    color: [0.05, 0.1, 0.25],
    speed: 0.5
  });

  useEffect(() => {
    const themes: Record<string, { 
      intensity: number; 
      color: [number, number, number]; 
      speed: number;
    }> = {
      'home': { 
        intensity: 0.3, 
        color: [0.05, 0.1, 0.25],
        speed: 0.5
      },
      'skills': { 
        intensity: 0.6, 
        color: [0.25, 0.35, 0.65],
        speed: 0.9
      },
      'interactive3d': { 
        intensity: 0.85, 
        color: [0.5, 0.25, 0.75],
        speed: 1.2
      },
      'timeline': { 
        intensity: 1.0, 
        color: [0.75, 0.65, 0.4],
        speed: 0.95
      },
      'about': { 
        intensity: 0.75, 
        color: [0.4, 0.5, 0.7],
        speed: 0.75
      },
      'contact': { 
        intensity: 0.7, 
        color: [0.65, 0.6, 0.5],
        speed: 0.9
      }
    };
    
    const theme = themes[activeSection] || themes['home'];
    setTargetTheme(theme);
  }, [activeSection]);

  useEffect(() => {
    if (!targetTheme || !rendererRef.current) return;
    
    let animationFrame: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
    
    const animate = () => {
      setCurrentThemeState(prev => {
        const intensityFactor = 0.03;
        const speedFactor = 0.04;
        const colorFactor = 0.025;
        
        const newIntensity = lerp(prev.intensity, targetTheme.intensity, intensityFactor);
        const newSpeed = lerp(prev.speed, targetTheme.speed, speedFactor);
        const newColor: [number, number, number] = [
          lerp(prev.color[0], targetTheme.color[0], colorFactor),
          lerp(prev.color[1], targetTheme.color[1], colorFactor),
          lerp(prev.color[2], targetTheme.color[2], colorFactor)
        ];
        
        const intensityDiff = Math.abs(newIntensity - targetTheme.intensity);
        const speedDiff = Math.abs(newSpeed - targetTheme.speed);
        const colorDiff = Math.abs(newColor[0] - targetTheme.color[0]) + 
                         Math.abs(newColor[1] - targetTheme.color[1]) + 
                         Math.abs(newColor[2] - targetTheme.color[2]);
        
        if (intensityDiff < 0.003 && speedDiff < 0.003 && colorDiff < 0.003) {
          return {
            intensity: targetTheme.intensity,
            color: targetTheme.color,
            speed: targetTheme.speed
          };
        }
        
        return {
          intensity: newIntensity,
          color: newColor,
          speed: newSpeed
        };
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetTheme]);

  const getDimension = (section: string): number => {
    const dimensionMap: Record<string, number> = {
      'home': 0,
      'skills': 1,
      'interactive3d': 2,
      'timeline': 3,
      'about': 4,
      'contact': 5
    };
    return dimensionMap[section] || 0;
  };

  useEffect(() => {
    if (!rendererRef.current) return;
    
    const progress = sectionProgress;
    const intensityCurve = 0.75 + 0.25 * Math.sin(progress * Math.PI);
    const intensityMultiplier = intensityCurve;
    
    const colorEvolution = progress * 0.12;
    const adjustedColor: [number, number, number] = [
      Math.min(1.0, currentThemeState.color[0] + colorEvolution),
      Math.min(1.0, currentThemeState.color[1] + colorEvolution * 0.7),
      Math.min(1.0, currentThemeState.color[2] + colorEvolution * 0.5)
    ];
    
    const currentDimension = getDimension(activeSection);
    const slowProgress = Math.max(0, (progress - 0.3) / 0.7);
    const dimensionProgress = Math.min(1, slowProgress * 1.2);
    
    rendererRef.current.updateTheme(
      currentThemeState.intensity * intensityMultiplier,
      adjustedColor,
      currentThemeState.speed
    );
    rendererRef.current.updateDimension(currentDimension, dimensionProgress);
    rendererRef.current.updateScroll(scrollY);
  }, [currentThemeState, sectionProgress, scrollY, activeSection]);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#000' }}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${className}`}
        style={{ 
          pointerEvents: 'none', 
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform float scroll;
uniform float themeIntensity;
uniform vec3 themeColor;
uniform float themeSpeed;
uniform float dimension;
uniform float dimensionProgress;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	
	float baseOffset = scroll * 2.0;
	float timeOffset = T * themeSpeed * 0.5;
	
	float bg=clouds(vec2(st.x+timeOffset,-st.y+baseOffset));
	uv*=1.-.3*(sin(T*themeSpeed*.2)*.5+.5);
	
	float dimBlend = smoothstep(0.0, 1.0, dimensionProgress * 0.5);
	dimBlend = dimBlend * dimBlend * (3.0 - 2.0 * dimBlend);
	float currentDim = floor(dimension);
	float nextDim = currentDim + 1.0;
	if (nextDim > 5.0) nextDim = 5.0;
	
	float voidStars = 4.0 + themeIntensity * 2.0;
	vec3 voidColor = vec3(0.05, 0.1, 0.25);
	
	float nurseryStars = 6.0 + themeIntensity * 4.0;
	vec3 nurseryColor = vec3(0.25, 0.35, 0.65);
	float nurseryNebula = fbm(uv * 2.0 + T * 0.3) * 0.5;
	
	float energyStars = 8.0 + themeIntensity * 5.0;
	vec3 energyColor = vec3(0.5, 0.25, 0.75);
	float energyWave = sin(uv.x * 3.0 + uv.y * 2.0 + T * 0.5) * 0.3;
	
	float temporalStars = 10.0 + themeIntensity * 6.0;
	vec3 temporalColor = vec3(0.75, 0.65, 0.4);
	float temporalStream = fbm(uv * 1.5 + vec2(T * 0.2, 0.0)) * 0.4;
	
	float reflectionStars = 8.0 + themeIntensity * 4.0;
	vec3 reflectionColor = vec3(0.4, 0.5, 0.7);
	float reflectionNebula = fbm(uv * 1.2 + T * 0.15) * 0.3;
	
	float convergenceStars = 12.0 + themeIntensity * 4.0;
	vec3 convergenceColor = vec3(0.65, 0.6, 0.5);
	float convergenceField = length(uv) * 0.5;
	
	vec3 dimColor0, dimColor1;
	float dimStars0, dimStars1;
	float dimEffect0, dimEffect1;
	
	if (currentDim == 0.0) {
		dimColor0 = voidColor; dimStars0 = voidStars; dimEffect0 = 0.0;
	} else if (currentDim == 1.0) {
		dimColor0 = nurseryColor; dimStars0 = nurseryStars; dimEffect0 = nurseryNebula;
	} else if (currentDim == 2.0) {
		dimColor0 = energyColor; dimStars0 = energyStars; dimEffect0 = energyWave;
	} else if (currentDim == 3.0) {
		dimColor0 = temporalColor; dimStars0 = temporalStars; dimEffect0 = temporalStream;
	} else if (currentDim == 4.0) {
		dimColor0 = reflectionColor; dimStars0 = reflectionStars; dimEffect0 = reflectionNebula;
	} else {
		dimColor0 = convergenceColor; dimStars0 = convergenceStars; dimEffect0 = convergenceField;
	}
	
	if (nextDim == 0.0) {
		dimColor1 = voidColor; dimStars1 = voidStars; dimEffect1 = 0.0;
	} else if (nextDim == 1.0) {
		dimColor1 = nurseryColor; dimStars1 = nurseryStars; dimEffect1 = nurseryNebula;
	} else if (nextDim == 2.0) {
		dimColor1 = energyColor; dimStars1 = energyStars; dimEffect1 = energyWave;
	} else if (nextDim == 3.0) {
		dimColor1 = temporalColor; dimStars1 = temporalStars; dimEffect1 = temporalStream;
	} else if (nextDim == 4.0) {
		dimColor1 = reflectionColor; dimStars1 = reflectionStars; dimEffect1 = reflectionNebula;
	} else {
		dimColor1 = convergenceColor; dimStars1 = convergenceStars; dimEffect1 = convergenceField;
	}
	
	vec3 dimensionColor = mix(dimColor0, dimColor1, dimBlend);
	float dimensionStars = mix(dimStars0, dimStars1, dimBlend);
	float dimensionEffect = mix(dimEffect0, dimEffect1, dimBlend);
	
	if (currentDim >= 1.0 || dimBlend > 0.0) {
		float effectBlend = smoothstep(0.0, 1.0, dimBlend * 1.2);
		
		if (currentDim == 1.0 || (currentDim == 0.0 && nextDim == 1.0)) {
			float nebulaLayer = fbm(uv * 1.5 + vec2(T * 0.15, T * 0.12)) * 0.4;
			float nebulaIntensity = mix(0.0, 0.3, effectBlend);
			if (currentDim == 1.0) nebulaIntensity = 0.3;
			col += dimensionColor * nebulaLayer * nebulaIntensity;
		}
		
		if (currentDim == 2.0 || (currentDim == 1.0 && nextDim == 2.0) || (currentDim == 2.0 && nextDim == 3.0)) {
			float energyFlow = sin(uv.x * 4.0 + uv.y * 3.0 + T * 0.4) * 0.25;
			energyFlow += sin(uv.x * 2.0 - uv.y * 2.5 + T * 0.3) * 0.15;
			float energyIntensity = mix(0.0, 0.4, effectBlend);
			if (currentDim == 2.0) energyIntensity = 0.4;
			col += dimensionColor * energyFlow * energyIntensity;
		}
		
		if (currentDim == 3.0 || (currentDim == 2.0 && nextDim == 3.0) || (currentDim == 3.0 && nextDim == 4.0)) {
			float timeStream = fbm(uv * 1.2 + vec2(T * 0.12, 0.0)) * 0.5;
			timeStream += fbm(uv * 0.8 + vec2(0.0, T * 0.08)) * 0.3;
			float temporalIntensity = mix(0.0, 0.35, effectBlend);
			if (currentDim == 3.0) temporalIntensity = 0.35;
			col += dimensionColor * timeStream * temporalIntensity;
		}
		
		if (currentDim == 4.0 || (currentDim == 3.0 && nextDim == 4.0) || (currentDim == 4.0 && nextDim == 5.0)) {
			float reflectionNebula = fbm(uv * 1.0 + T * 0.08) * 0.3;
			float reflectionIntensity = mix(0.0, 0.3, effectBlend);
			if (currentDim == 4.0) reflectionIntensity = 0.3;
			col += dimensionColor * reflectionNebula * reflectionIntensity;
		}
		
		if (currentDim == 5.0 || (currentDim == 4.0 && nextDim == 5.0)) {
			float centerDist = length(uv);
			float convergenceGlow = exp(-centerDist * 1.5) * 0.4;
			float convergenceIntensity = mix(0.0, 0.4, effectBlend);
			if (currentDim == 5.0) convergenceIntensity = 0.4;
			col += dimensionColor * convergenceGlow * convergenceIntensity;
		}
	}
	
	float numStarsFloat = dimensionStars;
	int numStars = 16;
	for (float i=1.; i<float(numStars); i++) {
		float dimOffset = currentDim * 50.0 + nextDim * 50.0 * dimBlend;
		float starSeed = i * 123.456 + baseOffset * 0.1 + dimOffset;
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+starSeed+timeOffset+.1*uv.x);
		
		if (currentDim >= 2.0 || (currentDim == 1.0 && nextDim == 2.0)) {
			float flowBlend = smoothstep(0.0, 1.0, dimBlend * 1.5);
			float flowStrength = mix(0.0, 0.06, flowBlend);
			if (currentDim >= 2.0) flowStrength = 0.06;
			uv += vec2(sin(T * 0.25 + i * 0.5), cos(T * 0.15 + i * 0.7)) * flowStrength;
		}
		
		if (currentDim == 5.0 || (currentDim == 4.0 && nextDim == 5.0)) {
			float convergenceBlend = smoothstep(0.0, 1.0, dimBlend * 1.5);
			vec2 toCenter = normalize(-uv) * 0.015 * convergenceBlend;
			if (currentDim == 5.0) toCenter = normalize(-uv) * 0.015;
			uv += toCenter;
		}
		
		float starVisibility = i < numStarsFloat ? 1.0 : max(0.0, 1.0 - (i - numStarsFloat) * 2.0);
		vec2 p=uv;
		float d=length(p);
		
		vec3 starColor = dimensionColor * (0.75 + 0.5 * sin(i * 2.0 + T * 0.3));
		float starBrightness = themeIntensity * (0.85 + 0.4 * sin(i * 3.0)) * starVisibility;
		
		col+=.0018/d*starColor*(cos(sin(i)*vec3(1,2,3))+1.)*starBrightness;
		
		float b=noise(i+p+bg*1.731+starSeed);
		col+=.0028*b*starColor/length(max(p,vec2(b*p.x*.02,p.y)))*starBrightness;
		
		if (currentDim >= 1.0) {
			vec3 nebulaColor = mix(dimensionColor * 1.2, vec3(bg*.3,bg*.2,bg*.1), 0.3);
			float nebulaStrength = themeIntensity * (0.6 + 0.3 * sin(i + T * 0.25));
			float nebulaBlend = smoothstep(0.0, 0.6, d) * 0.4;
			col=mix(col, nebulaColor*nebulaStrength, nebulaBlend);
		}
	}
	
	if (themeIntensity > 0.65) {
		for (float ray = 0.0; ray < 3.0; ray++) {
			float rayAngle = atan(uv.y, uv.x) + T * 0.12 + ray * 2.094;
			float rayDist = length(uv);
			float rayIntensity = themeIntensity * 0.25 * sin(rayAngle * 2.0 + T) * exp(-rayDist * 2.0);
			col += themeColor * rayIntensity * 0.7;
		}
	}
	
	if (themeIntensity > 0.75) {
		float pathY = uv.y * 0.3;
		float pathWidth = 0.12;
		float pathDist = abs(pathY);
		if (pathDist < pathWidth) {
			float pathIntensity = (1.0 - pathDist / pathWidth) * themeIntensity * 0.2;
			pathIntensity = smoothstep(0.0, 1.0, pathIntensity);
			col += themeColor * pathIntensity * 0.8;
		}
	}
	
	if (themeIntensity > 0.65) {
		float centerDist = length(uv);
		float convergenceRadius = 0.35;
		if (centerDist < convergenceRadius) {
			float convergenceIntensity = (1.0 - centerDist / convergenceRadius) * themeIntensity * 0.15;
			col += themeColor * convergenceIntensity * 0.6;
		}
	}
	
	float cosmicGlow = themeIntensity * 0.06;
	col += themeColor * cosmicGlow;
	
	float depth = 1.0 + scroll * 0.0002;
	col *= depth;
	
	float ambientLight = themeIntensity * 0.05;
	col += themeColor * ambientLight;
	
	float maxBrightness = 0.85;
	col = min(col, vec3(maxBrightness));
	
	O=vec4(col,1);
}`;
