"use client";
import { Slot } from "@radix-ui/react-slot";
import { Ripple } from "./Ripple";
import { useHackedContext } from "@/contexts/hacked";
import LetterGlitch from "./LetterGlitch";

export default function Wallpaper() {
  const { isHacked } = useHackedContext();
  return (
    <Slot role='wallpaper' className='absolute inset-0 z-0 overflow-hidden'>
      {isHacked ? <LetterGlitch /> : <Ripple />}
    </Slot>
  );
}
