"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 5, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    // common “glow” wrapper
    const wrapperStyle = {
      background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
    };

    // base styles (no fixed height!)
    const baseClasses = `
      shadow-input
      dark:placeholder-text-neutral-600
      flex
      w-full
      rounded-md
      border-none
      px-3
      py-2
      text-sm
      transition duration-400
      group-hover/input:shadow-none
      placeholder:text-main-text-light
      dark:placeholder:text-main-text-dark
      focus-visible:ring-[2px]
      focus-visible:outline-none
      disabled:cursor-not-allowed
      disabled:opacity-50
      bg-Base
      text-main-text-light
      dark:text-main-text-dark
      dark:shadow-[0px_0px_1px_1px_#404040]
      focus-visible:ring-primary-light
      dark:focus-visible:ring-primary-dark
      resize-y            /* allow vertical resize by user */
      min-h-[120px]       /* give it some breathing room */
    `;

    return (
      <motion.div
        style={wrapperStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <textarea
          ref={ref}
          rows={rows}
          className={cn(baseClasses, className)}
          {...props}
        />
      </motion.div>
    );
  }
);
Textarea.displayName = "Textarea";
