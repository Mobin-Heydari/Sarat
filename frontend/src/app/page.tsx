import { BsCollectionPlay } from "react-icons/bs";
import { ContactForm } from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import FamousCliparts from "@/components/FamousCliparts";
import ClipartsSlider from "@/components/ClipartsSlider";
import FunnyCardsContainer from "@/components/NewFunnyMoments";
import FamousMusicSection from "@/components/FamousMusicsSection";




export default function Home() {
  return (
    <main className="flex flex-col justify-between gap-20 h-auto w-full px-12 py-5">
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
      <section className="relative overflow-hidden w-full h-full pb-20 flex flex-col justify-between gap-12 mx-auto">
        <div className="flex justify-center flex-col md:flex-row items-center p-2">
          <h2 className="text-4xl font-bold text-center bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark p-2">جدید ترین نماهنگ ها</h2>
        </div>
        <div dir="ltr">
          <ClipartsSlider />
        </div>
      </section>

      <FamousCliparts />

      <FamousMusicSection />

      <FunnyCardsContainer />

      <ContactForm />
    </main>
  );
}
