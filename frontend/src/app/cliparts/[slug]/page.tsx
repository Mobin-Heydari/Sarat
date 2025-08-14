import Link from 'next/link';
import { Metadata } from 'next';

import { BsCollectionPlay } from 'react-icons/bs';

import { Clipart } from "@/types/clipart";

import HeroSection from '@/components/HeroSection';
import FamousCliparts from '@/components/FamousCliparts';




type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/cliparts/detail/${params.slug}/`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const clipart: Clipart = await res.json();

    return {
      title: clipart.title,
      description: clipart.description,
    };
  } catch (e) {
    return {
      title: 'یافت نشد',
      description: 'صوت یافت نشده است صبر کنید.',
    };
  }
}


export const dynamic = 'force-dynamic';


export default async function ClipartDetail({ params }: Props) {
    const { slug } = params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/cliparts/detail/${slug}/`,
        { cache: 'no-store' }
    );
    const clipart: Clipart = await response.json();


    return (
        <main className="flex flex-col justify-between gap-24 mb-14">
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
            <section className="flex flex-col justify-center items-center gap-4">
                <h2 className="text-center my-5 text-3xl bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary-light via-success-light to-selected-light  dark:from-primary-dark dark:via-success-dark dark:to-selected-dark [text-shadow:0_0_rgba(0,0,0,0.1)] font-bold">{clipart.title}</h2>
                <div className="w-full max-w-3xl mx-auto aspect-video">
                    <iframe
                        className="w-full h-full border-0"
                        src={clipart.video}
                        allowFullScreen
                    />
                </div>
            </section>
            <section className="flex flex-col justify-center items-center gap-4">
                <h3 className="text-center my-5 text-2xl bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary-light via-success-light to-selected-light  dark:from-primary-dark dark:via-success-dark dark:to-selected-dark [text-shadow:0_0_rgba(0,0,0,0.1)] font-bold">متن نماهنگ</h3>
                <div className="text-main-text-light dark:text-main-text-dark text-wrap text-lg" dangerouslySetInnerHTML={{ __html: clipart.text }} />
            </section>
            <section className="flex flex-col justify-between gap-9 mx-auto">
                <div className="flex justify-between flex-col md:flex-row items-center gap-y-9 mx-2">
                    <h2 className="text-3xl font-bold text-center bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark p-2">پربازدید ترین و محبوبترین نماهنگ ها</h2>
                    <Link href="/cliparts/" className="text-xl font-bold  bg-base-light dark:bg-base-dark border-2 p-3 rounded-xl border-primary-light dark:border-primary-dark hover:text-highlight-text-light hover:bg-primary-light dark:hover:text-highlight-text-dark dark:hover:bg-primary-dark transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                        مشاهده بیشتر
                    </Link>
                </div>
                <FamousCliparts />
            </section>
        </main>
    );
}