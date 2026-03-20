import { motion, useScroll, useSpring, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import ParticleField from "./components/ParticleField";
import SectionHeading from "./components/SectionHeading";
import { RevealHeading } from "./components/TextReveal";
import {
  GlassSphere,
  WireframeCube,
  GlowRing,
  FloatingShard,
  DriftingPanel,
  OrbitDot,
  WireframeDiamond,
  FloatingLine,
  DepthSphere,
  FloatingHexagon,
  FloatingCross,
} from "./components/FloatingObjects";

/* ─── DATA ─── */
const services = [
  {
    name: "Video Editing",
    desc: "Cinematic sequences, color grading, and post-production workflows built for visual storytelling at the highest level.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polygon points="10,8 16,12 10,16" fill="currentColor" opacity="0.3" stroke="none" />
        <polygon points="10,8 16,12 10,16" />
      </svg>
    ),
  },
  {
    name: "Graphic Designing",
    desc: "Visual systems, brand identities, editorial layouts, and print-ready assets crafted with precision and atmosphere.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "UI/UX Designing",
    desc: "Interface architecture, interaction systems, and user experience flows engineered for clarity and elegance.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="9" x2="9" y2="21" />
      </svg>
    ),
  },
];

const works = [
  { title: "Monochrome Identity System", category: "Branding" },
  { title: "Cinematic Product Film", category: "Video" },
  { title: "Immersive Web Experience", category: "UI/UX" },
  { title: "Editorial Motion Package", category: "Motion" },
  { title: "Interface Rebrand Concept", category: "UI/UX" },
  { title: "Experimental Visual Loop", category: "Video" },
];

const trustPoints = [
  {
    title: "Clear Communication",
    desc: "Milestone updates and feedback loops that keep every stage transparent.",
  },
  {
    title: "Refined Execution",
    desc: "Every output is polished through multiple rounds of review and iteration.",
  },
  {
    title: "Consistent Delivery",
    desc: "Structured timelines that maintain momentum from concept to completion.",
  },
];

/* ─── MOUSE PARALLAX HOOK ─── */
function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      x.set(nx * strength);
      y.set(ny * strength);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [strength, x, y]);

  return { x, y };
}

