'use client';

import { motion } from 'framer-motion';

export default function ClipartVideo({ video }: { video: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg"
    >
      <iframe
        src={video}
        className="w-full h-full border-0"
        allow="autoplay; fullscreen"
        allowFullScreen
        loading="lazy"
        title="Clipart Video"
      />
    </motion.section>
  );
}
