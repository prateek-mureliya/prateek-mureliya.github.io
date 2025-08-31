import FolderView from "../../UI/folder-view";
import { WindowBodyProps } from "../../Window/window-body";
import { Trash } from "lucide-react";
import { TSidebarMenu } from "@/types/folder-view";
import Snapped from "./Snapped";

const SIDEBAR_MENU: TSidebarMenu = {
  activeTab: "Trash",
  menuOptions: [
    {
      title: "Trash",
      icon: Trash,
      content: Snapped,
    },
  ],
};

export default function SnapBin({ isMaximized }: WindowBodyProps) {
  return <FolderView {...SIDEBAR_MENU} isMaximized={isMaximized}></FolderView>;
}
