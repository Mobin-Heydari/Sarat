'use client';

import React from 'react';
import { Vortex } from './ui/Vortex';
import {
  FaGithub,
  FaGitlab,
  FaLinkedin,
  FaLocationArrow,
} from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

const socialMedia = [
  {
    id: 1,
    icon: (
      <FaGithub className="text-main-text-light dark:text-main-text-dark hover:text-primary-light dark:hover:text-primary-dark bg-base-light dark:bg-base-dark" />
    ),
    url: 'https://github.com/Mobin-Heydari',
  },
  {
    id: 2,
    icon: (
      <FaGitlab className="text-main-text-light dark:text-main-text-dark hover:text-primary-light dark:hover:text-primary-dark bg-base-light dark:bg-base-dark" />
    ),
    url: 'https://gitlab.com/Mobin_Developer',
  },
  {
    id: 3,
    icon: (
      <FaLinkedin className="text-main-text-light dark:text-main-text-dark hover:text-primary-light dark:hover:text-primary-dark bg-base-light dark:bg-base-dark" />
    ),
    url: 'https://www.linkedin.com/in/mobin--heydari/',
  },
];

const quickLinks = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'درباره ما', href: '/about-us' },
  { label: 'تماس با ما', href: '/contact-us' },
  { label: 'بامزه ها', href: '/join' },
  { label: 'نماهنگ  ها', href: '/cliparts' },
  { label: 'صوت ها', href: '/musics' },
  { label: 'استوری ها', href: '/stories' },
];

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
      className="w-full mx-auto rounded-md h-auto overflow-hidden mt-10"
    >
      <Vortex className="relative flex flex-col items-center justify-center px-4 md:px-10 py-12 w-full h-full" particleCount={70}>
        {/* Background Grid */}
        <div className="absolute inset-0 z-0">
          <img src="/footer-grid.svg" alt="footer grid" className="w-full h-full object-cover opacity-10" />
        </div>

        {/* Mission & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        >
          <h4 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark">
            گروه سرود صراط؛ صدای ایمان، فرهنگ و همدلی
          </h4>
          <p className="text-center my-5 text-lg bg-clip-text text-transparent bg-gradient-to-r py-4 from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark font-semibold">
            ما با هدف ترویج ارزش‌های اسلامی و ملی، بستری برای رشد هنری نوجوانان و جوانان فراهم کرده‌ایم. اگر شما هم دغدغه فرهنگی دارید، خوشحال می‌شویم همراه‌مان باشید.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-light dark:bg-primary-dark text-white font-bold hover:scale-105 transition-all duration-300"
          >
            <FaLocationArrow />
            ارتباط با گروه
          </Link>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.4, staggerChildren: 0.1 },
            },
          }}
          className="relative z-10 mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6 text-center"
        >
          {quickLinks.map((link) => (
            <motion.div
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-main-text-light dark:text-main-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-all"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full border-t border-primary-light dark:border-primary-dark my-8"
        />

        {/* Footer Bottom */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.8, staggerChildren: 0.1 },
            },
          }}
          className="relative z-10 w-full flex md:flex-row flex-col justify-between items-center gap-6"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-sm font-semibold text-main-text-light dark:text-main-text-dark"
          >
            © 2025 گروه سرود صراط — تمامی حقوق محفوظ است.
          </motion.p>
          <div className="flex items-center md:gap-3 gap-6">
            {socialMedia.map((item) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.2 }}
                className="w-10 h-10 cursor-pointer flex justify-center items-center rounded-full backdrop-filter backdrop-blur-lg"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Vortex>
    </motion.footer>
  );
}

export default Footer;
