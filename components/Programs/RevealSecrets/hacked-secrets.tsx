"use client";

import { Button } from "../../UI/button";
import { HyperText } from "../../UI/hyper-text";
import { handleSideCannons } from "../../UI/confetti";
import { useEffect } from "react";

type HackedSecretsProps = {
  onClose: () => void;
};

export default function HackedSecrets({ onClose }: HackedSecretsProps) {
  useEffect(() => {
    handleSideCannons();
  }, []);

  return (
    <div className='absolute inset-0 z-100 flex flex-col justify-center items-center bg-background/85'>
      <HyperText className='text-3xl'>Portfolio Hacked!</HyperText>
      <div className='flex'>
        <div className='flex flex-col items-center'>
          <HyperText className='text-xl w-30 text-center'>Hacker</HyperText>
          <HyperText className='text-xl'>1</HyperText>
        </div>
        <div className='flex flex-col items-center'>
          <HyperText className='text-xl w-30 text-center'>Me</HyperText>
          <HyperText className='text-xl'>0</HyperText>
        </div>
      </div>
      <div>
        <HyperText className='text-md' as={"span"}>
          Time for set stronger secret
        </HyperText>
        <span className='text-md'> 😅🕵️‍♂️🔐</span>
      </div>

      <Button variant={"outline"} className='w-fit mt-8' onClick={onClose}>
        close
      </Button>
    </div>
  );
}
