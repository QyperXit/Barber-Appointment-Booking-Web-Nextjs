"use client";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100vw" },
};

const pageTransition = {
  //   type: "spring",
  //   stiffness: 100,
  //   damping: 20,
  duration: 1,
};

const Template = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        // variants={pageVariants}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        variants={{
          initialState: {
            opacity: 0,
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            clipPath: "inset(0 50% 0 50%)",
          },
          animateState: {
            opacity: 1,
            clipPath: "inset(0 0 0 0)",

            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState: {
            clipPath: "inset(0 49% 0 49%)",

            // clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
        }}
        transition={{ duration: 0.75 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
