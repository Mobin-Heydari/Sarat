'use client';

import { motion, Variants } from 'framer-motion';
import MusicCard from './MusicCard';
import { Music } from '@/types/music';

const containerVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function MusicSection({ items }: { items: Music[] }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariant}
      className="flex flex-col gap-12 mx-auto w-full"
    >
      {/* Cards */}
      {items.length === 0 ? (
        <p className="text-center text-lg text-error-light dark:text-error-text-dark">
          هیچ صوتی یافت نشد.
        </p>
      ) : (
        <motion.div
          variants={containerVariant}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8"
        >
          {items.map((item) => (
            <motion.div key={item.slug} variants={cardVariant}>
              <MusicCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
