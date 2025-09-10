"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback, useRef } from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

interface NavItem {
  name: string;
  href: string;
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // show/hide on scroll
  useMotionValueEvent(scrollYProgress, "change", (curr) => {
    const prev = scrollYProgress.getPrevious() ?? 0;
    setVisible(curr >= 0.05 && curr < prev);
  });

  // close sidebar on ESC / click outside
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSidebarOpen(false);
  }, []);
  const onClickOutside = useCallback(
    (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    },
    []
  );
  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [sidebarOpen, onKey, onClickOutside]);

  return (
    <>
      <AnimatePresence>
        <motion.nav
          dir="rtl"
          initial={{ opacity: 1, y: -120 }}
          animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
          exit={{ opacity: 0, y: -120 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-x-0 top-0 z-[5000] px-6 py-4 backdrop-blur-md h-20",
            "bg-base-light/70 dark:bg-base-dark/70",
            className
          )}
        >
          {/* Mobile */}
          <div className="flex md:hidden items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="باز کردن منو"
              className="text-2xl text-main-text-light dark:text-main-text-dark"
            >
              <HiMenu />
            </button>

            <Image src="/logo.png" alt="لوگو" width={80} height={80} />

            <ThemeSwitcher />
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between h-full">
            {/* Left: Logo */}
            <div className="w-1/3 flex justify-start">
              <Image src="/logo.png" alt="لوگو" width={80} height={80} />
            </div>

            {/* Center: Nav Links */}
            <div className="w-1/3 flex justify-center gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative text-lg font-semibold transition-colors duration-200",
                      isActive
                        ? "text-primary-light dark:text-primary-dark"
                        : "text-main-text-light hover:text-hover-light dark:text-main-text-dark dark:hover:text-hover-dark"
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "absolute left-0 -bottom-1 h-1",
                        isActive
                          ? "w-full bg-primary-light dark:bg-primary-dark scale-x-100"
                          : "w-full bg-primary-light dark:bg-primary-dark scale-x-0 hover:scale-x-100",
                        "origin-left transition-transform duration-200"
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right: Theme Switcher */}
            <div className="w-1/3 flex justify-end">
              <ThemeSwitcher />
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>

      {/* Sidebar + Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[5500] bg-base-dark/20 backdrop-blur-sm"
            />

            <motion.aside
              dir="rtl"
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 p-8 bg-base-light dark:bg-base-dark shadow-2xl z-[6000] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <Image src="/logo.png" alt="لوگو" width={80} height={80} />
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="بستن منو"
                  className="text-2xl text-main-text-light dark:text-main-text-dark"
                  autoFocus
                >
                  <HiX />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "text-lg font-semibold transition-colors duration-200",
                        isActive
                          ? "text-primary-light dark:text-primary-dark"
                          : "text-main-text-light hover:text-hover-light dark:text-main-text-dark dark:hover:text-hover-dark"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
