import { BasicProps } from '@/types/basic-props';
import { JSX, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TIconType } from '@/types/icon-type';
import { TIconSvg } from '@/components/custom-icons';
import { GrLocation } from 'react-icons/gr';
import { Dialog, DialogTrigger } from '@/components/UI/dialog/dialog';
import { isMobile } from 'react-device-detect';
import { MdArrowForwardIos } from 'react-icons/md';
import { TStringElement } from '@/types/globals';

const COLORS = ['Purple', 'Green', 'Yellow', 'Sky', 'Pink'] as const;
export type TColor = (typeof COLORS)[number];

export type TTimelineImpact = {
  icon: TIconType;
  title: string;
  description: string;
  impact: string;
  scale: string;
  ownership: string;
  stack: TStringElement;
  achievements: string[];
};

export type TTimeline = {
  interval: string;
  title: string;
  desc: string;
  location: string;
  points: JSX.Element;
  color: TColor;
  icon: TIconSvg | TIconType;
  impacts: TTimelineImpact[];
};

const CardColor: { [key in TColor]: string } = {
  Purple: 'bg-purple/8 text-purple border-purple/30',
  Green: 'bg-green/8 text-green border-green/30',
  Yellow: 'bg-yellow/8 text-yellow border-yellow/30',
  Sky: 'bg-sky/8 text-sky border-sky/30',
  Pink: 'bg-pink/8 text-pink border-pink/30',
};

function getColorByIndex(index: number): TColor {
  return COLORS[index % COLORS.length];
}

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
        'fixed bottom-10 flex gap-1 justify-end size-30 bg-card text-card-foreground pt-2 px-3 rotate-250 rounded-4xl shadow-2xl border transition-[right] duration-500 ease-in-out',
        loaded ? '-right-18' : '-right-30'
      )}
      {...props}
    >
      <p className="font-extrabold text-xs h-fit rotate-180 pb-1">{title}</p>
      <Icon className="size-6 rotate-90" />
    </button>
  );
}

function ImpactButton({ color, ...props }: { color: TColor } & React.ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'absolute p-1 top-2 sm:top-6 right-2 sm:right-6 border rounded-full shadow-2xl active:scale-90',
        CardColor[color]
      )}
      {...props}
    >
      <MdArrowForwardIos className="size-5 sm:size-7" />
    </button>
  );
}

function Timeline({ className, children }: BasicProps) {
  return <div className={cn('flex flex-col gap-3', className)}>{children}</div>;
}

function TimelineItem({
  desc,
  interval,
  title,
  location,
  points,
  color,
  icon: Icon,
  impacts,
  onClick,
  children,
}: TTimeline & BasicProps & { onClick?: () => void }) {
  return (
    <div
      className={cn(
        'relative ml-10 p-2 text-sm border rounded-sm',
        CardColor[color],
        "before:absolute before:content-[''] before:top-11 before:-bottom-4 last:before:bottom-2 before:-left-6 before:border-l-2 before:border-foreground/30"
      )}
    >
      <Icon className={cn('absolute size-8 p-1 top-2 -left-10 border rounded-md', CardColor[color])} />

      <div className="text-xs text-muted-foreground mb-1">{interval}</div>
      <div className="font-bold text-foreground">{title}</div>
      <div className="font-bold mb-1">{desc}</div>
      <div className="text-xs text-muted-foreground flex gap-1 items-center mb-2">
        <GrLocation />
        {location}
      </div>

      {points}

      {impacts.length > 0 &&
        (isMobile ? (
          <Dialog>
            <DialogTrigger asChild>
              <ImpactButton color={color} />
            </DialogTrigger>
            {children}
          </Dialog>
        ) : (
          <ImpactButton color={color} onClick={onClick} />
        ))}
    </div>
  );
}

function TimelineBadges({ className, children }: BasicProps) {
  return <div className={cn('flex flex-wrap gap-1', className)}>{children}</div>;
}

function TimelineBadge({ icon: Icon, title, color }: { icon?: TIconType; title: string; color: TColor }) {
  return (
    <div className={cn('inline-block text-xs px-1 py-0.5 border rounded-xs font-bold', CardColor[color])}>
      {Icon && <Icon className="inline-block -mt-1 mr-1" />}
      {title}
    </div>
  );
}

export {
  CardColor,
  getColorByIndex,
  Container,
  LeftSide,
  RightSideButton,
  Timeline,
  TimelineItem,
  TimelineBadges,
  TimelineBadge,
};
