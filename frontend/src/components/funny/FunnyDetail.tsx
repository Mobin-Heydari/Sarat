'use client';

import { Funny } from '@/types/funny';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FunnyContentSection from './FunnyContentSection';
import { Calendar, Eye } from 'lucide-react';

export default function FunnyDetail({ data }: { data: Funny }) {
  return (
    <article className="w-full max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Poster */}
      {data.poster && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="rounded-3xl overflow-hidden shadow-xl border border-base-light dark:border-base-dark"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.poster}`}
            alt={data.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      )}

      {/* Title */}
      {data.title && (
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-main-text-light dark:text-main-text-dark leading-tight tracking-tight"
        >
          {data.title}
        </motion.h1>
      )}

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg md:text-xl text-main-text-light dark:text-main-text-dark leading-relaxed tracking-wide"
      >
        {data.description || 'این شوخی هنوز توضیحی نداره، ولی خنده‌دار بودنش کافی بود که منتشر بشه!'}
      </motion.p>

      {/* Metadata */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap gap-6 text-sm md:text-base text-highlight-text-light dark:text-highlight-text-dark"
      >
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-primary-light dark:text-primary-dark" />
          <span className="font-medium">تاریخ انتشار: {data.created_at_jalali}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={20} className="text-primary-light dark:text-primary-dark" />
          <span className="font-medium">تعداد بازدید: {data.views}</span>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-t border-primary-light dark:border-primary-dark"
      />

      {/* Content Sections */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <FunnyContentSection content={data.content} />
      </motion.div>
    </article>
  );
}
