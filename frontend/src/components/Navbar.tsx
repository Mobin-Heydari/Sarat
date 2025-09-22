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
import ThemeSwitcher from "./ThemeSwitcher";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

interface NavItem {
  name: string;
  href: string;
}

export const Navbar = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // show/hide nav: always show near top or on scroll-up
  useMotionValueEvent(scrollYProgress, "change", (curr) => {
    const prev = scrollYProgress.getPrevious() ?? 0;
    const scrollingUp = prev > curr;
    const nearTop = curr <= 0.05;
    setVisible(nearTop || scrollingUp);
  });

  // close sidebar on ESC / click outside
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSidebarOpen(false);
  }, []);
  const onClickOutside = useCallback((e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setSidebarOpen(false);
    }
  }, []);
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
        {visible && (
          <motion.nav
            dir="rtl"
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "fixed inset-x-0 top-0 z-[5000] h-20 px-6 py-4 backdrop-blur-md",
              "bg-base-light/70 dark:bg-base-dark/70",
              className
            )}
          >
            {/* Mobile */}
            <div className="flex md:hidden items-center justify-between h-full">
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="باز کردن منو"
                className="text-2xl text-main-text-light dark:text-main-text-dark"
              >
                <HiMenu />
              </button>
              <Link href="/">
                <Image src="/logo.png" alt="لوگو" width={120} height={120} />
              </Link>

              <ThemeSwitcher />
            </div>

            {/* Desktop Navbar */}
            <div className="hidden md:flex items-center justify-between h-20 w-full mx-auto">
              {/* Left: Logo */}
              <Link href="/" className="flex-shrink-0 flex justify-start min-w-[120px]">
                <Image src="/logo.png" alt="لوگو" width={90} height={90} />
              </Link>

              {/* Center: Navigation Links */}
              <div className="flex-grow flex justify-center gap-8 flex-wrap">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative md:text-xs lg:text-lg font-semibold transition-colors duration-200",
                        isActive
                          ? "text-primary-light dark:text-primary-dark"
                          : "text-main-text-light hover:text-hover-light dark:text-main-text-dark dark:hover:text-hover-dark"
                      )}
                    >
                      {item.name}
                      <span
                        className={cn(
                          "absolute left-0 -bottom-1 h-1 bg-primary-light dark:bg-primary-dark origin-left transition-transform duration-200",
                          isActive
                            ? "w-full scale-x-100"
                            : "w-full scale-x-0 hover:scale-x-100"
                        )}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Right: Invite Button + Theme Switcher */}
              <div className="flex-shrink-0 flex justify-end items-center gap-4 min-w-[180px]">
                <Link
                  href="/contact-us"
                  className="px-4 py-2 rounded-lg font-semibold transition-colors duration-200 bg-primary-light text-base-light hover:bg-hover-light dark:bg-primary-dark dark:text-base-dark dark:hover:bg-hover-dark"
                >
                  دعوت گروه
                </Link>
                <ThemeSwitcher />
              </div>
            </div>
          </motion.nav>
        )}
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
                <Link href="/">
                  <Image src="/logo.png" alt="لوگو" width={120} height={120} />
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="بستن منو"
                  className="text-2xl text-main-text-light dark:text-main-text-dark"
                  autoFocus
                >
                  <HiX />
                </button>
              </div>
              <nav className="flex flex-col gap-6 mb-6">
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
              <Link
                href="/contact-us"
                onClick={() => setSidebarOpen(false)}
                className="block text-center px-4 py-3 rounded-lg font-semibold bg-primary-light text-base-light hover:bg-hover-light dark:bg-primary-dark dark:text-base-dark dark:hover:bg-hover-dark"
              >
                دعوت از گروه
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
