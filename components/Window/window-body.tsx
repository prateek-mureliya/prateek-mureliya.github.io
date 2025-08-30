import { cn } from "@/lib/utils";
import { BasicProps } from "@/types/basic-props";

export type WindowBodyProps = {
  isMaximized?: boolean;
  link?: string;
};

export default function WindowBody({
  isMaximized = false,
  className,
  children,
  ...props
}: WindowBodyProps & BasicProps & React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex-1 overflow-auto",
        className,
        isMaximized ? "pb-0" : ""
      )}
    >
      {children}
      {isMaximized && <div className='min-h-22' />}
    </div>
  );
}
