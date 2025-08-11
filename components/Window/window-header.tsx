"use client";

import { cn } from "@/lib/utils";

type WindowHeaderProps = {
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  children: React.ReactNode;
};

export default function WindowHeader({
  onDoubleClick,
  className,
  children,
}: WindowHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center border-b border-border px-4 py-3 bg-muted select-none",
        className
      )}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
}
