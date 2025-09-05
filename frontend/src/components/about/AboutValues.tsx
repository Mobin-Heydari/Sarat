'use client';

import { motion } from 'framer-motion';
import { FaHeart, FaLightbulb, FaUsers, FaHandshake, FaLeaf, FaMicrophone } from 'react-icons/fa';

const values = [
  {
    title: 'تعهد فرهنگی',
    icon: <FaHeart size={24} />,
    description: 'ما به اصول اسلامی، هویت ملی و اخلاق اجتماعی پایبندیم و تلاش می‌کنیم پیام‌های فرهنگی را با صداقت منتقل کنیم.',
  },
  {
    title: 'خلاقیت هنری',
    icon: <FaLightbulb size={24} />,
    description: 'هر اثر ما حاصل نوآوری، ذوق هنری و تلاش برای خلق تجربه‌ای تازه و الهام‌بخش است.',
  },
  {
    title: 'همدلی اجتماعی',
    icon: <FaUsers size={24} />,
    description: 'ما صدای مردم هستیم؛ دغدغه‌های اجتماعی را بازتاب می‌دهیم و با مخاطبان خود ارتباطی صمیمی برقرار می‌کنیم.',
  },
  {
    title: 'صداقت در همکاری',
    icon: <FaHandshake size={24} />,
    description: 'در تعامل با نهادها، خانواده‌ها و مخاطبان، صداقت و شفافیت را اصل قرار داده‌ایم.',
  },
  {
    title: 'پایداری و رشد',
    icon: <FaLeaf size={24} />,
    description: 'ما به رشد مستمر، یادگیری و توسعه فردی و گروهی باور داریم و مسیرمان را با انگیزه ادامه می‌دهیم.',
  },
  {
    title: 'صدای نسل جدید',
    icon: <FaMicrophone size={24} />,
    description: 'با تمرکز بر نوجوانان و جوانان، بستری برای بیان خلاقانه و رشد استعدادهای هنری فراهم کرده‌ایم.',
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

export default function AboutValues() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-6xl mx-auto py-16 px-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark"
      >
        ارزش‌های ما
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, i) => (
          <motion.div
            key={value.title}
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.04 }}
            className="bg-base-light dark:bg-base-dark p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-4"
          >
            <div className="text-primary-light dark:text-primary-dark">{value.icon}</div>
            <h3 className="text-xl font-bold text-main-text-light dark:text-main-text-dark">{value.title}</h3>
            <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
