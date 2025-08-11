import Image, { StaticImageData } from "next/image";
import { Button } from "../UI/button";
import { DockIcon } from "../UI/dock";
import { cn } from "@/lib/utils";

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
        className={cn("size-12 rounded-full", focus ? "ring" : "")}
        onClick={onClick}
      >
        <Image
          alt={title}
          src={icon}
          width={22}
          height={22}
          priority
          className='pointer-events-none'
        />
      </Button>
    </DockIcon>
  );
}
