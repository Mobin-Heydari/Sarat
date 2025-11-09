'use client';
import Image from 'next/image';

import { CalendarDays, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Music } from '@/types/music';

export default function MusicHeroBanner({ data }: { data: Music }) {
  console.log(`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.poster}`)
  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl">
      {/* Background Poster */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.poster}`}
          alt={`پوستر ${data.title}`}
          className="w-full h-full object-cover blur-sm brightness-75"
          width={500}
          height={500}
        />
      </motion.div>

      {/* Overlay Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
        className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 md:px-12"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark"
        >
          {data.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-base md:text-lg max-w-2xl text-main-text-light dark:text-main-text-dark leading-relaxed"
        >
          {data.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-main-text-light dark:text-main-text-dark"
        >
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>{data.created_at_jalali}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={18} />
            <span>{data.views} بازدید</span>
          </div>
          <a
            href={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.music}`}
            download
            className="px-4 py-2 rounded-full bg-success-light dark:bg-success-dark text-white font-semibold hover:scale-105 transition"
          >
            دانلود صوت
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
