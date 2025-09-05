'use client';

import { motion } from 'framer-motion';
import StoryCard from './StoryCard';

export default function StorySection({ stories }: { stories: any[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      className="relative w-full h-auto px-4 md:px-12 py-12 flex flex-col gap-10 bg-base-light dark:bg-base-dark rounded-3xl shadow-inner overflow-hidden"
    >
      {/* Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-selected-light dark:bg-selected-dark blur-3xl opacity-20 rounded-full pointer-events-none z-0" />

      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-secondary-dark"
      >
        نماهنگ‌های ما
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-right text-main-text-light dark:text-main-text-dark max-w-3xl mx-auto leading-relaxed px-4"
      >
        توضیحات مختصر و مفید درباره‌ی نماهنگ‌ها، هدف‌ها و محتوای ارائه‌شده.
      </motion.p>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {stories.map((item) => (
          <StoryCard key={item.slug} story={item} />
        ))}
      </motion.div>
    </motion.section>
  );
}
