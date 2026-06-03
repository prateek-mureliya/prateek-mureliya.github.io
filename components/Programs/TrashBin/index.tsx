import FolderView from '../../UI/folder-view';
import { WindowBodyProps } from '../../Window/window-body';
import { TrashIcon } from 'lucide-react';
import { TSidebarMenu } from '@/types/folder-view';
import Trash from './Trash';

const SIDEBAR_MENU: TSidebarMenu = {
  menuOptions: [
    {
      title: 'Trash',
      icon: TrashIcon,
      content: Trash,
    },
  ],
};

export default function TrashBin({ isMaximized, activeTab }: WindowBodyProps) {
  return (
    <FolderView {...SIDEBAR_MENU} activeTab={activeTab ? activeTab : 'Trash'} isMaximized={isMaximized}></FolderView>
  );
}
