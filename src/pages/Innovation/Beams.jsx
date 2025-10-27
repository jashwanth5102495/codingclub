import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

import './Beams.css';

function BeamsShaderMaterial({ colorA = '#47b6ff', colorB = '#ff3bd6' }) {
  const matRef = useRef();

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;

    float random(vec2 st){
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float beamPattern(vec2 uv) {
      vec2 p = uv - 0.5; // center
      float angle = atan(p.y, p.x);
      float radius = length(p);
      float bands = sin(angle * 14.0 + u_time * 1.8 + radius * 8.0);
      float beam = smoothstep(0.45, 0.95, abs(bands));
      return beam;
    }

    void main() {
      float b = beamPattern(vUv);
      float flicker = 0.8 + 0.2 * random(vUv + u_time);
      vec3 col = mix(u_colorA, u_colorB, b) * flicker;
      float vignette = smoothstep(0.95, 0.3, length(vUv - 0.5));
      col *= vignette;
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <shaderMaterial
      ref={matRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        u_time: { value: 0 },
        u_colorA: { value: new THREE.Color(colorA) },
        u_colorB: { value: new THREE.Color(colorB) },
      }}
      transparent={false}
    />
  );
}

function BeamsPlane() {
  return (
    <mesh position={[0, 0, -1]} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <BeamsShaderMaterial />
    </mesh>
  );
}

export default function Beams() {
  return (
    <Canvas dpr={[1, 2]} frameloop="always" className="beams-container">
      <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={50} />
      <BeamsPlane />
    </Canvas>
  );
}