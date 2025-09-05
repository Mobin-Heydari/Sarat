'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Eye, PlayCircle } from 'lucide-react';

type Story = {
  title: string;
  slug: string;
  poster: string;
  views: number;
  created_at_jalali: string;
  videos: {
    title: string;
    slug: string;
    video: string;
    created_at_jalali: string;
    updated_at_jalali: string;
  }[];
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export default function StoryCard({ story }: { story: Story }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-base-light dark:bg-base-dark rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group"
    >
      {/* Poster */}
      <Link
        href={`/stories/${story.slug}`}
        className="relative w-full aspect-video overflow-hidden"
        aria-label={`مشاهده داستان: ${story.title}`}
      >
        <motion.img
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${story.poster}`}
          alt={`پوستر ${story.title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <motion.div
          className="absolute bottom-3 left-4 z-20 text-lg font-bold text-highlight-text-light dark:text-highlight-text-dark drop-shadow"
        >
          {story.title}
        </motion.div>

        {/* Video Count Badge */}
        <motion.div
          className="absolute top-3 right-4 z-20 bg-primary-light dark:bg-primary-dark text-white text-xs px-3 py-1 rounded-full shadow-md"
        >
          {story.videos.length} ویدیو
        </motion.div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-4">
        <motion.div className="flex justify-between items-center text-sm text-main-text-light dark:text-main-text-dark">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-secondary-light dark:text-secondary-dark" />
            <span>{story.views} بازدید</span>
          </div>
          <span>{story.created_at_jalali}</span>
        </motion.div>

        <motion.div>
          <Link
            href={`/stories/${story.slug}`}
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-light dark:bg-primary-dark text-main-text-light dark:text-main-text-dark font-bold text-sm hover:scale-[1.05] hover:shadow-lg transition-all duration-300"
          >
            مشاهده داستان
            <motion.div
              whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
            >
              <PlayCircle size={18} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
