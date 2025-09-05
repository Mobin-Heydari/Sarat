'use client';

import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const messages = [
  {
    name: 'مبین حیدری',
    role: 'سرپرست گروه',
    image: '/logo.png',
    text: 'ما همیشه مشتاق شنیدن نظرات و پیشنهادات شما هستیم. ارتباط با شما، انگیزه‌ی ماست. هر پیام شما برای ما ارزشمند است.',
  },
  {
    name: 'زهرا محمدی',
    role: 'مدیر رسانه',
    image: '/logo.png',
    text: 'اگر سوالی دارید یا به دنبال همکاری هستید، با خیال راحت پیام بگذارید. ما با دقت و احترام پاسخ‌گو خواهیم بود.',
  },
];

export default function ContactWall() {
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
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark"
      >
        پیام‌هایی از تیم صراط
      </motion.h2>

      {/* Message Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="relative bg-base-light dark:bg-base-dark p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
          >
            {/* Quote Icon */}
            <FaQuoteLeft className="absolute top-4 left-4 text-primary-light dark:text-primary-dark opacity-30" />

            {/* Avatar */}
            <img
              src={msg.image}
              alt={msg.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-light dark:border-primary-dark mx-auto"
            />

            {/* Name & Role */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-main-text-light dark:text-main-text-dark">{msg.name}</h3>
              <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark">{msg.role}</p>
            </div>

            {/* Message */}
            <p className="text-sm text-main-text-light dark:text-main-text-dark leading-relaxed text-center">
              {msg.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Optional Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark">
          تیم صراط با افتخار پاسخ‌گوی شماست — هر پیام شما برای ما آغاز یک مسیر تازه است.
        </p>
      </motion.div>
    </motion.section>
  );
}
