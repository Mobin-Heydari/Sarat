'use client';

import { motion } from 'framer-motion';

export default function ClipartText({ html }: { html: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto py-10 px-4"
    >
      <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark">
        متن نماهنگ
      </h2>
      <div
        className="text-main-text-light dark:text-main-text-dark text-lg leading-loose tracking-wide space-y-4 bg-base-light/80 dark:bg-base-dark/80 backdrop-blur-md rounded-2xl p-6 shadow-inner"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </motion.section>
  );
}
