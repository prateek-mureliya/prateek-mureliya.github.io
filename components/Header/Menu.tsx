'use client';

import { Power } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../UI/navigation-menu';
import { cn } from '@/lib/utils';
import { Dialog, DialogTrigger } from '../UI/dialog/dialog';
import { ControlCenter, WifiCenter } from './ControlCenter';
import { BasicProps } from '@/types/basic-props';
import { useApplicationContext } from '@/contexts/application-context';
import ShutdownDialog from './ShutdownDialog';
import { MdWifi, MdWifiOff } from 'react-icons/md';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../UI/popover';

export default function Menu({ className }: BasicProps) {
  const { isLogin, selectedUser, brightness, fullscreen, setIsLogin, updateBrightness, toggleFullscreen } =
    useApplicationContext();
  const { theme, setTheme } = useTheme();
  const [wifi, setWifi] = useState(true);
  const [open, setOpen] = useState(false);
  const toggleWifi = () => setWifi((prev) => !prev);

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
                  <svg
                    viewBox="0 0 29 29"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    aria-label="contol center"
                  >
                    <path d="M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z"></path>
                  </svg>
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
                    setIsLogin={setIsLogin}
                    toggleWifi={toggleWifi}
                    updateBrightness={updateBrightness}
                    toggleFullscreen={toggleFullscreen}
                  />
                </PopoverContent>
              </Popover>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
