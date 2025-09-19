import { Metadata } from 'next';
import { BsCollectionPlay } from 'react-icons/bs';

import { Clipart } from '@/types/clipart';
import HeroSection from '@/components/HeroSection';
import FamousCliparts from '@/components/FamousCliparts';
import ClipartVideo from '@/components/ClipartVideo';
import ClipartText from '@/components/ClipartText';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/cliparts/detail/${slug}/`, {
      cache: 'no-store',
    });
    const clipart: Clipart = await res.json();

    const pageTitle = `${clipart.title} | نماهنگ فرهنگی از گروه سرود صراط`;
    const pageDescription =
      clipart.description || `نماهنگ "${clipart.title}" از مجموعه آثار فرهنگی گروه سرود صراط.`;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: ['نماهنگ', 'گروه سرود', 'صراط', 'نماهنگ فرهنگی', 'نماهنگ مذهبی', clipart.title],
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `https://serat.ir/cliparts/${slug}`,
        siteName: 'گروه سرود صراط',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${clipart.poster}`,
            width: 1200,
            height: 630,
            alt: clipart.title,
          },
        ],
        locale: 'fa_IR',
        type: 'video.other',
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: [`${process.env.NEXT_PUBLIC_MEDIA_URL}${clipart.poster}`],
      },
      alternates: {
        canonical: `https://serat.ir/cliparts/${slug}`,
      },
    };
  } catch {
    return {
      title: 'نماهنگ یافت نشد',
      description: 'متأسفانه اطلاعات این نماهنگ در حال حاضر در دسترس نیست.',
    };
  }
}

export default async function ClipartDetail({ params }: PageProps) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/cliparts/detail/${slug}/`, {
    cache: 'no-store',
  });
  const clipart: Clipart = await res.json();

  return (
    <main className="flex flex-col gap-20 w-full min-h-screen bg-base-light dark:bg-base-dark pb-20">
      <HeroSection
        title="نماهنگ ویژه از گروه صراط"
        mainText={clipart.title}
        subText="در این بخش، نماهنگ‌های فرهنگی و مذهبی را با کیفیت بالا مشاهده می‌کنید."
        buttonTitle="بازگشت به لیست نماهنگ‌ها"
        buttonIcon={<BsCollectionPlay />}
        buttonPosition="left"
        buttonUrl="/cliparts"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark">
          درباره این نماهنگ
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          {clipart.description}
        </p>
      </section>

      <ClipartVideo video={clipart.video} />
      <ClipartText html={clipart.text || 'متنی برای این نماهنگ ثبت نشده است.'} />

      <div className="mx-10">
        <FamousCliparts />
      </div>
    </main>
  );
}
