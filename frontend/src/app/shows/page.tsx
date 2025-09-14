import HeroSection from '@/components/HeroSection';
import { Show } from '@/types/show';
import ShowCard from '@/components/shows/ShowCard';
import { FaAngleLeft } from 'react-icons/fa6';




export default async function ShowsListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/lives/shows/`, {
    cache: 'no-store',
  });
  const data: Show[] = await res.json();

  return (
    <main className="w-full min-h-screen bg-base-light dark:bg-base-dark pb-20 mt-10">
      {/* 🎬 Hero Section */}
      <HeroSection
        title="لیست اجراهای صراط"
        mainText="هر اجرا یک داستانه، هر صحنه یک خاطره"
        subText="در اینجا اجراهای زنده، تئاترهای فرهنگی، موسیقی‌های محلی و لحظات هنری رو مرور می‌کنیم. با ما همراه شوید و اجراهای خودتان را ثبت کنید."
        buttonTitle="ثبت اجرای جدید"
        buttonIcon={<FaAngleLeft />}
        buttonPosition="right"
        buttonUrl="/submit-show"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      {/* 🧠 Intro Section */}
      <section className="max-w-4xl mx-auto text-center px-4 mt-12 space-y-6">
        <h2 className="text-3xl font-bold text-main-text-light dark:text-main-text-dark">
          چرا اجراهای صراط؟
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          اجراهای زنده همیشه بخشی از فرهنگ و ارتباط انسانی بودن. از تئاترهای مدرسه‌ای تا کنسرت‌های محلی، این صفحه جاییه برای ثبت و اشتراک‌گذاری لحظاتی که با هنر و احساس شکل گرفتن. ما باور داریم که اجرا می‌تونه دل‌ها رو به هم نزدیک‌تر کنه.
        </p>
      </section>

      {/* 📦 Shows List */}
      <section className="md:mx-10 px-4 mt-16">
        <h2 className="text-2xl font-bold text-main-text-light dark:text-main-text-dark mb-8 text-center">
          لیست اجراهای ثبت‌شده
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, i) => (
            <ShowCard
              key={i}
              slug={item.slug}
              poster={item.poster}
              title={item.title}
              created_at_jalali={item.created_at_jalali}
              views={item.views}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
