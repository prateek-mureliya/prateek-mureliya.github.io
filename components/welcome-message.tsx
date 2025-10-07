"use client";
import { useState } from "react";
import BlurText from "./UI/blur-text";
import { toast } from "sonner";
import { useLocalStorage } from "@/hook/useLocalStorage";
import { useProcessContext } from "@/contexts/process-manager";
import { ABOUT_ME } from "./constants/app-icons/about-me";

export default function WelcomeMessage() {
  const { handleOpen } = useProcessContext();
  const [readInstruction, setReadInstruction] = useLocalStorage(
    "readInstruction",
    false
  );
  const [count, setCount] = useState(0);
  const handleAnimationComplete = () => {
    setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 700);
  };

  const handleToastClose = () => {
    setReadInstruction(true);
    if (ABOUT_ME.type === "window") handleOpen({ ...ABOUT_ME });
  };

  const handleToast = () => {
    toast.warning("Instruction", {
      description: (
        <span>
          Use&nbsp;
          <pre className='font-bold inline-block bg-white/20 px-1 rounded-sm'>
            double click
          </pre>
          &nbsp; to open any application
        </span>
      ),
      duration: 30000,
      onDismiss: handleToastClose,
      cancel: {
        label: "close",
        onClick: handleToastClose,
      },
    });
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${
        count < 2
          ? "bg-background z-1050"
          : "flex flex-col justify-center items-center z-0"
      }`}
    >
      {count == 0 && (
        <BlurText
          text='Hello 👋'
          delay={150}
          animateBy='words'
          direction='bottom'
          onAnimationComplete={handleAnimationComplete}
          className='flex justify-center items-center h-dvh text-7xl'
        />
      )}
      {count === 1 && (
        <BlurText
          text='नमस्ते 🙏'
          delay={150}
          animateBy='words'
          direction='bottom'
          onAnimationComplete={handleAnimationComplete}
          className='flex justify-center items-center h-dvh text-7xl'
        />
      )}
      {count === 2 && (
        <>
          <BlurText
            text='Welcome to My Portfolio'
            delay={150}
            animateBy='words'
            direction='bottom'
            className='sm:max-w-250 text-center inline-block text-3xl sm:text-5xl font-bold'
          />
          <BlurText
            text='Where Ideas Meet Execution'
            delay={150}
            animateBy='words'
            direction='bottom'
            onAnimationComplete={readInstruction ? undefined : handleToast}
            className='sm:max-w-250 text-center inline-block mt-2 sm:mt-4 text-xl sm:text-3xl text-secondary-foreground bg-secondary'
          />
        </>
      )}
    </div>
  );
}
