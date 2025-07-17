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
import { HEADER_FOOTER_Z_INDEX } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className={`fixed bottom-6 w-full`}
      style={{ zIndex: HEADER_FOOTER_Z_INDEX }}
    >
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
