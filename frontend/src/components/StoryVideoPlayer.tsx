'use client';

import React from 'react';
import { motion } from 'framer-motion';

type VideoPlayerProps = {
  video_url: string;
};

const StoryVideoPlayer: React.FC<VideoPlayerProps> = ({ video_url }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <iframe
        src={video_url}
        className="w-full h-full border-0"
        allow="autoplay; fullscreen"
        allowFullScreen
        loading="lazy"
        title="Story Video"
      />
    </motion.div>
  );
};

export default StoryVideoPlayer;
