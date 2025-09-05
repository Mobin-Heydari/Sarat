'use client';

import { motion } from 'framer-motion';
import { FaFlagCheckered, FaUsers, FaVideo, FaAward, FaRocket } from 'react-icons/fa';

const milestones = [
  {
    year: '۱۳۹۸',
    title: 'آغاز مسیر',
    icon: <FaFlagCheckered size={24} />,
    description: 'تشکیل گروه صراط با هدف ترویج فرهنگ اسلامی و تقویت هویت ملی در میان نوجوانان و جوانان.',
  },
  {
    year: '۱۳۹۹',
    title: 'اولین اجراهای رسمی',
    icon: <FaUsers size={24} />,
    description: 'حضور در مراسم‌های مذهبی و فرهنگی محلی، جذب اعضای جدید و گسترش فعالیت‌ها.',
  },
  {
    year: '۱۴۰۰',
    title: 'تولید نماهنگ‌های اختصاصی',
    icon: <FaVideo size={24} />,
    description: 'تولید نماهنگ‌های با کیفیت با موضوعات اجتماعی، مذهبی و ملی، و انتشار در رسانه‌های دیجیتال.',
  },
  {
    year: '۱۴۰۱',
    title: 'کسب افتخارات',
    icon: <FaAward size={24} />,
    description: 'دریافت جوایز در جشنواره‌های فرهنگی و هنری، و همکاری با نهادهای رسمی آموزشی و مذهبی.',
  },
  {
    year: '۱۴۰۲',
    title: 'گسترش رسانه‌ای',
    icon: <FaRocket size={24} />,
    description: 'راه‌اندازی صفحات رسمی در شبکه‌های اجتماعی، افزایش مخاطبان و تعامل با جامعه.',
  },
];

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

      {/* Timeline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {milestones.map((item, i) => (
          <motion.div
            key={item.year}
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.04 }}
            className="bg-base-light dark:bg-base-dark p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 text-primary-light dark:text-primary-dark">
              {item.icon}
              <span className="text-lg font-bold">{item.year}</span>
            </div>
            <h3 className="text-xl font-bold text-main-text-light dark:text-main-text-dark">{item.title}</h3>
            <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
