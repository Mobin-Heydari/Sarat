import { Metadata } from 'next';
import { BsCollectionPlay } from 'react-icons/bs';
import Link from 'next/link';

import { Clipart } from '@/types/clipart';
import HeroSection from '@/components/HeroSection';
import FamousCliparts from '@/components/FamousCliparts';
import ClipartBanner from '@/components/ClipartBanner';
import ClipartVideo from '@/components/ClipartVideo';
import ClipartText from '@/components/ClipartText';

type Props = {
  params: { slug: string };
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/cliparts/detail/${params.slug}/`, {
      cache: 'no-store',
    });
    const clipart: Clipart = await res.json();

    return {
      title: clipart.title,
      description: clipart.description,
    };
  } catch {
    return {
      title: 'یافت نشد',
      description: 'نماهنگ یافت نشده است. لطفاً صبر کنید.',
    };
  }
}

export default async function ClipartDetail({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/cliparts/detail/${params.slug}/`, {
    cache: 'no-store',
  });
  const clipart: Clipart = await res.json();

  return (
    <main className="flex flex-col gap-12">


      <ClipartBanner clipart={clipart} />
      <ClipartVideo video={clipart.video} />
      <ClipartText html={clipart.text || 'متنی برای این نماهنگ ثبت نشده است.'} />

      <FamousCliparts />
    </main>
  );
}
