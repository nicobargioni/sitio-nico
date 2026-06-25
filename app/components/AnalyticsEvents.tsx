"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tracking de eventos GA4 por delegación: un único listener global lee el href
 * del enlace clickeado y dispara el evento correspondiente. Así no hace falta
 * tocar cada botón (que además son server components).
 *
 * Eventos:
 *  - llm_consult { assistant: gemini|chatgpt }  → botones "Consultar en…"
 *  - contact_click                              → mailto (Contactame / escribime)
 *  - colab_open { notebook }                    → cajas de Colab
 *  - share { method: linkedin|x }               → botones de compartir
 *  - whatsapp_click                             → (si se agrega WhatsApp)
 *
 * "Qué soluciones se ven más" ya lo da GA4 con el page_view de cada /soluciones/<slug>.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    const track = (name: string, params: Record<string, unknown>) => {
      if (typeof window.gtag === "function") window.gtag("event", name, params);
    };

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href) return;
      const page_path = window.location.pathname;

      if (href.includes("chatgpt.com")) {
        track("llm_consult", { assistant: "chatgpt", page_path });
      } else if (href.includes("google.com/search") && href.includes("udm=50")) {
        track("llm_consult", { assistant: "gemini", page_path });
      } else if (href.startsWith("mailto:")) {
        track("contact_click", { page_path });
      } else if (href.includes("colab.research.google.com")) {
        const notebook =
          href.split("/blob/main/")[1]?.replace(/\.ipynb.*$/, "") || href;
        track("colab_open", { notebook, page_path });
      } else if (href.includes("linkedin.com/sharing")) {
        track("share", { method: "linkedin", page_path });
      } else if (
        href.includes("x.com/intent") ||
        href.includes("twitter.com/intent")
      ) {
        track("share", { method: "x", page_path });
      } else if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        track("whatsapp_click", { page_path });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
