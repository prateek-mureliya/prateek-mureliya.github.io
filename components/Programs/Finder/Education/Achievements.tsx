import { DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/UI/dialog/dialog';
import { WindowActionClose } from '@/components/Window/window-action-button';
import { chunkArray, cn } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';
import { FaCode, FaGraduationCap, FaReact } from 'react-icons/fa6';
import { CardColor, TColor, TimelineBadge } from '../UI';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/UI/carousel';
import { TIconType } from '@/types/icon-type';
import { LucideBaby, LucideBriefcaseBusiness } from 'lucide-react';
import { GiOpenBook } from 'react-icons/gi';
import GradientText from '@/components/UI/gradient-text';

type TAchievements = {
  icon: TIconType;
  title: string;
  subtitle: string;
  tag: string;
  color: TColor;
};

const ACHIEVEMENTS: TAchievements[] = [
  {
    icon: FaGraduationCap,
    title: '1st Generation',
    subtitle: 'Engineer',
    tag: 'Trailblazer',
    color: 'Pink',
  },
  {
    icon: FaCode,
    title: 'Java & Python',
    subtitle: 'Developer',
    tag: 'Code Crafter',
    color: 'Purple',
  },
  {
    icon: FaReact,
    title: 'STEM Background',
    subtitle: 'Science & Tech',
    tag: 'Curious Mind',
    color: 'Green',
  },
  {
    icon: LucideBriefcaseBusiness,
    title: 'Work In',
    subtitle: 'Bengaluru, India',
    tag: 'Career Ready',
    color: 'Yellow',
  },
  {
    icon: GiOpenBook,
    title: 'Studied In',
    subtitle: 'Gwalior, India',
    tag: 'Academic City',
    color: 'Sky',
  },
  {
    icon: LucideBaby,
    title: 'Born In',
    subtitle: 'Jhansi, India',
    tag: 'Origin Story',
    color: 'Pink',
  },
];

function Achievement({ icon: Icon, title, subtitle, tag, color }: TAchievements) {
  return (
    <div
      className={cn(
        CardColor[color],
        'w-30 h-41 text-center border rounded-lg py-4 select-none bg-background text-foreground'
      )}
    >
      <div className={cn(CardColor[color], 'inline-block p-3 mb-2 rounded-full border')}>
        <Icon className="size-7" />
      </div>
      <div className="font-bold text-xs">{title}</div>
      <div className="text-xs text-muted-foreground mb-3">{subtitle}</div>
      <TimelineBadge title={tag} color={color} />
    </div>
  );
}

function Achievements({ className }: BasicProps) {
  const achievementGroups = chunkArray(ACHIEVEMENTS, 6);

  return (
    <div
      className={cn(
        'relative h-100 sm:h-126 overflow-hidden shadow-2xl lg:shadow-none flex-none bg-background lg:bg-transparent p-2 lg:p-0 border lg:border-none rounded-lg lg:rounded-none',
        className
      )}
    >
      <Carousel>
        <div className="flex justify-between mb-2">
          <h1 className="font-extrabold text-lg">
            Profile <GradientText>Highlights</GradientText>
          </h1>
          {achievementGroups.length > 1 && (
            <div>
              <CarouselPrevious variant={'ghost'} className="relative left-0 top-0 translate-y-0 size-7 mr-2" />
              <CarouselNext variant={'ghost'} className="relative right-0 top-0 translate-y-0 size-7" />
            </div>
          )}
        </div>

        <CarouselContent>
          {achievementGroups.map((achievements, index) => (
            <CarouselItem key={index} className="p-0 flex flex-wrap gap-1 sm:gap-5">
              {achievements.map((props, idx) => (
                <Achievement key={idx} {...props} />
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function AchievementsPopup() {
  return (
    <DialogContent
      hideHeader
      onCloseAutoFocus={(e) => e.preventDefault()}
      className="bg-transparent rounded-none shadow-none border-none outline-0 top-[unset] bottom-0 translate-y-0 w-full max-w-full p-2"
      windowClassName="p-0 gap-2"
    >
      <DialogTitle hidden>Achievements DialogTitle</DialogTitle>
      <DialogDescription hidden>Achievements DialogDescription</DialogDescription>
      <DialogClose asChild>
        <WindowActionClose>
          <span className="sr-only">Close</span>
        </WindowActionClose>
      </DialogClose>
      <Achievements />
    </DialogContent>
  );
}

export { Achievements, AchievementsPopup };
