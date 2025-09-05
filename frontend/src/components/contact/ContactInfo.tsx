'use client';

import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const contactDetails = [
  {
    icon: <FaPhoneAlt size={24} />,
    label: 'شماره تماس',
    value: '۰۹۱۲۱۲۳۴۵۶۷',
    description: 'پاسخ‌گویی از ساعت ۹ تا ۱۸',
  },
  {
    icon: <FaEnvelope size={24} />,
    label: 'ایمیل',
    value: 'info@soratgroup.ir',
    description: 'برای ارسال پیشنهاد یا همکاری',
  },
  {
    icon: <FaMapMarkerAlt size={24} />,
    label: 'موقعیت',
    value: 'اسلام‌شهر، تهران',
    description: 'دفتر مرکزی گروه سرود صراط',
  },
  {
    icon: <FaClock size={24} />,
    label: 'ساعات کاری',
    value: 'شنبه تا چهارشنبه',
    description: '۹ صبح تا ۶ عصر',
  },
];

export default function ContactInfo() {
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
        className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-secondary-dark"
      >
        راه‌های ارتباط با ما
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactDetails.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-base-light dark:bg-base-dark p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-3"
          >
            <div className="text-primary-light dark:text-primary-dark">{item.icon}</div>
            <h3 className="text-lg font-bold text-main-text-light dark:text-main-text-dark">{item.label}</h3>
            <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark">{item.value}</p>
            <p className="text-xs text-main-text-light/[0.7] dark:text-main-text-dark/[0.7]">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
