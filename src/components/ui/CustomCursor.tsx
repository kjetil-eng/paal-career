"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

const FINE_POINTER_QUERY = "(pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(FINE_POINTER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}
function getFinePointerServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 28, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 400, damping: 28, mass: 0.2 });
  const [hovering, setHovering] = useState(false);
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, [data-cursor='hover']")) {
        setHovering(true);
      }
    };
    const onOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, [data-cursor='hover']")) {
        setHovering(false);
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ translateX: springX, translateY: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[200] -ml-[6px] -mt-[6px]"
    >
      <motion.div
        animate={{
          scale: hovering ? 3.2 : 1,
          opacity: hovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="h-3 w-3 rounded-full bg-warm-gold"
      />
    </motion.div>
  );
}
