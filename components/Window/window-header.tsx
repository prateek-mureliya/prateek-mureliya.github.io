"use client";

import { cn } from "@/lib/utils";
import { BasicProps } from "@/types/basic-props";

type WindowHeaderProps = {
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
} & BasicProps;

export default function WindowHeader({
  onDoubleClick,
  className,
  children,
}: WindowHeaderProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto_1fr] border-b border-border px-4 py-3 bg-muted select-none",
        className
      )}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
}
