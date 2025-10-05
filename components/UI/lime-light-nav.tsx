"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { Separator } from "./separator";

export type NavItem = {
  id: string | number;
  icon: StaticImageData;
  label: string;
  focus: boolean;
  onClick?: () => void;
};

export type LimelightNavProps = {
  home: NavItem;
  items: NavItem[];
  className?: string;
};

const LimelightNavIcon = ({
  icon,
  label,
  onClick,
  ref,
}: NavItem & { ref?: (e: HTMLDivElement | null) => void }) => {
  return (
    <div
      ref={ref}
      className='relative z-20 flex h-full cursor-pointer items-center justify-center p-3 select-none'
      onClick={onClick}
      aria-label={label}
    >
      <Image
        alt={label}
        src={icon}
        placeholder='blur'
        className={cn(
          "transition-opacity duration-100 ease-in-out pointer-events-none size-5.5"
        )}
      />
    </div>
  );
};

export const LimelightNav = ({ home, items, className }: LimelightNavProps) => {
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[items.findIndex((p) => p.focus) + 1];

    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [isReady, items]);

  const refDiv = (el: HTMLDivElement | null, idx: number) => {
    navItemRefs.current[idx] = el;
  };

  return (
    <nav
      className={cn(
        "relative flex items-center gap-1 rounded-2xl border px-2 w-max h-[58px] supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md",
        className
      )}
    >
      <LimelightNavIcon {...home} ref={(el) => refDiv(el, 0)} />
      {items.length > 0 && <Separator orientation='vertical' />}
      {items.map(({ id, ...props }, index) => (
        <LimelightNavIcon
          key={id}
          id={id}
          {...props}
          ref={(el) => refDiv(el, index + 1)}
        />
      ))}

      <div
        ref={limelightRef}
        className={cn(
          "absolute top-0 z-10 w-10 h-[5px] rounded-full bg-primary shadow-[0_50px_15px_var(--primary)]",
          isReady ? "transition-[left] duration-400 ease-in-out" : ""
        )}
        style={{ left: "-999px" }}
      >
        <div className='absolute left-[-30%] top-[5px] w-[160%] h-10 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-primary/30 to-transparent pointer-events-none' />
      </div>
    </nav>
  );
};
