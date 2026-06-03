'use client';

import { Power } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../UI/navigation-menu';
import { cn, toWindowApp } from '@/lib/utils';
import { Dialog, DialogTrigger } from '../UI/dialog/dialog';
import { ControlCenter, WifiCenter } from './ControlCenter';
import { BasicProps } from '@/types/basic-props';
import { useApplicationContext } from '@/contexts/application-context';
import ShutdownDialog from './ShutdownDialog';
import { MdWifi, MdWifiOff } from 'react-icons/md';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../UI/popover';
import { ContolCenterIcon } from '../custom-icons';
import { FaBell } from 'react-icons/fa6';
import Notifications from './Notifications';
import { TProcessButton } from '@/types/process-button';
import { useProcessContext } from '@/contexts/process-manager';
import { ABOUT_PC } from '../constants/app-icons/about-pc';

export default function Menu({ className }: BasicProps) {
  const {
    isLogin,
    selectedUser,
    brightness,
    fullscreen,
    isStalker,
    isDeveloper,
    notifications,
    setIsLogin,
    updateBrightness,
    toggleFullscreen,
    markNotificationsRead,
  } = useApplicationContext();
  const { theme, setTheme } = useTheme();
  const { handleOpen } = useProcessContext();
  const [wifi, setWifi] = useState(true);
  const [open, setOpen] = useState(false);
  const readAllNotifications = notifications.some((p) => !p.read);
  const [notificationsPopOver, setNotificationsPopOver] = useState(readAllNotifications);

  const toggleWifi = () => setWifi((prev) => !prev);
  const closePopover = () => setOpen(false);

  const handleAboutPC = () => {
    handleOpen(toWindowApp(ABOUT_PC));
    closePopover();
  };
  const handleLogout = () => {
    setIsLogin(false);
    closePopover();
  };

  const notificationsAction = (id: number, app: TProcessButton, read: boolean, activeTab: string | undefined) => {
    if (!read) markNotificationsRead(id);
    if (app.type === 'window') {
      setNotificationsPopOver(false);
      handleOpen(toWindowApp(app, activeTab));
    }
  };

  return (
    <NavigationMenu viewport={false} className="col-start-2 justify-self-end">
      <NavigationMenuList>
        {!isLogin && (
          <NavigationMenuItem className="h-6">
            <Dialog>
              <DialogTrigger className={cn(navigationMenuTriggerStyle(), 'ml-1')}>
                <Power aria-label="shutdown" className="size-4" />
              </DialogTrigger>
              <ShutdownDialog />
            </Dialog>
          </NavigationMenuItem>
        )}
        {isLogin && selectedUser && (
          <>
            <NavigationMenuItem className="h-6">
              <Popover>
                <PopoverTrigger className={cn(navigationMenuTriggerStyle())}>
                  {wifi ? (
                    <MdWifi aria-label="wifi on" className="size-4" />
                  ) : (
                    <MdWifiOff aria-label="wifi off" className="size-4" />
                  )}
                </PopoverTrigger>
                <PopoverContent
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  className={cn('p-2 mt-2 w-40 flex flex-col gap-2', className)}
                >
                  <WifiCenter wifi={wifi} toggleWifi={toggleWifi} />
                </PopoverContent>
              </Popover>
            </NavigationMenuItem>
            <NavigationMenuItem className="h-6">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className={cn(navigationMenuTriggerStyle())}>
                  <ContolCenterIcon className="size-4" />
                </PopoverTrigger>
                <PopoverContent
                  portalForceMount
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  className={cn(
                    'p-2 mt-2 w-xs flex flex-col gap-2',
                    open ? 'flex' : 'hidden pointer-events-none',
                    className
                  )}
                >
                  <ControlCenter
                    theme={theme}
                    setTheme={setTheme}
                    wifi={wifi}
                    brightness={brightness}
                    selectedUser={selectedUser}
                    fullscreen={fullscreen}
                    showPlayer={isStalker || isDeveloper}
                    toggleWifi={toggleWifi}
                    updateBrightness={updateBrightness}
                    toggleFullscreen={toggleFullscreen}
                    aboutPcClick={handleAboutPC}
                    logoutClick={handleLogout}
                  />
                </PopoverContent>
              </Popover>
            </NavigationMenuItem>
            <NavigationMenuItem className="h-6">
              <Popover open={notificationsPopOver} onOpenChange={(open) => setNotificationsPopOver(open)}>
                <PopoverTrigger className={cn(navigationMenuTriggerStyle())}>
                  <FaBell aria-label="notifications" className="size-4" />
                  {readAllNotifications && (
                    <div className="bg-red-500 size-1.5 absolute top-0.5 right-0.5 rounded-sm shadow-2xl"></div>
                  )}
                </PopoverTrigger>
                <PopoverContent
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  className={cn('p-0 pt-3 mt-2 mr-2 w-sm flex flex-col gap-2', className)}
                >
                  <Notifications notifications={notifications} action={notificationsAction} />
                </PopoverContent>
              </Popover>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
