import { notFound } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import { Funny } from '@/types/funny';
import { Metadata } from 'next';
import FunnyDetail from '@/components/funny/FunnyDetail';
import { FaArrowAltCircleLeft } from 'react-icons/fa';



export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/funny/${params.slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return {};

  const data: Funny = await res.json();

  const pageTitle = `${data.title} | شوخی بامزه از گروه سرود صراط`;
  const pageDescription = `شوخی بامزه با عنوان "${data.title}" منتشر شده در تاریخ ${data.created_at_jalali}. این محتوا بخشی از مجموعه طنزهای فرهنگی گروه سرود صراط است.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: ['شوخی', 'طنز', 'بامزه', 'گروه سرود صراط', 'فرهنگ', 'محتوای خنده‌دار', data.title],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://serat.ir/funny/${params.slug}`,
      siteName: 'گروه سرود صراط',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${data.poster}`,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: 'fa_IR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.poster}`],
    },
    alternates: {
      canonical: `https://serat.ir/funny/${params.slug}`,
    },
  };
}


export default async function FunnyDetailPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/funny/detail/${params.slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const data: Funny = await res.json();

  return (
    <main className="w-full min-h-screen bg-base-light dark:bg-base-dark pb-20">
      <HeroSection
        title="شوخی بامزه از صراط"
        mainText={data.title}
        subText={`منتشر شده در ${data.created_at_jalali} — بازدید: ${data.views}`}
        buttonTitle="بازگشت به لیست شوخی‌ها"
        buttonIcon={<FaArrowAltCircleLeft />}
        buttonPosition="left"
        buttonUrl="/funny"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      <FunnyDetail data={data} />
    </main>
  );
}
