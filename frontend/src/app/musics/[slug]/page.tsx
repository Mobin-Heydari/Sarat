import { Metadata } from 'next';
import { CiMusicNote1 } from 'react-icons/ci';

import { Music } from '@/types/music';
import HeroSection from '@/components/HeroSection';
import MusicDetailSection from '@/components/MusicDetailSection';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/audios/detail/${params.slug}/`,
      { cache: 'no-store' }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const music: Music = await res.json();

    return {
      title: music.title,
      description: music.description,
    };
  } catch {
    return {
      title: 'یافت نشد',
      description: 'صوت یافت نشده است صبر کنید.',
    };
  }
}

export const dynamic = 'force-dynamic';

export default async function MusicDetail({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/audios/detail/${params.slug}/`,
    { cache: 'no-store' }
  );
  const data: Music = await res.json();

  return (
    <main className="flex flex-col gap-12 h-auto w-full xl:p-12 p-4">
      <HeroSection
        title="مجموعه ی صراط"
        mainText="صوت های برتر مجموعه"
        subText="به مجموعه ی صراط آمدید"
        buttonTitle="صوت ها"
        buttonIcon={<CiMusicNote1 />}
        buttonPosition="right"
        buttonUrl="/musics"
      />

      <MusicDetailSection data={data} />
    </main>
  );
}
