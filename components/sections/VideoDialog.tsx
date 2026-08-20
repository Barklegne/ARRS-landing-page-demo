"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { player } from "@/lib/content";

export const PLAY_EVENT = "arrs:play-session";

export function openPlayer() {
  window.dispatchEvent(new CustomEvent(PLAY_EVENT));
}

const embed =
  `https://www.youtube-nocookie.com/embed/${player.videoId}` +
  "?autoplay=1&rel=0&modestbranding=1&playsinline=1";

// One player shared by every trigger. The iframe is mounted only while the
// dialog is open, so closing genuinely stops playback rather than hiding a
// still-running video — and nothing is requested from YouTube until asked.
export function VideoDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const play = () => {
      setOpen(true);
      ref.current?.showModal();
    };
    window.addEventListener(PLAY_EVENT, play);
    return () => window.removeEventListener(PLAY_EVENT, play);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="player-heading"
      onClose={() => setOpen(false)}
      onClick={(event) => {
        if (event.target === ref.current) ref.current?.close();
      }}
      className="m-auto w-[min(60rem,calc(100vw-1.5rem))] rounded-2xl border-[0.5px] border-paper/12 bg-transparent p-0 text-paper shadow-[0_50px_120px_-40px_rgb(0_0_0/0.95)] backdrop:bg-ink/85 backdrop:backdrop-blur-md"
    >
      <div className="rounded-2xl bg-gradient-to-b from-ink-raised to-ink p-2.5">
        <div className="flex items-start justify-between gap-4 px-3 pb-3 pt-2">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="type-micro text-on-dark">{player.eyebrow}</span>
            <h2 id="player-heading" className="truncate text-[15px] text-paper">
              {player.title}
            </h2>
            <p className="text-[13px] text-on-dark">{player.speaker}</p>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={player.close}
            className="-mr-1 -mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-on-dark/70 transition-colors duration-150 hover:bg-paper/8 hover:text-paper"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-xl bg-ink">
          {open ? (
            <iframe
              src={embed}
              title={`${player.title} — ${player.speaker}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="size-full border-0"
            />
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
