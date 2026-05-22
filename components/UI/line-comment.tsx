import { cn } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';

export default function LineComment({ className, children }: BasicProps) {
  return <div className={cn('mt-2 text-gray-600 dark:text-gray-400', className)}>{`// ${children}`}</div>;
}
