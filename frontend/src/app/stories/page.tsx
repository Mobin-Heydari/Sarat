import { Metadata } from "next";

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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/stories/list/`,
    { cache: "no-store" }
  );
  const stories: Story[] = await response.json();

  return (
    <main className="flex flex-col gap-20 w-full bg-base-light dark:bg-base-dark">
      {/* Hero Section */}
      <HeroSection
        title="استوری‌های گروه سرود صراط"
        mainText="بخش استوری های گروه"
        subText=" نما های کوتاه از اجرا، ریلز ها و پشت صحنه"
        buttonTitle="دیدن استوری‌ها"
        buttonIcon={<FaInstalod />}
        buttonPosition="right"
        buttonUrl="/stories"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6 px-4">
        <h2 className="text-3xl font-bold text-main-text-light dark:text-main-text-dark">
          چه چیزی استوری‌های ما را متمایز می‌کند
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          استوری‌های گروه صراط ترکیبی از اجرا، روایت و حس جمعی‌اند. هر قطعه کوتاه با هدف خلق یک لحظه احساسی ساخته می‌شود تا هم پیام فرهنگی منتقل شود و هم تجربه شنیداری و بصری تقویت گردد.
        </p>
      </section>

      {/* Story Grid */}
      <section className="mx-auto w-full px-4">
        <StorySection
          stories={stories}
        />
      </section>
    </main>
  );
}
