'use client';

import HomeIcon from '@/public/images/icon/home.png';
import { HEADER_FOOTER_Z_INDEX } from '@/lib/constants';
import { useProcessContext } from '@/contexts/process-manager';
import { LimelightNav } from '../UI/lime-light-nav';
import { ABOUT_ME } from '../constants/app-icons/about-me';
import { CONTACT_US } from '../constants/app-icons/contact-us';
import { TERMINAL } from '../constants/app-icons/terminal';
import { TRASH_BIN } from '../constants/app-icons/trash-bin';
import { TProcessButtonWindow } from '@/types/process-button';

const { id: abtmeId, icon: abtmeIcon, title: abtmeTitle, viewer: abtmeViewer, ...abtmeOthers } = ABOUT_ME;
const { id: cntusId, icon: cntusIcon, title: cntusTitle, viewer: cntusViewer, ...cntusOthers } = CONTACT_US;
const { id: trminlId, icon: trminlIcon, title: trminlTitle, viewer: trminlViewer, ...trminlOthers } = TERMINAL;
const { id: trashId, icon: trashIcon, title: trashTitle, viewer: trashViewer, ...trashOthers } = TRASH_BIN;

export default function Footer() {
  const { processes, handleHome, handleOpen } = useProcessContext();
  const openApp = processes.map((p) => p.id);

  return (
    <footer
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      style={{ zIndex: HEADER_FOOTER_Z_INDEX }}
    >
      <LimelightNav
        about={{
          id: abtmeId,
          icon: abtmeIcon,
          viewer: abtmeViewer,
          label: abtmeTitle,
          focus: false,
          isOpen: openApp.includes(abtmeId),
          onClick: () =>
            handleOpen({ id: abtmeId, icon: abtmeIcon, title: abtmeTitle, ...(abtmeOthers as TProcessButtonWindow) }),
        }}
        contact={{
          id: cntusId,
          icon: cntusIcon,
          viewer: cntusViewer,
          label: cntusTitle,
          focus: false,
          isOpen: openApp.includes(cntusId),
          onClick: () =>
            handleOpen({
              id: cntusId,
              icon: cntusIcon,
              title: cntusTitle,
              ...(cntusOthers as TProcessButtonWindow),
            }),
        }}
        terminal={{
          id: trminlId,
          icon: trminlIcon,
          viewer: trminlViewer,
          label: trminlTitle,
          focus: false,
          isOpen: openApp.includes(trminlId),
          onClick: () =>
            handleOpen({
              id: trminlId,
              icon: trminlIcon,
              title: trminlTitle,
              ...(trminlOthers as TProcessButtonWindow),
            }),
        }}
        home={{
          id: 'Home',
          icon: HomeIcon,
          label: 'Desktop',
          focus: false,
          isOpen: false,
          onClick: handleHome,
        }}
        trash={{
          id: trashId,
          icon: trashIcon,
          viewer: trashViewer,
          label: trashTitle,
          focus: false,
          isOpen: openApp.includes(trashId),
          onClick: () =>
            handleOpen({ id: trashId, icon: trashIcon, title: trashTitle, ...(trashOthers as TProcessButtonWindow) }),
        }}
        items={processes.map((p) => ({
          id: p.id,
          icon: p.icon,
          viewer: p.viewer,
          label: p.title,
          focus: p.focus,
          isOpen: true,
          onClick: () => handleOpen(p),
        }))}
      />
    </footer>
  );
}
