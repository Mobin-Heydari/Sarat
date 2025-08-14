import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

import { CiMusicNote1 } from "react-icons/ci";

import { Audio } from "@/types/audio";

import HeroSection from "@/components/HeroSection";
import MusicPlayer from "@/components/MusicPlayer";


type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log("Metadata params:", params);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/audios/detail/${params.slug}/`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const audio: Audio = await res.json();

    return {
      title: audio.title,
      description: audio.description,
    };
  } catch (e) {
    return {
      title: 'یافت نشد',
      description: 'صوت یافت نشده است صبر کنید.',
    };
  }
}



export const dynamic = 'force-dynamic';

export default async function MusicDetail({ params }: Props) {
    const { slug } = params; // ✅ already available

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/audios/detail/${slug}/`,
        { cache: 'no-store' }
    );

    const data: Audio = await response.json();

    return (
        <main className="flex flex-col justify-between gap-9 h-auto w-full xl:p-12 p-4">
            {/* Hero */}
            <HeroSection
                title="مجموعه ی صراط"
                mainText="صوت های برتر مجموعه"
                subText="به مجموعه ی صراط آمدید"
                buttonTitle="صوت ها"
                buttonIcon={ <CiMusicNote1 /> }
                buttonPosition="right"
                buttonUrl="/musics"
            />
            <section className="flex flex-col justify-evenly gap-3">
                <div>
                    <h1 className="text-center my-5 text-2xl bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary-light via-success-light to-selected-light  dark:from-primary-dark dark:via-success-dark dark:to-selected-dark [text-shadow:0_0_rgba(0,0,0,0.1)] font-bold">
                        {data.title}
                    </h1>
                    <MusicPlayer
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.music}`}
                        poster={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.poster}`}
                        title={data.title}
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h2 className="text-center my-5 text-2xl bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary-light via-success-light to-selected-light  dark:from-primary-dark dark:via-success-dark dark:to-selected-dark [text-shadow:0_0_rgba(0,0,0,0.1)] font-bold">
                        متن صوت {data.title}
                    </h2>
                    <div className="w-full bg-base-light/[0.7] dark:bg-base-dark/[0.7]">
                        <div className="text-main-text-light dark:text-main-text-dark text-wrap text-lg" dangerouslySetInnerHTML={{ __html: data.text }} />
                    </div>
                </div>
            </section>
        </main>
    );
}
