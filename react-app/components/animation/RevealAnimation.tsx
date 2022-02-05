import { motion } from "framer-motion";

interface Props {
  rotate: number;
  y: number;
  duration: number;
  children: JSX.Element;
}

const RevealAnimation = ({ children, rotate, y, duration }: Props) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="origin-left"
        initial={{ rotate: `${rotate}deg`, y: `${y}px`, opacity: 0 }}
        animate={{ rotate: "0deg", y: "0px", opacity: 1 }}
        transition={{ ease: "easeInOut", duration }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealAnimation;
