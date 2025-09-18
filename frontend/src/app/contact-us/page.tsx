import { Metadata } from 'next';
import { BsChatSquareText } from 'react-icons/bs';

import HeroSection from '@/components/HeroSection';
import ContactIntro from '@/components/contact/ContactIntro';
import ContactInfo from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import ContactFAQ from '@/components/contact/ContactFAQ';
import ContactProcess from '@/components/contact/ContactProcess';

export const metadata: Metadata = {
  title: 'تماس با ما',
  description: 'ارتباط مستقیم با گروه سرود صراط برای همکاری، عضویت یا دریافت اطلاعات.',
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

      <ContactIntro />
      <ContactInfo />
      <ContactProcess />
      <ContactForm />
      <ContactFAQ />
    </main>
  );
}
