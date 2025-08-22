import { cn } from "@/lib/utils";
import { BasicProps } from "@/types/basic-props";

export default function WindowActionBar({ className, children }: BasicProps) {
  return (
    <div
      className={cn(
        "flex flex-row col-start-1 justify-self-start self-center gap-x-3 sm:gap-x-2 w-fit h-fit",
        className
      )}
    >
      {children}
    </div>
  );
}
