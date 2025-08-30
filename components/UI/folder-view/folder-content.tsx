import { BasicProps } from "@/types/basic-props";
import { TabsContent } from "../tabs";
import { cn } from "@/lib/utils";
import { TFolderContent } from "@/types/folder-view";

type FolderContentProps = TFolderContent & BasicProps;

export default function FolderContent({
  value,
  isMaximized = false,
  className,
  children,
}: FolderContentProps) {
  return (
    <TabsContent
      value={value}
      className={cn(
        "grid grid-flow-row grid-cols-folder grid-rows-folder gap-2 p-4",
        isMaximized ? "pb-22" : "",
        className
      )}
    >
      {children}
    </TabsContent>
  );
}
