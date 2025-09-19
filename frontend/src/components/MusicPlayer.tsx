'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeDown,
  FaSync,
  FaUndo,
} from 'react-icons/fa';

type MusicPlayerProps = {
  src: string;
  title: string;
  poster: string;
};

export default function MusicPlayer({ src, title, poster }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isLoop, setIsLoop] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      if (!audio.paused) requestAnimationFrame(updateTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      requestAnimationFrame(updateTime);
    };

    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current!;
    isPlaying ? audio.pause() : audio.play();
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current!;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (value: number) => {
    const audio = audioRef.current!;
    audio.volume = value;
    setVolume(value);
  };

  const toggleLoop = () => {
    const audio = audioRef.current!;
    audio.loop = !isLoop;
    setIsLoop(!isLoop);
  };

  const resetTrack = () => {
    const audio = audioRef.current!;
    audio.currentTime = 0;
    setCurrentTime(0);
    if (!audio.paused) {
      audio.play();
    }
  };

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-base-light dark:bg-base-dark p-6 rounded-2xl max-w-2xl mx-auto shadow-xl"
    >
      {/* Poster */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4 }}
        className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden shadow-lg"
      >
        <Image
          src={poster}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          priority
          unoptimized
          className="rounded-2xl"
          width={500}
          height={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
      </motion.div>

      {/* Title & Play */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-main-text-light dark:text-main-text-dark text-xl font-bold">{title}</h3>
        <div className="flex gap-3">
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="p-3 bg-primary-light dark:bg-primary-dark rounded-full text-main-text-light dark:text-main-text-dark shadow-lg hover:shadow-xl transition"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </motion.button>
          <motion.button
            onClick={resetTrack}
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotate: 360 }}
            className="p-3 bg-base-light dark:bg-base-dark rounded-full text-main-text-light dark:text-main-text-dark shadow-md hover:shadow-lg transition"
          >
            <FaUndo size={18} />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm text-highlight-text-light dark:text-highlight-text-dark">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={audioRef.current?.duration || 1}
          step={0.01}
          value={currentTime}
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="flex-1 accent-primary-light dark:accent-primary-dark"
        />
      </div>

      {/* Volume & Loop */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => handleVolumeChange(Math.max(0, volume - 0.1))}
            whileTap={{ scale: 0.9 }}
            className="text-main-text-light dark:text-main-text-dark hover:text-hover-light dark:hover:text-hover-dark"
          >
            <FaVolumeDown size={18} />
          </motion.button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-24 accent-success-light dark:accent-success-dark"
          />
          <motion.button
            onClick={() => handleVolumeChange(Math.min(1, volume + 0.1))}
            whileTap={{ scale: 0.9 }}
            className="text-main-text-light dark:text-main-text-dark hover:text-hover-light dark:hover:text-hover-dark"
          >
            <FaVolumeUp size={18} />
          </motion.button>
        </div>

        <motion.button
          onClick={toggleLoop}
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotate: isLoop ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className={`p-2 rounded-full ${
            isLoop
              ? 'bg-primary-light dark:bg-primary-dark text-white'
              : 'bg-base-light dark:bg-base-dark text-main-text-light dark:text-main-text-dark'
          } hover:scale-105 transition-all`}
        >
          <FaSync size={18} />
        </motion.button>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={src} preload="metadata" />
    </motion.div>
  );
}
