'use client';

import Link from 'next/link';
import { CalendarDays, Eye, PlayCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Show } from '@/types/show';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.42, 0, 0.58, 1],
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

type ShowCardProps = Pick<Show, 'slug' | 'title' | 'description' | 'poster' | 'views' | 'created_at_jalali'>;



export default function ShowCard({
  slug,
  title,
  description,
  poster,
  views,
  created_at_jalali,
}: Show) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-base-light dark:bg-base-dark rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group mb-12"
    >
      <Link
        href={`/shows/${slug}`}
        className="relative w-full aspect-video overflow-hidden"
        aria-label={`مشاهده نمایش: ${title}`}
      >
        <motion.img
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
          alt={`پوستر ${title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <motion.div
          variants={itemVariants}
          className="absolute bottom-3 left-4 z-20 text-lg font-bold text-highlight-text-light dark:text-highlight-text-dark drop-shadow"
        >
          {title}
        </motion.div>
      </Link>

      <div className="p-4 flex flex-col gap-4">
        <motion.p
          variants={itemVariants}
          className="text-sm text-main-text-light dark:text-main-text-dark line-clamp-2"
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center text-sm text-main-text-light dark:text-main-text-dark"
        >
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-secondary-light dark:text-secondary-dark" />
            <span>{created_at_jalali}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-secondary-light dark:text-secondary-dark" />
            <span>{views} بازدید</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link
            href={`/shows/${slug}`}
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-light dark:bg-primary-dark text-main-text-light dark:text-main-text-dark font-bold text-sm hover:scale-[1.05] hover:shadow-lg transition-all duration-300"
          >
            مشاهده نمایش
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
