"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ThemeSwitcher from "../ThemeSwitcher";



interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const pathname = usePathname();            // get e.g. "/about"
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (current < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-10 inset-x-0 mx-auto flex max-w-fit items-center gap-5 rounded-3xl border-primary-dark bg-base px-10 py-5 shadow-lg z-[5000] bg-base-light dark:bg-base-dark",
          className
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center space-x-1 text-main-text-light hover:text-main-text-light/[0.7] dark:text-main-text-dark dark:hover:text-main-text-dark/[0.5]",
                isActive && "border-b-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
              )}
            >
              <span className="block sm:hidden">{item.icon}</span>
              <span className="hidden sm:block text-sm">{item.name}</span>
            </Link>
          );
        })}
        <ThemeSwitcher />
      </motion.div>
    </AnimatePresence>
  );
};