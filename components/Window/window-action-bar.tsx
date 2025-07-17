import { cn } from "@/lib/utils";

type WindowActionBarProps = {
  className?: string;
  children: React.ReactNode;
};
export default function WindowActionBar({
  className,
  children,
}: WindowActionBarProps) {
  return (
    <div className={cn("flex flex-row gap-x-2 w-fit", className)}>
      {children}
    </div>
  );
}
