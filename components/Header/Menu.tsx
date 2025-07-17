"use client";

import { Power, Sun, Moon, MonitorCog, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../UI/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../UI/dialog";
import { Button } from "../UI/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../UI/tooltip";

export default function Menu() {
  const { theme, setTheme } = useTheme();

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem asChild>
          <DropdownMenu>
            <Tooltip>
              <DropdownMenuTrigger
                className={cn(navigationMenuTriggerStyle(), "py-2 px-3")}
                asChild
              >
                <TooltipTrigger>
                  <Sun className='size-4 block dark:hidden' />
                  <Moon className='size-4 hidden dark:block' />
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent>Theme</TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value='light'>
                  <Sun />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='dark'>
                  <Moon />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='system'>
                  <MonitorCog />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem asChild>
          <Dialog>
            <Tooltip>
              <DialogTrigger
                className={cn(navigationMenuTriggerStyle(), "py-2 px-3")}
                asChild
              >
                <TooltipTrigger>
                  <Power className='size-4' />
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent>Shut down</TooltipContent>
            </Tooltip>
            <DialogContent hideHeader>
              <DialogHeader>
                <DialogTitle>Are you sure you want to shut down?</DialogTitle>
                <DialogDescription>
                  You’re about to be redirected to my GitHub profile! 🚀 Come
                  explore my work, projects, and passion! 💻✨
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant={"default"} asChild>
                  <Link href={process.env.GITHUB_PROFILE}>
                    <ExternalLink /> Continue
                  </Link>
                </Button>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
