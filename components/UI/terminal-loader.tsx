'use client';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

export const TerminalLoader = ({
  duration = 100,
  isDone,
  onFinish,
}: {
  duration: number;
  isDone: boolean;
  onFinish: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(isDone);

  useEffect(() => {
    if (!done) {
      const intervalTime = 50; // update every 50ms
      const steps = duration / intervalTime;
      let count = 0;

      const interval = setInterval(() => {
        count++;
        setProgress((count / steps) * 100);

        if (count >= steps) {
          clearInterval(interval);
          setProgress(100);
          if (onFinish) {
            setTimeout(() => {
              setDone(true);
              onFinish();
            }, 300);
          }
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [done, duration, onFinish]);

  // Build ASCII progress bar (20 blocks wide)
  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const bar = '█'.repeat(filledBlocks) + '-'.repeat(totalBlocks - filledBlocks);

  return done ? (
    <div className="flex text-lime-600 font-bold">
      <Check className="size-4 mr-1 mt-0.5" strokeWidth={2} />
      <div>Opened</div>
    </div>
  ) : (
    <div className="text-lime-600">
      Opening: [{bar}] {Math.round(progress)}%
    </div>
  );
};
