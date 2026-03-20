import { useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  animType: number;
}

export default function ParticleField({ count = 50 }: { count?: number }) {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.5 + 0.15,
      animType: Math.floor(Math.random() * 4),
    }));
  }, [count]);

  const getAnimation = (p: Particle) => {
    switch (p.animType) {
      case 0:
        return {
          y: [0, -(Math.random() * 40 + 20), 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [p.opacity, p.opacity * 1.8, p.opacity],
        };
      case 1:
        return {
          x: [0, Math.random() * 30 - 15, 0],
          y: [0, Math.random() * 15 - 7, 0],
          scale: [1, 1.5, 1],
          opacity: [p.opacity, p.opacity * 0.5, p.opacity],
        };
      case 2:
        return {
          y: [0, -(Math.random() * 60 + 20)],
          opacity: [p.opacity, 0],
          scale: [1, 0.3],
        };
      default:
        return {
          x: [0, Math.random() * 50 - 25, 0],
          y: [0, -(Math.random() * 50 + 10), 0],
          opacity: [0, p.opacity, 0],
        };
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={getAnimation(p)}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: p.animType === 2 ? "loop" : "mirror",
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
