'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaUserPlus, FaMusic, FaCamera, FaHandshake } from 'react-icons/fa';

const roles = [
  {
    icon: <FaMusic size={24} />,
    title: 'عضویت در گروه سرود',
    description: 'اگر صدای خوبی دارید و علاقه‌مند به اجراهای گروهی هستید، جای شما در صراط خالیست.',
  },
  {
    icon: <FaCamera size={24} />,
    title: 'تولید محتوا و رسانه',
    description: 'ما به دنبال افراد خلاق در زمینه فیلم‌برداری، تدوین، طراحی و مدیریت شبکه‌های اجتماعی هستیم.',
  },
  {
    icon: <FaHandshake size={24} />,
    title: 'همکاری سازمانی',
    description: 'نهادها، مدارس و مراکز فرهنگی می‌توانند برای اجرای برنامه‌های مشترک با ما در ارتباط باشند.',
  },
];

export default function AboutJoinUs() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-6xl mx-auto px-4 text-center"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark"
      >
        به خانواده‌ی صراط بپیوندید
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed max-w-3xl mx-auto mb-10"
      >
        ما همیشه پذیرای افراد مشتاق، خلاق و متعهد هستیم تا در مسیر فرهنگی و هنری‌مان همراه شوند. اگر علاقه‌مند به فعالیت‌های گروهی، رسانه‌ای یا همکاری سازمانی هستید، فرصت را از دست ندهید.
      </motion.p>

      {/* Roles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {roles.map((role, i) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-base-light dark:bg-base-dark p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 text-center"
          >
            <div className="text-primary-light dark:text-primary-dark">{role.icon}</div>
            <h3 className="text-xl font-bold text-main-text-light dark:text-main-text-dark">{role.title}</h3>
            <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark leading-relaxed">
              {role.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-light dark:bg-primary-dark text-white font-semibold hover:scale-105 transition-all duration-300"
        >
          <FaUserPlus />
          تماس با ما
        </Link>
      </motion.div>
    </motion.section>
  );
}
