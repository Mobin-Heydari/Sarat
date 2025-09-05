'use client';

import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 gap-6 text-center"
    >
      <div className="flex flex-col items-center gap-2">
        <FaPhoneAlt className="text-primary-light dark:text-primary-dark" size={24} />
        <p className="text-main-text-light dark:text-main-text-dark">۰۹۱۲۱۲۳۴۵۶۷</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FaEnvelope className="text-primary-light dark:text-primary-dark" size={24} />
        <p className="text-main-text-light dark:text-main-text-dark">info@soratgroup.ir</p>
      </div>
    </motion.div>
  );
}
