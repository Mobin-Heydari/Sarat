import { Metadata } from 'next';
import { FaInstalod } from 'react-icons/fa6';

import { Story } from '@/types/stories';
import HeroSection from '@/components/HeroSection';
import StoryVideoGallery from '@/components/StoryVideoGallery';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/stories/detail/${slug}/`, {
      cache: 'no-store',
    });

    const contentType = res.headers.get('content-type');
    if (!res.ok || !contentType?.includes('application/json')) {
      throw new Error('Invalid response');
    }

    const story: Story = await res.json();

    const pageTitle = `${story.title} | استوری فرهنگی از گروه سرود صراط`;
    const pageDescription =
      story.description ||
      `استوری "${story.title}" از مجموعه آثار کوتاه فرهنگی گروه سرود صراط، با پیام‌هایی از ایمان، همدلی و زیبایی.`;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: [
        'استوری',
        'استوری فرهنگی',
        'استوری مذهبی',
        'گروه سرود صراط',
        'محتوای کوتاه',
        'ویدیو کوتاه',
        story.title,
      ],
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `https://serat.ir/stories/${slug}`,
        siteName: 'گروه سرود صراط',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${story.poster}`,
            width: 1200,
            height: 630,
            alt: story.title,
          },
        ],
        locale: 'fa_IR',
        type: 'video.other',
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: [`${process.env.NEXT_PUBLIC_MEDIA_URL}${story.poster}`],
      },
      alternates: {
        canonical: `https://serat.ir/stories/${slug}`,
      },
    };
  } catch {
    return {
      title: 'استوری یافت نشد',
      description: 'متأسفانه اطلاعات این استوری در حال حاضر در دسترس نیست.',
    };
  }
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/stories/detail/${slug}/`, {
    cache: 'no-store',
  });

  const contentType = res.headers.get('content-type');
  if (!res.ok || !contentType?.includes('application/json')) {
    throw new Error('استوری یافت نشد یا پاسخ نامعتبر بود.');
  }

  const story: Story = await res.json();

  return (
    <main className="flex flex-col gap-20 w-full min-h-screen bg-base-light dark:bg-base-dark pb-20">
      <HeroSection
        title="استوری فرهنگی صراط"
        mainText={story.title}
        subText="لحظه‌ای کوتاه، پیامی عمیق"
        buttonTitle="بازگشت به استوری‌ها"
        buttonIcon={<FaInstalod />}
        buttonPosition="right"
        buttonUrl="/stories"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark">
          درباره این استوری
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          {story.description}
        </p>
      </section>

      <StoryVideoGallery story={story} />
    </main>
  );
}
