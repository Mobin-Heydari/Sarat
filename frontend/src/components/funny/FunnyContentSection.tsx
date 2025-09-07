'use client';

import { ContentItem } from '@/types/funny';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FunnyContentSection({ content }: { content: ContentItem[] }) {
  if (!content || content.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 text-center text-sm text-highlight-text-light dark:text-highlight-text-dark"
      >
        هیچ محتوای اضافی برای این شوخی ثبت نشده. اما همینش هم خنده‌دار بود!
      </motion.div>
    );
  }

  return (
    <section className="mt-20 space-y-16">
      {content.map((item, i) => {
        const isEven = i % 2 === 0;
        const hasMedia = item.image || item.video;
        const hasText = item.title || item.content;

        return (
          <motion.div
            key={item.title + i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            className={`flex flex-col-reverse ${isEven ? '' : 'lg:flex-row-reverse'} items-center gap-8 p-8 md:p-10`}
          >
            {/* Media Block */}
            {hasMedia && (
              <div className="w-full lg:w-1/2">
                {item.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden rounded-xl group relative mb-6"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.image}`}
                      alt={item.title || 'تصویر شوخی'}
                      width={1000}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </motion.div>
                )}

                {item.video && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative group overflow-hidden rounded-xl shadow-md"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                      className="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <iframe
                        src={item.video}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        loading="lazy"
                        title="Story Video"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Text Block */}
            {hasText && (
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                {item.title && (
                  <h3 className="text-3xl md:text-4xl font-black text-main-text-light dark:text-main-text-dark mb-4 leading-tight tracking-tight text-center">
                    {item.title}
                  </h3>
                )}
                {item.content && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-lg md:text-xl lg:text-2xl text-main-text-light dark:text-main-text-dark leading-relaxed tracking-wide mb-6"
                  >
                    {item.content}
                  </motion.p>
                )}
              </div>
            )}
          </motion.div>
        );
      })}
    </section>
  );
}
