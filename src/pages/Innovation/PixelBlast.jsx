import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './PixelBlast.css';

/**
 * PixelBlast — lightweight pixel pattern shader with ripple and liquid wobble.
 * This implementation focuses on the requested API and visuals without external postprocessing.
 */
export default function PixelBlast({
  variant = 'circle',
  pixelSize = 6,
  color = '#B19EEF',
  className = '',
  style = {},
  antialias = true,
  patternScale = 3,
  patternDensity = 1.2,
  liquid = true,
  liquidStrength = 0.12,
  liquidRadius = 1.2,
  pixelSizeJitter = 0.5,
  enableRipples = true,
  rippleIntensityScale = 1.5,
  rippleThickness = 0.12,
  rippleSpeed = 0.4,
  liquidWobbleSpeed = 5,
  autoPauseOffscreen = true,
  speed = 0.6,
  transparent = true,
  edgeFade = 0.25,
  noiseAmount = 0.05,
}) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const materialRef = useRef(null);
  const rafRef = useRef(0);
  const rippleRef = useRef({ center: new THREE.Vector2(0.5, 0.5), strength: 0.0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias, alpha: transparent });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const geometry = new THREE.PlaneGeometry(2, 2);

    const colorVec = new THREE.Color(color);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uColor: { value: new THREE.Vector3(colorVec.r, colorVec.g, colorVec.b) },
      uPixelSize: { value: pixelSize },
      uPatternScale: { value: patternScale },
      uPatternDensity: { value: patternDensity },
      uPixelSizeJitter: { value: pixelSizeJitter },
      uVariant: { value: variant === 'circle' ? 1 : variant === 'square' ? 0 : variant === 'triangle' ? 2 : 3 },
      uLiquid: { value: liquid ? 1 : 0 },
      uLiquidStrength: { value: liquidStrength },
      uLiquidRadius: { value: liquidRadius },
      uLiquidWobbleSpeed: { value: liquidWobbleSpeed },
      uRippleCenter: { value: rippleRef.current.center },
      uRippleStrength: { value: rippleRef.current.strength },
      uRippleIntensityScale: { value: rippleIntensityScale },
      uRippleThickness: { value: rippleThickness },
      uRippleSpeed: { value: rippleSpeed },
      uSpeed: { value: speed },
      uEdgeFade: { value: edgeFade },
      uNoiseAmount: { value: noiseAmount },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uColor;
      uniform float uPixelSize;
      uniform float uPatternScale;
      uniform float uPatternDensity;
      uniform float uPixelSizeJitter;
      uniform int uVariant;
      uniform int uLiquid;
      uniform float uLiquidStrength;
      uniform float uLiquidRadius;
      uniform float uLiquidWobbleSpeed;
      uniform vec2 uRippleCenter;
      uniform float uRippleStrength;
      uniform float uRippleIntensityScale;
      uniform float uRippleThickness;
      uniform float uRippleSpeed;
      uniform float uSpeed;
      uniform float uEdgeFade;
      uniform float uNoiseAmount;

      // hash + noise
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      float noise(vec2 p){
        vec2 i=floor(p); vec2 f=fract(p);
        float a = hash(i);
        float b = hash(i+vec2(1.0,0.0));
        float c = hash(i+vec2(0.0,1.0));
        float d = hash(i+vec2(1.0,1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      // edge fade helper
      float edgeMask(vec2 uv){
        float e = min(min(uv.x, 1.0-uv.x), min(uv.y, 1.0-uv.y));
        return smoothstep(0.0, uEdgeFade, e);
      }

      // shape function
      float shapeIntensity(vec2 cellCoord, vec2 f){
        float jitter = (hash(cellCoord) - 0.5) * uPixelSizeJitter;
        float r = 0.33 + jitter; // base radius inside cell
        if(uVariant == 1){ // circle
          float d = length(f);
          return 1.0 - smoothstep(r, r + uRippleThickness, d);
        } else if (uVariant == 0) { // square
          float d = max(abs(f.x), abs(f.y));
          return 1.0 - smoothstep(r, r + uRippleThickness, d);
        } else if (uVariant == 2) { // triangle
          vec2 p = f;
          p.y += 0.288675 * r; // shift
          float d = max(abs(p.x) * 0.57735 + p.y, -p.y);
          return 1.0 - smoothstep(r, r + uRippleThickness, d);
        } else { // diamond
          float d = abs(f.x) + abs(f.y);
          return 1.0 - smoothstep(r, r + uRippleThickness, d);
        }
      }

      void main(){
        vec2 uv = vUv;
        float t = uTime * uSpeed;

        // liquid wobble
        if(uLiquid == 1){
          float n = noise(uv * uLiquidRadius * 6.0 + vec2(0.0, t * uLiquidWobbleSpeed));
          uv += (n - 0.5) * uLiquidStrength;
        }

        // grid scaling
        float grid = uPatternScale * 6.0 * uPatternDensity;
        vec2 g = uv * grid;
        vec2 cell = floor(g);
        vec2 f = fract(g) - 0.5;

        // ripple effect
        float ripple = 0.0;
        if(uRippleStrength > 0.0001){
          float d = distance(uv, uRippleCenter);
          ripple = (sin(d * (20.0 * uRippleSpeed) - t * 6.2831853) * 0.5 + 0.5) * uRippleStrength * uRippleIntensityScale;
          f *= (1.0 + ripple);
        }

        float s = shapeIntensity(cell, f);

        // subtle noise
        float n = (noise(uv * 20.0 + t) - 0.5) * uNoiseAmount;
        s = clamp(s + n, 0.0, 1.0);

        // color output
        vec3 col = uColor * s;
        float alpha = s; // transparent control handled by renderer alpha
        alpha *= edgeMask(uv);

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: transparent,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function resize(){
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    }
    resize();
    window.addEventListener('resize', resize);

    function animate(){
      // pause when offscreen if requested
      if(autoPauseOffscreen){
        const rect = mount.getBoundingClientRect();
        const isOff = rect.bottom < 0 || rect.top > (window.innerHeight || 0);
        if(isOff){
          rafRef.current = requestAnimationFrame(animate);
          return;
        }
      }
      uniforms.uTime.value += 0.016;
      renderer.render(scene, camera);
      // Decay ripple strength
      uniforms.uRippleStrength.value = Math.max(0.0, uniforms.uRippleStrength.value * 0.985);
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    function onPointerMove(e){
      const rect = mount.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      uniforms.uRippleCenter.value.set(nx, ny);
      if(enableRipples){
        uniforms.uRippleStrength.value = Math.min(1.0, uniforms.uRippleStrength.value + 0.12);
      }
    }
    function onPointerLeave(){
      uniforms.uRippleStrength.value = 0.0;
    }
    mount.addEventListener('pointermove', onPointerMove, { passive: true });
    mount.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerleave', onPointerLeave);
      if(renderer && renderer.domElement.parentNode === mount){
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [
    antialias, transparent, variant, pixelSize, color, patternScale, patternDensity,
    liquid, liquidStrength, liquidRadius, pixelSizeJitter, enableRipples,
    rippleIntensityScale, rippleThickness, rippleSpeed, liquidWobbleSpeed,
    autoPauseOffscreen, speed, edgeFade, noiseAmount,
  ]);

  return <div ref={mountRef} className={`pixel-blast-container ${className}`} style={style} />;
}