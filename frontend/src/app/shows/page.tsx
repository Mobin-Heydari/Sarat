import HeroSection from '@/components/HeroSection';
import { Show } from '@/types/show';
import ShowCard from '@/components/shows/ShowCard';
import { FaAngleLeft } from 'react-icons/fa6';



export const metadata = {
  title: 'لیست اجراهای صراط | تئاتر، موسیقی، کمدی و اجراهای فرهنگی',
  description:
    'در صفحه اجراهای گروه صراط، مجموعه‌ای از اجراهای زنده، تئاترهای فرهنگی، موسیقی‌های محلی و لحظات هنری را مرور کنید. با ما همراه شوید و اجراهای خودتان را ثبت کنید!',
  keywords: [
    'اجرا',
    'تئاتر',
    'موسیقی',
    'کمدی',
    'صراط',
    'گروه سرود',
    'اجراهای فرهنگی',
    'نمایش زنده',
    'هنر ایرانی',
    'ثبت اجرا',
  ],
  openGraph: {
    title: 'لیست اجراهای صراط',
    description:
      'مروری بر اجراهای زنده، تئاترهای فرهنگی، موسیقی‌های محلی و لحظات هنری گروه صراط.',
    url: 'https://Serat.ir/shows',
    siteName: 'گروه سرود صراط',
    images: [
      {
        url: 'https://Serat.ir/og-shows.jpg',
        width: 1200,
        height: 630,
        alt: 'لیست اجراهای صراط',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'لیست اجراهای صراط',
    description: 'اجراهایی که دل‌ها رو به هم نزدیک‌تر می‌کنن — با ما همراه شوید!',
    images: ['https://Serat.ir/og-shows.jpg'],
  },
};



export default async function ShowsListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/lives/shows/`, {
    cache: "no-store",
  });
  const data: Show[] = await res.json();

  return (
    <main className="w-full min-h-screen bg-base-light dark:bg-base-dark pb-20 mt-10">
      {/* Hero Section */}
      <HeroSection
        title="اجراهای گروه سرود صراط"
        mainText="هر اجرا یک روایت، هر لحظه یک یادگار"
        subText="گلچین اجرا ها در رویداد ها و مراسمات "
        buttonTitle="اجرا ها"
        buttonIcon={<FaAngleLeft />}
        buttonPosition="right"
        buttonUrl="/shows"
      />

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto text-center px-4 mt-12 space-y-6">
        <h2 className="text-3xl font-bold text-main-text-light dark:text-main-text-dark">
          اجرای گروه سرود صراط را در این صفحه دنبال کنید :
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          اجراهای صراط پیوندی‌اند میان موسیقی، روایت و تجربه جمعی. از اجراهای کوچک تمرینی تا برنامه‌های صحنه‌ای بزرگ، هر اجرا فرصتی است برای انتقال پیام، برانگیختن احساس و ساختن خاطره‌ای مشترک.
        </p>
      </section>

      {/* Shows List */}
      <section className="md:mx-10 px-4 mt-16">
        <h3 className="text-xl font-semibold text-main-text-light dark:text-main-text-dark mb-6">
          اجراها
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h4 className="text-2xl font-medium text-main-text-light dark:text-main-text-dark mb-4">
                هیچ اجرای ثبت‌نشده‌ای وجود ندارد
              </h4>
              <p className="text-base text-muted-foreground mb-6">
                ما در حال گردآوری اجراهای تازه هستیم. اگر اجرا یا رویدادی دارید، با استفاده از دکمه «ثبت اجرای جدید» آن را به اشتراک بگذارید.
              </p>
            </div>
          ) : (
            data.map((item, i) => <ShowCard key={item.id ?? i} {...item} />)
          )}
        </div>
      </section>
    </main>
  );
}
