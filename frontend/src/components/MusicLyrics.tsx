'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function MusicLyrics({ title, html }: { title: string; html: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1],
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative w-full flex flex-col items-center gap-10 px-4 md:px-20 py-16"
    >
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-selected-light dark:bg-selected-dark blur-3xl opacity-20 rounded-full pointer-events-none z-0" />

      {/* Title */}
      <motion.h2
        variants={childVariants}
        className="relative z-10 text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark hover:scale-105 transition-transform duration-300"
      >
        متن صوت {title}
      </motion.h2>

      {/* Lyrics Container */}
      <motion.div
        variants={childVariants}
        className="relative z-10 w-full max-w-7xl bg-base-light/80 dark:bg-base-dark/80 backdrop-blur-md rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      >
        <div
          className="text-main-text-light dark:text-main-text-dark text-xl md:text-2xl leading-loose tracking-wide space-y-6 hover:scale-[1.01] transition-transform duration-300"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </motion.div>
    </motion.section>
  );
}
