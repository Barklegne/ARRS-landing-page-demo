"use client";

// Advances to the next section rather than jumping a fixed distance, and offsets
// for the sticky header so the target heading is not hidden under it.
export function ScrollCue() {
  const goToNextSection = () => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section, footer"),
    );
    const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
    const current = window.scrollY;

    const next = sections
      .map((section) => section.getBoundingClientRect().top + current)
      .find((top) => top - headerHeight > current + 8);

    window.scrollTo({
      top: next === undefined ? document.body.scrollHeight : next - headerHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={goToNextSection}
      aria-label="Scroll to the next section"
      className="scroll-cue group inline-flex cursor-pointer items-center justify-center rounded-full border-[0.5px] border-transparent px-3 py-2 transition-colors duration-200 hover:border-paper/15 hover:bg-paper/[0.06]"
    >
      <span
        aria-hidden="true"
        className="relative block h-10 w-[24px] rounded-full border-[1.5px] border-on-dark/40 transition-colors duration-200 group-hover:border-paper/75"
      >
        <span className="scroll-dot absolute left-1/2 top-[7px] block h-[6px] w-[2px] rounded-full bg-on-dark transition-colors duration-200 group-hover:bg-paper" />
      </span>
    </button>
  );
}
