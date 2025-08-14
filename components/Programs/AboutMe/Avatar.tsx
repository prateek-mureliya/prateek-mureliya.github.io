import ProfileImg from "@/public/images/profile.png";
import Image from "next/image";
import { motion } from "motion/react";
import { BasicProps } from "@/types/basic-props";
import { cn } from "@/lib/utils";

export default function Avatar({ className }: BasicProps) {
  return (
    <div className={cn("relative rounded-full p-2", className)}>
      <Image
        src={ProfileImg}
        alt='profile'
        className='h-full block shadow-xl rounded-full'
      />
      <motion.div
        className='w-full h-full rounded-full absolute top-0 left-0 border-2 border-dashed border-foreground'
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        }}
      />
    </div>
  );
}
