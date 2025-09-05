'use client';

import { motion } from 'framer-motion';
import { Story } from '@/types/stories';
import { sectionMotion } from '@/motion/storyMotion';

export default function StoryBanner({ story }: { story: Story }) {
  return (
    <motion.div {...sectionMotion} className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
      <img
        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${story.poster}`}
        alt={story.title}
        className="w-full h-full object-cover blur-sm brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute z-10 inset-0 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl font-extrabold text-highlight-text-light dark:text-highlight-text-dark">
          {story.title}
        </h1>
        <p className="mt-4 text-lg text-main-text-light dark:text-main-text-dark max-w-xl">
          استوری برتر از مجموعه‌ی صراط
        </p>
      </div>
    </motion.div>
  );
}
