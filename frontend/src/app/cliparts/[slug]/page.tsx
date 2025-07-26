import { BsCollectionPlay } from 'react-icons/bs';


import { Clipart } from "@/types/clipart";
import HeroSection from '@/components/HeroSection';



export default async function ClipartDetail({ params }: { params: { slug: string } }) {

    const response = await fetch(`http://127.0.0.1:8000/cliparts/detail/${params.slug}`);
    const data: Clipart = await response.json();


    return (
        <main className="flex flex-col justify-between gap-5 mb-14">
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
                <h2 className="text-center my-5 text-3xl bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary-light via-success-light to-selected-light  dark:from-primary-dark dark:via-success-dark dark:to-selected-dark [text-shadow:0_0_rgba(0,0,0,0.1)] font-bold">{data.title}</h2>
                <iframe className="w-[50vw] h-[28vw]" src={data.video} allowFullScreen={true} webkitallowfullscreen={true} mozallowfullscreen={true}></iframe>
            </section>
            <section className="flex flex-col justify-center items-center gap-4">
                <h3 className="text-center my-5 text-2xl bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary-light via-success-light to-selected-light  dark:from-primary-dark dark:via-success-dark dark:to-selected-dark [text-shadow:0_0_rgba(0,0,0,0.1)] font-bold">متن نماهنگ</h3>
                <div className="text-main-text-light dark:text-main-text-dark text-wrap text-lg" dangerouslySetInnerHTML={{ __html: data.text }} />
            </section>
        </main>
    );
}