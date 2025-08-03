import Image from "next/image";

import { BsViewList } from 'react-icons/bs';

import { ContactForm } from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";





export default function ContactUs() {
  return (
    <main className="flex flex-col justify-between gap-6 h-auto w-full p-12">
      {/* Hero */}
      <HeroSection
        title="تماس با ما"
        mainText="برای ارتباط و همکاری فرم را پر کنید"
        subText="به مجموعه ی صراط آمدید"
        buttonTitle="درباره ی ما"
        buttonIcon={ <BsViewList /> }
        buttonPosition="right"
        buttonUrl="/cliparts"
      />
      <ContactForm />
    </main>
  );
}
