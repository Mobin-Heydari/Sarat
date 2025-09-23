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
