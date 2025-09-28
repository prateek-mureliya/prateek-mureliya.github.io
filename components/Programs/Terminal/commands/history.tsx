import { useLocalStorage } from "@/hook/useLocalStorage";
import { TCommandBase, THelp } from "@/types/terminal";

export const help: THelp = {
  cmd: "history",
  description: "used to display last 10 commands",
  options: {},
  itemType: "NOTHING",
};

export default function History({}: TCommandBase) {
  const [storedHistory] = useLocalStorage<string[]>("storedHistory", []);
  return storedHistory.map((h, index) => <div key={index}>{h}</div>);
}
