import { FaInstalod } from "react-icons/fa6";


import { Story } from "@/types/stories";
import HeroSection from '@/components/HeroSection';
import StoryVideoPlayer from "@/components/StoryVideoPlayer";


export default async function StoryDetail({ params }: { params: { slug: string } }) {

    const response = await fetch(`http://127.0.0.1:8000/stories/detail/${params.slug}/`);
    const item: Story = await response.json();

    console.log(item)
    return (
        <main className="flex flex-col justify-between gap-5 mb-14">
            {/* Hero */}
            <HeroSection
                title="مجموعه ی صراط"
                mainText={item.title}
                subText="استوری برتر"
                buttonTitle="استوری ها"
                buttonIcon={ <FaInstalod /> }
                buttonPosition="right"
                buttonUrl="/stories"
            />
            <section className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-y-9 gap-x-6 mx-6">
                {item.videos.map((video) => (
                    <div className="flex flex-col justify-between gap-3 p-3 rounded-2xl border-[1px] border-primary-light dark:border-primary-dark" key={video.slug}>
                        <StoryVideoPlayer video_url={video.video}/>
                        <h3 className="text-center my-5 text-2xl bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 text-primary-light dark:text-primary-dark [text-shadow:0_0_rgba(0,0,0,0.1)] font-bold">{video.title}</h3>
                    </div>
                ))}
            </section>
        </main>
    );
}