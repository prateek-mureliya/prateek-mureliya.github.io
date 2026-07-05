import { cn } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';
import { TreeColor } from '@/types/tree';

export default function Branches({ borderColor = '', className, children }: TreeColor & BasicProps) {
  return <ul className={cn('pl-4 border-l ml-2', borderColor, className)}>{children}</ul>;
}
