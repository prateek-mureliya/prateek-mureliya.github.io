import { DesktopIconProps } from "@/components/Desktop/desktop-icon";
import { WindowBodyProps } from "@/components/Window/window-body";
import { StaticImageData } from "next/image";
import { JSX } from "react";

export type TProcessButtonBase = {
  id: string;
  title: string;
  icon: StaticImageData;
  iconX?: number;
  iconY?: number;
  viewer?: StaticImageData;
};
export type TProcessButtonRaw = { type: "raw" };
export type TProcessButtonDialog = {
  type: "dialog";
  popup: (props: DesktopIconProps) => JSX.Element;
};
export type TProcessButtonLink = {
  type: "link";
  linkTitle?: string;
  link: string;
};
export type TProcessButtonWindow = {
  type: "window";
  x: number;
  y: number;
  width: number;
  height: number;
  link?: string;
  window: (props: WindowBodyProps) => JSX.Element;
};

export type TProcessButton = TProcessButtonBase &
  (
    | TProcessButtonRaw
    | TProcessButtonDialog
    | TProcessButtonLink
    | TProcessButtonWindow
  );
