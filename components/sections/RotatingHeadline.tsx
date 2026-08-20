"use client";

import { Fragment, useEffect, useState, type CSSProperties } from "react";
import { hero } from "@/lib/content";

const WORD_START = 60;
const WORD_STAGGER = 40;
const MARK_LEAD = 80;
const WORD_DURATION = 680;
const HOLD_MS = 6200;
const EXIT_MS = 400;

const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

// The first headline is server-rendered, so the h1 is real text before any JS.
// Rotation is skipped entirely under reduced motion rather than degraded.
export function RotatingHeadline() {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (hero.headlines.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let swap = 0;
    const hold = window.setTimeout(() => {
      setExiting(true);
      swap = window.setTimeout(() => {
        setIndex((i) => (i + 1) % hero.headlines.length);
        setExiting(false);
      }, EXIT_MS);
    }, HOLD_MS);

    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(swap);
    };
  }, [index]);

  const { lead, accent } = hero.headlines[index];
  const words = lead.split(" ");
  const markDelay = WORD_START + words.length * WORD_STAGGER + MARK_LEAD;

  return (
    <h1
      key={index}
      className={`type-hero-display mt-9 ${exiting ? "is-exiting" : ""}`}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 ? " " : null}
          <span className="hero-mask">
            <span className="hero-word" style={delay(WORD_START + i * WORD_STAGGER)}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}{" "}
      <span className="hero-mask">
        <span className="hero-word" style={delay(markDelay)}>
          <span className="hero-mark-wrap">
            <span
              className="hero-mark-base"
              style={delay(markDelay + WORD_DURATION)}
            >
              {accent}
            </span>
            <span
              className="hero-mark-fill"
              aria-hidden="true"
              data-text={accent}
              style={delay(markDelay + WORD_DURATION)}
            />
          </span>
        </span>
      </span>
    </h1>
  );
}
