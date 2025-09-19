'use client';

import { useEffect, useState } from 'react';
import FunnyCard from './FunnyCard';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

type FunnyItem = {
  title: string;
  slug: string;
  poster: string;
  created_at_jalali: string;
  views: number;
};

const containerVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const headerVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const cardVariant: Variants = {
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

export default function NewFunnyMoments() {
  const [funnyItems, setFunnyItems] = useState<FunnyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFunnyContent = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/funny/new-funny/`);
        if (!res.ok) throw new Error('خطا در دریافت داده‌ها');
        const data = await res.json();
        setFunnyItems(data);
      } catch (err: any) {
        setError(err.message || 'خطای ناشناخته');
      } finally {
        setLoading(false);
      }
    };

    fetchFunnyContent();
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariant}
      className="bg-base-light dark:bg-base-dark mx-10"
    >
      <div className="mx-auto">
        {/* Section Header */}
        <motion.div
          variants={headerVariant}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark">
           بامزه های اخیر
          </h2>
          <Link
            href="/funny"
            className="text-base font-bold bg-base-light dark:bg-base-dark border-2 px-4 py-2 rounded-xl border-primary-light dark:border-primary-dark hover:text-highlight-text-light hover:bg-primary-light dark:hover:text-highlight-text-dark dark:hover:bg-primary-dark transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
          >
            مشاهده بیشتر
          </Link>
        </motion.div>

        {/* Content */}
        {loading && (
          <div className="text-center py-10 text-highlight-text-light dark:text-highlight-text-dark">
            در حال بارگذاری...
          </div>
        )}
        {error && (
          <div className="text-center py-10 text-error-light dark:text-error-text-dark">
            {error}
          </div>
        )}
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariant}
          >
            {funnyItems.map((item) => (
              <motion.div key={item.slug} variants={cardVariant}>
                <FunnyCard
                  slug={item.slug}
                  poster={item.poster}
                  title={item.title}
                  createdAtJalalli={item.created_at_jalali}
                  views={item.views}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
