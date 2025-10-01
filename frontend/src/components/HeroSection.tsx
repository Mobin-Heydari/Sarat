'use client';

import { FaLocationArrow } from 'react-icons/fa6';
import MagicButton from './ui/MagicButton';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = ({
  title,
  mainText,
  subText,
  buttonTitle,
  buttonIcon,
  buttonPosition,
  buttonUrl,
  buttonClasses,
}: {
  title: string;
  mainText: string;
  subText: string;
  buttonTitle: string;
  buttonIcon?: React.ReactNode;
  buttonPosition: string;
  buttonUrl: string;
  buttonClasses?: string;
}) => {
  return (
    <section className="relative w-full min-h-[40vh] flex items-center justify-center overflow-hidden bg-base-light dark:bg-base-dark">
      {/* Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-primary-light/10 dark:bg-primary-dark/10 blur-3xl rounded-full animate-pulse -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-success-light/10 dark:bg-success-dark/10 blur-2xl rounded-full animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Title */}
        {title && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="uppercase tracking-widest text-lg text-main-text-light dark:text-main-text-dark mb-4"
          >
            {title}
          </motion.p>
        )}

        {/* Main Text */}
        {mainText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <TextGenerateEffect
              words={mainText}
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center"
            />
          </motion.div>
        )}

        {/* Subtext */}
        {subText && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="mt-6 mb-8 text-sm md:text-lg lg:text-xl text-highlight-text-light dark:text-highlight-text-dark max-w-2xl"
          >
            {subText}
          </motion.p>
        )}

        {/* CTA Button */}
        {buttonTitle && buttonUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="mb-6"
          >
            <Link href={buttonUrl}>
              <MagicButton
                title={buttonTitle}
                icon={buttonIcon || <FaLocationArrow />}
                position={buttonPosition}
                otherClasses={buttonClasses}
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
