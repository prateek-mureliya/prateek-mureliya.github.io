import { BasicProps } from '@/types/basic-props';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TIconType } from '@/types/icon-type';

function Container({ children }: BasicProps) {
  return (
    <div className="relative z-0 flex flex-col-reverse sm:flex-row sm:max-w-228 mx-auto font-mono text-xs sm:text-sm">
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

export { Container, LeftSide, RightSideButton };
