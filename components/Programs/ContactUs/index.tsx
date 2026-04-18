import FolderView from '../../UI/folder-view';
import { WindowBodyProps } from '../../Window/window-body';
import { AtSign } from 'lucide-react';
import { TSidebarMenu } from '@/types/folder-view';
import SocialLinks from './SocialLinks';

const SIDEBAR_MENU: TSidebarMenu = {
  activeTab: 'Social Links',
  menuOptions: [
    {
      title: 'Social Links',
      icon: AtSign,
      content: SocialLinks,
    },
  ],
};

export default function ContactUs({ isMaximized }: WindowBodyProps) {
  return <FolderView {...SIDEBAR_MENU} isMaximized={isMaximized}></FolderView>;
}
