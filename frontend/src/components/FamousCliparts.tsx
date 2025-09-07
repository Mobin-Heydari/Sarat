'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import ClipartCard from './ClipartCard';
import { Clipart } from '@/types/clipart';

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

export default function ClipartsSection() {
  const [cliparts, setCliparts] = useState<Clipart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCliparts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/cliparts/famous-cliparts/`
        );
        if (!response.ok) throw new Error('مشکل در دریافت داده‌ها');
        const data = await response.json();
        setCliparts(data);
      } catch (err: any) {
        setError(err.message || 'خطای ناشناخته');
      } finally {
        setLoading(false);
      }
    };

    fetchCliparts();
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariant}
      className="flex flex-col gap-9"
    >
      {/* Header */}
      <motion.div
        variants={containerVariant}
        className="flex flex-col md:flex-row justify-between items-center gap-y-6"
      >
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark">
          پربازدید ترین و محبوبترین نماهنگ ها
        </h2>
        <Link
          href="/cliparts"
          className="text-base font-bold bg-base-light dark:bg-base-dark border-2 px-4 py-2 rounded-xl border-primary-light dark:border-primary-dark hover:text-highlight-text-light hover:bg-primary-light dark:hover:text-highlight-text-dark dark:hover:bg-primary-dark transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          مشاهده بیشتر
        </Link>
      </motion.div>

      {/* Content */}
      {loading && (
        <p className="text-lg text-primary-light dark:text-primary-dark text-center">
          در حال بارگذاری...
        </p>
      )}
      {error && (
        <p className="text-lg text-error-light dark:text-error-dark text-center">
          {error}
        </p>
      )}
      {!loading && !error && cliparts.length === 0 && (
        <p className="text-lg text-error-light dark:text-error-dark text-center">
          نماهنگی یافت نشد
        </p>
      )}
      {!loading && !error && cliparts.length > 0 && (
        <motion.div
          variants={containerVariant}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8"
        >
          {cliparts.map((item) => (
            <motion.div key={item.slug} variants={cardVariant}>
              <ClipartCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
