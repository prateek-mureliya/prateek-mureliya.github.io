"use client";

import { Rnd } from "react-rnd";
import { motion } from "motion/react";
import { CSSProperties, useRef, useState } from "react";
import WindowHeader from "./window-header";
import WindowHeaderTitle, {
  WindowHeaderTitleProps,
} from "./window-header-title";
import WindowActionBar from "./window-action-bar";
import {
  WindowActionClose,
  WindowActionMaximize,
  WindowActionMinimize,
} from "./window-action-button";
import { cn } from "@/lib/utils";

type WindowProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  style: { zIndex: number };
  isMinimized: boolean;
  isMaximized: boolean;
  showMaximized: boolean;
  focus: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximizeRestore: () => void;
  onFocus: () => void;
  children: React.ReactNode;
};

const windowVariants = {
  close: {
    opacity: 0,
    scale: 0.8,
  },
  open: {
    opacity: 1,
    scale: 1,
  },
  minimized: {
    opacity: 0,
    y: "100dvh",
    scale: 0.5,
  },
  exit: {
    opacity: 0,
    scale: 0.6,
  },
};

export default function ProcessWindow({
  icon,
  title,
  x,
  y,
  width,
  height,
  style,
  isMinimized,
  isMaximized,
  showMaximized,
  focus,
  onClose,
  onMinimize,
  onMaximizeRestore,
  onFocus,
  children,
}: WindowProps & WindowHeaderTitleProps) {
  const nodeRef = useRef<Rnd>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const [size, setSize] = useState({ width, height });
  const [position, setPosition] = useState({ x, y });
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const handleFocusClick = () => {
    if (clickTimeout.current == null) {
      clickTimeout.current = setTimeout(() => {
        onFocus();
        clickTimeout.current = null;
      }, 250);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
    onMaximizeRestore();
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    handler: () => void
  ) => {
    e.stopPropagation();
    handler();
  };

  return (
    <Rnd
      ref={nodeRef}
      size={
        isMaximized
          ? {
              width: "100dvw",
              height: "100dvh",
            }
          : size
      }
      position={isMaximized ? { x: 0, y: 0 } : position}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        setPosition(position);
      }}
      enableResizing={!isMaximized}
      disableDragging={isMaximized}
      dragHandleClassName='window-header'
      cancel='.group'
      className={cn(isMaximized ? "pt-11" : "")}
      style={
        {
          zIndex: style.zIndex,
          display: isAnimationComplete && isMinimized ? "none" : "block",
        } as CSSProperties
      }
    >
      <motion.div
        variants={windowVariants}
        initial='close'
        animate={isMinimized ? "minimized" : "open"}
        transition={{ duration: 0.3 }}
        exit='exit'
        className={cn(
          "w-full h-full rounded-xl border border-border bg-background overflow-hidden flex flex-col"
        )}
        onAnimationComplete={(definition) => {
          if (definition === "minimized") setIsAnimationComplete(true);
          else setIsAnimationComplete(false);
        }}
        onClick={handleFocusClick}
      >
        <WindowHeader
          className={cn("window-header", focus ? "bg-background" : "")}
          onDoubleClick={handleDoubleClick}
        >
          <WindowActionBar className='group'>
            <WindowActionClose onClick={(e) => handleClick(e, onClose)} />
            <WindowActionMinimize onClick={(e) => handleClick(e, onMinimize)} />
            {showMaximized && (
              <WindowActionMaximize
                onClick={(e) => handleClick(e, onMaximizeRestore)}
              />
            )}
          </WindowActionBar>

          <WindowHeaderTitle title={title} icon={icon} />
        </WindowHeader>

        {children}
      </motion.div>
    </Rnd>
  );
}
