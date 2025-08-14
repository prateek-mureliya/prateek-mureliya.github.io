import { cn } from "@/lib/utils";
import { BasicProps } from "@/types/basic-props";

export default function WindowActionBar({ className, children }: BasicProps) {
  return (
    <div className={cn("flex flex-row gap-x-3 sm:gap-x-2 w-fit", className)}>
      {children}
    </div>
  );
}
