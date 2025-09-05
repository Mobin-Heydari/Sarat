'use client';

import { motion } from 'framer-motion';

export default function ContactIntro() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-5xl mx-auto text-center py-16 px-4"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-secondary-dark"
      >
        چرا با ما تماس بگیرید؟
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed mb-8 max-w-3xl mx-auto"
      >
        ارتباط با گروه صراط فقط یک فرم نیست — این آغاز یک گفت‌وگوی واقعی است. چه بخواهید عضو شوید، همکاری کنید، یا فقط سوالی داشته باشید، ما با آغوش باز منتظر شنیدن صدای شما هستیم.
      </motion.p>

      {/* Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="inline-block px-6 py-4 rounded-xl bg-base-light dark:bg-base-dark shadow-md border border-primary-light dark:border-primary-dark"
      >
        <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark">
          ما معمولاً در کمتر از <span className="font-bold text-primary-light dark:text-primary-dark">۴۸ ساعت</span> پاسخ‌گو هستیم.
        </p>
      </motion.div>
    </motion.section>
  );
}
