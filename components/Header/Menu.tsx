'use client';

import { Power, Sun, Moon, MonitorCog, ExternalLink } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../UI/navigation-menu';
import { cn } from '@/lib/utils';
import { Dialog, DialogTrigger } from '../UI/dialog/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../UI/dropdown-menu';
import { GITHUB_URL } from '@/lib/constants';
import { CancelAction, ConfirmBox, LinkButtonAction } from '../UI/dialog/confirm';
import { ShutdownImg } from '@/lib/media';

export default function Menu() {
  const { theme, setTheme } = useTheme();

  return (
    <NavigationMenu viewport={false} className="col-start-2 justify-self-end">
      <NavigationMenuList>
        <NavigationMenuItem asChild>
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(navigationMenuTriggerStyle())}>
              <Sun className="size-4 block dark:hidden" />
              <Moon className="size-4 hidden dark:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  <Sun />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <Moon />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <MonitorCog />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem asChild>
          <Dialog>
            <DialogTrigger className={cn(navigationMenuTriggerStyle(), 'ml-1')}>
              <Power className="size-4" />
            </DialogTrigger>
            <ConfirmBox
              title="Are you sure you want to shut down?"
              description="You&#39;re about to be redirected to my GitHub profile! 🚀 Come explore my work, projects, and
                  passion! 💻✨"
              icon={ShutdownImg.src}
              iconAlt={ShutdownImg.alt}
              action={
                <LinkButtonAction variant={'default'} href={GITHUB_URL}>
                  <ExternalLink /> Continue
                </LinkButtonAction>
              }
              cancel={<CancelAction variant={'outline'}>Cancel</CancelAction>}
            />
          </Dialog>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
