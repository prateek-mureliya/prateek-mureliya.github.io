import { cn } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';

export type WindowBodyProps = {
  isMaximized?: boolean;
  focus?: boolean;
  link?: string;
  activeTab?: string;
};

export default function WindowBody({
  isMaximized = false,
  focus = false,
  className,
  children,
  ...props
}: WindowBodyProps & BasicProps & React.ComponentProps<'div'>) {
  return (
    <div {...props} data-focus={focus} className={cn('flex-1 overflow-auto', className, isMaximized ? 'pb-0' : '')}>
      {children}
      {isMaximized && <div className="min-h-30" />}
    </div>
  );
}
