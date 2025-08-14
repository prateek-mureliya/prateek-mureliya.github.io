import { cn } from "@/lib/utils";
import { BasicProps } from "@/types/basic-props";

export default function Tree({ className, children }: BasicProps) {
  return <li className={cn("mt-6 first:mt-0", className)}>{children}</li>;
}
