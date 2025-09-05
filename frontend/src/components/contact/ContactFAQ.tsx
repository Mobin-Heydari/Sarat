'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: 'چگونه می‌توانم عضو گروه شوم؟',
    answer: 'از طریق فرم تماس، اطلاعات خود را ارسال کنید تا با شما تماس بگیریم و مراحل عضویت را آغاز کنیم.',
  },
  {
    question: 'آیا همکاری با مدارس امکان‌پذیر است؟',
    answer: 'بله، ما با مدارس و مراکز فرهنگی همکاری داریم و آماده‌ی اجرای برنامه‌های مشترک هستیم.',
  },
  {
    question: 'آیا امکان تولید نماهنگ سفارشی وجود دارد؟',
    answer: 'بله، با هماهنگی قبلی می‌توانیم نماهنگ‌های اختصاصی تولید کنیم که متناسب با نیاز شما باشد.',
  },
  {
    question: 'زمان پاسخ‌گویی چقدر است؟',
    answer: 'ما معمولاً در کمتر از ۴۸ ساعت پاسخ اولیه را ارسال می‌کنیم.',
  },
  {
    question: 'آیا امکان همکاری رسانه‌ای وجود دارد؟',
    answer: 'بله، اگر در زمینه تولید محتوا، تدوین یا طراحی فعالیت دارید، خوشحال می‌شویم با شما همکاری کنیم.',
  },
];

export default function ContactFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full max-w-6xl mx-auto py-16 px-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark"
      >
        سوالات متداول
      </motion.h2>

      <div className="grid grid-cols-1 gap-6">
        {faqs.map((faq, i) => (
          <motion.div
            key={faq.question}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="w-full bg-base-light dark:bg-base-dark rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center px-6 py-5 text-start focus:outline-none hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-all"
            >
              <h3 className="text-lg font-bold text-main-text-light dark:text-main-text-dark">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: activeIndex === i ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-primary-light dark:text-primary-dark"
              >
                <FaChevronDown />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === i && (
                <motion.div
                  layout
                  initial={{ opacity: 0, scaleY: 0.95 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0.95 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="px-6 pb-5 text-sm text-highlight-text-light dark:text-highlight-text-dark leading-relaxed origin-top"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
