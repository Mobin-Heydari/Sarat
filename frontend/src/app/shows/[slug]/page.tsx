import { Metadata } from 'next';
import { BsCollectionPlay } from 'react-icons/bs';

import { Show } from '@/types/show';
import HeroSection from '@/components/HeroSection';
import ShowVideo from '@/components/shows/ShowVideo';
import ShowText from '@/components/shows/ShowText';
import FamousShowsSlider from '@/components/shows/FamousShowSlider';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/lives/shows/detail/${slug}/`, {
      cache: 'no-store',
    });
    const show: Show = await res.json();

    const pageTitle = `${show.title} | اجرای فرهنگی از گروه سرود صراط`;
    const pageDescription = show.description || `اجرای "${show.title}" از مجموعه آثار فرهنگی گروه سرود صراط.`;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: ['اجرا', 'گروه سرود', 'صراط', 'اجرای فرهنگی', 'اجرای مذهبی', show.title],
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `https://serat.ir/shows/${slug}`,
        siteName: 'گروه سرود صراط',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${show.poster}`,
            width: 1200,
            height: 630,
            alt: show.title,
          },
        ],
        locale: 'fa_IR',
        type: 'video.other',
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: [`${process.env.NEXT_PUBLIC_MEDIA_URL}${show.poster}`],
      },
      alternates: {
        canonical: `https://serat.ir/shows/${slug}`,
      },
    };
  } catch {
    return {
      title: 'اجرای مورد نظر یافت نشد',
      description: 'متأسفانه اطلاعات این اجرا در حال حاضر در دسترس نیست.',
    };
  }
}

export default async function ShowDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/lives/shows/detail/${slug}/`, {
    cache: 'no-store',
  });
  const show: Show = await res.json();

  return (
    <main className="flex flex-col gap-20 w-full min-h-screen bg-base-light dark:bg-base-dark pb-20">
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

      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark">درباره این اجرا</h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          {show.description}
        </p>
      </section>

      <ShowVideo video={show.video} />
      <ShowText html={show.text || 'متنی برای این اجرا ثبت نشده است.'} />

      <div className="mx-10">
        <FamousShowsSlider />
      </div>
    </main>
  );
}
