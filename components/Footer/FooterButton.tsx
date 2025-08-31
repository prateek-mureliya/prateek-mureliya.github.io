import Image, { StaticImageData } from "next/image";
import { Button } from "../UI/button";
import { DockIcon } from "../UI/dock";
import { cn } from "@/lib/utils";
import { BorderBeam } from "../UI/border-beam";

type FooterButton = {
  icon: StaticImageData;
  title: string;
  focus: boolean;
  onClick: () => void;
};

export default function FooterButton({
  icon,
  title,
  focus,
  onClick,
}: FooterButton) {
  return (
    <DockIcon>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={cn("size-12 rounded-full relative")}
        onClick={onClick}
      >
        <Image
          alt={title}
          src={icon}
          placeholder='blur'
          className='pointer-events-none size-5.5'
        />
        {focus && (
          <BorderBeam
            duration={5}
            size={40}
            borderWidth={2}
            className='from-yellow-800 dark:from-yellow-400 via-purple-800 dark:via-purple-400 to-transparent'
          />
        )}
      </Button>
    </DockIcon>
  );
}
