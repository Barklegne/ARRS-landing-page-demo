"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, UserPlus, X } from "lucide-react";
import { AppleIcon, GoogleIcon, MicrosoftIcon } from "@/components/ui/BrandIcon";
import { hero, register } from "@/lib/content";

const field =
  "h-[46px] w-full rounded-xl border-[0.5px] border-paper/12 bg-paper/[0.06] pl-11 pr-4 text-[14px] text-paper transition-colors duration-150 focus:border-blue focus:bg-paper/[0.09] focus:outline-none";

const leadingIcon = "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-on-dark/70";

const brand = { google: GoogleIcon, apple: AppleIcon, microsoft: MicrosoftIcon };

// Native <dialog>: showModal() supplies the focus trap, Escape-to-close,
// background inertness and focus restoration without a UI-kit dependency.
// The trigger stays a real link so the stub route still works without JS.
export function RegisterDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <Link
        href={hero.secondaryCta.href}
        onClick={(event) => {
          event.preventDefault();
          setSubmitted(false);
          ref.current?.showModal();
        }}
        className="cta-glass inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-[0.9375rem] font-medium transition-colors duration-150 hover:border-paper/40"
      >
        {hero.secondaryCta.label}
      </Link>

      <dialog
        ref={ref}
        aria-labelledby="register-heading"
        onClick={(event) => {
          if (event.target === ref.current) ref.current?.close();
        }}
        className="m-auto w-[min(23.5rem,calc(100vw-1.5rem))] rounded-3xl border-[0.5px] border-paper/12 bg-transparent p-0 text-paper shadow-[0_50px_110px_-35px_rgb(0_0_0/0.95)] backdrop:bg-ink/80 backdrop:backdrop-blur-md"
      >
        <div className="relative flex flex-col rounded-3xl bg-gradient-to-b from-ink-raised to-ink p-7">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={register.close}
            className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-full text-on-dark/70 transition-colors duration-150 hover:bg-paper/8 hover:text-paper"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </button>

          <span
            aria-hidden="true"
            className="mx-auto inline-flex size-12 items-center justify-center rounded-xl border-[0.5px] border-paper/15 bg-paper/8"
          >
            <UserPlus className="size-5 text-paper" strokeWidth={1.5} />
          </span>

          <h2
            id="register-heading"
            className="mt-5 text-center font-display text-[1.375rem] leading-tight tracking-[-0.02em]"
          >
            {register.heading}
          </h2>
          <p className="mx-auto mt-2.5 max-w-[34ch] text-center text-[14px] leading-relaxed text-on-dark">
            {register.body}
          </p>

          <form
            className="mt-7 flex flex-col gap-3.5"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="relative">
              <label htmlFor="register-email" className="sr-only">
                {register.emailLabel}
              </label>
              <Mail aria-hidden="true" className={leadingIcon} strokeWidth={1.5} />
              <input
                id="register-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={register.emailPlaceholder}
                className={field}
              />
            </div>

            <div>
              <div className="relative">
                <label htmlFor="register-password" className="sr-only">
                  {register.passwordLabel}
                </label>
                <Lock aria-hidden="true" className={leadingIcon} strokeWidth={1.5} />
                <input
                  id="register-password"
                  name="password"
                  type={revealed ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  aria-describedby="register-password-hint"
                  placeholder={register.passwordPlaceholder}
                  className={`${field} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setRevealed((v) => !v)}
                  aria-label={revealed ? register.hidePassword : register.showPassword}
                  aria-pressed={revealed}
                  className="absolute right-1 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-lg text-on-dark/70 transition-colors duration-150 hover:text-paper"
                >
                  {revealed ? (
                    <EyeOff aria-hidden="true" className="size-4" strokeWidth={1.5} />
                  ) : (
                    <Eye aria-hidden="true" className="size-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
              <p
                id="register-password-hint"
                className="mt-2 pr-1 text-right text-[12px] text-on-dark/80"
              >
                {register.passwordHint}
              </p>
            </div>

            <button
              type="submit"
              className="cta-primary mt-1 h-[46px] rounded-xl text-[14px] font-medium transition-[filter] duration-150 hover:brightness-[0.96]"
            >
              {register.submit}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <span aria-hidden="true" className="h-px flex-1 bg-paper/12" />
            <span className="text-[12px] text-on-dark/80">{register.divider}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-paper/12" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {register.social.map((provider) => {
              const Icon = brand[provider.id];
              return (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => setSubmitted(true)}
                  aria-label={provider.label}
                  className="inline-flex h-11 items-center justify-center rounded-xl border-[0.5px] border-paper/12 bg-paper/[0.06] transition-colors duration-150 hover:border-paper/30 hover:bg-paper/[0.1]"
                >
                  <Icon className="size-[18px]" />
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="mt-4 min-h-[16px] text-center text-[12px] text-on-dark">
            {submitted ? register.mockNote : ""}
          </p>

          <p className="mt-1 text-center text-[12px] leading-relaxed text-on-dark/80">
            {register.termsLead}{" "}
            <Link href="/terms" className="text-paper underline underline-offset-4">
              {register.termsLink}
            </Link>
            .
          </p>
        </div>
      </dialog>
    </>
  );
}
