"use client"

import { useEffect, useState } from "react";
import { Audio } from "@/types/audio";
import { HoverEffectCards } from "./ui/HoverEffectCard";




export default function  FamousMusics() {

    const [audios, setAudios] = useState<Audio[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAudios = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/audios/famous-audios/`);
                if (!response.ok) {
                    throw new Error("مشکل در سرور پیش آمده.");
                }
                const data = await response.json();
                setAudios(data);
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        }
        fetchAudios();
    }, [])

    // Only show once we’ve loaded and have testimonials
    if (loading) {
        return <p className="text-lg text-primary-light dark:text-primary-dark">درحال لود کردن</p>;
    }

    if (error) {
        return <p className="text-lg text-error-light dark:text-error-dark">{error}</p>;
    }

    if (audios.length === 0) {
        return <p className="text-lg text-error-light dark:text-error-dark">نماهنگی یافت نشد</p>;
    }

    return (
        <HoverEffectCards items={audios} />
    )

}