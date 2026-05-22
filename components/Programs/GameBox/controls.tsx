import { cva, VariantProps } from 'class-variance-authority';
import { BiDownArrow, BiLeftArrow, BiRightArrow, BiUpArrow } from 'react-icons/bi';
import LineComment from '@/components/UI/line-comment';
import { Kbd, KbdGroup } from '@/components/UI/kbd';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'rounded-full text-white font-bold shadow-xl border-b-4 active:border-b-0 flex justify-center items-center select-none active:translate-y-1 transition-all',
  {
    variants: {
      variant: {
        yellow: 'bg-yellow-500 border-yellow-700',
      },
      size: {
        xs: 'size-6',
        sm: 'size-16',
        md: 'size-22',
      },
    },
    defaultVariants: {
      variant: 'yellow',
      size: 'sm',
    },
  }
);
const GameButton = ({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => (
  <button data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
    {children}
  </button>
);

const TouchControls = ({
  resetClick,
  actionClick,
  upClick,
  leftClick,
  rightClick,
  downClick,
}: {
  resetClick: () => void;
  actionClick: () => void;
  upClick: () => void;
  leftClick: () => void;
  rightClick: () => void;
  downClick: () => void;
}) => {
  return (
    <div className="flex justify-between px-4 pb-4">
      <div className="flex flex-col items-center gap-0">
        <GameButton onClick={upClick}>
          <BiUpArrow />
        </GameButton>
        <div className="flex gap-12">
          <GameButton onClick={leftClick}>
            <BiLeftArrow />
          </GameButton>
          <GameButton onClick={rightClick}>
            <BiRightArrow />
          </GameButton>
        </div>
        <GameButton onClick={downClick}>
          <BiDownArrow />
        </GameButton>
      </div>
      <div className="flex flex-col items-center">
        <GameButton size={'xs'} onClick={resetClick} />
        <p className="select-none text-xs">reset</p>
      </div>
      <div className="flex items-center">
        <GameButton size={'md'} onClick={actionClick} />
      </div>
    </div>
  );
};
const KeyControls = () => {
  return (
    <div className="bg-transparent w-40 pl-4">
      <LineComment className="text-xs mt-0">Use your keyboard</LineComment>
      <LineComment className="text-xs mt-4">Move:</LineComment>
      <ul className="list-disc list-inside pl-2">
        <li>
          <KbdGroup>
            <Kbd>⮝</Kbd>
            <Kbd>⮟</Kbd>
            <Kbd>⮜</Kbd>
            <Kbd>⮞</Kbd>
          </KbdGroup>
        </li>
        <li className="mt-2">
          <KbdGroup>
            <Kbd>W</Kbd>
            <Kbd>S</Kbd>
            <Kbd>A</Kbd>
            <Kbd>D</Kbd>
          </KbdGroup>
        </li>
      </ul>
      <LineComment className="text-xs mt-4 inline-block">Action:</LineComment>
      <KbdGroup className="inline-block">
        <Kbd>Space</Kbd>
        <span>/</span>
        <Kbd>↵</Kbd>
      </KbdGroup>
      <LineComment className="text-xs mt-4 inline-block">Reset:</LineComment>
      <Kbd className="inline-block">⌫</Kbd>
    </div>
  );
};

export { TouchControls, KeyControls };
