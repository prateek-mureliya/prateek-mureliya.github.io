import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/UI/carousel';
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/UI/dialog/dialog';
import GradientText from '@/components/UI/gradient-text';
import { WindowActionClose } from '@/components/Window/window-action-button';
import { cn } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';
import { CardColor, TColor } from '../UI';
import { FaArrowTrendUp, FaCheck, FaCode } from 'react-icons/fa6';
import { BsSpeedometer2 } from 'react-icons/bs';
import { MdOutlinePerson4 } from 'react-icons/md';
import { TIconType } from '@/types/icon-type';
import { JSX } from 'react';

export type TExperienceImpact = {
  icon: TIconType;
  title: string;
  description: string;
  impact: string;
  scale: string;
  ownership: string;
  stack: string | JSX.Element;
  achievements: string[];
};

type ExperienceImpactProps = BasicProps & { impacts: TExperienceImpact[]; color: TColor };

function MiddlePoint({
  icon: Icon,
  iconColor,
  label,
  description,
  color,
}: {
  icon: TIconType;
  iconColor: string;
  label: string;
  description: string | JSX.Element;
  color: TColor;
}) {
  return (
    <div className={cn(CardColor[color], 'flex p-2 text-muted-foreground border-b last:border-b-transparent')}>
      <div className="w-26 font-bold text-foreground flex-none">
        <Icon className={cn('inline-block size-4', iconColor)} /> <span>{label}</span>
      </div>
      {description}
    </div>
  );
}

function ExperienceImpact({ className, impacts, color }: ExperienceImpactProps) {
  return (
    <div
      className={cn(
        'relative h-140 sm:h-126 overflow-hidden shadow-2xl sm:shadow-none flex-none bg-background sm:bg-transparent p-2 sm:p-0 border sm:border-none rounded-lg sm:rounded-none',
        className
      )}
    >
      <Carousel className="h-110">
        <div className="flex justify-between">
          <h1 className="font-extrabold text-lg">
            Experience <GradientText>Impact</GradientText>
          </h1>
          {impacts.length > 1 && (
            <div>
              <CarouselPrevious variant={'ghost'} className="relative left-0 top-0 translate-y-0 size-7 mr-2" />
              <CarouselNext variant={'ghost'} className="relative right-0 top-0 translate-y-0 size-7" />
            </div>
          )}
        </div>
        <CarouselContent>
          {impacts.map(({ icon: Icon, title, description, impact, scale, ownership, stack, achievements }, idx) => (
            <CarouselItem
              key={idx}
              className={cn(CardColor[color], 'mt-2 p-2 border rounded-sm text-xs flex flex-col gap-4 select-none')}
            >
              <div className="font-bold text-sm">
                <Icon className="inline-block mr-2 size-4" />
                {title}
              </div>

              <div className="text-muted-foreground">{description}</div>

              <div className={cn(CardColor[color], 'border rounded-sm')}>
                <MiddlePoint
                  color={color}
                  icon={FaArrowTrendUp}
                  iconColor="text-green"
                  label="Impact"
                  description={impact}
                />
                <MiddlePoint
                  color={color}
                  icon={BsSpeedometer2}
                  iconColor="text-green"
                  label="Scale"
                  description={scale}
                />
                <MiddlePoint
                  color={color}
                  icon={MdOutlinePerson4}
                  iconColor="text-muted-foreground"
                  label="Ownership"
                  description={ownership}
                />
                <MiddlePoint
                  color={color}
                  icon={FaCode}
                  iconColor="text-muted-foreground"
                  label="Tech Stack"
                  description={stack}
                />
              </div>

              <div className="font-bold text-sm">Key Achievements</div>
              <div className="flex flex-col gap-1">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="text-muted-foreground flex">
                    <FaCheck className="inline text-green mr-2" />
                    {achievement}
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function ExperienceImpactPopup({ impacts, color }: ExperienceImpactProps) {
  return (
    <DialogContent
      hideHeader
      onCloseAutoFocus={(e) => e.preventDefault()}
      className="bg-transparent rounded-none shadow-none border-none outline-0 top-[unset] bottom-0 translate-y-0 w-full max-w-full p-2"
      windowClassName="p-0 gap-2"
    >
      <DialogTitle hidden>ExperienceImpactPopup DialogTitle</DialogTitle>
      <DialogDescription hidden>ExperienceImpactPopup DialogDescription</DialogDescription>
      <DialogClose asChild>
        <WindowActionClose>
          <span className="sr-only">Close</span>
        </WindowActionClose>
      </DialogClose>
      <ExperienceImpact impacts={impacts} color={color} />
    </DialogContent>
  );
}

export { ExperienceImpact, ExperienceImpactPopup };
