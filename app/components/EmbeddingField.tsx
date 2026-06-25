"use client";

import { useEffect, useRef } from "react";

/**
 * Elemento firma del sitio: un campo de "embeddings" — una nube de vectores
 * derivando en el espacio latente, con enlaces que aparecen entre los más cercanos.
 * Es la metáfora del buscador semántico / embeddings que construye Nico.
 * Canvas puro, sin imágenes externas. Respeta prefers-reduced-motion.
 */
type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  coral: boolean;
};

const CYAN = "8, 145, 178";
const CORAL = "240, 82, 31";

export default function EmbeddingField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Puntero en coordenadas del canvas (-1 = fuera). El wrapper puede tener
    // pointer-events:none, así que escuchamos en window y proyectamos.
    const pointer = { x: -1, y: -1, active: false };
    const INFLUENCE = 175; // radio de atracción (px)

    function build() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(
        Math.min(90, Math.max(34, (width * height) / 12000))
      );
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 1,
        coral: i % 9 === 0, // unos pocos vectores coral
      }));
    }

    const LINK = 118;

    function frame() {
      ctx!.clearRect(0, 0, width, height);

      // enlaces (similitud entre vectores cercanos)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const alpha = (1 - dist / LINK) * 0.6;
            ctx!.strokeStyle = `rgba(${CYAN}, ${alpha * 0.55})`;
            ctx!.lineWidth = 0.7;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // nodos
      for (const n of nodes) {
        // Atracción sutil hacia el puntero (los vectores "siguen" el cursor)
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < INFLUENCE) {
            const pull = (1 - dist / INFLUENCE) * 0.26;
            n.vx += (dx / dist) * pull;
            n.vy += (dy / dist) * pull;
          }
        }

        const near = pointer.active && Math.hypot(pointer.x - n.x, pointer.y - n.y) < INFLUENCE;
        const color = n.coral ? CORAL : CYAN;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, near ? n.r * 1.5 : n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color}, 0.92)`;
        ctx!.shadowColor = `rgba(${color}, 0.5)`;
        ctx!.shadowBlur = near ? 8 : 3;
        ctx!.fill();
        ctx!.shadowBlur = 0;

        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          // fricción: evita que la atracción acelere sin freno y vuelve a la deriva
          n.vx *= 0.94;
          n.vy *= 0.94;
          // deriva base mínima para que nunca quede totalmente quieto
          n.vx += (Math.random() - 0.5) * 0.02;
          n.vy += (Math.random() - 0.5) * 0.02;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
        }
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    }

    build();
    frame();

    const onResize = () => {
      build();
      if (reduce) frame();
    };
    window.addEventListener("resize", onResize);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointer.x = x;
      pointer.y = y;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    if (!reduce) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-full" aria-hidden="true">
      <canvas ref={ref} className="relative w-full h-full" />
    </div>
  );
}
