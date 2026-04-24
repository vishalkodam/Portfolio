import { motion, useReducedMotion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
