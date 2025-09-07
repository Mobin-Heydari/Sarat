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

    const pageTitle = `${music.title} | صوت فرهنگی از گروه سرود صراط`;
    const pageDescription =
      music.description ||
      `صوت "${music.title}" از مجموعه آثار شنیداری گروه سرود صراط، با مضامین فرهنگی، مذهبی و اجتماعی.`

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: [
        'صوت',
        'آثار شنیداری',
        'موسیقی مذهبی',
        'موسیقی فرهنگی',
        'گروه سرود صراط',
        'آهنگ',
        'صوت نوجوانان',
        music.title,
      ],
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `https://serat.ir/musics/${params.slug}`,
        siteName: 'گروه سرود صراط',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${music.poster}`,
            width: 1200,
            height: 630,
            alt: music.title,
          },
        ],
        locale: 'fa_IR',
        type: 'music.song',
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: [`${process.env.NEXT_PUBLIC_MEDIA_URL}${music.poster}`],
      },
      alternates: {
        canonical: `https://serat.ir/musics/${params.slug}`,
      },
    };
  } catch {
    return {
      title: 'صوت یافت نشد',
      description: 'متأسفانه اطلاعات این صوت در حال حاضر در دسترس نیست.',
    };
  }
}


export const dynamic = 'force-dynamic';

export default async function MusicDetailPage({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/audios/detail/${params.slug}/`,
    { cache: 'no-store' }
  );
  const data: Music = await res.json();

  return (
    <main className="flex flex-col gap-20 w-full bg-base-light dark:bg-base-dark">
      {/* Hero Section */}
      <HeroSection
        title="صوت فرهنگی صراط"
        mainText={data.title}
        subText="آثار شنیداری با پیام‌های الهام‌بخش"
        buttonTitle="بازگشت به صوت‌ها"
        buttonIcon={<CiMusicNote1 />}
        buttonPosition="right"
        buttonUrl="/audios"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      {/* Cultural Context */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark">
          درباره این صوت
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          {data.description}
        </p>
      </section>

      {/* Music Detail Section */}
      <MusicDetailSection data={data} />

    </main>
  );
}
