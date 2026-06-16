import { BasicProps } from '@/types/basic-props';
import { TabsContent } from '../tabs';
import { cn } from '@/lib/utils';
import { TFolderContent } from '@/types/folder-view';

type FolderContentProps = TFolderContent & BasicProps;

export default function FolderContent({
  value,
  isMaximized = false,
  isGrid = true,
  height,
  className,
  children,
  orangeDrop = true,
  blueDrop = true,
}: FolderContentProps) {
  return (
    <TabsContent
      value={value}
      className={cn(
        'relative p-4 max-sm:pl-15',
        isGrid ? 'grid grid-flow-row grid-cols-folder grid-rows-folder gap-2' : '',
        isMaximized ? 'pb-0' : '',
        className
      )}
      style={{
        minHeight: height,
      }}
    >
      {orangeDrop && (
        <div className="absolute top-0 left-0 z-0 size-70 bg-orange-300/40 sm:bg-orange-300/20 blur-3xl"></div>
      )}
      {blueDrop && (
        <div className="absolute bottom-0 right-0 z-0 size-70 bg-cyan-300/40 sm:bg-cyan-300/20 blur-3xl"></div>
      )}
      {children}
      {isMaximized && <div className="min-h-30" />}
    </TabsContent>
  );
}
