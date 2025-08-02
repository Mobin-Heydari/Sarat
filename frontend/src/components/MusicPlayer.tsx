"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaVolumeUp,
  FaVolumeDown,
  FaSync,
} from "react-icons/fa"

type MusicPlayerProps = {
  src: string
  title: string
  poster: string
  rtl?: boolean
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  src,
  title,
  poster,
  rtl = false,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLoop, setIsLoop] = useState(false)

  // Reset state when track changes
  useEffect(() => {
    setCurrentTime(0)
    setDuration(0)
    setIsPlaying(false)
  }, [src])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current!
    isPlaying ? audio.pause() : audio.play()
  }, [isPlaying])

  const skipTime = useCallback(
    (sec: number) => {
      const audio = audioRef.current!
      audio.currentTime = Math.min(
        Math.max(0, audio.currentTime + sec),
        duration
      )
    },
    [duration]
  )

  const toggleLoop = () => {
    const audio = audioRef.current!
    audio.loop = !isLoop
    setIsLoop(!isLoop)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    audioRef.current!.volume = v
  }

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  const PrevIcon = rtl ? FaForward : FaBackward
  const NextIcon = rtl ? FaBackward : FaForward
  const dirClass = rtl ? "flex-row-reverse space-x-reverse" : ""

  return (
    <motion.div
      dir={rtl ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-base-light dark:bg-base-dark p-6 rounded-xl max-w-md mx-auto shadow-sm shadow-base-dark dark:shadow-base-light"
    >
      <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden shadow-md">
        <Image
          src={poster}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          priority
          unoptimized
        />
      </div>

      {/* controls */}
      <div className={`flex items-center justify-between mb-4 ${dirClass}`}>
        <h3 className="text-main-text-light dark:text-main-text-dark text-xl font-medium">{title}</h3>
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-primary-light dark:bg-primary-dark rounded-full text-main-text-light dark:text-main-text-dark shadow-lg"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </motion.button>
        </div>
      </div>

      {/* progress bar with fixed min/max and instant seeking */}
      <div className={`flex items-center mb-4 ${dirClass}`}>
        <span className="text-highlight-text-light dark:text-highlight-text-dark text-sm">{formatTime(0)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={currentTime}
          onChange={(e) => {
            const v = Number(e.target.value)
            // seek instantly
            audioRef.current!.currentTime = v
            // update UI without waiting for onTimeUpdate
            setCurrentTime(v)
          }}
          className="mx-3 flex-1 slider"
        />
        <span className="text-highlight-text-light dark:text-highlight-text-dark text-sm">{formatTime(duration)}</span>
      </div>

      {/* volume & loop */}
      <div className={`flex items-center justify-between ${dirClass}`}>
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={() => setVolume((v) => Math.max(0, v - 0.1))}
            whileTap={{ scale: 0.9 }}
            className="text-main-text-light hover:text-hover-light dark:text-main-text-dark dark:hover:text-hover-dark"
          >
            <FaVolumeDown size={18} />
          </motion.button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 slider"
          />
          <motion.button
            onClick={() => setVolume((v) => Math.min(1, v + 0.1))}
            whileTap={{ scale: 0.9 }}
            className="text-main-text-light hover:text-hover-light dark:text-main-text-dark dark:hover:text-hover-dark"
          >
            <FaVolumeUp size={18} />
          </motion.button>
        </div>
        <motion.button
          onClick={toggleLoop}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${
            isLoop ? "bg-primary-light dark:bg-primary-dark hover:bg-hover-light dark:hover:bg-hover-dark" : "bg-base-light dark:bg-base-dark hover:bg-hover-light dark:hover:bg-hover-dark"
          }`}
        >
          <FaSync size={18} />
        </motion.button>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={() => setDuration(audioRef.current!.duration)}
        onTimeUpdate={() => setCurrentTime(audioRef.current!.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </motion.div>
  )
}

export default MusicPlayer
