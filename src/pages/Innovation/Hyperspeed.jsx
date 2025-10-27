import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';
import './Hyperspeed.css';

/**
 * Hyperspeed — lightweight road lights effect inspired by React Bits.
 * This implementation focuses on the key visual cues (road, shoulder lines,
 * moving light sticks and car light streaks) with minimal dependencies.
 * It accepts an effectOptions object matching the React Bits API so you can
 * swap in the official component later with zero refactors.
 */
export default function Hyperspeed({
  className = '',
  style = {},
  effectOptions = DEFAULT_OPTIONS,
}) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const composerRef = useRef(null);
  const rafRef = useRef(0);
  const speedRef = useRef(1);
  const speedingRef = useRef(false);
  const objectsRef = useRef({ leftSticks: [], rightSticks: [], carsAway: [], carsCloser: [] });

  // helpers
  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const opts = { ...DEFAULT_OPTIONS, ...(effectOptions || {}) };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(opts.colors.background, 1);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(opts.fov, mount.clientWidth / mount.clientHeight, 0.1, 2000);
    camera.position.set(0, 3.2, 8);
    camera.lookAt(0, 0.5, 0);
    cameraRef.current = camera;

    // setup postprocessing composer
    const composer = new EffectComposer(renderer);
    composerRef.current = composer;
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new EffectPass(
      camera,
      new BloomEffect({ luminanceThreshold: 0.2, luminanceSmoothing: 0, resolutionScale: 1 })
    );
    const smaaPass = new EffectPass(
      camera,
      new SMAAEffect({ preset: SMAAPreset.MEDIUM })
    );
    renderPass.renderToScreen = false;
    bloomPass.renderToScreen = false;
    smaaPass.renderToScreen = true;
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(smaaPass);
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(5, 10, 10);
    scene.add(dir);

    // road & island
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(opts.roadWidth, opts.length, 1, 1),
      new THREE.MeshStandardMaterial({ color: opts.colors.roadColor, roughness: 1, metalness: 0 })
    );
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0;
    scene.add(road);

    const island = new THREE.Mesh(
      new THREE.PlaneGeometry(opts.islandWidth, opts.length, 1, 1),
      new THREE.MeshStandardMaterial({ color: opts.colors.islandColor, roughness: 1 })
    );
    island.rotation.x = -Math.PI / 2;
    island.position.y = 0.001;
    scene.add(island);

    // shoulder lines (glowing thin strips)
    const shoulderMat = new THREE.MeshBasicMaterial({ color: opts.colors.shoulderLines });
    const leftShoulder = new THREE.Mesh(new THREE.PlaneGeometry(opts.shoulderLinesWidthPercentage * opts.roadWidth, opts.length), shoulderMat);
    leftShoulder.rotation.x = -Math.PI / 2;
    leftShoulder.position.set(-opts.roadWidth / 2 + (opts.shoulderLinesWidthPercentage * opts.roadWidth) / 2, 0.002, 0);
    scene.add(leftShoulder);
    const rightShoulder = leftShoulder.clone();
    rightShoulder.position.x = opts.roadWidth / 2 - (opts.shoulderLinesWidthPercentage * opts.roadWidth) / 2;
    scene.add(rightShoulder);

    // broken lines down the middle
    const brokenGroup = new THREE.Group();
    const segmentLen = opts.brokenLinesLengthPercentage * 4; // visual tune
    for (let z = -opts.length / 2; z < opts.length / 2; z += segmentLen * 2) {
      const seg = new THREE.Mesh(
        new THREE.PlaneGeometry(opts.brokenLinesWidthPercentage * opts.roadWidth, segmentLen),
        new THREE.MeshBasicMaterial({ color: opts.colors.brokenLines })
      );
      seg.rotation.x = -Math.PI / 2;
      seg.position.set(0, 0.003, z);
      brokenGroup.add(seg);
    }
    scene.add(brokenGroup);

    // side light sticks
    const stickMatLeft = new THREE.MeshBasicMaterial({ color: opts.colors.sticks });
    const stickMatRight = new THREE.MeshBasicMaterial({ color: opts.colors.sticks });
    const createStick = (isLeft) => {
      const height = rand(opts.lightStickHeight[0], opts.lightStickHeight[1]);
      const width = rand(opts.lightStickWidth[0], opts.lightStickWidth[1]);
      const geo = new THREE.BoxGeometry(width, height, 0.2);
      const mesh = new THREE.Mesh(geo, isLeft ? stickMatLeft : stickMatRight);
      mesh.position.set(isLeft ? -opts.roadWidth / 2 - opts.islandWidth : opts.roadWidth / 2 + opts.islandWidth, height / 2, rand(-opts.length / 2, opts.length / 2));
      return mesh;
    };
    for (let i = 0; i < opts.totalSideLightSticks; i++) {
      const left = createStick(true);
      scene.add(left);
      objectsRef.current.leftSticks.push(left);
      const right = createStick(false);
      scene.add(right);
      objectsRef.current.rightSticks.push(right);
    }

    // car light streaks (simple planes that move)
    const carStreakMatLeft = new THREE.MeshBasicMaterial({ color: pick(opts.colors.leftCars) });
    const carStreakMatRight = new THREE.MeshBasicMaterial({ color: pick(opts.colors.rightCars) });
    const makeCarStreak = (closer) => {
      const len = rand(opts.carLightsLength[0], opts.carLightsLength[1]);
      const rad = rand(opts.carLightsRadius[0], opts.carLightsRadius[1]);
      const geo = new THREE.PlaneGeometry(rad, len);
      const mat = closer ? carStreakMatRight.clone() : carStreakMatLeft.clone();
      mat.transparent = true;
      mat.opacity = 0.85;
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      const laneOffset = rand(-opts.roadWidth / 2 + 0.6, opts.roadWidth / 2 - 0.6);
      mesh.position.set(laneOffset, 0.004, rand(-opts.length / 2, opts.length / 2));
      return mesh;
    };
    for (let i = 0; i < opts.lightPairsPerRoadWay; i++) {
      const away = makeCarStreak(false);
      scene.add(away);
      objectsRef.current.carsAway.push({ mesh: away, speed: rand(opts.movingAwaySpeed[0], opts.movingAwaySpeed[1]) });
      const closer = makeCarStreak(true);
      scene.add(closer);
      objectsRef.current.carsCloser.push({ mesh: closer, speed: rand(opts.movingCloserSpeed[0], opts.movingCloserSpeed[1]) });
    }

    function resize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      composer.setSize(w, h);
    }
    window.addEventListener('resize', resize);

    function animate() {
      const speedBase = 0.6; // base world scroll speed
      const speed = speedBase * speedRef.current;

      // move sticks
      const { leftSticks, rightSticks, carsAway, carsCloser } = objectsRef.current;
      for (const s of leftSticks) {
        s.position.z -= speed;
        if (s.position.z < -opts.length / 2) s.position.z = opts.length / 2;
      }
      for (const s of rightSticks) {
        s.position.z -= speed;
        if (s.position.z < -opts.length / 2) s.position.z = opts.length / 2;
      }

      // move car streaks
      for (const c of carsAway) {
        c.mesh.position.z += (c.speed / 100) * speedRef.current;
        if (c.mesh.position.z > opts.length / 2) c.mesh.position.z = -opts.length / 2;
      }
      for (const c of carsCloser) {
        c.mesh.position.z += (c.speed / 100) * speedRef.current;
        if (c.mesh.position.z < -opts.length / 2) c.mesh.position.z = opts.length / 2;
      }

      composer.render();
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    const onPointerDown = () => {
      if (speedingRef.current) return;
      speedingRef.current = true;
      speedRef.current = opts.speedUp;
      camera.fov = opts.fovSpeedUp;
      camera.updateProjectionMatrix();
      try { opts.onSpeedUp && opts.onSpeedUp(); } catch (e) {}
    };
    const onPointerUp = () => {
      speedingRef.current = false;
      speedRef.current = 1;
      camera.fov = opts.fov;
      camera.updateProjectionMatrix();
      try { opts.onSlowDown && opts.onSlowDown(); } catch (e) {}
    };
    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('pointerleave', onPointerUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('pointerleave', onPointerUp);
      if (renderer && renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      composerRef.current && composerRef.current.dispose();
      renderer.dispose();
    };
  }, [effectOptions]);

  return <div id="lights" ref={mountRef} className={`hyperspeed-container ${className}`} style={style} />;
}

const DEFAULT_OPTIONS = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3,
  },
};