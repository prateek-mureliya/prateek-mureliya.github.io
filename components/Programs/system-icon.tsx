"use client";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

export interface SystemIconProps {
  logo: StaticImageData;
  title: string;
  x?: number;
  y?: number;
  onDoubleClick?: () => void;
}

export default function SystemIcon({
  logo,
  title,
  x,
  y,
  onDoubleClick,
}: SystemIconProps) {
  return (
    <li
      className={cn(
        "p-1 h-min rounded-xl hover:bg-foreground/8 border border-transparent hover:border-current/10",
        x ? `col-start-${x}` : "",
        y ? `row-start-${y}` : ""
      )}
      onDoubleClick={onDoubleClick}
    >
      <figure className='flex flex-col place-items-center'>
        <Image alt={title} src={logo} width={48} height={48} priority />
        <figcaption className='text-xs text-shadow-xs text-center pt-2 sm:pt-1 cursor-default select-none'>
          {title}
        </figcaption>
      </figure>
    </li>
  );
}
