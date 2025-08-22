"use client";

import { StaticImageData } from "next/image";
import { JSX } from "react";
import SystemIcon from "../Programs/system-icon";
import { useProcessContext } from "@/contexts/process-manager";
import { WindowBodyProps } from "../Window/window-body";
import { RevealSecrets } from "../Programs";
import AdobeIcon from "@/public/images/icon/adobe.png";
import AboutMeIcon from "@/public/images/icon/about-me.png";
import SecretIcon from "@/public/images/icon/secret.png";
import ResumePreview from "@/public/images/resume-preview.png";
import { AboutMe, PDFWindow } from "../Programs";

type TDesktopButtonBase = {
  id: string;
  title: string;
  icon: StaticImageData;
  iconX?: number;
  iconY?: number;
  viewer?: StaticImageData;
};
type TDesktopButtonDialog = { type: "dialog" };
type TDesktopButtonWindow = {
  type: "window";
  x: number;
  y: number;
  width: number;
  height: number;
  link?: string;
  window: (props: WindowBodyProps) => JSX.Element;
};

type TDesktopButton = TDesktopButtonBase &
  (TDesktopButtonDialog | TDesktopButtonWindow);

const desktopButtons: TDesktopButton[] = [
  {
    type: "window",
    id: "aboutme",
    title: "About Me",
    icon: AboutMeIcon,
    x: 345,
    y: 85,
    width: 845,
    height: 475,
    window: AboutMe,
  },
  {
    type: "window",
    id: "resume",
    title: "Resume",
    icon: ResumePreview,
    viewer: AdobeIcon,
    x: 205,
    y: 155,
    width: 680,
    height: 450,
    link: "media/Prateek_Kumar_SeniorSoftwareEngineer_Resume.pdf",
    window: PDFWindow,
  },
  {
    type: "dialog",
    id: "secret",
    title: "Secret",
    icon: SecretIcon,
  },
];

export default function Desktop() {
  const { handleOpen } = useProcessContext();

  return (
    <ol className='absolute inset-0 z-1 h-desktop grid grid-flow-col grid-cols-desktop grid-rows-desktop gap-x-4 sm:gap-x-2 gap-y-5 px-4 sm:px-2 py-4 sm:py-2 mt-11'>
      {desktopButtons.map(
        ({
          type,
          id,
          icon,
          title,
          iconX = 0,
          iconY = 0,
          viewer,
          ...others
        }) => {
          switch (type) {
            case "dialog":
              return (
                <RevealSecrets
                  key={id}
                  icon={icon}
                  title={title}
                  x={iconX}
                  y={iconY}
                />
              );
            case "window":
              const props = others as TDesktopButtonWindow;
              return (
                <SystemIcon
                  key={id}
                  icon={icon}
                  title={title}
                  x={iconY}
                  y={iconY}
                  viewer={viewer}
                  onDoubleClick={() =>
                    handleOpen({
                      id,
                      icon: viewer || icon,
                      title,
                      ...props,
                    })
                  }
                />
              );
          }
        }
      )}
    </ol>
  );
}
