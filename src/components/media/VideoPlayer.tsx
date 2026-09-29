"use client";

import React, { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
}

export function VideoPlayer({
  videoUrl,
  posterUrl,
  title = "Vídeo sobre a análise de fraudes via Pix",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Per PRD: Sem vídeo configurado, ocultar o player e não exibir um botão de reprodução sem função.
  if (!videoUrl) {
    return null;
  }

  const handlePlay = () => {
    trackEvent({ name: "video_play" });
    setIsPlaying(true);
  };

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#000044] border border-[#FEFEFE]/20 relative shadow-2xl">
      {!isPlaying ? (
        <div className="w-full h-full relative flex items-center justify-center bg-black/40">
          {posterUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Reproduzir vídeo sobre a análise de fraudes via Pix"
            className="z-10 group flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FABD04] text-[#000044] shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg
              className="w-8 h-8 ml-1 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      ) : (
        <iframe
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}
    </div>
  );
}
