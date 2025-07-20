'use client';

import {FiSun, FiMoon, FiAtSign} from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';



export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return(
        <FiAtSign />
    )

    if (resolvedTheme === 'dark') {
        return(
            <div className="cursor-pointer">
                <FiSun onClick={() => setTheme('light')} className="text-main-text-light hover:text-main-text-light/[0.7] dark:text-main-text-dark dark:hover:text-main-text-dark/[0.5]"/>
            </div>
        ) 
    }

    if (resolvedTheme === 'light') {
        return (
            <div className="cursor-pointer">
                <FiMoon onClick={() => setTheme('dark')} className="text-main-text-light hover:text-main-text-light/[0.7] dark:text-main-text-dark dark:hover:text-main-text-dark/[0.5]"/>
            </div>
        )
    }
}