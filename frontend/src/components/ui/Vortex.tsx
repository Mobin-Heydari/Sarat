'use client';

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = (props: VortexProps) => {
  // ─── Hooks ───────────────────────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();

  // ─── Always‐called effect (hooks order stable) ────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    setup();

    const handleResize = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        resize(canvas, ctx);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, resolvedTheme]);

  // ─── Prevent render until client+theme ready ──────────────────────────────
  if (!mounted) {
    return null;
  }

  // ─── Settings & State ────────────────────────────────────────────────────
  const particleCount = props.particleCount ?? 700;
  const particlePropCount = 9;
  const totalProps = particleCount * particlePropCount;
  const rangeY = props.rangeY ?? 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed ?? 0;
  const rangeSpeed = props.rangeSpeed ?? 1.5;
  const baseRadius = props.baseRadius ?? 1;
  const rangeRadius = props.rangeRadius ?? 2;
  const baseHue = props.baseHue ?? 220;
  const rangeHue = 100;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor = resolvedTheme === "dark" ? "#242729" : "#fffaec";

  let tick = 0;
  const noise3D = createNoise3D();
  let particleProps = new Float32Array(totalProps);
  let center: [number, number] = [0, 0];

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const rand = (n: number) => Math.random() * n;
  const randRange = (n: number) => n - Math.random() * 2 * n;
  const fadeInOut = (t: number, m: number) => {
    const hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;

  // ─── Core ─────────────────────────────────────────────────────────────────
  const setup = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resize(canvas, ctx);
    initParticles();
    draw(canvas, ctx);
  };

  const initParticles = () => {
    tick = 0;
    particleProps = new Float32Array(totalProps);

    for (let i = 0; i < totalProps; i += particlePropCount) {
      initParticle(i);
    }
  };

  const initParticle = (i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = rand(canvas.width);
    const y = center[1] + randRange(rangeY);
    const ttl   = baseTTL + rand(rangeTTL);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue   = baseHue + rand(rangeHue);

    // x, y, vx, vy, life, ttl, speed, radius, hue
    particleProps.set([x, y, 0, 0, 0, ttl, speed, radius, hue], i);
  };

  const draw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    tick++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawParticles(ctx);
    window.requestAnimationFrame(() => draw(canvas, ctx));
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < totalProps; i += particlePropCount) {
      updateParticle(i, ctx);
    }
  };

  const updateParticle = (
    i: number,
    ctx: CanvasRenderingContext2D
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const [
      x, y,
      vx, vy,
      life,
      ttl,
      speed,
      radius,
      hue
    ] = particleProps.slice(i, i + particlePropCount);

    const angle =
      noise3D(x * xOff, y * yOff, tick * zOff) *
      noiseSteps *
      Math.PI *
      2;

    const newVx = lerp(vx, Math.cos(angle), 0.5);
    const newVy = lerp(vy, Math.sin(angle), 0.5);
    const newX = x + newVx * speed;
    const newY = y + newVy * speed;
    const newLife = life + 1;

    drawParticle(x, y, newX, newY, life, ttl, radius, hue, ctx);

    particleProps.set(
      [newX, newY, newVx, newVy, newLife],
      i
    );

    if (newLife > ttl || newX < 0 || newX > canvas.width || newY < 0 || newY > canvas.height) {
      initParticle(i);
    }
  };

  const drawParticle = (
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  };

  const resize = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center = [canvas.width * 0.5, canvas.height * 0.5];
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={cn("relative w-full h-full", props.containerClassName)}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <canvas ref={canvasRef} />
      </motion.div>

      <div
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center",
          props.className
        )}
      >
        {props.children}
      </div>
    </div>
  );
};