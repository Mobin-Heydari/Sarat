'use client';

import { motion } from 'framer-motion';


const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  }),
};

export default function AboutHistory() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-6xl mx-auto py-16 px-4"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-secondary-dark"
      >
        تاریخچه‌ی گروه صراط
      </motion.h2>

      {/* Intro Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed text-center max-w-3xl mx-auto mb-12"
      >
        مسیر ما از یک ایده ساده آغاز شد: استفاده از هنر برای انتقال پیام‌های فرهنگی و اجتماعی. امروز، پس از سال‌ها تلاش، گروه صراط به یکی از فعال‌ترین مجموعه‌های هنری در منطقه تبدیل شده است.
      </motion.p>
    </motion.section>
  );
}
