'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  html: string;
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
  },
};

const shimmer = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.4 },
  }),
};

export default function ShowText({ html }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 mt-16 space-y-8">
      {/* 🧠 Heading with scroll animation */}
      <motion.h2
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-2xl font-bold text-main-text-light dark:text-main-text-dark text-center"
      >
        متن اجرای کامل
      </motion.h2>

      {/* 🌀 Skeleton shimmer while loading */}
      {!mounted ? (
        <div className="space-y-4">
          {[3, 4, 5, 6].map((w, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={shimmer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`h-4 rounded bg-muted-text/20 dark:bg-muted-text-dark/20 w-${w}/6 mx-auto`}
            />
          ))}
        </div>
      ) : html?.trim() ? (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="prose prose-lg prose-slate dark:prose-invert text-justify leading-relaxed"
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-lg text-muted-text dark:text-muted-text-dark"
        >
          متنی برای این اجرا ثبت نشده است.
        </motion.p>
      )}
    </section>
  );
}
