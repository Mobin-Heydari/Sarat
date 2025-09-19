'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import { Show } from '@/types/show';
import ShowCard from './ShowCard';
import { Undo2, Redo2 } from 'lucide-react';
import Link from 'next/link';

const fadeInUp: Variants = {
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
  const [shows, setShows] = useState<Show[]>([]);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

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
      className="relative flex flex-col justify-between mt-10 gap-6 mx-4 lg:mx-10"
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

      {/* Slider Container */}
      <div className="relative w-full">
        {/* Left Button */}
        <button
          ref={prevBtnRef}
          aria-label="قبلی"
          className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white dark:bg-dark-bg border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        >
          <Undo2 size={24} />
        </button>

        {/* Right Button */}
        <button
          ref={nextBtnRef}
          aria-label="بعدی"
          className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white dark:bg-dark-bg border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        >
          <Redo2 size={24} />
        </button>

        {/* Swiper Slider */}
        <SwiperReact
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevBtnRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextBtnRef.current;
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          a11y={{
            enabled: true,
            prevSlideMessage: 'اسلاید قبلی',
            nextSlideMessage: 'اسلاید بعدی',
            firstSlideMessage: 'اولین اسلاید',
            lastSlideMessage: 'آخرین اسلاید',
          }}

          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
          className="w-full min-h-[380px]"
          dir="rtl"
          style={{
            '--swiper-pagination-color': 'var(--primary-light)',
            '--swiper-pagination-bullet-inactive-color': 'var(--highlight-text-light)',
            '--swiper-pagination-bullet-size': '0.75rem',
            '--swiper-pagination-bullet-opacity': '1',
            '--swiper-scrollbar-width': '4px',
            '--swiper-scrollbar-color': 'var(--primary-light)',
          } as React.CSSProperties}
        >
          {shows.map((item) => (
            <SwiperSlide key={item.slug} className="h-full">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="h-full"
              >
                <ShowCard {...item} />
              </motion.div>
            </SwiperSlide>
          ))}
        </SwiperReact>
      </div>
    </motion.section>
  );
}
