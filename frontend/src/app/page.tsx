import Image from "next/image";

import { BsCollectionPlay } from "react-icons/bs";

import { Slider } from "@/components/ui/3DSlider";

import { slideData } from "@/data";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";





export default function Home() {
  return (
    <main className="flex flex-col justify-between gap-6 h-auto w-full px-12 py-5">
      {/* Hero */}
      <HeroSection
        title="مجموعه ی صراط"
        mainText="گروه سرود صراط"
        subText="به مجموعه ی صراط آمدید"
        buttonTitle="نماهنگ ها"
        buttonIcon={ <BsCollectionPlay /> }
        buttonPosition="right"
        buttonUrl="/cliparts"
      />
      {/* Slider */}
      <section className="relative overflow-hidden w-full h-full py-20 flex flex-col justify-between gap-8 " dir="ltr">
        <h2 className="text-3xl font-bold text-center my-5 bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark">برترین فعالیت های ما</h2>
        <p className="text-lg text-wrap text-right text-main-text-light dark:text-main-text-dark mb-3 p-3">توضبحات مختصر و مفید.</p>
        <Slider slides={slideData} />
      </section>
      <ScrollReveal />
      <ContactForm />
    </main>
  );
}
