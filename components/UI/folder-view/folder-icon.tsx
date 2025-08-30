import { useProcessContext } from "@/contexts/process-manager";
import {
  TProcessButton,
  TProcessButtonBase,
  TProcessButtonLink,
  TProcessButtonWindow,
} from "@/types/process-button";
import Image, { StaticImageData } from "next/image";
import { PinContainer } from "../3d-pin";

type FolderIconProps = TProcessButton;

export function WindowIconCard({ title, icon, viewer }: TProcessButtonBase) {
  return (
    <picture className='relative'>
      <Image
        alt={title}
        src={icon}
        placeholder='blur'
        priority
        className='pointer-events-none size-28 sm:size-33'
      />
      {viewer && (
        <Image
          alt={title}
          src={viewer}
          placeholder='blur'
          priority
          className='absolute -right-2 -bottom-2 pointer-events-none size-11.5'
        />
      )}
    </picture>
  );
}

export function LinkIconCard({
  icon,
  viewer,
  linkTitle = "",
  link,
}: { icon: StaticImageData; viewer?: StaticImageData } & TProcessButtonLink) {
  return (
    <PinContainer icon={icon} title={linkTitle} href={link}>
      <div className='border flex flex-col rounded-lg h-full overflow-hidden group'>
        <h1 className='flex items-center text-[10px] sm:text-xs p-2 group-hover:invisible'>
          <Image alt={linkTitle} src={icon} className='mr-1 mt-[1px] size-3' />
          <span>{linkTitle}</span>
        </h1>
        <div className='flex-1 overflow-hidden'>
          <Image alt={linkTitle!} src={viewer!} className='w-full h-full' />
        </div>
      </div>
    </PinContainer>
  );
}

export default function FolderIcon({
  type,
  id,
  title,
  icon,
  viewer,
  ...others
}: FolderIconProps) {
  const { handleOpen } = useProcessContext();

  return (
    <div
      key={id}
      className='p-2 h-min rounded-xl hover:bg-foreground/8 border border-transparent hover:border-current/10'
      onDoubleClick={
        type == "window"
          ? () => {
              const props = others as TProcessButtonWindow;
              handleOpen({
                id,
                icon: viewer || icon,
                title,
                ...props,
              });
            }
          : undefined
      }
    >
      <figure className='flex flex-col place-items-center'>
        {(type == "window" || type == "raw") && (
          <WindowIconCard id={id} title={title} icon={icon} viewer={viewer} />
        )}
        {type == "link" && (
          <LinkIconCard
            {...(others as TProcessButtonLink)}
            icon={icon}
            viewer={viewer}
          />
        )}
        <figcaption className='text-xs text-shadow-xs text-center mt-1 wrap-anywhere select-none'>
          {title}
        </figcaption>
      </figure>
    </div>
  );
}
