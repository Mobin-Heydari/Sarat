import { Metadata } from 'next';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

import { Funny } from '@/types/funny';
import HeroSection from '@/components/HeroSection';
import FunnyDetail from '@/components/funny/FunnyDetail';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/funny/detail/${slug}`, {
      cache: 'no-store',
    });
    const funny: Funny = await res.json();

    const pageTitle = `${funny.title} | شوخی بامزه از گروه سرود صراط`;
    const pageDescription = `شوخی بامزه با عنوان "${funny.title}" منتشر شده در تاریخ ${funny.created_at_jalali}. این محتوا بخشی از مجموعه طنزهای فرهنگی گروه سرود صراط است.`;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: ['شوخی', 'طنز', 'بامزه', 'گروه سرود صراط', 'فرهنگ', 'محتوای خنده‌دار', funny.title],
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `https://serat.ir/funny/${slug}`,
        siteName: 'گروه سرود صراط',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${funny.poster}`,
            width: 1200,
            height: 630,
            alt: funny.title,
          },
        ],
        locale: 'fa_IR',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: [`${process.env.NEXT_PUBLIC_MEDIA_URL}${funny.poster}`],
      },
      alternates: {
        canonical: `https://serat.ir/funny/${slug}`,
      },
    };
  } catch {
    return {
      title: 'شوخی یافت نشد',
      description: 'متأسفانه اطلاعات این شوخی در حال حاضر در دسترس نیست.',
    };
  }
}

export default async function FunnyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/funny/detail/${slug}`, {
    cache: 'no-store',
  });
  const funny: Funny = await res.json();

  return (
    <main className="flex flex-col gap-20 w-full min-h-screen bg-base-light dark:bg-base-dark pb-20">
      <HeroSection
        title="شوخی بامزه از گروه صراط"
        mainText={funny.title}
        subText={`منتشر شده در ${funny.created_at_jalali} — بازدید: ${funny.views}`}
        buttonTitle="بازگشت به لیست شوخی‌ها"
        buttonIcon={<FaArrowAltCircleLeft />}
        buttonPosition="left"
        buttonUrl="/funny"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      <FunnyDetail data={funny} />
    </main>
  );
}
