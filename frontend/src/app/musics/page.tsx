import { Metadata } from 'next';
import Link from 'next/link';
import { CiMusicNote1 } from 'react-icons/ci';
import { motion, Variants } from 'framer-motion';

import { Music } from '@/types/music';
import HeroSection from '@/components/HeroSection';
import MusicSection from '@/components/MusicSection';

export const metadata: Metadata = {
  title: 'صوت ها',
  description: 'صوت های برتر گروه سرود صراط.',
};

const containerVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default async function Musics() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/audios/`, {
    next: { revalidate: 60 },
  });
  const items: Music[] = await response.json();

  return (
    <main className="flex flex-col gap-12 h-auto w-full xl:p-12 p-4">
      <HeroSection
        title="مجموعه ی صراط"
        mainText="صوت های برتر مجموعه"
        subText="به مجموعه ی صراط آمدید"
        buttonTitle="صوت ها"
        buttonIcon={<CiMusicNote1 />}
        buttonPosition="right"
        buttonUrl="/audios"
      />

      <MusicSection items={items} />
    </main>
  );
}
