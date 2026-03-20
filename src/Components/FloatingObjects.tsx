import { motion } from "framer-motion";

/* ─── GLASS SPHERE ─── */
export function GlassSphere({
  size = 80,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 14,
  blur = 0,
}: {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  duration?: number;
  blur?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background:
          "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), rgba(255,255,255,0.03) 60%, transparent 80%)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "inset 0 0 30px rgba(255,255,255,0.05), 0 0 20px rgba(255,255,255,0.04)",
        filter: blur ? `blur(${blur}px)` : undefined,
        backdropFilter: "blur(4px)",
      }}
      animate={{
        y: [0, -25, 5, -15, 0],
        x: [0, 10, -8, 12, 0],
        scale: [1, 1.05, 0.97, 1.03, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── WIREFRAME CUBE ─── */
export function WireframeCube({
  size = 60,
  top,
  left,
  right,
  bottom,
  duration = 20,
  delay = 0,
}: {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  delay?: number;
}) {
  const half = size / 2;
  const face = "absolute border border-white/20";
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        perspective: 400,
      }}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{ duration: duration * 0.6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      >
        <div className={face} style={{ width: size, height: size, transform: `translateZ(${half}px)` }} />
        <div className={face} style={{ width: size, height: size, transform: `translateZ(-${half}px) rotateY(180deg)` }} />
        <div className={face} style={{ width: size, height: size, transform: `translateX(-${half}px) rotateY(-90deg)` }} />
        <div className={face} style={{ width: size, height: size, transform: `translateX(${half}px) rotateY(90deg)` }} />
        <div className={face} style={{ width: size, height: size, transform: `translateY(-${half}px) rotateX(90deg)` }} />
        <div className={face} style={{ width: size, height: size, transform: `translateY(${half}px) rotateX(-90deg)` }} />
      </motion.div>
    </motion.div>
  );
}

/* ─── GLOWING RING ─── */
export function GlowRing({
  size = 120,
  top,
  left,
  right,
  bottom,
  duration = 12,
  delay = 0,
  tiltX = 65,
}: {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  delay?: number;
  tiltX?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        border: "1.5px solid rgba(255,255,255,0.25)",
        boxShadow: "0 0 25px 3px rgba(255,255,255,0.06), inset 0 0 25px 3px rgba(255,255,255,0.03)",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: [tiltX, tiltX],
        rotateZ: [0, 360],
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{
        rotateZ: { duration, repeat: Infinity, ease: "linear", delay },
        scale: { duration: duration * 0.7, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: duration * 0.5, repeat: Infinity, ease: "easeInOut", delay },
        rotateX: { duration: 0 },
      }}
    />
  );
}

