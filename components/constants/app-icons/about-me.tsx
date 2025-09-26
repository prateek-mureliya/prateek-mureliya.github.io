import { TProcessButton } from "@/types/process-button";
import AboutMeIcon from "@/public/images/icon/about-me.png";
import AboutMe from "../../Programs/AboutMe";

export const ABOUT_ME: TProcessButton = {
  type: "window",
  id: "aboutme",
  title: "About Me",
  icon: AboutMeIcon,
  x: 258,
  y: 62,
  width: 1020,
  height: 515,
  window: AboutMe,
};
