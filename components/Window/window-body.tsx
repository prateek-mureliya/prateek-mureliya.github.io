import { cn } from "@/lib/utils";
import { BasicProps } from "@/types/basic-props";

export type WindowBodyProps = {
  isMaximize?: boolean;
  link?: string;
};

export default function WindowBody({
  isMaximize = false,
  className,
  children,
}: WindowBodyProps & BasicProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-auto",
        className,
        isMaximize ? "pb-0" : ""
      )}
    >
      {children}
      {isMaximize && <div className='min-h-22' />}
    </div>
  );
}
