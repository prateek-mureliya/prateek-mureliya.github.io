import { Dock, DockIcon } from "../UI/dock";
import { HomeIcon, PencilIcon } from "lucide-react";
import { Button } from "../UI/button";
import { Separator } from "../UI/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../UI/tooltip";

export default function Footer() {
  return (
    <footer className='fixed bottom-6 z-50 w-full'>
      <TooltipProvider>
        <Dock direction='middle'>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label={"Home"}
                  variant={"ghost"}
                  size={"icon"}
                  className={"size-12 rounded-full"}
                >
                  <HomeIcon className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <Separator orientation='vertical' className='h-full' />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label={"Blog"}
                  variant={"ghost"}
                  size={"icon"}
                  className={"size-12 rounded-full"}
                >
                  <PencilIcon className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Blog</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </footer>
  );
}
