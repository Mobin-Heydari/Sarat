'use client';

import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3DCards';
import { Clipart } from '@/types/clipart';
import { CalendarDays, Eye } from 'lucide-react';

export default function ClipartCard(item: Clipart) {
  const router = useRouter();

  return (
    <CardContainer className="w-full max-w-xl">
      <CardBody className="relative group/card bg-base-light dark:bg-base-dark border border-base-dark/[0.1] dark:border-base-light/[0.2] rounded-2xl p-6 shadow-md hover:shadow-2xl hover:shadow-primary-light dark:hover:shadow-primary-dark transition-all duration-300">
        
        {/* Poster */}
        <CardItem translateZ={100} className="relative w-full h-64 overflow-hidden rounded-xl">
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.poster}`}
            alt={`پوستر ${item.title}`}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover/card:scale-105"
            loading="lazy"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 rounded-xl" />
          <div className="absolute bottom-4 left-4 z-20">
            <h3 className="text-lg font-bold text-highlight-text-light dark:text-highlight-text-dark drop-shadow-md">
              {item.title}
            </h3>
          </div>
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ={60}
          className="mt-4 text-sm text-main-text-light dark:text-main-text-dark line-clamp-3"
        >
          {item.description}
        </CardItem>

        {/* Meta Info */}
        <CardItem
          translateZ={40}
          className="mt-4 flex items-center justify-between text-sm text-main-text-light dark:text-main-text-dark"
        >
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-secondary-light dark:text-secondary-dark" />
            <span>{item.created_at_jalali}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-secondary-light dark:text-secondary-dark" />
            <span>{item.views} بازدید</span>
          </div>
        </CardItem>

        {/* CTA Button */}
        <div className="flex justify-end mt-6">
          <CardItem
            as="button"
            translateZ={20}
            onClick={() => router.push(`/cliparts/${item.slug}`)}
            className="px-5 py-2 rounded-full bg-primary-light dark:bg-primary-dark hover:bg-hover-light dark:hover:bg-hover-dark text-main-text-light dark:text-main-text-dark font-bold text-sm shadow-md hover:scale-105 transition-all duration-300"
          >
            مشاهده
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
