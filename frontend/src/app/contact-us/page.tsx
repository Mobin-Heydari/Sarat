import { Metadata } from 'next';

import { BsChatSquareText } from 'react-icons/bs';

import ContactInfo from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import ContactFAQ from '@/components/contact/ContactFAQ';
import HeroSection from '@/components/HeroSection';


export const metadata: Metadata = {
  title: {
    default: "تماس با ما — گروه سرود صراط",
    template: "%s | سرود صراط",
  },
  description:
    "ارتباط مستقیم با گروه سرود صراط برای همکاری هنری، عضویت در گروه، رزرو اجراها و دریافت اطلاعات بیشتر درباره پروژه‌ها و کارگاه‌های آموزشی.",
  keywords: [
    "گروه سرود",
    "سرود صراط",
    "تماس با ما",
    "همکاری هنری",
    "رزرو اجرا",
    "کارگاه موسیقی",
    "شرکت در گروه سرود",
    "اطلاعات تماس سرود صراط",
  ],
  metadataBase: new URL("https://seratsoroud.ir/"),
  authors: [
    { name: "گروه سرود صراط", url: "https://seratsoroud.ir/about" },
    { name: "مدیریت روابط عمومی", url: "https://seratsoroud.ir/team" },
  ],
  alternates: {
    canonical: "https://seratsoroud.ir/contact",
  },
  openGraph: {
    title: "تماس با ما — گروه سرود صراط",
    description:
      "برای همکاری، عضویت، رزرو اجرا یا سوالات دیگر با گروه سرود صراط در تماس باشید. پاسخ‌گویی سریع و معرفی خدمات گروه.",
    url: "https://seratsoroud.ir/contact",
    siteName: "سرود صراط",
    images: [
      {
        url: "https://seratsoroud.ir/images/og/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "تماس با گروه سرود صراط",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle",
    title: "تماس با ما — گروه سرود صراط",
    description:
      "همکاری، عضویت و رزرو اجرا — با گروه سرود صراط در تماس باشید تا در پروژه‌های آینده همراه باشید.",
    images: ["https://seratsoroud.ir/images/og/contact-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function ContactUs() {
  return (
    <main className="flex flex-col gap-16">
      <HeroSection
        title="تماس با ما"
        mainText="در ارتباط باشید"
        subText="ما مشتاق شنیدن صدای شما هستیم"
        buttonTitle="درباره‌ی ما"
        buttonIcon={<BsChatSquareText />}
        buttonPosition="right"
        buttonUrl="/about"
      />
      <ContactInfo />
      <ContactForm />
      <ContactFAQ />
    </main>
  );
}
