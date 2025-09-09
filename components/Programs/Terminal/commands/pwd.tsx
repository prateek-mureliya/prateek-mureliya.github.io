import { joinPath } from "@/lib/utils";
import { TCommandBase, THelp } from "@/types/terminal";

export const help: THelp = {
  cmd: "pwd",
  description: ": Print the name of the current working directory",
  options: {},
  itemType: "NOTHING",
};

export default function PWD({ path }: TCommandBase) {
  return <>{joinPath(path)}</>;
}
