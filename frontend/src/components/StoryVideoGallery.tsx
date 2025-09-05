'use client';

import { motion } from 'framer-motion';
import { Story } from '@/types/stories';
import StoryVideoPlayer from '@/components/StoryVideoPlayer';
import { cardMotion } from '@/motion/storyMotion';

export default function StoryVideoGallery({ story }: { story: Story }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
      {story.videos.map((video, index) => (
        <motion.div
          key={video.slug}
          {...cardMotion}
          transition={{ ...cardMotion.transition, delay: index * 0.1 }}
          className="flex flex-col gap-4 p-4 rounded-2xl border border-primary-light dark:border-primary-dark shadow-md hover:shadow-xl transition-all duration-300 bg-base-light dark:bg-base-dark"
        >
          <StoryVideoPlayer video_url={video.video} />
          <h3 className="text-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-secondary-dark">
            {video.title}
          </h3>
          <p className="text-sm text-center text-main-text-light dark:text-main-text-dark">
            تاریخ انتشار: {video.created_at_jalali}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
