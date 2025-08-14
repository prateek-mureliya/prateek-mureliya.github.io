import { cn } from "@/lib/utils";
import { BasicProps } from "@/types/basic-props";
import { TreeColor } from "@/types/tree";

export const BORDER_COLOR: { [key: string]: string } = {
  Yellow: "border-yellow-800 dark:border-yellow-400",
  Blue: "border-blue-800 dark:border-blue-400",
  Green: "border-green-800 dark:border-green-400",
};

export default function Branches({
  color,
  className,
  children,
}: TreeColor & BasicProps) {
  return (
    <ul className={cn("pl-4 border-l ml-2", BORDER_COLOR[color], className)}>
      {children}
    </ul>
  );
}
