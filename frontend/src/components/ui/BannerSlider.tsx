"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Banner = {
  image: string;
  title: string;
  subtitle: string;
};

export const BannerSlider = ({
  banners,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  banners: Banner[];
  overlay?: boolean;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === banners.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const loadImages = () => {
      const loadPromises = banners.map((banner) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = banner.image;
          img.onload = () => resolve(banner.image);
          img.onerror = reject;
        });
      });

      Promise.all(loadPromises)
        .then((loaded) => setLoadedImages(loaded as string[]))
        .catch((err) => console.error("خطا در بارگذاری تصاویر", err));
    };

    loadImages();
  }, [banners]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrevious();
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval: any;
    if (autoplay) {
      interval = setInterval(() => handleNext(), 6000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [autoplay]);

  const slideVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: "easeIn" },
    },
  };

  const currentBanner = banners[currentIndex];
  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center mt-20",
        className,
      )}
      style={{perspective: "1000px" }}
    >
      {areImagesLoaded && overlay && (
        <div className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)} />
      )}

      {areImagesLoaded && (
        <>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={loadedImages[currentIndex]}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideVariants}
              className="image h-full w-full absolute inset-0 object-cover object-center transition-transform duration-1000 scale-100 hover:scale-105"
            />
          </AnimatePresence>

          {/* متن پویا */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-50 text-center px-4 max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
              {currentBanner.title}
            </h1>
            <p className="text-lg md:text-2xl text-neutral-200 mb-6">
              {currentBanner.subtitle}
            </p>
          </motion.div>

          {/* کنترل‌ها با آیکون */}
          <div className="absolute bottom-6 z-50 flex gap-4">
            <button
              onClick={handleNext}
              className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"
              aria-label="بعدی"
            >
              <FaChevronRight className="text-xl" />
            </button>
            <button
              onClick={handlePrevious}
              className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"
              aria-label="قبلی"
            >
              <FaChevronLeft className="text-xl" />
            </button>
          </div>

          {/* شماره اسلاید */}
          <div className="absolute top-6 left-6 z-50 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
            {currentIndex + 1} / {banners.length}
          </div>
        </>
      )}
    </div>
  );
};
