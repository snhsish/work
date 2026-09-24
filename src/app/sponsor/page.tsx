"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SiGithub, SiBuymeacoffee } from "react-icons/si";
import { BsQrCodeScan } from "react-icons/bs";

const UPI_ID = "notsnhsish@okaxis";
const UPI_ID_ALT = "notsnhsish@okicici";
const UPI_NAME = "Snehasish Ray";
const UPI_PAY_STRING = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&cu=INR`;
const UPI_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(UPI_PAY_STRING)}`;

export default function SponsorPage() {
  const [upiOpen, setUpiOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const close = useCallback(() => setUpiOpen(false), []);

  useEffect(() => {
    if (!upiOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [upiOpen, close]);

  const copy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back
      </Link>

      <h1 className="font-serif text-2xl tracking-wide sm:text-3xl">Sponsor</h1>
      <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">
        If my work helped you, consider supporting it. Every bit helps.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://github.com/sponsors/snhsish"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3.5 text-sm font-medium transition-colors hover:border-[#24292f] hover:bg-[#24292f] hover:text-white"
          >
            <SiGithub className="h-4 w-4 shrink-0" />
            GitHub
          </a>

          <a
            href="https://buymeacoffee.com/snhsish"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3.5 text-sm font-medium transition-colors hover:border-[#ffdd00] hover:bg-[#ffdd00] hover:text-black"
          >
            <SiBuymeacoffee className="h-4 w-4 shrink-0" />
            Coffee
          </a>
        </div>

        <button
          type="button"
          onClick={() => setUpiOpen(true)}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3.5 text-sm font-medium transition-colors hover:border-[#3cb179] hover:bg-[#3cb179] hover:text-white"
        >
          <BsQrCodeScan className="h-4 w-4 shrink-0" />
          UPI
        </button>
      </div>

      {upiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="UPI QR"
        >
          <div
            className="w-full max-w-xs rounded-2xl bg-[var(--background)] p-6 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-medium">Scan with any UPI app</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={UPI_QR_SRC}
              alt="UPI QR code"
              width={220}
              height={220}
              className="mx-auto mt-4 h-55 w-55 rounded-lg border border-[var(--border)] bg-white"
            />
            <div className="mt-4 space-y-2">
              {[UPI_ID, UPI_ID_ALT].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => copy(id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm transition-colors hover:text-[var(--foreground)]"
                >
                  <span className="truncate font-mono text-[13px]">{id}</span>
                  <span className="shrink-0 text-xs text-[var(--muted)]">
                    {copied === id ? "Copied" : "Copy"}
                  </span>
                </button>
              ))}
            </div>
            <a
              href={UPI_PAY_STRING}
              className="mt-4 block rounded-lg bg-[var(--foreground)] px-3 py-2 text-sm font-medium text-[var(--background)]"
            >
              Open UPI app
            </a>
            <button
              type="button"
              onClick={close}
              className="mt-2 w-full cursor-pointer rounded-lg px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
