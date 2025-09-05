'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';

const team = [
  {
    name: 'مبین حیدری',
    role: 'پاسخ‌گوی اصلی',
    image: '/logo.png',
    bio: 'مدیریت ارتباطات و پاسخ‌گویی به درخواست‌های همکاری، عضویت و سوالات عمومی.',
    email: 'mobin@soratgroup.ir',
    phone: '0912-123-4567',
    hours: 'شنبه تا چهارشنبه، ۹ تا ۱۸',
  },
  {
    name: 'زهرا محمدی',
    role: 'ارتباط رسانه‌ای',
    image: '/logo.png',
    bio: 'مدیریت پیام‌های رسانه‌ای، تولید محتوا و هماهنگی با شبکه‌های اجتماعی.',
    email: 'zahra@soratgroup.ir',
    phone: '0912-987-6543',
    hours: 'شنبه تا چهارشنبه، ۱۰ تا ۱۷',
  },
];

export default function ContactTeam() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark"
      >
        با چه کسانی در ارتباط خواهید بود؟
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {team.map((person, i) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-base-light dark:bg-base-dark p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 text-center"
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary-light dark:border-primary-dark shadow-md"
            />
            <h3 className="text-xl font-bold text-main-text-light dark:text-main-text-dark">{person.name}</h3>
            <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark">{person.role}</p>
            <p className="text-sm text-main-text-light dark:text-main-text-dark leading-relaxed">{person.bio}</p>

            <div className="flex flex-col gap-2 mt-4 text-sm text-highlight-text-light dark:text-highlight-text-dark">
              <div className="flex items-center justify-center gap-2">
                <FaEnvelope className="text-primary-light dark:text-primary-dark" />
                <span>{person.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaPhoneAlt className="text-primary-light dark:text-primary-dark" />
                <span>{person.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaClock className="text-primary-light dark:text-primary-dark" />
                <span>{person.hours}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
