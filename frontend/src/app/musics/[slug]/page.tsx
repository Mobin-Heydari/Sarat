import Image from "next/image";

import { CiMusicNote1 } from "react-icons/ci";

import { Audio } from "@/types/audio";

import HeroSection from "@/components/HeroSection";
import MusicPlayer from "@/components/MusicPlayer";


export const dynamic = 'force-dynamic';

export default async function MusicDetail({
  params,
}: {
  params: { slug: string };
}) {
    // ① await the params proxy
    const { slug } = await params;

    // ② fetch with the real slug
    const response = await fetch(
        `http://127.0.0.1:8000/audios/detail/${slug}`,
        { cache: 'no-store' }      // disable caching if you need always-fresh data
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
                        src={`http://127.0.0.1:8000${data.music}`}
                        poster={`http://127.0.0.1:8000${data.poster}`}
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
