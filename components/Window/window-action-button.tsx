import { cn } from "@/lib/utils";
import { BasicProps } from "@/types/basic-props";
import { cva, type VariantProps } from "class-variance-authority";
import { Minus, MoveDiagonal, XIcon } from "lucide-react";

const buttonVariants = cva("size-4 sm:size-3 rounded-full", {
  variants: {
    variant: {
      maximize: "bg-green-500",
      minimize: "bg-yellow-500",
      close: "bg-red-500",
    },
  },
  defaultVariants: {
    variant: "close",
  },
});

function WindowActionButton({
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button {...props} className={cn(buttonVariants({ variant, className }))}>
      {children}
    </button>
  );
}

export function WindowActionClose({
  children,
  ...props
}: React.ComponentProps<"button"> & BasicProps) {
  return (
    <WindowActionButton {...props} variant={"close"}>
      <XIcon
        className='text-red-900 invisible group-hover:visible size-4 sm:size-3'
        strokeWidth={2}
      />
      {children}
    </WindowActionButton>
  );
}

export function WindowActionMinimize({
  children,
  ...props
}: React.ComponentProps<"button"> & BasicProps) {
  return (
    <WindowActionButton {...props} variant={"minimize"}>
      <Minus
        className='text-yellow-900 invisible group-hover:visible size-4 sm:size-3'
        strokeWidth={2}
      />
      {children}
    </WindowActionButton>
  );
}

export function WindowActionMaximize({
  children,
  ...props
}: React.ComponentProps<"button"> & BasicProps) {
  return (
    <WindowActionButton {...props} variant={"maximize"}>
      <MoveDiagonal
        className='text-green-900 invisible group-hover:visible size-4 sm:size-3'
        strokeWidth={2}
      />
      {children}
    </WindowActionButton>
  );
}
