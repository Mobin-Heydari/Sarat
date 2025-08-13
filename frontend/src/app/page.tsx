import { BsCollectionPlay } from "react-icons/bs";
import { ContactForm } from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import FamousCliparts from "@/components/FamousCliparts";
import Link from "next/link";
import ClipartsSlider from "@/components/ClipartsSlider";
import FamousMusics from "@/components/FamousMusics";





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

      <section className="flex flex-col justify-between gap-9 mx-auto">
        <div className="flex justify-between flex-col md:flex-row items-center gap-y-9 mx-2">
          <h2 className="text-3xl font-bold text-center bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark">پربازدید ترین و محبوبترین نماهنگ ها</h2>
          <Link href="/cliparts/" className="text-xl font-bold  bg-base-light dark:bg-base-dark border-2 p-3 rounded-xl border-primary-light dark:border-primary-dark hover:text-highlight-text-light hover:bg-primary-light dark:hover:text-highlight-text-dark dark:hover:bg-primary-dark transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          مشاهده بیشتر
          </Link>
        </div>
        <FamousCliparts />
      </section>

      <section className="flex flex-col justify-between gap-9">
        <div className="flex justify-between flex-col md:flex-row items-center gap-y-9 mx-2">
          <h2 className="text-3xl font-bold text-center bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark">پربازدید ترین و محبوبترین صوت ها</h2>
          <Link href="/musics/" className="text-xl font-bold  bg-base-light dark:bg-base-dark border-2 p-3 rounded-xl border-primary-light dark:border-primary-dark hover:text-highlight-text-light hover:bg-primary-light dark:hover:text-highlight-text-dark dark:hover:bg-primary-dark transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          مشاهده بیشتر
          </Link>
        </div>
        <FamousMusics />
      </section>

      <ContactForm />
    </main>
  );
}
