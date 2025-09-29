import { TProcessButton } from "@/types/process-button";
import TerminalIcon from "@/public/images/icon/terminal.png";
import Terminal from "../../Programs/Terminal";

export const TERMINAL: TProcessButton = {
  type: "window",
  id: "terminal",
  title: "Terminal",
  icon: TerminalIcon,
  x: 490,
  y: 90,
  width: 795,
  height: 475,
  window: Terminal,
};
