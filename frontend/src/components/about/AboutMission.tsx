'use client';

import { motion } from 'framer-motion';
import { FaBullseye, FaSeedling, FaUsers, FaMicrophone } from 'react-icons/fa';

const missionPoints = [
  {
    icon: <FaBullseye size={24} />,
    title: 'ترویج فرهنگ اسلامی و ملی',
    description: 'ما با استفاده از هنر، پیام‌های اخلاقی، دینی و ملی را به زبان نسل جدید منتقل می‌کنیم.',
  },
  {
    icon: <FaSeedling size={24} />,
    title: 'پرورش استعدادهای هنری',
    description: 'با ایجاد بستری امن و خلاقانه، نوجوانان و جوانان را در مسیر رشد هنری همراهی می‌کنیم.',
  },
  {
    icon: <FaUsers size={24} />,
    title: 'تقویت همدلی اجتماعی',
    description: 'آثار ما بازتابی از دغدغه‌های مردم است؛ صدای جامعه را با احترام و همدلی منتشر می‌کنیم.',
  },
  {
    icon: <FaMicrophone size={24} />,
    title: 'خلق آثار ماندگار',
    description: 'ما به تولید نماهنگ‌ها و سرودهایی می‌پردازیم که در دل مخاطب ماندگار می‌شوند.',
  },
];

export default function AboutMission() {
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
        className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark"
      >
        اهداف و رسالت ما
      </motion.h2>

      {/* Intro Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed text-center max-w-3xl mx-auto mb-12"
      >
        گروه سرود صراط با رسالت فرهنگی و اجتماعی خود، تلاش می‌کند تا با بهره‌گیری از هنر، پلی میان نسل‌ها، ارزش‌ها و احساسات ایجاد کند. ما باور داریم که هنر نه‌تنها سرگرم‌کننده، بلکه آموزنده و الهام‌بخش است.
      </motion.p>

      {/* Mission Points */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {missionPoints.map((point, i) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-base-light dark:bg-base-dark p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
          >
            <div className="text-primary-light dark:text-primary-dark">{point.icon}</div>
            <h3 className="text-xl font-bold text-main-text-light dark:text-main-text-dark">{point.title}</h3>
            <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark leading-relaxed">
              {point.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
