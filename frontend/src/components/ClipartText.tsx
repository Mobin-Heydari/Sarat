'use client';

import { motion } from 'framer-motion';

export default function ClipartText({ html }: { html: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-labelledby="clipart-text-title"
      className="max-w-5xl mx-auto px-6 py-12"
    >
      {/* Section Title */}
      <h2
        id="clipart-text-title"
        className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark"
      >
        متن کامل نماهنگ
      </h2>

      {/* Text Content */}
      <div
        className="prose prose-lg prose-slate dark:prose-invert max-w-none leading-loose tracking-wide bg-base-light/80 dark:bg-base-dark/80 backdrop-blur-md rounded-3xl p-8 shadow-inner"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </motion.section>
  );
}
