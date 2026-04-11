'use client';

import { HEADER_FOOTER_Z_INDEX } from '@/lib/constants';
import { useProcessContext } from '@/contexts/process-manager';
import { LimelightNav, NavItem } from '../UI/lime-light-nav';
import { TProcessButtonWindow } from '@/types/process-button';
import { getLeftSideArr, getRightSideArr, idToApp } from '../constants/app-icons';
import { useEffect, useMemo, useState } from 'react';
import { useApplicationContext } from '@/contexts/application-context';
import { isMobile } from 'react-device-detect';

export default function Footer() {
  const { processes, handleOpen } = useProcessContext();
  const { isDeveloper } = useApplicationContext();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [leftSide, setLeftSide] = useState<NavItem[]>([]);
  const [rightSide, setRightSide] = useState<NavItem[]>([]);
  const [items, setItems] = useState<NavItem[]>([]);

  const footerLeftArr = useMemo(() => getLeftSideArr(isMobile, isDeveloper), [isDeveloper]);
  const footerRightArr = useMemo(() => getRightSideArr(), []);

  const footerLeftSide = useMemo(() => {
    return idToApp(footerLeftArr).map(({ id, icon, viewer, title, ...p }) => ({
      id,
      icon,
      viewer,
      label: title,
      focus: false,
      isOpen: false,
      onClick: () => handleOpen({ id, icon, viewer, title, ...(p as TProcessButtonWindow) }),
    }));
  }, [footerLeftArr, handleOpen]);

  const footerRightSide = useMemo(() => {
    return idToApp(footerRightArr).map(({ id, icon, viewer, title, ...p }) => ({
      id,
      icon,
      viewer,
      label: title,
      focus: false,
      isOpen: false,
      onClick: () => handleOpen({ id, icon, viewer, title, ...(p as TProcessButtonWindow) }),
    }));
  }, [footerRightArr, handleOpen]);

  useEffect(() => {
    setSelectedItemId(null);
    const items = processes
      .filter((p) => {
        const leftIndex = footerLeftArr.indexOf(p.id);
        const rightIndex = footerRightArr.indexOf(p.id);
        if (leftIndex > -1) {
          footerLeftSide[leftIndex].focus = p.focus;
          footerLeftSide[leftIndex].isOpen = true;

          if (p.focus) setSelectedItemId(p.id);
          return false;
        } else if (rightIndex > -1) {
          footerRightSide[rightIndex].focus = p.focus;
          footerRightSide[rightIndex].isOpen = true;

          if (p.focus) setSelectedItemId(p.id);
          return false;
        }

        if (p.focus) setSelectedItemId('multi');
        return true;
      })
      .map((p) => ({
        id: p.id,
        icon: p.icon,
        viewer: p.viewer,
        label: p.title,
        focus: p.focus,
        isOpen: true,
        onClick: () => handleOpen(p),
      }));

    setLeftSide(footerLeftSide);
    setRightSide(footerRightSide);
    setItems(items);
  }, [processes, footerLeftSide, footerLeftArr, footerRightSide, footerRightArr, handleOpen]);

  return (
    <footer
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      style={{ zIndex: HEADER_FOOTER_Z_INDEX - 5 }}
    >
      <LimelightNav footerLeft={leftSide} footerRight={rightSide} items={items} selectedItemId={selectedItemId} />
    </footer>
  );
}
