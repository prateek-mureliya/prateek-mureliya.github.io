"use client";
import DesktopIcon from "./desktop-icon";
import { useProcessContext } from "@/contexts/process-manager";
import { ABOUT_ME } from "../constants/app-icons/about-me";
import { TERMINAL } from "../constants/app-icons/terminal";
import { RESUME_PDF } from "../constants/app-icons/resume-pdf";
import { CONTACT_US } from "../constants/app-icons/contact-us";
import { SNAP_BIN } from "../constants/app-icons/snap-bin";
import { SECRET } from "../constants/app-icons/sceret";
import {
  TProcessButton,
  TProcessButtonDialog,
  TProcessButtonWindow,
} from "@/types/process-button";

const desktopButtons: TProcessButton[] = [
  ABOUT_ME,
  TERMINAL,
  RESUME_PDF,
  CONTACT_US,
  SNAP_BIN,
  SECRET,
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
              const dialogProps = others as TProcessButtonDialog;
              return (
                <dialogProps.popup
                  key={id}
                  icon={icon}
                  title={title}
                  x={iconX}
                  y={iconY}
                />
              );
            case "window":
              const windowProps = others as TProcessButtonWindow;
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
                      ...windowProps,
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
