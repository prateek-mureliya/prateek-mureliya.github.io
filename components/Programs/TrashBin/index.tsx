import FolderView from '../../UI/folder-view';
import { WindowBodyProps } from '../../Window/window-body';
import { TrashIcon } from 'lucide-react';
import { TSidebarMenu } from '@/types/folder-view';
import Trash from './Trash';
import { isMobile } from 'react-device-detect';

const SIDEBAR_MENU: TSidebarMenu = {
  activeTab: 'Trash',
  menuOptions: [
    {
      title: 'Trash',
      icon: TrashIcon,
      content: Trash,
    },
  ],
};

export default function TrashBin({ isMaximized }: WindowBodyProps) {
  return <FolderView {...SIDEBAR_MENU} defaultOpen={!isMobile} isMaximized={isMaximized}></FolderView>;
}
