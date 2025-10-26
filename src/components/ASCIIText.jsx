import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ASCIIText({ text = 'Hey!', enableWaves = true, asciiFontSize = 8, animate = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.2;

    // Text texture via 2D canvas
    const tCanvas = document.createElement('canvas');
    const tCtx = tCanvas.getContext('2d');
    function drawTextTexture() {
      const w = 1024;
      const h = 420;
      tCanvas.width = w;
      tCanvas.height = h;
      tCtx.clearRect(0, 0, w, h);
      const str = String(text).replace(/_/g, ' ');
      // Fit font size to canvas width
      let fontSize = 220;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.font = `bold ${fontSize}px "Courier New", monospace`;
      let width = tCtx.measureText(str).width;
      const maxWidth = w * 0.88;
      if (width > maxWidth) {
        fontSize = Math.floor(fontSize * (maxWidth / width));
        tCtx.font = `bold ${fontSize}px "Courier New", monospace`;
        width = tCtx.measureText(str).width;
      }
      tCtx.fillStyle = '#fff';
      tCtx.fillText(str, w / 2, h / 2);
    }
    drawTextTexture();

    const texture = new THREE.CanvasTexture(tCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const uniforms = {
      uTime: { value: 0 },
      mouse: { value: 0 },
      uEnableWaves: { value: enableWaves ? 1.0 : 0.0 },
      uTexture: { value: texture },
    };

    const vertexShader = `
      varying vec2 vUv;
      uniform float uTime;
      uniform float mouse;
      uniform float uEnableWaves;

      void main() {
          vUv = uv;
          float time = uTime * 5.;
          float waveFactor = uEnableWaves;

          vec3 transformed = position;

          transformed.x += sin(time + position.y) * 0.5 * waveFactor;
          transformed.y += cos(time + position.z) * 0.15 * waveFactor;
          transformed.z += sin(time + position.x) * waveFactor;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform float mouse;
      uniform float uTime;
      uniform sampler2D uTexture;
      uniform float uEnableWaves;

      void main() {
          float time = uTime;
          vec2 pos = vUv;

          // Chromatic offsets independent of wave toggle
          float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
          float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
          float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
          float a = texture2D(uTexture, pos).a;
          gl_FragColor = vec4(r, g, b, a);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(1.6, 0.8, 64, 64);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ASCII overlay
    const asciiPre = document.createElement('pre');
    asciiPre.className = 'ascii-pre';
    asciiPre.setAttribute('aria-hidden', 'false');
    mount.appendChild(asciiPre);

    const sample = document.createElement('canvas');
    const sctx = sample.getContext('2d');
    const charset = " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

    function resize() {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      asciiPre.style.fontSize = `${asciiFontSize}px`;
      const cols = Math.max(20, Math.floor(width / asciiFontSize));
      const rows = Math.max(10, Math.floor(height / asciiFontSize));
      sample.width = cols;
      sample.height = rows;
    }
    resize();

    let raf = 0;
    function render(t) {
      uniforms.uTime.value = animate ? (t * 0.001) : 0.0;
      renderer.render(scene, camera);

      const cols = sample.width;
      const rows = sample.height;
      sctx.clearRect(0, 0, cols, rows);
      sctx.drawImage(renderer.domElement, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;
      let out = '';
      for (let y = 0; y < rows; y++) {
        let line = '';
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 16) { line += ' '; continue; }
          const brightness = (r + g + b) / 3 / 255;
          const idx = Math.min(charset.length - 1, Math.max(0, Math.floor((1 - brightness) * (charset.length - 1))));
          line += charset[idx];
        }
        out += line + '\n';
      }
      asciiPre.textContent = out;
      if (animate) {
        raf = requestAnimationFrame(render);
      }
    }
    if (animate) {
      raf = requestAnimationFrame(render);
    } else {
      render(performance.now());
    }


    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      try { mount.removeChild(renderer.domElement); } catch {}
      try { mount.removeChild(asciiPre); } catch {}
      renderer.dispose();
      texture.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [text, enableWaves, asciiFontSize, animate]);

  return <div ref={mountRef} className="ascii-wrap" role="img" aria-label={text} />;
}