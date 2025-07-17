import { cn } from "@/lib/utils";

type WindowHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

export default function WindowHeader({
  className,
  children,
}: WindowHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center border-b border-border p-4 bg-muted",
        className
      )}
    >
      {children}
    </div>
  );
}
