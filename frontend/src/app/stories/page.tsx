import { Metadata } from "next";
import Image from "next/image";

import { FaInstalod } from "react-icons/fa6";

import { Story } from "@/types/stories";

import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";




export const metadata: Metadata = {
  title: 'استوری ها',
  description: 'استوری های برتر گروه سرود صراط.',
};



export default async function Stories() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/stories/list/`);
    const stories: Story[] = await response.json();

    return (
        <main className="flex flex-col justify-between gap-9 h-auto w-full xl:p-12 p-4">
            {/* Hero */}
            <HeroSection
                title="مجموعه ی صراط"
                mainText="استوری های برتر مجموعه"
                subText="به مجموعه ی صراط آمدید"
                buttonTitle="استوری ها"
                buttonIcon={ <FaInstalod /> }
                buttonPosition="right"
                buttonUrl="/stories"
            />
            <StorySection stories={stories} />
        </main>
    );
}
