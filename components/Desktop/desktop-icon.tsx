"use client";

import { useWindowSize } from "@/hook/useWindowSize";
import { cn } from "@/lib/utils";
import { motion, PanInfo, useAnimation } from "motion/react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { isMobile } from "react-device-detect";

export type DesktopIconProps = {
  icon: StaticImageData;
  title: string;
  x: number;
  y: number;
  viewer?: StaticImageData;
  onDoubleClick?: () => void;
};

type TPlaceholder = {
  col: number;
  row: number;
} | null;

const GRID_GAP_X = isMobile ? 16 : 8;
const GRID_GAP_Y = isMobile ? 30 : 20;
const ICON_WIDTH_SIZE = isMobile ? 83 : 74;
const ICON_HEIGHT_SIZE = isMobile ? 90 : 74;
const GRID_PADDING = isMobile ? 16 : 8;

export default function DesktopIcon({
  icon,
  title,
  x,
  y,
  viewer,
  onDoubleClick,
}: DesktopIconProps) {
  const [gridColumn, setGridColumn] = useState(x);
  const [gridRow, setGridRow] = useState(y);
  const [placeholder, setPlaceholder] = useState<TPlaceholder>(null);
  const controls = useAnimation();
  const { width = 0, height = 0 } = useWindowSize();

  const gridLength = (
    current: number,
    delta: number,
    length: number,
    gap: number,
    deviceLength: number,
    extra: number
  ) =>
    Math.min(
      Math.max(Math.round(delta / (length + gap)) + current, 1),
      Math.floor((deviceLength - extra + gap) / (length + gap))
    );

  const handleDrag = (_: unknown, info: PanInfo) => {
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;

    const col = gridLength(
      gridColumn,
      offsetX,
      ICON_WIDTH_SIZE,
      GRID_GAP_X,
      width,
      2 * GRID_PADDING
    );
    const row = gridLength(
      gridRow,
      offsetY,
      ICON_HEIGHT_SIZE,
      GRID_GAP_Y,
      height,
      130
    );

    setPlaceholder({ col, row });
  };

  const handleDragEnd = () => {
    if (!placeholder) return;

    controls.start({
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.1,
        stiffness: 0,
      },
    });
    setGridColumn(placeholder.col);
    setGridRow(placeholder.row);
    setPlaceholder(null);
  };

  return (
    <>
      {placeholder && (
        <div
          className='w-full h-full border-2 border-dashed border-primary'
          style={{
            gridColumnStart: placeholder.col,
            gridRowStart: placeholder.row,
          }}
        />
      )}

      <motion.li
        drag
        layout
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ cursor: "grabbing" }}
        dragElastic={0.25}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        onDoubleClick={onDoubleClick}
        className={cn(
          "p-1 h-min rounded-xl hover:bg-foreground/8 border border-transparent hover:border-current/10"
        )}
        style={{
          gridColumnStart: gridColumn === 0 ? "auto" : gridColumn,
          gridRowStart: gridRow === 0 ? "auto" : gridRow,
        }}
      >
        <figure className='flex flex-col place-items-center'>
          <picture className='relative'>
            <Image
              alt={title}
              src={icon}
              placeholder='blur'
              priority
              className='pointer-events-none size-12'
            />
            {viewer && (
              <Image
                alt={title}
                src={viewer}
                priority
                className='absolute -right-2 -bottom-1 pointer-events-none size-6.5'
              />
            )}
          </picture>
          <figcaption className='text-xs text-shadow-xs text-center pt-2 sm:pt-1 select-none'>
            {title}
          </figcaption>
        </figure>
      </motion.li>
    </>
  );
}
