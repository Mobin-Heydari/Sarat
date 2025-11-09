import { BsCollectionPlay } from "react-icons/bs";

import HeroSection from "@/components/HeroSection";
import FamousCliparts from "@/components/FamousCliparts";
import FamousMusicSection from "@/components/FamousMusicsSection";
import { ContactForm } from "@/components/contact/ContactForm";
import BannerSlider from "@/components/ui/BannerSlider";


import { banners } from "@/data";
import NewShowsSlider from "@/components/shows/FamousShowSlider";


export const metadata = {
  title: 'صفحه اصلی گروه سرود صراط | نماهنگ، صوت، طنز و ارتباط با ما',
  description:
    'در صفحه اصلی گروه سرود صراط، مجموعه‌ای از نماهنگ‌های صوت‌های لحظات طنز و راه‌های ارتباط با ما را خواهید یافت. با ما همراه شوید و از هنر، ایمان و همدلی لذت ببرید.',
  keywords: [
    'گروه سرود صراط',
    'نماهنگ',
    'صوت',
    'طنز',
    'شوخی',
    'موسیقی مذهبی',
    'محتوای فرهنگی',
    'سرود',
    'ارتباط با ما',
    'صفحه اصلی',
  ],
  openGraph: {
    title: 'صفحه اصلی گروه سرود صراط',
    description:
      'مجموعه‌ای از نماهنگ‌ها، صوت‌ها، لحظات طنز و راه‌های ارتباط با گروه سرود صراط. با ما همراه شوید.',
    url: 'https://Serat.ir',
    siteName: 'گروه سرود صراط',
    images: [
      {
        url: 'https://Serat.ir/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'صفحه اصلی گروه سرود صراط',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'صفحه اصلی گروه سرود صراط',
    description: 'هنر، ایمان، همدلی — همه در یک صفحه.',
    images: ['https://Serat.ir/og-home.jpg'],
  },
};


export default function Home() {
  return (
    <main className="flex flex-col gap-20 w-full bg-base-light dark:bg-base-dark">

      <BannerSlider banners={banners} fit="contain" />
      {/* Hero Section */}
      <HeroSection
        title="گروه سرود صراط"
        mainText="صفحه اصلی"
        subText="جدیدترین آثار ، تولیدات و نماهنگ ها"
        buttonTitle="مشاهده نماهنگ‌ها"
        buttonIcon={<BsCollectionPlay />}
        buttonPosition="right"
        buttonUrl="/cliparts"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />


      {/* Famous Sections */}
      <NewShowsSlider />
      <FamousCliparts />
      <FamousMusicSection />
    </main>
  );
}
