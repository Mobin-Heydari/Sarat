import HeroSection from '@/components/HeroSection';
import { Funny } from '@/types/funny';
import FunnyCard from '@/components/FunnyCard';
import { FaAngleLeft } from 'react-icons/fa6';



export const metadata = {
  title: 'صفحه خنده‌دار صراط | شوخی‌های ایرانی، لحظات طنز و خاطرات بامزه',
  description:
    'در صفحه خنده‌دار گروه سرود صراط، مجموعه‌ای از شوخی‌های روزمره، خاطرات بامزه، و لحظاتی طنزآمیز را ببینید که فقط ایرانی‌ها درک می‌کنن. با ما بخندید، لذت ببرید و شوخی خودتان را ارسال کنید!',
  keywords: [
    'طنز',
    'شوخی',
    'خنده',
    'صراط',
    'گروه سرود',
    'شوخی ایرانی',
    'طنز روزمره',
    'خاطرات بامزه',
    'محتوای طنز',
    'طنز فرهنگی',
  ],
  openGraph: {
    title: 'صفحه خنده‌دار صراط',
    description:
      'شوخی‌هایی که فقط ایرانی‌ها درک می‌کنن — مجموعه‌ای از لحظات طنز، خاطرات بامزه و ویدیوهای خنده‌دار از گروه سرود صراط.',
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
  const data: Funny[] = await res.json();

  return (
    <main className="w-full min-h-screen bg-base-light dark:bg-base-dark pb-20">
      {/* Hero Section */}
      <HeroSection
        title="صفحه خنده‌دار صراط"
        mainText="زندگی جدی هست... اما ما نه همیشه!"
        subText="در اینجا لحظاتی از طنز، شوخی‌های روزمره و چیزهایی که فقط ایرانی‌ها درک می‌کنن رو جمع کردیم."
        buttonTitle="ارسال شوخی"
        buttonIcon={<FaAngleLeft />}
        buttonPosition="right"
        buttonUrl="/submit-funny"
        buttonClasses="bg-success-light dark:bg-success-dark"
      />

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto text-center px-4 mt-12 space-y-6">
        <h2 className="text-3xl font-bold text-main-text-light dark:text-main-text-dark">
          چرا شوخی‌های صراط؟
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          شوخی‌های روزمره بخش جدایی‌ناپذیر فرهنگ ایرانی هستن. از خاطرات مدرسه تا لحظات خنده‌دار خانوادگی، این صفحه جاییه برای ثبت و اشتراک‌گذاری لحظاتی که لبخند به لب میارن. ما باور داریم که طنز می‌تونه دل‌ها رو به هم نزدیک‌تر کنه.
        </p>
      </section>

      {/* Funny List */}
      <section className="md:mx-10 px-4 mt-16">
        <h2 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark mb-8 text-center">
          لیست لحظات خنده‌دار
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, i) => (
            <FunnyCard
              slug={item.slug}
              poster={item.poster}
              title={item.title}
              createdAtJalalli={item.created_at_jalali}
              views={item.views}
              key={i}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
