"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard, Pagination, A11y } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Banner = { image: string };

type Props = {
  banners: Banner[];
  className?: string;
  autoplay?: boolean;
  delayMs?: number;
  fit?: "cover" | "contain";
  heightClasses?: string;
};

export function BannerSlider({
  banners,
  className,
  autoplay = true,
  delayMs = 4000,
  fit = "cover",
  heightClasses = "min-h-[320px] h-[38vh] sm:h-[48vh] lg:h-[60vh] xl:h-[70vh]",
}: Props) {
  const sources = useMemo(() => banners.map((b) => b.image), [banners]);

  // refs for buttons and swiper instance
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any | null>(null);

  // ensure DOM nodes exist before attaching to swiper
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  // Attach navigation elements when swiper and buttons are available
  useEffect(() => {
    const swiper = swiperRef.current;
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;
    if (!swiper || !prevEl || !nextEl) return;

    // assign elements and (re)initialize navigation
    swiper.params.navigation.prevEl = prevEl;
    swiper.params.navigation.nextEl = nextEl;
    if (swiper.navigation) {
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [ready]);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden mt-20 select-none",
        heightClasses,
        className
      )}
      aria-roledescription="carousel"
      aria-label="Banner slider"
    >

      <Swiper
        modules={[Navigation, Autoplay, Keyboard, Pagination, A11y]}
        className="banner-swiper h-full w-full"
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        // provide placeholders; real elements get attached in effect above
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        pagination={{ clickable: true, dynamicBullets: true }}
        keyboard={{ enabled: true }}
        autoplay={
          autoplay
            ? { delay: delayMs, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        speed={700}
        loop
        spaceBetween={0}
      >
        {sources.map((src, i) => (
          <SwiperSlide key={i} className="!h-full !w-full">
            <div className={cn("relative h-full w-full", fit === "contain" && "bg-black")}>
              <Image
                src={src}
                alt={`Banner ${i + 1}`}
                fill
                sizes="100vw"
                priority={i === 0}
                className={cn(
                  "transition-transform duration-[1000ms] ease-out",
                  fit === "cover"
                    ? "object-cover object-center hover:scale-[1.02]"
                    : "object-contain object-center"
                )}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black/40 to-transparent z-10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons using refs (type=button prevents form submits) */}
      <button
        type="button"
        ref={nextRef}
        aria-label="قبلی"
        className={cn(
          "absolute top-1/2 left-3 sm:left-4 -translate-y-1/2 z-30 rounded-full text-white",
          "bg-black/40 hover:bg-black/50 backdrop-blur-md shadow-lg hover:shadow-xl",
          "transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/60",
          "p-2.5 sm:p-3 lg:p-3.5"
        )}
      >
        <HiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
      </button>

      <button
        type="button"
        ref={prevRef}
        aria-label="بعدی"
        className={cn(
          "absolute top-1/2 right-3 sm:right-4 -translate-y-1/2 z-30 rounded-full text-white",
          "bg-black/40 hover:bg-black/50 backdrop-blur-md shadow-lg hover:shadow-xl",
          "transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/60",
          "p-2.5 sm:p-3 lg:p-3.5"
        )}
      >
        <HiChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
      </button>
    </section>
  );
}

export default BannerSlider;
