'use client';

import { motion } from 'framer-motion';

import ContactInfo from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import Link from 'next/link';
import ContactTeam from './ContactTeam';


export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-16 px-4 md:px-12 py-10"
    >


      {/* Contact Form */}
      <section className="flex flex-col md:flex-row justify-center gap-20 items-center px-auto">
        <ContactForm />
        <div className="flex flex-col justify-center gap-10 py-4 px-10">
          {/* Contact Info */}
          <ContactInfo />
          <ContactTeam />
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-10"
          >
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark">
              آماده‌ی همکاری با شما هستیم
            </h2>
            <Link
              href="/about-us"
              className="inline-block px-6 py-3 rounded-full bg-primary-light dark:bg-primary-dark text-white font-semibold hover:scale-105 transition-all duration-300"
            >
              درباره‌ی گروه صراط
            </Link>
          </motion.section>
        </div>
        {/* CTA */}
      </section>

    </motion.section>
  );
}
