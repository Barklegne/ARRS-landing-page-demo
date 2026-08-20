"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { search } from "@/lib/content";

const FADE_MS = 260;
const HOLD_MS = 3500;

// Sits in the hero's right column, above the up-next card. Cmd/Ctrl+K focuses it
// from anywhere on the page, which keeps the shortcut useful after scroll even
// though the field itself is no longer pinned to the header.
export function HeroSearch({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [hint, setHint] = useState("Ctrl K");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setHint("⌘ K");
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (focused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cycle = setInterval(() => {
      setShown(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % search.examples.length);
        setShown(true);
      }, FADE_MS);
    }, HOLD_MS);

    return () => clearInterval(cycle);
  }, [focused]);

  return (
    <form
        action={search.action}
        method="get"
        role="search"
        className={`surface-glass flex w-full min-w-0 items-center gap-3 rounded-xl pl-4 pr-2 transition-colors duration-200 focus-within:border-blue/70 ${className}`}
      >
        <Search aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0 text-on-dark" />
        <label htmlFor="portal-search" className="sr-only">
          {search.label}
        </label>
        <input
          ref={inputRef}
          id="portal-search"
          name="q"
          type="search"
          placeholder={search.examples[index]}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`h-12 min-w-0 flex-1 bg-transparent text-[15px] text-paper transition-opacity duration-[260ms] focus:outline-none ${
            shown ? "placeholder:opacity-100" : "placeholder:opacity-0"
          }`}
        />
        <kbd
          aria-hidden="true"
          className="type-micro hidden shrink-0 rounded-md border-[0.5px] border-paper/20 px-1.5 py-1 text-on-dark/80 sm:block"
        >
          {hint}
        </kbd>
    </form>
  );
}
