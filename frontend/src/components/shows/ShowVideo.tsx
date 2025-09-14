'use client';

import { motion } from 'framer-motion';

type Props = {
  video: string;
};

export default function ShowVideo({ video }: Props) {
  if (!video) return null;

  const videoUrl = `${process.env.NEXT_PUBLIC_MEDIA_URL}${video}`;
  const posterUrl = video.replace(/\.\w+$/, '.jpg');

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      aria-label="ویدیو اجرای زنده"
      className="w-full max-w-5xl mx-auto px-4 md:px-0"
    >
      <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-white/5 bg-black">
        <iframe
          src={video}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
          title="ویدیو نماهنگ گروه صراط"
        />
      </div>
    </motion.section>
  );
}
