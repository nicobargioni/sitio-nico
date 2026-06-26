"use client";

import { useEffect } from "react";

/** Oculta el header/footer globales mientras se ve el preview de restyle. */
export default function HideChrome() {
  useEffect(() => {
    document.body.classList.add("restyle-bare");
    return () => document.body.classList.remove("restyle-bare");
  }, []);
  return null;
}
