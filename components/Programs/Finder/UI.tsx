import { BasicProps } from '@/types/basic-props';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TIconType } from '@/types/icon-type';

export type TColor = 'Yellow' | 'Purple' | 'Green' | 'Sky' | 'Pink';

const CardColor: { [key in TColor]: string } = {
  Purple: 'bg-purple/8 text-purple border-purple/30',
  Green: 'bg-green/8 text-green border-green/30',
  Yellow: 'bg-yellow/8 text-yellow border-yellow/30',
  Sky: 'bg-sky/8 text-sky border-sky/30',
  Pink: 'bg-pink/8 text-pink border-pink/30',
};

function Container({ className, children }: BasicProps) {
  return (
    <div
      className={cn(
        'relative z-0 flex flex-col-reverse sm:flex-row sm:max-w-228 mx-auto font-mono text-xs sm:text-sm',
        className
      )}
    >
      {children}
    </div>
  );
}

function LeftSide({ children }: BasicProps) {
  return <div className="grow-1">{children}</div>;
}

function RightSideButton({
  icon: Icon,
  title,
  ...props
}: { icon: TIconType; title: string } & React.ComponentProps<'button'>) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    return () => setLoaded(false);
  }, []);

  return (
    <button
      className={cn(
        'fixed bottom-10 -right-18 flex size-30 bg-card text-card-foreground pt-2 px-4 -rotate-20 rounded-4xl shadow-2xl border transition-[right] duration-500 ease-in-out',
        loaded ? '-right-18' : '-right-30'
      )}
      {...props}
    >
      <Icon className="size-6" />
      <p className="font-extrabold text-xs -ml-22 rotate-90">{title}</p>
    </button>
  );
}

export { CardColor, Container, LeftSide, RightSideButton };
