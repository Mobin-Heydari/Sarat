import Image from "next/image";

import ClipartCard from "@/components/ClipartCard";
import { Clipart } from "@/types/clipart";



export default async function Home() {

    const response = await fetch(`http://127.0.0.1:8000/cliparts/list/`);
    const cliparts: Clipart[] = await response.json();

    return (
        <main className="flex flex-col justify-between gap-16 h-auto w-full p-12">
            {/* Slider */}
            <section className="relative overflow-hidden w-full h-full py-20 flex flex-col justify-between gap-8">
                <h2 className="text-3xl font-bold text-center my-5 bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark">نماهنگ های ما</h2>
                <p className="text-lg text-wrap text-right text-main-text-light dark:text-main-text-dark mb-3 p-3">توضبحات مختصر و مفید.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {cliparts.map(item => (
                        <div key={item.slug}>
                            {/* <div dangerouslySetInnerHTML={{ __html: item.text }} /> */}
                            <ClipartCard {...item} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
