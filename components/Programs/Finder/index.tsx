import FolderView from '../../UI/folder-view';
import { WindowBodyProps } from '../../Window/window-body';
import { TbBriefcase, TbUserPentagon } from 'react-icons/tb';
import { FaCode } from 'react-icons/fa6';
import { PiGraduationCapBold } from 'react-icons/pi';
import { TSidebarMenu } from '@/types/folder-view';
import AboutMe from './AboutMe';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';

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
    {
      title: 'Experience',
      icon: TbBriefcase,
      content: Experience,
    },
    {
      title: 'Education',
      icon: PiGraduationCapBold,
      content: Education,
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
