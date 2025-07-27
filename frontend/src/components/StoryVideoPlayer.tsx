'use client'

import React from 'react';


type VideoPlayerProps = {
  video_url: string
};


const StoryVideoPlayer: React.FC<VideoPlayerProps> = ({ video_url }) => (
  <div className="w-full max-w-3xl mx-auto aspect-video">
      <iframe
          className="w-full h-full border-0"
          src={video_url}
          allowFullScreen
      />
  </div>
);


export default StoryVideoPlayer;
