import { Metadata } from 'next';
import { BsCollectionPlay } from 'react-icons/bs';

import { Show } from '@/types/show';

import HeroSection from '@/components/HeroSection';
import ShowVideo from '@/components/shows/ShowVideo';
import ShowText from '@/components/shows/ShowText';
import FamousShowsSlider from '@/components/shows/FamousShowSlider';



type Props = {
  params: { slug: string };
};

export const dynamic = 'force-dynamic';



export default async function ShowDetail({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/lives/shows/detail/${params.slug}/`, {
    cache: 'no-store',
  });
  const show: Show = await res.json();

  return (
    <main className="flex flex-col gap-20 w-full min-h-screen bg-base-light dark:bg-base-dark pb-20">
      {/* 🎬 Hero Section */}
      <HeroSection
        title="اجرای ویژه از گروه صراط"
        mainText={show.title}
        subText="در این بخش، اجراهای فرهنگی و مذهبی را با کیفیت بالا مشاهده می‌کنید."
        buttonTitle="بازگشت به لیست اجراها"
        buttonIcon={<BsCollectionPlay />}
        buttonPosition="left"
        buttonUrl="/shows"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      {/* 📖 Description */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark">درباره این اجرا</h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          {show.description}
        </p>
      </section>

      {/* 📺 Video */}
      <ShowVideo video={show.video} />

      {/* 📝 Text */}
      <ShowText html={show.text || 'متنی برای این اجرا ثبت نشده است.'} />

      {/* 🌟 Famous Shows */}
      <div className="mx-10">
        <FamousShowsSlider />
      </div>
    </main>
  );
}
