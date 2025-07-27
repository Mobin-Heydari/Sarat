import Image from "next/image";

import { FaInstalod } from "react-icons/fa6";

import { Story } from "@/types/stories";

import HeroSection from "@/components/HeroSection";
import StoryCard from "@/components/StoryCards";




export default async function Stories() {

    const response = await fetch(`http://127.0.0.1:8000/stories/list/`);
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
            {/* Slider */}
            <section className="relative overflow-hidden w-full h-full flex flex-col justify-between gap-8">
                <h2 className="text-3xl font-bold text-center my-5 bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark">نماهنگ های ما</h2>
                <p className="text-lg text-wrap text-right text-main-text-light dark:text-main-text-dark mb-3 p-3">توضبحات مختصر و مفید.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {stories.map(item => (
                        <div key={item.slug}>
                            <StoryCard {...item} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
