import { motion } from "framer-motion";

interface Props {
  children: JSX.Element;
  initialY: number;
  delay: number;
  duration: number;
}

const LoadAnimation = ({ children, initialY, delay, duration }: Props) => {
  const initial = { y: `${initialY}px`, opacity: 0 };
  const animate = { y: "0px", opacity: 1 };
  const transition = { duration, ease: "easeOut", delay };

  return (
    <motion.div initial={initial} animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
};

export default LoadAnimation;
