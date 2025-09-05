import { Metadata } from 'next';
import { BsViewList } from 'react-icons/bs';

import HeroSection from '@/components/HeroSection';
import ContactSection from '@/components/contact/ContactSection';



export const metadata: Metadata = {
  title: 'تماس با ما',
  description: 'تماس و همکاری مستقیم با گروه سرود صراط.',
};

export default function ContactUs() {
  return (
    <main className="flex flex-col gap-16 px-4 md:px-12 py-10">
      {/* Hero */}
      <HeroSection
        title="تماس با ما"
        mainText="برای ارتباط و همکاری فرم را پر کنید"
        subText="به مجموعه‌ی صراط خوش آمدید"
        buttonTitle="درباره‌ی ما"
        buttonIcon={<BsViewList />}
        buttonPosition="right"
        buttonUrl="/about"
      />

      <ContactSection />
    </main>
  );
}
