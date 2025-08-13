import Image from "next/image";
import { Metadata } from "next";

import { CiMusicNote1 } from "react-icons/ci";

import { Audio } from "@/types/audio";

import HeroSection from "@/components/HeroSection";
import MusicHoverEffectSection from "@/components/MusicHoverEffectSection";



export const metadata: Metadata = {
  title: 'صوت ها',
  description: 'صوت های برتر گروه سرود صراط.',
};


export default async function Musics() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/audios/`);
    const items: Audio[] = await response.json();

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
                buttonUrl="/audios"
            />
            <MusicHoverEffectSection items={items} />
        </main>
    );
}
