'use client';

import Link from 'next/link';
import { CalendarDays, Eye, Laugh } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

type FunnyCardProps = {
  slug: string;
  poster: string;
  title: string;
  createdAtJalalli: string;
  views: number;
};

const parentVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const childVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export default function FunnyCard({
  slug,
  poster,
  title,
  createdAtJalalli,
  views,
}: FunnyCardProps) {
  return (
    <motion.div
      variants={parentVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="relative group bg-base-light dark:bg-base-dark rounded-2xl shadow-lg overflow-hidden w-full h-full flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Poster Image */}
      <Link
        href={`/funny/${slug}`}
        className="block relative aspect-video w-full overflow-hidden"
        aria-label={`مشاهده محتوای خنده‌دار: ${title}`}
      >
        <motion.img
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
          alt={`پوستر: ${title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-4 px-4 py-5 relative z-20">
        {/* Title */}
        <motion.div variants={childVariant}>
          <Link
            href={`/funny/${slug}`}
            className="text-lg font-bold text-main-text-light dark:text-main-text-dark hover:text-highlight-text-light dark:hover:text-highlight-text-dark transition duration-300 line-clamp-2"
          >
            {title}
          </Link>
        </motion.div>

        {/* Meta Info */}
        <motion.div
          variants={childVariant}
          className="flex items-center justify-between gap-3 text-sm text-main-text-light dark:text-main-text-dark"
        >
            <div className='flex  justify-center gap-3 items-center'>
                <CalendarDays size={16} className="text-secondary-light dark:text-secondary-dark" />
                <span>{createdAtJalalli}</span>
            </div>
            <div className='flex  justify-center gap-3 items-center'>
                <Eye size={16} className="text-secondary-light dark:text-secondary-dark" />
                <span>{views} بازدید</span>
            </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={childVariant}>
          <Link
            href={`/funny/${slug}`}
            className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-light dark:bg-primary-dark text-main-text-light font-medium text-sm hover:scale-[1.05] hover:shadow-lg transition-all duration-300 group"
          >
            بخند باهاش
            <motion.div
              whileHover={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
            >
              <Laugh size={16} />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 pointer-events-none group-hover:ring-2 group-hover:ring-hover-light dark:group-hover:ring-hover-dark/30 rounded-2xl transition-all duration-300" />
    </motion.div>
  );
}
