"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// An image that opens at full size in an overlay when clicked. Large images
// can be scrolled in the overlay so small detail stays readable.
export function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in"
        aria-label={`View full size: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full rounded-lg border border-line"
        />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-50 cursor-zoom-out overflow-auto bg-ink/95"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              autoFocus
              className="fixed right-4 top-4 z-10 rounded-full bg-paper px-4 py-2 font-mono text-sm text-ink shadow-lg hover:bg-line"
            >
              Close ✕
            </button>
            <div className="flex min-h-full min-w-full w-max items-center justify-center p-6 sm:p-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-w-none rounded-lg bg-paper"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
