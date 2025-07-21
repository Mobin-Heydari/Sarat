"use client";
 
import React from "react";

import { useRouter } from "next/navigation";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3DCards";

import { Clipart } from "@/types/clipart";




export default async function ClipartCard(item: Clipart) {

    const router = useRouter();
    

    return (
        <CardContainer className="inter-var">
            <CardBody className="relative group/card hover:shadow-primary-light  hover:shadow-2xl dark:hover:shadow-primary-dark bg-base-light dark:bg-base-dark dark:border-base-light/[0.2] border-base-dark/[0.1] w-full h-full rounded-xl p-6 border">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-main-text-light dark:text-main-text-dark text-wrap"
                    >
                        {item.title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-sm max-w-sm mt-2 text-main-text-light dark:text-main-text-dark"
                >
                    {item.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <img
                        src={`http://127.0.0.1:8000${item.poster}`}
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-20" onClick={() => router.push(`/cliparts/${item.slug}`)}>
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-primary-light dark:bg-primary-dark hover:bg-hover-light dark:hover:bg-hover-dark text-main-text-light dark:text-main-text-dark text-md font-bold"
                    >
                        بازدید
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    )
}