import { Metadata } from "next";
import Image from "next/image";

import { FaInstalod } from "react-icons/fa6";

import { Story } from "@/types/stories";

import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";




export const metadata: Metadata = {
  title: 'استوری‌های فرهنگی گروه سرود صراط | لحظات کوتاه اما ماندگار',
  description:
    'در این صفحه مجموعه‌ای از استوری‌های فرهنگی، مذهبی و اجتماعی گروه سرود صراط را مشاهده می‌کنید. هر استوری، لحظه‌ای از معنا، هنر و همدلی است.',
  keywords: [
    'استوری',
    'استوری فرهنگی',
    'استوری مذهبی',
    'گروه سرود صراط',
    'محتوای کوتاه',
    'ویدیو کوتاه',
    'لحظات الهام‌بخش',
  ],
  openGraph: {
    title: 'استوری‌های فرهنگی گروه سرود صراط',
    description:
      'مجموعه‌ای از استوری‌های کوتاه و الهام‌بخش با مضامین فرهنگی و مذهبی از گروه سرود صراط.',
    url: 'https://serat.ir/stories',
    siteName: 'گروه سرود صراط',
    images: [
      {
        url: 'https://serat.ir/og-stories.jpg',
        width: 1200,
        height: 630,
        alt: 'استوری‌های گروه سرود صراط',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'استوری‌های گروه سرود صراط',
    description: 'لحظاتی کوتاه اما پرمعنا از هنر فرهنگی و مذهبی.',
    images: ['https://serat.ir/og-stories.jpg'],
  },
};


export default async function StoriesPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/stories/list/`, {
    cache: 'no-store',
  });
  const stories: Story[] = await response.json();

  return (
    <main className="flex flex-col gap-20 w-full px-6 py-12 bg-base-light dark:bg-base-dark">
      {/* Hero Section */}
      <HeroSection
        title="استوری‌های فرهنگی صراط"
        mainText="لحظاتی کوتاه، پیام‌هایی عمیق"
        subText="در این بخش، استوری‌های الهام‌بخش گروه سرود صراط را مشاهده می‌کنید."
        buttonTitle="مشاهده استوری‌ها"
        buttonIcon={<FaInstalod />}
        buttonPosition="right"
        buttonUrl="/stories"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-main-text-light dark:text-main-text-dark">
          چرا استوری‌های صراط؟
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          استوری‌های گروه صراط با هدف انتقال پیام‌های فرهنگی، مذهبی و اجتماعی در قالبی کوتاه و تأثیرگذار تولید شده‌اند. این محتواها مناسب برای اشتراک‌گذاری در شبکه‌های اجتماعی هستند و می‌توانند الهام‌بخش لحظات روزمره باشند.
        </p>
      </section>

      {/* Story Grid */}
      <section className="mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-main-text-light dark:text-main-text-dark">
          مجموعه استوری‌ها
        </h2>
        <StorySection stories={stories} />
      </section>

    </main>
  );
}
