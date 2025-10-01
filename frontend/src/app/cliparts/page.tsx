import { Metadata } from "next";


import ClipartCard from "@/components/ClipartCard";
import { Clipart } from "@/types/clipart";
import HeroSection from "@/components/HeroSection";
import { BsCollectionPlay } from "react-icons/bs";




export const metadata: Metadata = {
  title: 'نماهنگ‌های گروه سرود صراط | مجموعه ویدیویی فرهنگی',
  description: 'در این صفحه می‌توانید مجموعه‌ای از نماهنگ‌های برتر گروه سرود صراط را مشاهده کنید. نماهنگ‌هایی با مضامین فرهنگی، مذهبی و اجتماعی برای تمام سنین.',
  keywords: ['نماهنگ', 'گروه سرود', 'صراط', 'ویدیو فرهنگی', 'نماهنگ مذهبی', 'نماهنگ اجتماعی', 'کلیپ هنری'],
  openGraph: {
    title: 'نماهنگ‌های گروه سرود صراط',
    description: 'مجموعه‌ای از نماهنگ‌های برتر با مضامین فرهنگی و مذهبی از گروه سرود صراط.',
    url: 'https://serat.ir/cliparts',
    siteName: 'گروه سرود صراط',
    images: [
      {
        url: 'https://serat.ir/og-cliparts.jpg',
        width: 1200,
        height: 630,
        alt: 'نماهنگ‌های گروه سرود صراط',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نماهنگ‌های گروه سرود صراط',
    description: 'مجموعه‌ای از نماهنگ‌های فرهنگی و مذهبی برای تمام سنین.',
    images: ['https://yourdomain.com/og-cliparts.jpg'],
  },
};


export default async function ClipartsPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/cliparts/`, {
    cache: 'no-store',
  });
  const cliparts: Clipart[] = await response.json();

  return (
    <main className="flex flex-col gap-20 w-full bg-base-light dark:bg-base-dark">
      {/* Hero */}
      <HeroSection
        title="نماهنگ‌های گروه سرود صراط"
        mainText="بخش نماهنگ ها "
        subText="روایت های تصویری، جلوه های هنری"
        buttonTitle="مشاهده نماهنگ‌ها"
        buttonIcon={<BsCollectionPlay />}
        buttonPosition="right"
        buttonUrl="/cliparts"
        buttonClasses="bg-primary-light dark:bg-primary-dark"
      />

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6 px-4">
        <h2 className="text-3xl font-bold text-main-text-light dark:text-main-text-dark">
          چه‌طور نماهنگ‌های ما متفاوت‌اند
        </h2>
        <p className="text-lg text-main-text-light dark:text-main-text-dark leading-relaxed">
          نماهنگ‌های صراط ترکیبی از موسیقی جمعی، تصویرپردازی معنی‌دار و روایت‌های مؤثر‌اند. هر اثر با مشارکت نوجوانان و جوانان تولید می‌شود تا هم پیام فرهنگی منتقل شود و هم تجربه بصری قدرتمندی خلق گردد.
        </p>
      </section>

      {/* Clipart Grid */}
      <section className="mx-15 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-main-text-light dark:text-main-text-dark">
          آرشیو نماهنگ‌ها
        </h2>

        {cliparts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-main-text-light dark:text-main-text-dark mb-4">
              هنوز نماهنگی منتشر نشده
            </h3>
            <p className="text-base text-muted-foreground">
              ما در حال آماده‌سازی نماهنگ‌های جدید هستیم. بعداً دوباره سر بزنید یا اگر نماهنگی دارید آن را برای انتشار ارسال کنید.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {cliparts.map((item) => (
              <ClipartCard key={item.slug} {...item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
