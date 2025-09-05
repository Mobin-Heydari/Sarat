'use client';

import { motion } from 'framer-motion';
import { sectionMotion } from '@/motion/storyMotion';

export default function StoryDescription({ text }: { text: string }) {
  return (
    <motion.section {...sectionMotion} className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark">
        متن استوری
      </h2>
      <div
        className="text-main-text-light dark:text-main-text-dark text-lg leading-loose tracking-wide space-y-4 bg-base-light/80 dark:bg-base-dark/80 backdrop-blur-md rounded-2xl p-6 shadow-inner"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </motion.section>
  );
}
