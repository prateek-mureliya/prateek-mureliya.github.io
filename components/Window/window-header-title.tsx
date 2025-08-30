import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

export type WindowHeaderTitleProps = {
  title: string;
  icon?: StaticImageData;
  className?: string;
};
export default function WindowHeaderTitle({
  title,
  icon,
  className,
}: WindowHeaderTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center col-start-2 justify-self-center gap-x-1",
        className
      )}
    >
      {icon && (
        <Image alt={title} src={icon} priority className='select-none size-5' />
      )}
      <span className='text-xs select-none'>{title}</span>
    </div>
  );
}
