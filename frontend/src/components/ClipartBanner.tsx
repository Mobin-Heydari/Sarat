'use client';

import { motion } from 'framer-motion';
import { Clipart } from '@/types/clipart';

export default function ClipartBanner({ clipart }: { clipart: Clipart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[400px] overflow-hidden shadow-xl"
    >
      <img
        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${clipart.poster}`}
        alt={clipart.title}
        className="w-full h-full object-cover blur-sm brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute z-10 inset-0 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl font-extrabold text-highlight-text-light dark:text-highlight-text-dark">
          {clipart.title}
        </h1>
        <p className="mt-4 text-lg text-main-text-light dark:text-main-text-dark max-w-xl">
          {clipart.description}
        </p>
      </div>
    </motion.div>
  );
}
