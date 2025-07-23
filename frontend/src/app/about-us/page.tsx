
import HeroSection from "@/components/HeroSection"
import { BsHouseExclamation } from "react-icons/bs"

import { TracingBeam } from "@/components/ui/TrackingBeam"

import { aboutData } from "@/data"



export default async function AboutUs() {
    return (
        <main className="mb-24">
            {/* Hero */}
            <HeroSection
                title="درباره ی ما"
                mainText="گروه سرود صراط"
                subText="به مجموعه ی صراط آمدید"
                buttonTitle="خانه"
                buttonIcon={ <BsHouseExclamation /> }
                buttonPosition="right"
                buttonUrl="/"
            />
            <section className="">
                <TracingBeam className="px-8">
                    <div className="max-w-2xl mx-auto antialiased pt-4 relative" dir="rtl">
                        {aboutData.map((item, index) => (
                            <div key={`content-${index}`} className="mb-10">
                                <h2 className="bg-primary-light dark:bg-primary-dark text-main-text-light dark:text-main-text-dark rounded-full text-sm w-fit px-4 py-1 mb-4">
                                    {item.badge}
                                </h2>
                    
                                <p className="text-xl mb-4">
                                    {item.title}
                                </p>
                    
                                <div className="text-sm prose prose-sm dark:prose-invert text-main-text-light dark:text-main-text-dark">
                                    {item?.image && (
                                        <img
                                        src={item.image}
                                        alt="blog thumbnail"
                                        height="1000"
                                        width="1000"
                                        className="rounded-lg mb-10 object-cover"
                                        />
                                    )}
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </TracingBeam>
            </section>
        </main>
    )
}