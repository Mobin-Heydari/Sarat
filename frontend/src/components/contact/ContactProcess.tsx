'use client';

import { motion } from 'framer-motion';
import {
  FaEdit,
  FaPaperPlane,
  FaReply,
  FaSmile,
} from 'react-icons/fa';

const steps = [
  {
    icon: <FaEdit size={28} />,
    title: 'ارسال درخواست',
    description:
      'فرم تماس را با اطلاعات کامل پر کنید. لطفاً موضوع، نوع همکاری یا سوال خود را مشخص نمایید تا سریع‌تر پاسخ‌گو باشیم.',
  },
  {
    icon: <FaPaperPlane size={28} />,
    title: 'بررسی توسط تیم',
    description:
      'درخواست شما توسط اعضای تیم بررسی می‌شود. ما تلاش می‌کنیم هر پیام را با دقت و احترام دسته‌بندی کنیم.',
  },
  {
    icon: <FaReply size={28} />,
    title: 'پاسخ‌گویی',
    description:
      'در کمتر از ۴۸ ساعت پاسخ اولیه از طریق ایمیل یا تماس تلفنی ارسال خواهد شد. در صورت نیاز، اطلاعات تکمیلی نیز ارائه می‌شود.',
  },
  {
    icon: <FaSmile size={28} />,
    title: 'شروع همکاری',
    description:
      'پس از توافق، فرآیند همکاری یا عضویت آغاز می‌شود. ما در تمام مراحل همراه شما خواهیم بود.',
  },
];

export default function ContactProcess() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className='mx-10'
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark"
      >
        مراحل ارتباط با ما
      </motion.h2>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 20,
              delay: i * 0.2,
            }}
            className="relative bg-base-light dark:bg-base-dark p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-4"
          >
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 bg-primary-light dark:bg-primary-dark text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">
              {i + 1}
            </div>

            {/* Icon */}
            <div className="text-primary-light dark:text-primary-dark hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-main-text-light dark:text-main-text-dark">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
