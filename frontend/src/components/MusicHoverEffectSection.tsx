import React from 'react'

import { HoverEffectCards } from './ui/HoverEffectCard'
import { Audio } from '@/types/audio'



interface MusicHoverEffectSectionProps {
  items: Audio[];
}

export default function MusicHoverEffectSection({
  items,
}: MusicHoverEffectSectionProps) {
  return (
    <section className="flex justify-evenly items-center flex-col gap-12">
        <h3 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center font-sans tracking-tight mt-12">
            چه چیزی{" "}
            <span className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-primary-light -via-secondary-light to-hover-light dark:from-primary-dark dark:via-primary-dark dark:to-hover-dark">
                بهتر
            </span>{" "}
                از گوش دادن به{" "}
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary-light via-secondary-light to-hover-light dark:from-primary-dark dark:via-primary-dark dark:to-hover-dark [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span>صوت است؟</span>
                </div>
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-primary-light via-secondary-light to-hover-light dark:from-primary-dark dark:via-primary-dark dark:to-hover-dark py-4">
                <span>صوت است؟</span>
                </div>
            </div>
        </h3>
        <div className="flex flex-wrap justify-between items-baseline gap-x-6 gap-y-2">
            <HoverEffectCards items={items} />
        </div>
    </section>
  )
}
