'use client';
import { DialogContent, DialogTitle } from '@/components/UI/dialog/dialog';
import { WindowActionClose } from '@/components/Window/window-action-button';
import { cn } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';
import { DialogClose, DialogDescription } from '@radix-ui/react-dialog';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { KeyControls, TouchControls } from './controls';
import { useTetris } from './Tetris';
import { useSnake } from './Snake';
import { GameRef } from '@/types/game';
import { useBrick } from './Brick';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './utils';

function GameBox({ className, focus }: BasicProps & { focus: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tetrisRef = useTetris();
  const snakeRef = useSnake();
  const brickRef = useBrick();
  const games = useRef([tetrisRef, snakeRef, brickRef]);
  const [gameRef, setGameRef] = useState(() => {
    const idx = Math.floor(Math.random() * games.current.length);
    return games.current[idx];
  });
  const [isSelected, setIsSelected] = useState(false);

  const changeGame = useCallback(
    (prevGameRef: GameRef, dir: number) => {
      let idx = 0;
      if (dir > 0) {
        idx = prevGameRef.number == games.current.length ? 0 : prevGameRef.number;
      } else {
        idx = prevGameRef.number == 1 ? games.current.length - 1 : prevGameRef.number - 2;
      }

      return games.current[idx];
    },
    [games]
  );

  const controls = useCallback(
    () =>
      isSelected
        ? gameRef.controls
        : {
            reset: () => {},
            action: () => setIsSelected(true),
            up: () => {},
            down: () => {},
            left: () => setGameRef((prev) => changeGame(prev, -1)),
            right: () => setGameRef((prev) => changeGame(prev, 1)),
          },
    [isSelected, gameRef, changeGame]
  );

  const reset = useCallback(() => {
    gameRef.controls?.reset();
    setIsSelected(false);
  }, [gameRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!isSelected && gameRef.drawHome) {
      gameRef.drawHome(ctx);
    }

    if (isSelected && gameRef.drawPlayArea) {
      gameRef.drawPlayArea(ctx);
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Backspace') reset();
      if (e.key === 'Enter' || e.code === 'Space') controls()?.action();
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') controls()?.up();
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') controls()?.down();
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') controls()?.left();
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') controls()?.right();
    }
    if (focus) window.addEventListener('keydown', handleKey);

    return () => {
      if (focus) window.removeEventListener('keydown', handleKey);
    };
  }, [controls, reset, isSelected, gameRef, focus]);

  return (
    <div
      className={cn(
        'bg-cyan-800 bg-gradient-to-r from-cyan-500 to-cyan-600 lg:bg-none w-full h-fit rounded-2xl lg:rounded-lg select-none',
        className
      )}
    >
      <div className="w-60 lg:w-100 h-71.5 mx-auto my-4 lg:my-0 bg-black/50 lg:bg-card lg:dark:bg-card/20 p-3 border rounded-lg shadow-none lg:shadow-2xl flex">
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
        {!isMobile && <KeyControls />}
      </div>
      {isMobile && (
        <TouchControls
          resetClick={() => reset()}
          actionClick={() => controls()?.action()}
          upClick={() => controls()?.up()}
          leftClick={() => controls()?.left()}
          rightClick={() => controls()?.right()}
          downClick={() => controls()?.down()}
        />
      )}
    </div>
  );
}

function GameBoxPopup() {
  return (
    <DialogContent
      hideHeader
      onCloseAutoFocus={(e) => e.preventDefault()}
      className="bg-transparent rounded-none shadow-none border-none outline-0 top-[unset] bottom-0 translate-y-0 w-full max-w-full p-2"
      windowClassName="p-0 gap-2"
    >
      <DialogTitle hidden>GameBox DialogTitle</DialogTitle>
      <DialogDescription hidden>GameBox DialogDescription</DialogDescription>
      <DialogClose asChild>
        <WindowActionClose>
          <span className="sr-only">Close</span>
        </WindowActionClose>
      </DialogClose>
      <GameBox focus={false} />
    </DialogContent>
  );
}

export { GameBox, GameBoxPopup };
