'use client';
import DesktopIcon from './desktop-icon';
import { useProcessContext } from '@/contexts/process-manager';
import { TProcessButtonDialog, TProcessButtonWindow } from '@/types/process-button';
import { useMemo } from 'react';
import { useApplicationContext } from '@/contexts/application-context';
import { getDesktopIcons } from '../constants/app-icons';
import { isMobile } from 'react-device-detect';

export default function Desktop() {
  const { handleOpen } = useProcessContext();
  const { isDeveloper } = useApplicationContext();

  const desktopButtons = useMemo(() => getDesktopIcons(isMobile, isDeveloper), [isDeveloper]);

  return (
    <ol className="absolute inset-0 h-desktop grid grid-flow-row sm:grid-flow-col grid-cols-desktop grid-rows-desktop gap-x-4 sm:gap-x-2 gap-y-5 px-4 sm:px-2 py-4 sm:py-2 mt-11">
      {desktopButtons.map(({ type, id, icon, title, iconX = 0, iconY = 0, viewer, ...others }) => {
        switch (type) {
          case 'dialog':
            const dialogProps = others as TProcessButtonDialog;
            return <dialogProps.popup key={id} icon={icon} title={title} x={iconX} y={iconY} />;
          case 'window':
            const windowProps = others as TProcessButtonWindow;
            return (
              <DesktopIcon
                key={id}
                icon={icon}
                title={title}
                x={iconX}
                y={iconY}
                viewer={viewer}
                onClick={() =>
                  handleOpen({
                    id,
                    icon: icon,
                    viewer: viewer,
                    title,
                    ...windowProps,
                  })
                }
              />
            );
        }
      })}
    </ol>
  );
}