/* ─── FLOATING SHARD ─── */
export function FloatingShard({
  width = 80,
  height = 12,
  top,
  left,
  right,
  bottom,
  rotate = 45,
  duration = 10,
  delay = 0,
}: {
  width?: number;
  height?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        width,
        height,
        top,
        left,
        right,
        bottom,
        background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05))",
        transform: `rotate(${rotate}deg)`,
      }}
      animate={{
        y: [0, -20, 5, -10, 0],
        x: [0, 8, -5, 10, 0],
        opacity: [0.5, 0.9, 0.4, 0.7, 0.5],
        rotate: [rotate, rotate + 8, rotate - 5, rotate + 3, rotate],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── DRIFTING PANEL ─── */
export function DriftingPanel({
  width = 140,
  height = 90,
  top,
  left,
  right,
  bottom,
  duration = 16,
  delay = 0,
}: {
  width?: number;
  height?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute glass"
      style={{
        width,
        height,
        top,
        left,
        right,
        bottom,
      }}
      animate={{
        y: [0, -18, 8, -12, 0],
        x: [0, 12, -6, 8, 0],
        rotateX: [0, 5, -3, 4, 0],
        rotateY: [0, -8, 6, -4, 0],
        opacity: [0.4, 0.7, 0.35, 0.6, 0.4],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── ORBIT DOT (follows a circular path) ─── */
export function OrbitDot({
  radius = 80,
  dotSize = 6,
  top,
  left,
  right,
  bottom,
  duration = 10,
  delay = 0,
  clockwise = true,
}: {
  radius?: number;
  dotSize?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  delay?: number;
  clockwise?: boolean;
}) {
  const keyframes = Array.from({ length: 37 }, (_, i) => {
    const angle = (i / 36) * Math.PI * 2 * (clockwise ? 1 : -1);
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  });

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ top, left, right, bottom, width: 0, height: 0 }}
    >
      <motion.div
        className="rounded-full bg-white/60"
        style={{ width: dotSize, height: dotSize, marginLeft: -dotSize / 2, marginTop: -dotSize / 2 }}
        animate={{
          x: keyframes.map((k) => k.x),
          y: keyframes.map((k) => k.y),
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    </motion.div>
  );
}

/* ─── WIREFRAME DIAMOND (octahedron-like) ─── */
export function WireframeDiamond({
  size = 50,
  top,
  left,
  right,
  bottom,
  duration = 18,
  delay = 0,
}: {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ top, left, right, bottom, width: size, height: size }}
      animate={{
        y: [0, -15, 0],
      }}
      transition={{ duration: duration * 0.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: [0, 360],
          rotateX: [20, 20],
        }}
        transition={{
          rotateY: { duration, repeat: Infinity, ease: "linear", delay },
          rotateX: { duration: 0 },
        }}
      >
        <div
          style={{
            position: "absolute",
            width: size,
            height: size,
            border: "1px solid rgba(255,255,255,0.2)",
            transform: "rotateX(45deg) rotateZ(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: size,
            height: size,
            border: "1px solid rgba(255,255,255,0.15)",
            transform: "rotateX(45deg) rotateZ(45deg) rotateY(90deg)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── FLOATING LINE ─── */
export function FloatingLine({
  width = 120,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  duration = 8,
  delay = 0,
}: {
  width?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        top,
        left,
        right,
        bottom,
        width,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        transform: `rotate(${rotate}deg)`,
      }}
      animate={{
        opacity: [0.2, 0.8, 0.2],
        scaleX: [0.6, 1, 0.6],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── DEPTH SPHERE (scales in and out to simulate Z movement) ─── */
export function DepthSphere({
  size = 40,
  top,
  left,
  right,
  bottom,
  duration = 10,
  delay = 0,
}: {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full border border-white/15"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12), transparent 70%)",
      }}
      animate={{
        scale: [0.6, 1.3, 0.6],
        opacity: [0.2, 0.7, 0.2],
        filter: ["blur(2px)", "blur(0px)", "blur(2px)"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── HEXAGON WIREFRAME ─── */
export function FloatingHexagon({
  size = 70,
  top,
  left,
  right,
  bottom,
  duration = 14,
  delay = 0,
}: {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ top, left, right, bottom }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 60, 0],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="50,3 93,25 93,75 50,97 7,75 7,25"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="none"
        />
        <polygon
          points="50,18 78,33 78,67 50,82 22,67 22,33"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

/* ─── CROSS / PLUS SHAPE ─── */
export function FloatingCross({
  size = 30,
  top,
  left,
  right,
  bottom,
  duration = 12,
  delay = 0,
}: {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ top, left, right, bottom, width: size, height: size }}
      animate={{
        rotate: [0, 90, 180, 270, 360],
        y: [0, -12, 0],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className="absolute bg-white/25"
        style={{ width: size, height: 1, top: "50%", left: 0, marginTop: -0.5 }}
      />
      <div
        className="absolute bg-white/25"
        style={{ width: 1, height: size, left: "50%", top: 0, marginLeft: -0.5 }}
      />
    </motion.div>
  );
}
