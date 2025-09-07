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

  return {
    title: `${data.title} | شوخی از صراط`,
    description: `شوخی بامزه: ${data.title} — منتشر شده در ${data.created_at_jalali}`,
    openGraph: {
      title: data.title,
      description: data.title,
      images: [{ url: data.poster }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.title,
      images: [data.poster],
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
