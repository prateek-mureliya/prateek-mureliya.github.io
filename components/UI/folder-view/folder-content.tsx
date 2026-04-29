import { BasicProps } from '@/types/basic-props';
import { TabsContent } from '../tabs';
import { cn } from '@/lib/utils';
import { TFolderContent } from '@/types/folder-view';
import { SidebarTrigger } from '../sidebar';

type FolderContentProps = TFolderContent & BasicProps;

export default function FolderContent({ value, isMaximized = false, className, children }: FolderContentProps) {
  return (
    <TabsContent
      value={value}
      className={cn(
        'grid grid-flow-row grid-cols-folder grid-rows-folder gap-2 p-4 max-sm:pl-12',
        isMaximized ? 'pb-22' : '',
        className
      )}
    >
      <SidebarTrigger className="absolute top-2 left-17 sm:left-19" />
      {children}
    </TabsContent>
  );
}
