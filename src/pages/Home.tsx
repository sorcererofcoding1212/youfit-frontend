import { DescHeader } from "../components/DescHeader";
import { Navbar } from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const setVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const lineVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
  exit: {
    y: -40,
    opacity: 0,
    transition: { duration: 0.8, ease: "easeIn" as const },
  },
};

const HomePage = () => {
  const descSets = [
    [
      { text: "Track Workouts", isColored: false },
      { text: "Build Strength", isColored: true },
      { text: "Stay Consistent", isColored: false },
    ],
    [
      { text: "Log Progress", isColored: false },
      { text: "Stay Motivated", isColored: true },
      { text: "Reach Goals", isColored: false },
    ],
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % descSets.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [descSets.length]);

  return (
    <div className="min-h-screen pt-14 lg:pt-18">
      <Navbar />
      <div className="flex flex-col lg:flex-row px-3 lg:px-8 mt-8 lg:mt-12">
        <div className="w-full lg:w-[50%] flex flex-col items-center">
          <div className="min-h-36 lg:min-h-56">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={setVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-y-1 lg:gap-y-2 items-center will-change-opacity"
              >
                {descSets[index].map((t, i) => (
                  <motion.div key={i} variants={lineVariants}>
                    <DescHeader desc={t.text} isColored={t.isColored} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -120 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="mt-2 w-[90%] lg:w-[60%] text-[17.5px] will-change-transform lg:text-lg ubuntu-medium leading-5.5 lg:leading-6 text-center opacity-75"
          >
            Plan your workouts, stay consistent, and see your progress. YouFit
            is the free fitness tracker built to keep you right on track.
          </motion.div>
        </div>
        <div className="w-full mt-10 lg:mt-0 lg:w-[50%] flex flex-col items-center">
          <img src="/home.png" alt="Home" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
