'use client';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import { Separator } from './separator';

export type NavItem = {
  id: string;
  icon: StaticImageData;
  viewer?: StaticImageData;
  label: string;
  focus: boolean;
  isOpen: boolean;
  onClick?: () => void;
};

export type LimelightNavProps = {
  about: NavItem;
  contact: NavItem;
  terminal: NavItem;
  trash: NavItem;
  items: NavItem[];
  className?: string;
};

const LimelightNavIcon = ({
  icon,
  viewer,
  label,
  isOpen,
  onClick,
  ref,
}: NavItem & { ref?: (e: HTMLDivElement | null) => void }) => {
  return (
    <div
      ref={ref}
      className="relative z-20 flex h-full cursor-pointer items-center justify-center px-2 select-none"
      onClick={onClick}
      aria-label={label}
    >
      <Image
        alt={label}
        src={icon}
        placeholder="blur"
        className={cn('transition-opacity duration-100 ease-in-out pointer-events-none size-11')}
      />
      {viewer && (
        <Image
          alt={label}
          src={viewer}
          placeholder="blur"
          priority
          className="absolute right-0 bottom-2 pointer-events-none select-none size-6"
        />
      )}
      {isOpen && <div className="absolute size-1 rounded-full bg-primary bottom-1.5"></div>}
    </div>
  );
};

export const LimelightNav = ({ about, contact, terminal, trash, items, className }: LimelightNavProps) => {
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const limelightRef = useRef<HTMLDivElement | null>(null);
  const excludeApp = [about.id, contact.id, terminal.id, trash.id];

  useLayoutEffect(() => {
    const limelight = limelightRef.current;
    const selectedItem = items.find((p) => p.focus);
    const activeItem = selectedItem && navItemRefs.current[selectedItem.id];

    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    } else if (limelight && isReady) {
      setIsReady(false);
      limelight.style.left = '-999px';
    }
  }, [isReady, items]);

  const refDiv = (el: HTMLDivElement | null, id: string) => {
    if (el) {
      navItemRefs.current[id] = el;
    }
  };

  return (
    <nav
      className={cn(
        'relative flex items-center gap-1 rounded-2xl border px-2 w-max h-[74px] bg-stone-300/50 dark:bg-indigo-950/70 supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md',
        className
      )}
    >
      <LimelightNavIcon {...about} ref={(el) => refDiv(el, about.id)} />
      <LimelightNavIcon {...contact} ref={(el) => refDiv(el, contact.id)} />
      <LimelightNavIcon {...terminal} ref={(el) => refDiv(el, terminal.id)} />
      {items
        .filter((p) => !excludeApp.includes(p.id))
        .map(({ id, ...props }) => (
          <LimelightNavIcon key={id} id={id} {...props} ref={(el) => refDiv(el, id)} />
        ))}
      <Separator orientation="vertical" />
      <LimelightNavIcon {...trash} ref={(el) => refDiv(el, trash.id)} />

      <div
        ref={limelightRef}
        className={cn(
          'absolute top-0 z-10 w-12 h-[5px] rounded-full bg-primary shadow-[0_50px_15px_var(--primary)]',
          isReady ? 'transition-[left] duration-400 ease-in-out' : ''
        )}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-30%] top-[5px] w-[160%] h-10 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
