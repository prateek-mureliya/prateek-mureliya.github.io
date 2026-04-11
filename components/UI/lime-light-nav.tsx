'use client';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import { Separator } from './separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { BasicProps } from '@/types/basic-props';

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
  footerLeft: NavItem[];
  footerRight: NavItem[];
  items: NavItem[];
  selectedItemId: string | null;
  className?: string;
};

const LimelightNavIcon = ({
  icon,
  viewer,
  label,
  isOpen,
  onClick,
  className,
  ref,
}: NavItem & { ref?: (e: HTMLDivElement | null) => void } & BasicProps) => {
  return (
    <div
      ref={ref}
      className={cn('relative z-20 flex h-full cursor-pointer items-center justify-center px-2 select-none', className)}
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

const LimelightNavGroupIcon = ({
  items,
  label,
  isOpen,
  ref,
}: {
  items: NavItem[];
  label: string;
  isOpen: boolean;
  ref?: (e: HTMLDivElement | null) => void;
}) => {
  return (
    <div
      ref={ref}
      className="relative z-20 flex h-full cursor-pointer items-center justify-center px-2 select-none"
      aria-label={label}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-card/30 rounded-md border border-card/50 size-12 relative">
            <Image
              alt={items[0].label}
              src={items[0].viewer || items[0].icon}
              placeholder="blur"
              className={cn(
                'absolute top-1 left-1 transition-opacity duration-100 ease-in-out pointer-events-none size-4'
              )}
            />
            <Image
              alt={items[1].label}
              src={items[1].viewer || items[1].icon}
              placeholder="blur"
              className={cn(
                'absolute top-1 right-1 transition-opacity duration-100 ease-in-out pointer-events-none size-4'
              )}
            />
            {items.length > 2 && (
              <div className="absolute bottom-1 right-1/5 bg-foreground text-background w-6 h-4 text-xs text-center rounded-xs font-bold">
                +{items.length - 2}
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          side="top"
          className="bg-stone-300 dark:bg-indigo-950 mb-3 w-66 py-4"
        >
          <DropdownMenuGroup className="flex flex-wrap gap-1">
            {items.map(({ id, ...props }) => (
              <DropdownMenuItem
                key={id}
                disabled={props.focus}
                className="data-disabled:border data-disabled:border-foreground"
              >
                <LimelightNavIcon id={id} {...props} className="px-0 items-start h-15" />
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && <div className="absolute size-1 rounded-full bg-primary bottom-1.5"></div>}
    </div>
  );
};

export const LimelightNav = ({ footerLeft, footerRight, items, selectedItemId, className }: LimelightNavProps) => {
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const limelight = limelightRef.current;
    const activeItem = selectedItemId && navItemRefs.current[selectedItemId];

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
  }, [isReady, items, selectedItemId]);

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
      {footerLeft.map((p) => (
        <LimelightNavIcon key={p.id} {...p} ref={(el) => refDiv(el, p.id)} />
      ))}
      {items.length == 1 && <LimelightNavIcon {...items[0]} ref={(el) => refDiv(el, 'multi')} />}
      {items.length > 1 && (
        <LimelightNavGroupIcon items={items} label="multi-app" isOpen ref={(el) => refDiv(el, 'multi')} />
      )}
      <Separator orientation="vertical" />
      {footerRight.map((p) => (
        <LimelightNavIcon key={p.id} {...p} ref={(el) => refDiv(el, p.id)} />
      ))}

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
