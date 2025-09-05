import { Metadata } from 'next';
import { FaInstalod } from 'react-icons/fa6';
import { Story } from '@/types/stories';

import HeroSection from '@/components/HeroSection';
import StoryBanner from '@/components/StoryBanner';
import StoryVideoGallery from '@/components/StoryVideoGallery';
import StoryDescription from '@/components/StoryDescription';

type Props = {
  params: { slug: string };
};

export const dynamic = 'force-dynamic';


// ✅ FIXED: Await params.slug properly
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = props.params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/stories/detail/${slug}/`, {
      cache: 'no-store',
    });

    // ✅ Handle non-JSON responses
    const contentType = res.headers.get('content-type');
    if (!res.ok || !contentType?.includes('application/json')) {
      throw new Error('Invalid response');
    }

    const story: Story = await res.json();

    return {
      title: story.title,
      description: `استوری ${story.title} یکی از بهترین استوری‌های گروه سرود صراط.`,
    };
  } catch {
    return {
      title: 'یافت نشد',
      description: 'استوری یافت نشده است. لطفاً صبر کنید.',
    };
  }
}

export default async function StoryDetail({ params }: Props) {
  const { slug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/stories/detail/${slug}/`, {
    cache: 'no-store',
  });

  const contentType = res.headers.get('content-type');
  if (!res.ok || !contentType?.includes('application/json')) {
    throw new Error('استوری یافت نشد یا پاسخ نامعتبر بود.');
  }

  const story: Story = await res.json();

  return (
    <main className="flex flex-col gap-12 px-4 md:px-12 py-10">
      <HeroSection
        title="مجموعه‌ی صراط"
        mainText={story.title}
        subText="استوری برتر"
        buttonTitle="استوری‌ها"
        buttonIcon={<FaInstalod />}
        buttonPosition="right"
        buttonUrl="/stories"
      />

      <StoryBanner story={story} />
      <StoryVideoGallery story={story} />
      <StoryDescription text={story.text || 'متنی برای این استوری ثبت نشده است.'} />
    </main>
  );
}
