'use client';

import { motion } from 'framer-motion';
import MusicInfo from './MusicInfo';
import MusicPlayer from '@/components/MusicPlayer';
import { Music } from '@/types/music';
import MusicLyrics from './MusicLyrics';


export default function MusicDetailSection({ data }: { data: Music }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      className="flex flex-col gap-8"
    >
      <MusicInfo data={data} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <MusicPlayer
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.music}`}
          poster={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.poster}`}
          title={data.title}
        />
      </motion.div>


      <MusicLyrics title={data.title} html={data.text} />
    </motion.section>
  );
}
