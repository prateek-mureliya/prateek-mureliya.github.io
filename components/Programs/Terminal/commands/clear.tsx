import { TCommandBase, THelp } from "@/types/terminal";

export const help: THelp = {
  cmd: "clear",
  description: "stands for clear the terminal",
  options: {},
  itemType: "NOTHING",
};

export default function Clear({}: TCommandBase) {
  return <></>;
}
