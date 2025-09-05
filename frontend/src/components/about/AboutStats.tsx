'use client';

import { motion } from 'framer-motion';
import {
  FaUsers,
  FaMusic,
  FaAward,
  FaCalendarAlt,
  FaVideo,
  FaGlobe,
} from 'react-icons/fa';

const stats = [
  {
    label: 'پروژه‌های اجرا شده',
    value: '200+',
    icon: <FaCalendarAlt size={24} />,
    description: 'اجرای موفق در رویدادهای فرهنگی، مذهبی و هنری',
  },
  {
    label: 'همکاری‌های موفق',
    value: '150+',
    icon: <FaUsers size={24} />,
    description: 'همکاری با مدارس، مساجد، نهادهای فرهنگی و رسانه‌ای',
  },
  {
    label: 'سال‌های فعالیت',
    value: '5+',
    icon: <FaGlobe size={24} />,
    description: 'از سال ۱۳۹۸ تا امروز با رشد مستمر و پایدار',
  },
  {
    label: 'نماهنگ‌های تولید شده',
    value: '80+',
    icon: <FaVideo size={24} />,
    description: 'تولید نماهنگ‌های متنوع با موضوعات اجتماعی و مذهبی',
  },
  {
    label: 'آهنگ‌های اختصاصی',
    value: '120+',
    icon: <FaMusic size={24} />,
    description: 'آثار صوتی اختصاصی با تنظیم حرفه‌ای و پیام فرهنگی',
  },
  {
    label: 'جوایز و افتخارات',
    value: '12',
    icon: <FaAward size={24} />,
    description: 'کسب مقام در جشنواره‌های هنری و فرهنگی ملی',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  }),
};

export default function AboutStats() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          custom={i}
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
          className="bg-base-light dark:bg-base-dark p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
        >
          <div className="mb-4 text-primary-light dark:text-primary-dark">{stat.icon}</div>
          <h3 className="text-3xl font-bold text-primary-light dark:text-primary-dark">{stat.value}</h3>
          <p className="text-lg font-semibold text-main-text-light dark:text-main-text-dark mt-2">{stat.label}</p>
          <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark mt-2">{stat.description}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}
