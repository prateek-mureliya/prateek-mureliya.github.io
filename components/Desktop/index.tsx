"use client";

import DesktopIcon from "./desktop-icon";
import { useProcessContext } from "@/contexts/process-manager";
import { RevealSecrets } from "../Programs";
import AdobeIcon from "@/public/images/icon/adobe.png";
import AboutMeIcon from "@/public/images/icon/about-me.png";
import SecretIcon from "@/public/images/icon/secret.png";
import SnapBinIcon from "@/public/images/icon/snap-bin.png";
import ContactUsIcon from "@/public/images/icon/contact-us.png";
import TerminalIcon from "@/public/images/icon/terminal.png";
import ResumePreview from "@/public/images/resume-preview.png";
import { AboutMe, PDFWindow, SnapBin, ContactUs, Terminal } from "../Programs";
import { TProcessButton, TProcessButtonWindow } from "@/types/process-button";

const desktopButtons: TProcessButton[] = [
  {
    type: "window",
    id: "aboutme",
    title: "About Me",
    icon: AboutMeIcon,
    x: 326,
    y: 85,
    width: 898,
    height: 475,
    window: AboutMe,
  },
  {
    type: "window",
    id: "terminal",
    title: "Terminal",
    icon: TerminalIcon,
    x: 345,
    y: 85,
    width: 845,
    height: 475,
    window: Terminal,
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
    type: "window",
    id: "contactus",
    title: "Contact Us",
    icon: ContactUsIcon,
    x: 450,
    y: 150,
    width: 665,
    height: 450,
    window: ContactUs,
  },
  {
    type: "window",
    id: "snapbin",
    title: "Snap Bin",
    icon: SnapBinIcon,
    x: 350,
    y: 215,
    width: 665,
    height: 450,
    window: SnapBin,
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
              const props = others as TProcessButtonWindow;
              return (
                <DesktopIcon
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
