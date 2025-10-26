import React, { useEffect, useRef } from 'react';
import './ScrollVideo.css';

// Scroll-reactive video: scrubs video currentTime based on page scroll.
// Place your video at public/background-flow/flow.mp4 or pass src prop.
export default function ScrollVideo({ src = '/background-flow/flow.mp4', className = '' }) {
  const videoRef = useRef(null);
  const durationRef = useRef(0);
  const rafRef = useRef(null);
  const pendingTimeRef = useRef(null);
  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function onLoadedMetadata() {
      durationRef.current = video.duration || 0;
      try { video.pause(); } catch {}
      if (pendingTimeRef.current != null) {
        video.currentTime = Math.min(Math.max(pendingTimeRef.current, 0), durationRef.current || 0);
        pendingTimeRef.current = null;
      }
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata);

    function updateTargetFromScroll() {
      const scrollMax = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / scrollMax, 0), 1);
      targetProgressRef.current = progress;
    }

    function tick() {
      const d = durationRef.current || 0;
      // Lerp towards target progress for smoother perceived motion
      const t = targetProgressRef.current;
      const p = progressRef.current + (t - progressRef.current) * 0.18; // smoothing factor
      progressRef.current = Math.abs(t - p) < 0.0005 ? t : p;
      if (d > 0) {
        const time = progressRef.current * d;
        if (Math.abs((video.currentTime || 0) - time) > 0.005) {
          video.currentTime = time;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    // Initialize target and start smoothing loop
    updateTargetFromScroll();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
    window.addEventListener('resize', updateTargetFromScroll);

    return () => {
      window.removeEventListener('scroll', updateTargetFromScroll);
      window.removeEventListener('resize', updateTargetFromScroll);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={`scroll-video-container ${className}`}> 
      <video
        ref={videoRef}
        className="scroll-video"
        src={src}
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
        // Prevent accidental interactions; we control currentTime via scroll
        controls={false}
      />
      {/* Optional overlay for contrast; comment out if not desired */}
      <div className="scroll-video-overlay" />
    </div>
  );
}