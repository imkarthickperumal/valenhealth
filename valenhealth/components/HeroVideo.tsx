"use client";

import { useState, useRef, useEffect } from "react";

export default function HeroVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-mute when scrolling away from the hero section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When scrolled out of view (less than 25% visible in viewport)
          if (!entry.isIntersecting || entry.intersectionRatio < 0.25) {
            if (videoRef.current && !videoRef.current.muted) {
              videoRef.current.muted = true;
              setIsMuted(true);
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    observer.observe(container);

    // Also auto-mute if user switches tabs
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current && !videoRef.current.muted) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMutedState = !videoRef.current.muted;
    videoRef.current.muted = nextMutedState;
    setIsMuted(nextMutedState);
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="hp-hero-video-card"
      onClick={toggleSound}
      style={{ cursor: "pointer" }}
    >
      <video
        ref={videoRef}
        className="hp-hero-video"
        src="/video/heropagevideo.MP4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
      />

      {/* Floating Sound Toggle Button */}
      <button
        type="button"
        className="hp-hero-sound-btn"
        onClick={toggleSound}
        aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
      >
        {isMuted ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            <span>Tap for sound</span>
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            <span>Sound On</span>
          </>
        )}
      </button>
    </div>
  );
}

