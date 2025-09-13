'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

// 1. Swiper React + Slides
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';

// 2. Swiper Modules from the correct path
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

// 3. Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import { Show } from '@/types/show';
import ShowCard from './ShowCard';
import { Undo2, Redo2 } from 'lucide-react';
import Link from 'next/link';

// 4. Framer Motion variant
const fadeInUp : Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
  },
};

const containerVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

export default function FamousShowsSlider() {
  // 5. State for fetched shows
  const [shows, setShows] = useState<Show[]>([]);
  // 6. Refs for custom navigation buttons
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  // 7. Fetch data on mount
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/lives/shows/famous-shows/`)
      .then((res) => res.json())
      .then(setShows)
      .catch(console.error);
  }, []);

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      dir="rtl"
      className="flex flex-col justify-between mt-10 gap-6 mx-10"
    >
      {/* Header */}
      <motion.div
        variants={containerVariant}
        className="flex flex-col md:flex-row justify-between items-center gap-y-6"
      >
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark">
          پربازدید ترین و محبوبترین اجرا ها
        </h2>
        <Link
          href="/shows"
          className="text-base font-bold bg-base-light dark:bg-base-dark border-2 px-4 py-2 rounded-xl border-primary-light dark:border-primary-dark hover:text-highlight-text-light hover:bg-primary-light dark:hover:text-highlight-text-dark dark:hover:bg-primary-dark transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          مشاهده بیشتر
        </Link>
      </motion.div>
      {/* Sidebar + Slider Wrapper */}
      <div className="flex items-center mb-10 lg:gap-3">
        {/* Sidebar Nav (lg+) */}
        <div className="w-[150px] hidden lg:flex flex-col items-center justify-center p-1.5 min-h-[380px] bg-primary-light dark:bg-primary-dark rounded-r-2xl">
          <p className="mt-4 text-2xl text-white text-center leading-10">برترین نمایش‌ها</p>

          <div className="mt-6 flex flex-col-reverse items-center gap-3">
            <button
              ref={prevBtnRef}
              aria-label="قبلی"
              className="bg-white text-primary-light dark:text-primary-dark font-bold py-2 px-6 rounded-full transition-colors duration-300"
            >
              <Undo2 size={20} />
            </button>
            <button
              ref={nextBtnRef}
              aria-label="بعدی"
              className="bg-white text-primary-light dark:text-primary-dark font-bold py-2 px-6 rounded-full transition-colors duration-300"
            >
              <Redo2 size={20} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <SwiperReact
          // 8. Hook up custom buttons via onBeforeInit
          onBeforeInit={(swiper) => {
            // @ts-ignore: attach our refs
            swiper.params.navigation.prevEl = prevBtnRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextBtnRef.current;
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          a11y={true}
          spaceBetween={16}
          breakpoints={{
            0:    { slidesPerView: 1 },
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
          className="w-full min-h-[380px] flex-1"
          dir="rtl"
          style={{
            '--swiper-pagination-color': 'var(--primary-light)',                     // active bullet color
            '--swiper-pagination-bullet-inactive-color': 'var(--highlight-text-light)',  
            '--swiper-pagination-bullet-size': '0.75rem',                             // bullet diameter
            '--swiper-pagination-bullet-opacity': '1',                                // bullets always fully opaque
            '--swiper-scrollbar-width': '4px',                                        // thickness of scrollbar
            '--swiper-scrollbar-color': 'var(--primary-light)',                       // drag thumb color
          } as React.CSSProperties}
        >
          {shows.map((show) => (
            <SwiperSlide key={show.slug} className="h-full">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="h-full"
              >
                <ShowCard {...show} />
              </motion.div>
            </SwiperSlide>
          ))}
        </SwiperReact>
      </div>
    </motion.section>
  );
}
