"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { BasicProps } from "@/types/basic-props";
import Image, { StaticImageData } from "next/image";

export const PinContainer = ({
  children,
  icon,
  title,
  href,
  className,
}: {
  icon: StaticImageData;
  title: string;
  href: string;
} & BasicProps) => {
  const [transform, setTransform] = useState("rotateX(0deg)  scale(1)");

  const onMouseEnter = () => {
    setTransform("rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("rotateX(0deg) scale(1)");
  };

  return (
    <Link
      href={href}
      target='_blank'
      className={cn("relative group/pin cursor-pointer w-full ", className)}
      onMouseEnter={isMobile ? undefined : onMouseEnter}
      onMouseLeave={isMobile ? undefined : onMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
        }}
      >
        <div
          style={{
            transition: "transform 0.5s ease-in-out",
            transform: transform,
          }}
          className='h-28 sm:h-33'
        >
          {children}
        </div>
        <PinPerspective icon={icon} title={title} />
      </div>
    </Link>
  );
};

export const PinPerspective = ({
  icon,
  title,
}: {
  icon: StaticImageData;
  title: string;
}) => {
  return (
    <motion.div className='pointer-events-none flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500'>
      <div className=' w-full h-full -mt-7 flex-none  inset-0'>
        <div className='absolute top-0 inset-x-0  flex justify-center'>
          <div className='relative flex space-x-2 items-center z-10 rounded-full bg-background ring-1 ring-foreground/10 '>
            <span className='relative z-20 flex items-center text-xs font-bold px-2 pt-1 pb-2'>
              <Image
                alt={title}
                src={icon}
                placeholder='blur'
                priority
                className='mr-1 mt-[1px] size-3'
              />
              <span>{title}</span>
            </span>

            <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40'></span>
          </div>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className='absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2'
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className='absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]'
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className='absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]'
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className='absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]'
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className='absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-1/2 group-hover/pin:h-1/2 blur-[2px]' />
          <motion.div className='absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-1/2 group-hover/pin:h-1/2  ' />
          <motion.div className='absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]' />
          <motion.div className='absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 ' />
        </>
      </div>
    </motion.div>
  );
};
