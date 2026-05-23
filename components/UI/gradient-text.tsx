import { cn } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';

export default function GradientText({ className, children }: BasicProps) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}
