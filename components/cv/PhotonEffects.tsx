"use client";

import { useEffect } from "react";

export function PhotonEffects() {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      document.body.classList.remove("is-preload");
    }, 100);

    const handleScrollyClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a.scrolly") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;

      event.preventDefault();
      const section = document.querySelector(href);
      section?.scrollIntoView({ behavior: "smooth" });
    };

    document.addEventListener("click", handleScrollyClick);

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("click", handleScrollyClick);
    };
  }, []);

  return null;
}
