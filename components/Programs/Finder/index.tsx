import FolderView from '../../UI/folder-view';
import { WindowBodyProps } from '../../Window/window-body';
import { TbUserPentagon } from 'react-icons/tb';
import { FaCode } from 'react-icons/fa6';
import { TSidebarMenu } from '@/types/folder-view';
import AboutMe from './AboutMe';
import Skills from './Skills';

const SIDEBAR_MENU: TSidebarMenu = {
  menuOptions: [
    {
      title: 'About Me',
      icon: TbUserPentagon,
      content: AboutMe,
    },
    {
      title: 'Skills',
      icon: FaCode,
      content: Skills,
    },
  ],
};

export default function Finder({ isMaximized, focus, activeTab }: WindowBodyProps) {
  return (
    <FolderView
      {...SIDEBAR_MENU}
      activeTab={activeTab ? activeTab : 'About Me'}
      isMaximized={isMaximized}
      focus={focus}
    ></FolderView>
  );
}
