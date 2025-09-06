import HeroSection from '@/components/HeroSection';
import { Funny } from '@/types/funny';
import FunnyCard from '@/components/FunnyCard';
import { FaAngleLeft } from 'react-icons/fa6';



export const metadata = {
  title: 'صفحه خنده‌دار صراط | لحظات طنز و شوخی‌های روزمره',
  description:
    'در صفحه خنده‌دار گروه سرود صراط، مجموعه‌ای از شوخی‌ها، لحظات طنز و خاطرات بامزه را ببینید که فقط ایرانی‌ها درک می‌کنن. بخندید، لذت ببرید و شوخی خودتان را ارسال کنید!',
  keywords: ['طنز', 'شوخی', 'خنده', 'صراط', 'گروه سرود', 'لحظات بامزه', 'شوخی ایرانی'],
  openGraph: {
    title: 'صفحه خنده‌دار صراط',
    description:
      'مجموعه‌ای از لحظات طنز و شوخی‌های روزمره که فقط ایرانی‌ها درک می‌کنن. با ما بخندید!',
    url: 'https://Serat.ir/funny',
    siteName: 'گروه سرود صراط',
    images: [
      {
        url: 'https://Serat.ir/og-funny.jpg',
        width: 1200,
        height: 630,
        alt: 'صفحه خنده‌دار صراط',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'صفحه خنده‌دار صراط',
    description: 'شوخی‌هایی که فقط ایرانی‌ها درک می‌کنن — با ما بخندید!',
    images: ['https://Serat.ir/og-funny.jpg'],
  },
};


export default async function FunnyListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/funny/`, {
      cache: 'no-store',
   });
   const data: Funny[] = await res.json()
  
  return (
    <main className="w-full min-h-screen bg-base-light dark:bg-base-dark pb-20">
      {/* Hero Section */}
      <HeroSection
        title="صفحه خنده‌دار صراط"
        mainText="زندگی جدی هست... اما ما نه همیشه!"
        subText="در اینجا لحظاتی از طنز، شوخی‌های روزمره و چیزهایی که فقط ایرانی‌ها درک می‌کنن رو جمع کردیم."
        buttonTitle="درباره ما"
        buttonIcon={<FaAngleLeft />}
        buttonPosition="right"
        buttonUrl="/submit-funny"
        buttonClasses="bg-success-light dark:bg-success-dark"
      />

      {/* Funny List */}
      <section className="md:mx-10 px-4 mt-16">
        <h2 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark mb-8 text-center">
          لیست لحظات خنده‌دار
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, i) => (
            <FunnyCard slug={item.slug} poster={item.poster} title={item.title} createdAtJalalli={item.created_at_jalali} views={item.views} key={i}/>
          ))}
        </div>
      </section>
    </main>
  );
}