/* ─── APP ─── */
export default function App() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const heroY = useTransform(smoothScroll, [0, 0.3], [0, -120]);
  const heroOpacity = useTransform(smoothScroll, [0, 0.25], [1, 0]);
  const parallax1 = useTransform(smoothScroll, [0, 1], [0, -200]);
  const parallax2 = useTransform(smoothScroll, [0, 1], [0, -100]);
  const parallax3 = useTransform(smoothScroll, [0, 1], [0, -300]);

  const mouse = useMouseParallax(15);
  const mouseStrong = useMouseParallax(30);
  const mouseWeak = useMouseParallax(8);

  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const spotlightBg = useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.03) 0%, transparent 50%)`;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      spotlightX.set((e.clientX / window.innerWidth) * 100);
      spotlightY.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [spotlightX, spotlightY]);

  /* Scroll progress bar */
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  /* Nav visibility */
  const [navSolid, setNavSolid] = useState(false);
  useEffect(() => {
    const handler = () => setNavSolid(window.scrollY > 100);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* Cursor */}
      <Cursor />

      {/* Noise overlay */}
      <div className="noise-overlay" />
      <div className="scanline" />

      {/* Spotlight follow */}
      <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background: spotlightBg }} />

      {/* Particles */}
      <ParticleField count={45} />

      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]" />
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 z-50 h-[2px] origin-left bg-gradient-to-r from-white/80 to-white/30"
        style={{ scaleX, width: "100%" }}
      />

      {/* ──────────── NAV ──────────── */}
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-500 ${
          navSolid ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <motion.a
            href="#top"
            className="text-sm font-medium tracking-[0.35em] text-white uppercase"
            data-hover
            whileHover={{ opacity: 0.7 }}
          >
            Gloomrift
          </motion.a>
          <div className="hidden gap-10 text-[11px] tracking-[0.3em] text-zinc-400 uppercase md:flex">
            {["services", "work", "about", "contact"].map((s) => (
              <motion.a
                key={s}
                href={`#${s}`}
                data-hover
                whileHover={{ color: "#fff", y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {s}
              </motion.a>
            ))}
          </div>
          <motion.a
            href="#contact"
            data-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hidden border border-white/20 px-5 py-2 text-[10px] tracking-[0.25em] text-white uppercase transition-colors hover:border-white/60 md:block"
          >
            Get in touch
          </motion.a>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        {/* ──────────── HERO ──────────── */}
        <section className="relative min-h-screen overflow-hidden px-6 pt-32 pb-20 md:px-12 md:pt-40 lg:pt-48">
          {/* Hero 3D floating objects — diverse animations */}
          <motion.div className="pointer-events-none absolute inset-0" style={{ y: parallax1 }}>
            <GlassSphere size={100} top="12%" left="8%" duration={16} delay={0} />
            <GlassSphere size={50} top="65%" right="12%" duration={12} delay={1.5} blur={1} />
            <GlassSphere size={30} top="80%" left="25%" duration={18} delay={3} />
          </motion.div>

          <motion.div className="pointer-events-none absolute inset-0" style={{ y: parallax2 }}>
            <WireframeCube size={55} top="20%" right="15%" duration={24} delay={0.5} />
            <WireframeCube size={35} top="70%" left="5%" duration={30} delay={2} />
            <WireframeDiamond size={45} top="35%" right="6%" duration={20} delay={1} />
          </motion.div>

          <motion.div className="pointer-events-none absolute inset-0" style={{ y: parallax3 }}>
            <GlowRing size={140} top="8%" right="25%" duration={18} tiltX={65} />
            <GlowRing size={80} top="60%" left="15%" duration={14} tiltX={70} delay={2} />
            <GlowRing size={50} top="45%" right="35%" duration={10} tiltX={55} delay={4} />
          </motion.div>

          <motion.div className="pointer-events-none absolute inset-0" style={{ x: mouse.x, y: mouse.y }}>
            <FloatingShard width={100} height={2} top="30%" left="3%" rotate={-25} duration={14} />
            <FloatingShard width={60} height={1.5} top="55%" right="8%" rotate={35} duration={11} delay={1.5} />
            <FloatingShard width={140} height={2} top="75%" left="40%" rotate={-10} duration={16} delay={3} />
            <FloatingShard width={80} height={1} top="18%" left="50%" rotate={60} duration={13} delay={0.8} />
          </motion.div>

          <motion.div className="pointer-events-none absolute inset-0" style={{ x: mouseWeak.x, y: mouseWeak.y }}>
            <DriftingPanel width={160} height={100} top="15%" right="18%" duration={20} />
            <DriftingPanel width={120} height={70} top="60%" left="8%" duration={18} delay={2.5} />
            <DriftingPanel width={90} height={55} top="40%" left="55%" duration={22} delay={5} />
          </motion.div>

          <motion.div className="pointer-events-none absolute inset-0" style={{ x: mouseStrong.x, y: mouseStrong.y }}>
            <OrbitDot radius={60} dotSize={4} top="25%" left="20%" duration={8} />
            <OrbitDot radius={40} dotSize={3} top="50%" right="20%" duration={12} delay={1} clockwise={false} />
            <OrbitDot radius={80} dotSize={5} top="15%" right="30%" duration={15} delay={2.5} />
          </motion.div>

          <div className="pointer-events-none absolute inset-0">
            <FloatingLine width={200} top="22%" left="5%" rotate={-5} duration={7} />
            <FloatingLine width={150} top="68%" right="10%" rotate={10} duration={9} delay={2} />
            <DepthSphere size={60} top="45%" left="75%" duration={11} delay={1} />
            <DepthSphere size={35} top="25%" left="45%" duration={14} delay={3} />
            <FloatingHexagon size={60} top="72%" right="25%" duration={16} />
            <FloatingHexagon size={40} top="10%" left="35%" duration={12} delay={2} />
            <FloatingCross size={25} top="55%" left="40%" duration={15} delay={1} />
            <FloatingCross size={18} top="30%" right="40%" duration={11} delay={3} />
          </div>

          {/* Hero content */}
          <motion.div
            className="relative mx-auto max-w-7xl"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="max-w-4xl space-y-10">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[11px] tracking-[0.5em] text-zinc-500 uppercase"
              >
                Creative Agency
              </motion.p>

              <RevealHeading
                text="GLOOMRIFT GRAPHICS"
                className="text-5xl leading-[0.9] font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
                delay={0.4}
              />

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-32 origin-left bg-gradient-to-r from-white/60 to-transparent md:w-48"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.2 }}
                className="max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
              >
                Cinematic visuals, elegant interfaces, and immersive digital direction shaped in monochrome precision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-wrap gap-5 pt-2"
              >
                <motion.a
                  href="#contact"
                  data-hover
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-white px-8 py-4 text-[12px] font-medium tracking-[0.25em] text-black uppercase"
                >
                  <motion.span
                    className="absolute inset-0 bg-zinc-200"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10">Start a Project</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.a>

                <motion.a
                  href="#work"
                  data-hover
                  whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.8)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 border border-zinc-700 px-8 py-4 text-[12px] tracking-[0.25em] text-zinc-300 uppercase transition-colors hover:text-white"
                >
                  View Portfolio
                </motion.a>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:bottom-8"
            >
              <span className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">Scroll</span>
              <motion.div
                className="h-10 w-[1px] bg-gradient-to-b from-white/40 to-transparent"
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ──────────── SPACER ──────────── */}
        <div className="h-24 md:h-40" />

        {/* ──────────── SERVICES ──────────── */}
        <section id="services" className="relative px-6 py-20 md:px-12 md:py-32">
          {/* Section floating objects */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <GlassSphere size={45} top="10%" right="10%" duration={14} delay={0.5} />
            <WireframeDiamond size={35} top="80%" left="5%" duration={18} delay={1} />
            <FloatingCross size={20} top="50%" right="5%" duration={13} />
            <GlowRing size={60} top="15%" left="8%" duration={12} tiltX={70} delay={2} />
          </div>

          <SectionHeading
            eyebrow="Services"
            title="Precision-crafted visual systems"
            description="Every engagement is built to feel cinematic in movement, clear in structure, and premium in finish."
          />

          <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.article
                key={service.name}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -12,
                  borderColor: "rgba(255,255,255,0.3)",
                  transition: { duration: 0.35 },
                }}
                className="group relative border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm md:p-10"
                data-hover
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06), transparent 60%)",
                  }}
                />

                <div className="relative z-10 space-y-6">
                  <motion.div
                    className="text-white/50 transition-colors duration-300 group-hover:text-white/90"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    {service.icon}
                  </motion.div>

                  <div className="h-px w-8 bg-white/10 transition-all duration-500 group-hover:w-16 group-hover:bg-white/30" />

                  <h3 className="text-xl font-medium tracking-wide text-white">{service.name}</h3>

                  <p className="text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                    {service.desc}
                  </p>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 h-4 w-4 border-l border-t border-white/0 transition-all duration-500 group-hover:border-white/30" />
                <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-white/0 transition-all duration-500 group-hover:border-white/30" />
              </motion.article>
            ))}
          </div>
        </section>

        {/* ──────────── SPACER ──────────── */}
        <div className="h-20 md:h-32" />

        {/* ──────────── WORK ──────────── */}
        <section id="work" className="relative px-6 py-20 md:px-12 md:py-32">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <FloatingHexagon size={50} top="5%" left="85%" duration={14} />
            <DepthSphere size={40} top="90%" left="10%" duration={12} delay={1} />
            <FloatingShard width={100} height={1.5} top="50%" right="5%" rotate={20} duration={10} delay={0.5} />
            <GlassSphere size={35} top="30%" left="3%" duration={16} delay={2} />
          </div>

          <SectionHeading
            eyebrow="Featured Work"
            title="Selected portfolio in stark light and shadow"
            description="A monochrome collection of visual systems, interfaces, and experimental pieces."
          />

          <div className="mx-auto mt-20 grid max-w-6xl gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {works.map((work, i) => (
              <motion.article
                key={work.title}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group space-y-5"
                data-hover
              >
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden border border-white/[0.06] bg-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* White placeholder image */}
                  <div className="absolute inset-0 bg-zinc-100" />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/60"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="text-[11px] tracking-[0.3em] text-white uppercase opacity-0 transition-all duration-300 group-hover:opacity-100"
                    >
                      View Project
                    </motion.span>
                  </motion.div>

                  {/* Border animation */}
                  <div className="absolute inset-0 border-2 border-white/0 transition-all duration-500 group-hover:border-white/40" />
                </motion.div>

                <div className="space-y-2">
                  <p className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase">{work.category}</p>
                  <h3 className="text-base font-medium tracking-wide text-zinc-200 transition-colors duration-300 group-hover:text-white">
                    {work.title}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ──────────── SPACER ──────────── */}
        <div className="h-20 md:h-32" />

        {/* ──────────── ABOUT ──────────── */}
        <section id="about" className="relative px-6 py-20 md:px-12 md:py-32">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <GlowRing size={100} top="20%" right="10%" duration={16} tiltX={60} />
            <WireframeCube size={40} top="70%" left="8%" duration={26} delay={1} />
            <FloatingLine width={180} top="40%" left="2%" rotate={-8} duration={9} delay={1.5} />
            <OrbitDot radius={50} dotSize={4} top="30%" right="20%" duration={10} delay={0.5} />
          </div>

          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <p className="text-[11px] tracking-[0.4em] text-zinc-500 uppercase">About</p>

              <h2 className="text-3xl leading-tight font-semibold md:text-5xl">
                Atmospheric, sharp, and deeply intentional.
              </h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px w-20 origin-left bg-white/30"
              />

              <p className="max-w-lg text-base leading-relaxed text-zinc-400">
                Gloomrift Graphics merges cinematic pacing with modern digital structure to build visual
                experiences that stay memorable long after the first interaction.
              </p>

              <p className="max-w-lg text-sm leading-relaxed text-zinc-500">
                We work across video, graphics, and interface design — blending atmosphere with function
                to create work that feels both striking and purposeful.
              </p>
            </motion.div>

            {/* About visual panel with layered 3D objects */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="relative h-[420px] overflow-hidden border border-white/[0.06] bg-white/[0.01] md:h-[480px]"
            >
              {/* Inner floating elements — all unique animations */}
              <GlassSphere size={90} top="10%" left="15%" duration={14} />
              <GlassSphere size={40} top="65%" right="20%" duration={18} delay={2} blur={1} />

              <WireframeCube size={50} top="50%" left="10%" duration={22} delay={1} />

              <GlowRing size={110} top="20%" right="15%" duration={15} tiltX={55} delay={0.5} />
              <GlowRing size={50} top="70%" left="40%" duration={11} tiltX={75} delay={3} />

              <FloatingShard width={120} height={2} top="35%" left="5%" rotate={-15} duration={12} delay={0.8} />
              <FloatingShard width={80} height={1.5} top="80%" right="10%" rotate={25} duration={10} delay={2.5} />

              <DriftingPanel width={100} height={65} top="45%" right="25%" duration={18} delay={1.5} />

              <OrbitDot radius={45} dotSize={3} top="30%" left="50%" duration={9} delay={0.3} />
              <OrbitDot radius={30} dotSize={2} top="60%" left="30%" duration={7} delay={1.8} clockwise={false} />

              <FloatingHexagon size={50} top="12%" right="30%" duration={14} delay={1} />
              <FloatingCross size={20} top="75%" left="20%" duration={12} delay={2} />

              <DepthSphere size={30} top="40%" left="60%" duration={10} delay={1.5} />

              <FloatingLine width={140} top="55%" left="15%" rotate={5} duration={8} delay={0.5} />
              <FloatingLine width={90} top="25%" right="20%" rotate={-12} duration={10} delay={3} />

              {/* Gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.04),transparent_50%)]" />
            </motion.div>
          </div>
        </section>

        {/* ──────────── SPACER ──────────── */}
        <div className="h-20 md:h-32" />

        {/* ──────────── TRUST ──────────── */}
        <section className="relative px-6 py-20 md:px-12 md:py-32">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <WireframeDiamond size={40} top="15%" right="8%" duration={16} />
            <GlassSphere size={30} top="80%" left="12%" duration={14} delay={1} />
            <FloatingCross size={22} top="50%" left="90%" duration={14} delay={2} />
          </div>

          <SectionHeading
            eyebrow="Trust"
            title="Collaboration built on clarity"
            description="A focused workflow that keeps momentum steady and outputs sharp from first draft to final delivery."
          />

          <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-3">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(255,255,255,0.15)",
                  transition: { duration: 0.3 },
                }}
                className="group border border-white/[0.06] bg-white/[0.015] p-8 md:p-10"
                data-hover
              >
                <motion.div
                  className="mb-6 flex h-10 w-10 items-center justify-center border border-white/10 text-sm text-zinc-500 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white"
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.div>

                <h3 className="mb-4 text-lg font-medium text-white">{point.title}</h3>

                <p className="text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────────── SPACER ──────────── */}
        <div className="h-20 md:h-32" />

        {/* ──────────── CONTACT ──────────── */}
        <section id="contact" className="relative px-6 py-20 md:px-12 md:py-32">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <GlowRing size={90} top="10%" left="10%" duration={14} tiltX={60} />
            <GlassSphere size={50} top="70%" right="8%" duration={16} delay={1} />
            <FloatingHexagon size={45} top="20%" right="15%" duration={12} delay={0.5} />
            <WireframeCube size={30} top="80%" left="20%" duration={22} delay={2} />
            <FloatingShard width={100} height={1.5} top="50%" left="5%" rotate={-15} duration={12} delay={1} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-4xl border border-white/[0.06] bg-white/[0.015] p-10 text-center backdrop-blur-sm md:p-16 lg:p-20"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]" />

            <div className="relative z-10 space-y-8">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[11px] tracking-[0.4em] text-zinc-500 uppercase"
              >
                Contact
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className="text-3xl leading-tight font-semibold md:text-5xl lg:text-6xl"
              >
                Let's create your next atmospheric visual experience.
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mx-auto h-px w-20 bg-white/20"
              />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col items-center gap-6 pt-4 md:flex-row md:justify-center md:gap-12"
              >
                <motion.a
                  href="mailto:Chakrabortybharswat@gmail.com"
                  data-hover
                  whileHover={{ y: -2 }}
                  className="group flex items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600 transition-colors group-hover:text-white">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="2,4 12,13 22,4" />
                  </svg>
                  Chakrabortybharswat@gmail.com
                </motion.a>

                <motion.span
                  whileHover={{ y: -2 }}
                  className="group flex items-center gap-3 text-sm text-zinc-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-600 transition-colors group-hover:text-white">
                    <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                  </svg>
                  maximo_y
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="pt-6"
              >
                <motion.a
                  href="mailto:Chakrabortybharswat@gmail.com"
                  data-hover
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-white px-10 py-4 text-[12px] font-medium tracking-[0.25em] text-black uppercase"
                >
                  <motion.span
                    className="absolute inset-0 bg-zinc-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10">Send a Message</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ──────────── SPACER ──────────── */}
        <div className="h-16 md:h-24" />
      </main>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="relative z-10 border-t border-white/[0.04] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <motion.p
              className="text-sm tracking-[0.35em] text-zinc-600 uppercase"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              Gloomrift Graphics
            </motion.p>

            <div className="flex gap-8 text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
              {["services", "work", "about", "contact"].map((s) => (
                <motion.a
                  key={s}
                  href={`#${s}`}
                  data-hover
                  whileHover={{ color: "#fff" }}
                  className="transition-colors"
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            className="mx-auto mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <p className="mt-8 text-center text-[10px] tracking-[0.2em] text-zinc-700 uppercase">
            Designed with precision
          </p>
        </div>
      </footer>
    </div>
  );
}
