"use client"

import { Fragment, useEffect, useMemo, useState } from "react";
import ClipartCard from "./ClipartCard";
import { Clipart } from "@/types/clipart";
import { Slider } from "./ui/3DSlider";



interface SlideData {
    slug: string;
    title: string;
    src: string;
}


export default function  ClipartsSlider() {

    const [cliparts, setCliparts] = useState<Clipart[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCliparts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/cliparts/famous-cliparts/`);
                if (!response.ok) {
                    throw new Error("مشکل در سرور پیش آمده.");
                }
                const data = await response.json();
                setCliparts(data);
            } catch (err) {
                console.error(err)
                setError(err)
            } finally {
                setLoading(false);
            }
        }
        fetchCliparts();
    }, [])

    // Map Cliparts → Testimonial once
    const slideData = useMemo<SlideData[]>(
        () =>
            cliparts.map((item) => ({
                slug: item.slug,
                title: item.title,
                src: item.poster,
            })),
        [cliparts]
    );


    if (loading) {
        return <p className="text-lg text-primary-light dark:text-primary-dark">درحال لود کردن</p>;
    }

    if (error) {
        return <p className="text-lg text-error-light dark:text-error-dark">{error}</p>;
    }

    if (cliparts.length === 0) {
        return <p className="text-lg text-error-light dark:text-error-dark">نماهنگی یافت نشد</p>;
    }

    return (
        <Fragment>
            <Slider slides={slideData} />
        </Fragment>
    )

}