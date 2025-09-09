import { TCommandBase, THelp } from "@/types/terminal";

export const help: THelp = {
  cmd: "cd",
  description: "stands for change working working directory",
  options: {},
  itemType: "SINGLE_DIR",
};

export default function CD({}: TCommandBase) {
  return <></>;
}
