import { TCommandBase, THelp } from "@/types/terminal";

export const help: THelp = {
  cmd: "cd",
  description: "stands for navigate to a directory",
  options: {},
  itemType: "SINGLE_DIR",
};

export default function CD({}: TCommandBase) {
  return <></>;
}
