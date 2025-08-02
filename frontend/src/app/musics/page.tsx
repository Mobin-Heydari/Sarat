import Image from "next/image";

import { CiMusicNote1 } from "react-icons/ci";

import { Audio } from "@/types/audio";

import HeroSection from "@/components/HeroSection";
import MusicHoverEffectSection from "@/components/MusicHoverEffectSection";





export default async function Musics() {

    const response = await fetch(`http://127.0.0.1:8000/audios/list/`);
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
