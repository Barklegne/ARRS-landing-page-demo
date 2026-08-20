"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageSquare, X } from "lucide-react";
import { assistant } from "@/lib/content";

type Turn = { id: string; from: "ray" | "you"; text: string };

// A scripted mockup, not a model. Every answer restates something already on
// the page, and the panel says so in its own header — an assistant that looks
// live but invents facts is worse than no assistant at all.
export function RayAssistant() {
  const [open, setOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([
    { id: "greeting", from: "ray", text: assistant.greeting },
  ]);

  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const close = useCallback(() => {
    setOpen(false);
    launcher.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [turns, thinking]);

  const ask = (prompt: (typeof assistant.prompts)[number]) => {
    const asked = { id: `${prompt.id}-q`, from: "you", text: prompt.q } as const;
    setTurns((previous) => [...previous, asked]);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reply = () =>
      setTurns((previous) => [
        ...previous,
        { id: `${prompt.id}-a`, from: "ray", text: prompt.a },
      ]);

    if (reduced) {
      reply();
      return;
    }

    setThinking(true);
    timers.current.push(
      window.setTimeout(() => {
        setThinking(false);
        reply();
      }, 900),
    );
  };

  const remaining = assistant.prompts.filter(
    (prompt) => !turns.some((turn) => turn.id === `${prompt.id}-q`),
  );

  return (
    <div className="ray-dock print:hidden">
      {open ? (
        <div
          ref={panel}
          role="dialog"
          aria-label={`${assistant.name}, ${assistant.role}`}
          className="ray-panel mb-3 flex w-[min(21rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[var(--radius-panel)]"
        >
          <div className="flex items-start gap-3 border-b border-paper/10 p-4">
            <span className="ray-avatar relative size-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src={assistant.avatar}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[0.9375rem] text-paper">{assistant.name}</span>
              <span className="type-micro mt-1 text-on-dark/75">{assistant.disclosure}</span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close the assistant"
              className="ray-close -mr-1 -mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full"
            >
              <X aria-hidden="true" strokeWidth={1.75} className="size-4" />
            </button>
          </div>

          <div
            ref={log}
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            className="flex max-h-[15rem] flex-col gap-2.5 overflow-y-auto p-4"
          >
            {turns.map((turn) => (
              <p
                key={turn.id}
                className={
                  turn.from === "ray"
                    ? "ray-bubble ray-bubble-them max-w-[85%] self-start rounded-2xl px-3.5 py-2.5 text-[0.875rem] leading-[1.55] text-on-dark"
                    : "ray-bubble ray-bubble-you max-w-[85%] self-end rounded-2xl px-3.5 py-2.5 text-[0.875rem] leading-[1.55] text-paper"
                }
              >
                {turn.text}
              </p>
            ))}

            {thinking ? (
              <span
                aria-hidden="true"
                className="ray-bubble ray-bubble-them inline-flex items-center gap-1 self-start rounded-2xl px-3.5 py-3"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{ "--i": i } as React.CSSProperties}
                    className="ray-typing size-1.5 rounded-full bg-on-dark"
                  />
                ))}
              </span>
            ) : null}
          </div>

          {remaining.length ? (
            <div className="flex flex-wrap gap-2 border-t border-paper/10 p-4">
              {remaining.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => ask(prompt)}
                  className="tier-chip inline-flex min-h-11 items-center rounded-full border px-3.5 text-[0.8125rem]"
                >
                  {prompt.q}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <button
        ref={launcher}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close the assistant" : assistant.launchLabel}
        className="ray-launcher relative ml-auto flex size-14 items-center justify-center rounded-full"
      >
        {open ? (
          <X aria-hidden="true" strokeWidth={1.75} className="size-5 text-paper" />
        ) : (
          <>
            <span aria-hidden="true" className="ray-halo absolute -inset-3 rounded-full" />
            <span aria-hidden="true" className="ray-ring absolute -inset-[4px] rounded-full" />
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <Image
                src={assistant.avatar}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
              <span aria-hidden="true" className="ray-sheen absolute inset-0 rounded-full" />
            </span>
            <span
              aria-hidden="true"
              className="ray-badge absolute -right-1 -top-1 flex size-[22px] items-center justify-center rounded-full"
            >
              <MessageSquare strokeWidth={2.25} className="size-3" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
