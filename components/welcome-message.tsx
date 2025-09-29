"use client";
import { useState } from "react";
import BlurText from "./UI/blur-text";

export default function WelcomeMessage() {
  const [count, setCount] = useState(0);
  const handleAnimationComplete = () => {
    setCount((prev) => prev + 1);
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
          text='hello 👋'
          delay={150}
          animateBy='words'
          direction='bottom'
          onAnimationComplete={handleAnimationComplete}
          className='flex justify-center items-center h-screen text-7xl'
        />
      )}
      {count === 1 && (
        <BlurText
          text='नमस्ते 🙏'
          delay={150}
          animateBy='words'
          direction='bottom'
          onAnimationComplete={handleAnimationComplete}
          className='flex justify-center items-center h-screen text-7xl'
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
            className='sm:max-w-250 text-center inline-block mt-2 sm:mt-4 text-xl sm:text-3xl text-secondary-foreground bg-secondary'
          />
        </>
      )}
    </div>
  );
}
