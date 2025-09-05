'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'مبین حیدری',
    role: 'سرپرست گروه',
    image: '/logo.png',
    bio: 'با بیش از ۵ سال تجربه در مدیریت گروه‌های فرهنگی، مبین مسئول هماهنگی و اجرای پروژه‌های هنری است.',
    socials: {
      instagram: '#',
      linkedin: '#',
      email: 'mailto:mobin@example.com',
    },
  },
  {
    name: 'علی رضایی',
    role: 'آهنگساز',
    image: '/logo.png',
    bio: 'علی با تخصص در آهنگسازی و تنظیم موسیقی، روح هنری آثار گروه را شکل می‌دهد.',
    socials: {
      instagram: '#',
      linkedin: '#',
      email: 'mailto:ali@example.com',
    },
  },
  {
    name: 'زهرا محمدی',
    role: 'مدیر رسانه',
    image: '/logo.png',
    bio: 'زهرا مسئول تولید محتوا، مدیریت شبکه‌های اجتماعی و ارتباط با مخاطبان گروه است.',
    socials: {
      instagram: '#',
      linkedin: '#',
      email: 'mailto:zahra@example.com',
    },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  }),
};

export default function AboutTeam() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="py-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-secondary-dark"
      >
        اعضای اصلی گروه
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="relative flex flex-col items-center gap-4 bg-base-light dark:bg-base-dark p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Glow Accent */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary-light dark:bg-primary-dark blur-2xl opacity-20 rounded-full pointer-events-none z-0" />

            {/* Image */}
            <motion.img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary-light dark:border-primary-dark shadow-md hover:scale-105 transition-transform duration-300"
            />

            {/* Name & Role */}
            <div className="text-center z-10">
              <h3 className="text-xl font-bold text-main-text-light dark:text-main-text-dark">{member.name}</h3>
              <p className="text-sm text-highlight-text-light dark:text-highlight-text-dark">{member.role}</p>
            </div>

            {/* Bio */}
            <p className="text-sm text-main-text-light dark:text-main-text-dark text-center leading-relaxed z-10">
              {member.bio}
            </p>

            {/* Socials */}
            <div className="flex gap-4 mt-2 z-10">
              <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-primary-light dark:text-primary-dark hover:scale-110 transition-transform" />
              </a>
              <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-primary-light dark:text-primary-dark hover:scale-110 transition-transform" />
              </a>
              <a href={member.socials.email}>
                <FaEnvelope className="text-primary-light dark:text-primary-dark hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
