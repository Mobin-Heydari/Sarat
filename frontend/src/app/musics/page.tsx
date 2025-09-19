import { Metadata } from 'next';
import { CiMusicNote1 } from 'react-icons/ci';

import { Music } from '@/types/music';
import HeroSection from '@/components/HeroSection';
import MusicSection from '@/components/MusicSection';



export const metadata: Metadata = {
  title: 'صوت | آثار شنیداری گروه سرود صراط',
  description:
    'در این صفحه مجموعه‌ای از صوت‌های فرهنگی، مذهبی و اجتماعی گروه سرود صراط را خواهید یافت. آثار شنیداری با صدای دلنشین نوجوانان و جوانان، مناسب برای لحظات تأمل، عبادت و آرامش.',
  keywords: [
    'صوت',
    'آثار شنیداری',
    'موسیقی مذهبی',
    'موسیقی فرهنگی',
    'سرود',
    'گروه سرود صراط',
    'آهنگ',
    'محتوای صوتی',
    'صوت نوجوانان',
    'صوت مذهبی',
  ],
  openGraph: {
    title: 'صوت | آثار شنیداری گروه سرود صراط',
    description:
      'مجموعه‌ای از صوت‌های برتر با مضامین فرهنگی و مذهبی، اجرا شده توسط اعضای گروه سرود صراط. مناسب برای گوش دادن، اشتراک‌گذاری و الهام گرفتن.',
    url: 'https://serat.ir/audios',
    siteName: 'گروه سرود صراط',
    images: [
      {
        url: 'https://serat.ir/og-audios.jpg',
        width: 1200,
        height: 630,
        alt: 'صوت‌های گروه سرود صراط',
      },
    ],
    locale: 'fa_IR',
    type: 'music.playlist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'صوت | آثار شنیداری گروه سرود صراط',
    description: 'آثار شنیداری فرهنگی و مذهبی برای تمام سنین.',
    images: ['https://serat.ir/og-audios.jpg'],
  },
};


export default async function Musics() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/audios/`, {
    next: { revalidate: 60 },
  });
  const items: Music[] = await response.json();

  return (
    <main className="flex flex-col gap-20 w-full bg-base-light dark:bg-base-dark">
      {/* Hero Section */}
      <HeroSection
        title="صوت‌های فرهنگی صراط"
        mainText="آثار شنیداری با پیام‌های الهام‌بخش"
        subText="در این بخش، صوت‌های برتر گروه سرود صراط را گوش دهید و لذت ببرید."
        buttonTitle="مشاهده صوت‌ها"
        buttonIcon={<CiMusicNote1 />}
        buttonPosition="right"
        buttonUrl="/audios"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-main-text-light dark:text-main-text-dark">
          چرا صوت‌های صراط؟
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          صوت‌های گروه سرود صراط با هدف انتقال پیام‌های فرهنگی، مذهبی و اجتماعی از طریق هنر شنیداری تولید شده‌اند. این آثار با صدای نوجوانان و جوانان اجرا شده و مناسب برای گوش دادن در لحظات آرامش، عبادت یا تأمل هستند.
        </p>
      </section>

      {/* Music Grid */}
      <section className="mx-10">
        <h2 className="text-2xl font-bold text-center mb-8 text-main-text-light dark:text-main-text-dark">
          مجموعه صوت‌ها
        </h2>
        <MusicSection items={items} />
      </section>
    </main>
  );
}
