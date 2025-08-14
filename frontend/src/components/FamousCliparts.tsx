"use client"

import { useEffect, useState } from "react";
import ClipartCard from "./ClipartCard";
import { Clipart } from "@/types/clipart";




export default function  FamousCliparts() {

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
                setError(err)
            } finally {
                setLoading(false);
            }
        }
        fetchCliparts();
    }, [])

    // Only show once we’ve loaded and have testimonials
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-7 gap-x-12">
            {cliparts.map(item => (
                <div key={item.slug}>
                    {/* <div dangerouslySetInnerHTML={{ __html: item.text }} /> */}
                    <ClipartCard {...item} />
                </div>
            ))}
        </div>
    )

}