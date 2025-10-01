import { Metadata } from 'next';

import { BsPeople } from 'react-icons/bs';

import AboutHistory from '@/components/about/AboutHistory';
import AboutValues from '@/components/about/AboutValues';
import AboutJoinUs from '@/components/about/AboutJoinUs';
import HeroSection from '@/components/HeroSection';



export const metadata: Metadata = {
  title: 'درباره‌ی ما | گروه سرود صراط',
  description:
    'با گروه سرود صراط آشنا شوید — جمعی از هنرمندان جوان که با عشق، ایمان و خلاقیت در مسیر تولید آثار فرهنگی و هنری گام برمی‌دارند. این صفحه روایت‌گر اهداف، اعضا، ارزش‌ها و چشم‌انداز ماست.',
  keywords: [
    'درباره‌ی صراط',
    'گروه سرود',
    'فعالیت فرهنگی',
    'هنر مذهبی',
    'اعضای گروه',
    'اهداف صراط',
    'ارزش‌های هنری',
    'تولید نماهنگ',
    'موسیقی مذهبی',
    'هنر متعهد',
  ],
  openGraph: {
    title: 'درباره‌ی گروه سرود صراط',
    description:
      'آشنایی با اعضا، اهداف و مسیر فعالیت‌های فرهنگی گروه سرود صراط — هنری متعهد، الهام‌بخش و ایرانی.',
    url: 'https://serat.ir/about-us',
    siteName: 'گروه سرود صراط',
    images: [
      {
        url: 'https://serat.ir/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'گروه سرود صراط',
      },
    ],
    locale: 'fa_IR',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'درباره‌ی گروه سرود صراط',
    description: 'با اعضا و اهداف گروه سرود صراط آشنا شوید — هنری متعهد و الهام‌بخش.',
    images: ['https://serat.ir/og-about.jpg'],
  },
  alternates: {
    canonical: 'https://serat.ir/about-us',
  },
};


export default function AboutUs() {
  return (
    <main className="flex flex-col gap-10">
      
      <HeroSection
        title="درباره‌ی گروه صراط"
        mainText="با ما بیشتر آشنا شوید"
        subText="مسیر فرهنگی و هنری ما را بشناسید"
        buttonTitle="تماس با ما"
        buttonIcon={<BsPeople />}
        buttonPosition="right"
        buttonUrl="/contact-us"
      />

      <AboutValues />
      <AboutHistory />
      <AboutJoinUs />
    </main>
  );
}
