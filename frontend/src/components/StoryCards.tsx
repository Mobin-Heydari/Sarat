"use client";

import React from "react";

import { Story } from "@/types/stories";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function StoryCard( item : Story ) {
    const router = useRouter();

    return (
        <div className="flex justify-evenly gap-4 flex-col">
            <div className="p-3 flex justify-center items-center">
                <img
                    src={`http://127.0.0.1:8000${item.poster}`}
                    alt={item.title}
                    className="relative h-36 w-36 rounded-full border-2 border-primary-light dark:border-primary-dark object-cover cursor-pointer"
                    onClick={() => router.push(`/stories/${item.slug}`)}
                />
            </div>
            <div className="flex justify-evenly">
                <Link className="text-center text-wrap text-xl font-bold text-main-text-light hover:text-main-text-light/[0.7] dark:text-main-text-dark dark:hover:text-main-text-dark/[0.7]" href={`/stories/${item.slug}`}>{item.title}</Link>
            </div>
        </div> 
    )
}